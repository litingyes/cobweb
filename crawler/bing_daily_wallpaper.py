from json import dumps
from os import path
from requests import get
from algolia import TAGS, TYPES, add_records
from shared import (
    ensure_path_exists,
    get_database_path,
    getToday,
    update_readme,
    MKTs,
    BING_DOMAIN,
)


def pull_bing_daily_wallpaper():
    target_dir = path.join(get_database_path(), "images", "bing-daily-wallpaper")
    records = []

    for mkt in MKTs:
        r = get(
            "https://www.bing.com/HPImageArchive.aspx",
            {"format": "js", "idx": 0, "n": 8, "mkt": mkt},
        )
        data = r.json()["images"]
        target_file = path.join(target_dir, mkt, getToday() + ".json")
        ensure_path_exists(target_file)
        with open(target_file, "w") as f:
            f.write(dumps(data, ensure_ascii=False, indent=2))

        first_image = data[0]
        url = BING_DOMAIN + first_image["url"]
        uhd_url = BING_DOMAIN + first_image["urlbase"] + "_UHD.jpg"

        if mkt == "en-US":
            md_content = f"![{first_image['title']}]({url}) Today: [{first_image['title']}]({uhd_url})"
            update_readme("BING_DAILY_WALLPAPER", md_content)
            
        for item in data:
            record = {
                "objectID": item['urlbase'],
                "type": TYPES.IMAGE.value,
                "url": BING_DOMAIN + item["url"],
                "alt": item["title"],
                "tags": [TAGS.IMAGE.value, mkt, TAGS.DAILY_WALLPAPER.value],
            }
            records.append(record)
        add_records(records)


if __name__ == "__main__":
    pull_bing_daily_wallpaper()
