from json import dumps, loads
from os import environ, path
from requests import get
from algolia import TAGS, TYPES, add_records, delete_records
from shared import (
    ensure_path_exists,
    update_images_section_in_readme,
    get_database_path,
    MKTs,
)


def pull_bing_trending_images():
    target_dir = path.join(get_database_path(), "images", "bing-trending-images")
    key = environ.get("AZURE_SUBSCRIPTION_KEY")

    for mkt in MKTs:
        r = get(
            "https://api.bing.microsoft.com/v7.0/images/trending",
            headers={"Ocp-Apim-Subscription-Key": key},
            params={"safeSearch": "Strict", "count": 8, "mkt": mkt},
        )

        data = r.json()
        if "categories" not in data:
            return

        data = r.json()["categories"]
        target_file = path.join(target_dir, mkt + ".json")
        ensure_path_exists(target_file)
        with open(target_file, "r") as f:
            data = loads(f.read())
            records = []
            for group in data:
                for item in group["tiles"]:
                    record = {
                        "objectID": item["image"]["contentUrl"],
                        "type": TYPES.IMAGE.value,
                        "url": item["image"]["contentUrl"],
                        "alt": item["query"]["displayText"],
                        "tags": [
                            TAGS.IMAGE.value,
                            mkt,
                            TAGS.SEARCH_WALLPAPER.value,
                        ],
                    }
                records.append(record)
            delete_records(records)
        with open(target_file, "w") as f:
            f.write(dumps(data, ensure_ascii=False, indent=2))

        update_images_section_in_readme()

        records = []
        for group in data:
            for item in group["tiles"]:
                record = {
                    "objectID": item["image"]["contentUrl"],
                    "type": TYPES.IMAGE.value,
                    "url": item["image"]["contentUrl"],
                    "alt": item["query"]["displayText"],
                    "tags": [
                        TAGS.IMAGE.value,
                        mkt,
                        TAGS.SEARCH_WALLPAPER.value,
                    ],
                }
                records.append(record)
        add_records(records)


if __name__ == "__main__":
    pull_bing_trending_images()
