from json import dumps
from os import environ, path
from requests import get
from algolia import TAGS, TYPES, add_records
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
            "freshness": "Week",
            "aspect": "Wide",
            "imageType": "Photo",
            "license": "Public",
            "size": "Wallpaper",
        },
    )
    # found count is invalid
    data = r.json()["queryExpansions"][0:8]
    target_file = path.join(target_dir, get_today() + ".json")
    ensure_path_exists(target_file)
    with open(target_file, "w") as f:
        f.write(dumps(data, ensure_ascii=False, indent=2))

    update_images_section_in_readme()

    records = []
    for item in data:
        record = {
            "objectID": item["thumbnail"]["thumbnailUrl"],
            "type": TYPES.IMAGE.value,
            "url": item["thumbnail"]["thumbnailUrl"],
            "alt": item["displayText"],
            "tags": [TAGS.IMAGE.value, TAGS.EN_US.value, TAGS.SEARCH_WALLPAPER.value],
        }
        records.append(record)
    add_records(records)


if __name__ == "__main__":
    pull_bing_search_wallpaper()
