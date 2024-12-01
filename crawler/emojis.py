from enum import Enum
from json import dumps
from os import path
from re import split
from typing import Dict, List
from requests import get
from algolia import TAGS, TYPES, add_records
from shared import ensure_path_exists, get_database_path, is_equal_list


class ADDON_MODULES(Enum):
    CUSTOM = "custom"
    GITHUB = "github"


def pull_unicode_emoji():
    r = get("https://www.unicode.org/Public/emoji/latest/emoji-test.txt")
    data = r.text

    list = []
    group = ""
    subgroup = ""
    for line in data.splitlines():
        if line.startswith("# group"):
            group = line[9:]
            subgroup = ""
        elif line.startswith("# subgroup:"):
            subgroup = line[12:]
        elif line.startswith("#") or not line.strip():
            continue
        else:
            code_point_str, status, content = [
                s.strip() for s in split(";|#", line) if s.strip()
            ]
            code_points = [int(code_point, 16) for code_point in code_point_str.split()]
            list.append(
                {
                    "char": "".join(chr(code_point) for code_point in code_points),
                    "name": " ".join(content.split()[2:]),
                    "shortCodes": [
                        f':{"_".join(content.split()[2:]).replace(":","").lower()}:'
                    ],
                    "codePoints": [hex(code_point) for code_point in code_points],
                    "categories": [group, subgroup],
                    "status": status,
                }
            )

    attach_github_emoji_info(list)

    target_file_path = path.join(get_database_path(), "emojis", "unicode.json")
    ensure_path_exists(target_file_path)
    with open(target_file_path, "w") as f:
        f.write(dumps(list, ensure_ascii=False, indent=2))
    
        
    records = []
    for item in list:
        item['objectID'] = f"{TYPES.EMOJI.value}_{item['name']}"
        item['type'] = TAGS.EMOJI.value
        item['tags'] = [TAGS.EMOJI.value]
        if TAGS.GITHUB in item['categories']:
            item['tags'].append(TAGS.GITHUB.value)
        else:
            item['tags'].append(TAGS.UNICODE.value)
        records.append(item)
    add_records(records)


def attach_github_emoji_info(list: List):
    r = get("https://api.github.com/emojis")
    data: Dict = r.json()

    for name, url in data.items():
        content = path.basename(url).split(".")[0]
        try:
            code_points = [
                hex(int(code_point, 16)) for code_point in content.split("-")
            ]
            emoji_in_unicode = next(
                (
                    emoji
                    for emoji in list
                    if is_equal_list(emoji.get("codePoints"), code_points)
                ),
                None,
            )
            if not emoji_in_unicode:
                list.append(
                    {
                        "name": name.replace("_", ""),
                        "shortCodes": [f":{name}:"],
                        "codePoints": code_points,
                        "categories": [
                            ADDON_MODULES.CUSTOM.value,
                            ADDON_MODULES.GITHUB.value,
                        ],
                        "url": url,
                    }
                )
                continue

            if "addons" not in emoji_in_unicode:
                emoji_in_unicode["addon"] = []
            emoji_in_unicode["addon"].append(
                {
                    "module": ADDON_MODULES.GITHUB.value,
                    "name": name.replace("_", ""),
                    "shortCodes": [f":{name}:"],
                    "url": url,
                }
            )

        except ValueError:
            list.append(
                {
                    "name": name.replace("_", ""),
                    "shortCodes": [f":{name}:"],
                    "codePoints": [],
                    "categories": [
                        ADDON_MODULES.CUSTOM.value,
                        ADDON_MODULES.GITHUB.value,
                    ],
                    "url": url,
                }
            )


if __name__ == "__main__":
    pull_unicode_emoji()
