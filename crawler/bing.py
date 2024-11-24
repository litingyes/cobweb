from json import dumps
from os import environ, path
from utils import ensure_path_exists, get_database_path, getToday, update_readme
from requests import get

BING_DOMAIN = "https://bing.com"
MKTs = ["en-US", "zh-CN"]


def pull_daily_wallpaper():
    target_dir = path.join(get_database_path(), "bing", "daily-wallpaper", getToday())
    md_content = "\n| United States (en-US) | China (zh-CN) |\n| :----: | :----: |\n"

    for mkt in MKTs:
        r = get(
            "https://www.bing.com/HPImageArchive.aspx",
            {"format": "js", "idx": 0, "n": 8, "mkt": mkt},
        )
        data = r.json()["images"]
        target_file = path.join(target_dir, mkt + ".json")
        ensure_path_exists(target_file)
        with open(target_file, "w") as f:
            f.write(dumps(data, ensure_ascii=False, indent=2))

        first_image = data[0]
        url = BING_DOMAIN + first_image["url"]
        uhd_url = BING_DOMAIN + first_image["urlbase"] + "_UHD.jpg"
        md_content += (
            f"| [![{first_image['title']}]({url}) {first_image['title']}]({uhd_url})"
        )

    md_content += "|\n"
    update_readme("BING_DAILY_WALLPAPER", md_content)


def pull_trending_images():
    target_dir = path.join(get_database_path(), "bing", "trending-images", getToday())
    key = environ.get("AZURE_SUBSCRIPTION_KEY")
    md_content = "\n| United States (en-US) | China (zh-CN) |\n| :----: | :----: |\n"

    for mkt in MKTs:
        r = get(
            "https://api.bing.microsoft.com/v7.0/images/trending",
            headers={"Ocp-Apim-Subscription-Key": key},
            params={"safeSearch": "Strict", "count": 8, "mkt": mkt},
        )
        data = r.json()["categories"]
        target_file = path.join(target_dir, mkt + ".json")
        ensure_path_exists(target_file)
        with open(target_file, "w") as f:
            f.write(dumps(data, ensure_ascii=False, indent=2))

        description = data[0]["tiles"][0]["query"]["displayText"]
        url = data[0]["tiles"][0]["image"]["thumbnailUrl"]
        md_content += f"| [![{description}]({url}) {description}]({url})"

    md_content += "|\n"
    update_readme("BING_TRENDING_IMAGES", md_content)


def pull_from_bing():
    pull_daily_wallpaper()
    pull_trending_images()
