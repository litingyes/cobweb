from json import dumps, loads
from os import environ, path
from requests import get
from algolia import TAGS, TYPES, add_records, delete_records
from shared import (
    ensure_path_exists,
    get_database_path,
    get_today,
    update_images_section_in_readme,
)


def pull_bing_search_wallpaper():
    target_dir = path.join(get_database_path(), "images", "bing-search-wallpaper")
    key = environ.get("AZURE_SUBSCRIPTION_KEY")

    r = get(
        "https://api.bing.microsoft.com/v7.0/images/search",
        headers={"Ocp-Apim-Subscription-Key": key},
        params={
            "count": 8,
            "mkt": "en-US",
            "q": "wallpaper",
            "safeSearch": "Strict",
            "color": "ColorOnly",
            "freshness": "Month",
            "license": "Public",
            "aspect": "Wide",
            "imageType": "Photo",
            "size": "Wallpaper",
        },
    )
    images = []
    data = r.json()
    if "value" in data:
        for item in data["value"]:
            if len(images) == 8:
                break
            images.append({"title": item["name"], "thumbnailUrl": item["thumbnailUrl"]})
    if len(images) < 8 and "queryExpansions" in data:
        for item in data["queryExpansions"]:
            if len(images) == 8:
                break
            images.append(
                {
                    "title": item["displayText"],
                    "thumbnailUrl": item["thumbnail"]["thumbnailUrl"],
                }
            )

    target_file = path.join(target_dir, "en-US.json")
    ensure_path_exists(target_file)

    if len(images) < 8:
        with open(target_file, "r") as f:
            oldData = loads(f.read())
            if len(oldData) > 0:
                records = []
                # delete_records(oldData)
                for item in oldData:
                    if len(images) < 8:
                        images.append(item)
                    else:
                        records.append(
                            {
                                "objectID": item["thumbnailUrl"],
                                "type": TYPES.IMAGE.value,
                                "url": item["thumbnailUrl"],
                                "alt": item["title"],
                                "tags": [
                                    TAGS.IMAGE.value,
                                    TAGS.EN_US.value,
                                    TAGS.SEARCH_WALLPAPER.value,
                                ],
                            }
                        )
                delete_records(records)

    with open(target_file, "w") as f:
        f.write(dumps(images, ensure_ascii=False, indent=2))

    update_images_section_in_readme()

    records = []
    for item in images:
        record = {
            "objectID": item["thumbnailUrl"],
            "type": TYPES.IMAGE.value,
            "url": item["thumbnailUrl"],
            "alt": item["title"],
            "tags": [TAGS.IMAGE.value, TAGS.EN_US.value, TAGS.SEARCH_WALLPAPER.value],
        }
        records.append(record)
    add_records(records)


if __name__ == "__main__":
    pull_bing_search_wallpaper()
