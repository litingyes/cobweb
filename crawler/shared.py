from json import loads
from os import getcwd, path, makedirs
from datetime import datetime, timedelta, timezone
from re import DOTALL, MULTILINE, compile, escape
from typing import List


# utils
def is_equal_list(arr1: List, arr2: List):
    if not arr1 or not arr2:
        return False
    if len(arr1) != len(arr2):
        return False
    for item in arr1:
        if item not in arr2:
            return False
    return True


# file
def get_database_path():
    return path.join(getcwd(), "database")


def ensure_path_exists(_path, is_dir=False):
    if path.exists(_path):
        return

    if is_dir:
        return makedirs(_path)

    dir_path = path.dirname(_path)
    ensure_path_exists(dir_path, True)
    with open(_path, "w") as file:
        file.write("")


# time
def getToday():
    return datetime.now(timezone.utc).strftime("%Y-%m-%d")


def get_yesterday():
    yesterday = datetime.now(timezone.utc) - timedelta(days=1)
    return yesterday.strftime("%Y-%m-%d")


# markdown
def update_readme(tag, content):
    section_start = f"<!-- {tag}_START -->"
    section_end = f"<!-- {tag}_END -->"
    pattern = compile(
        rf"(?<={escape(section_start)}\n)(.*?)(?=\n{escape(section_end)})",
        MULTILINE | DOTALL,
    )

    readme_path = path.join(getcwd(), "README.md")
    with open(readme_path, "r") as file:
        readme_content = file.read()
    with open(readme_path, "w") as file:
        file.write(pattern.sub(content, readme_content, 1))


def update_images_section_in_readme():
    bing_daily_wallpaper_path = path.join(
        get_database_path(),
        "images",
        "bing-daily-wallpaper",
        "en-US",
        getToday() + ".json",
    )
    if not path.exists(bing_daily_wallpaper_path):
        bing_daily_wallpaper_path = bing_daily_wallpaper_path.replace(
            getToday(), get_yesterday()
        )
    with open(bing_daily_wallpaper_path, "r") as f:
        bing_daily_wallpaper_data = loads(f.read())

    bing_search_wallpaper_path = path.join(
        get_database_path(),
        "images",
        "bing-search-wallpaper",
        getToday() + ".json",
    )
    if not path.exists(bing_search_wallpaper_path):
        bing_search_wallpaper_path = bing_search_wallpaper_path.replace(
            getToday(), get_yesterday()
        )
    with open(bing_search_wallpaper_path, "r") as f:
        bing_search_wallpaper_data = loads(f.read())

    bing_trending_images_path = path.join(
        get_database_path(), "images", "bing-trending-images", "en-US.json"
    )
    with open(bing_trending_images_path, "r") as f:
        bing_trending_images_data = loads(f.read())

    md_content = "| Bing daily wallpaper | Bing search wallpaper | Bing trending images |\n| :----: | :----: | :----: |\n"
    for i in range(8):
        daily_wallpaper_image = bing_daily_wallpaper_data[i]
        daily_wallpaper_image_url = (
            BING_DOMAIN + daily_wallpaper_image["urlbase"] + "_UHD.jpg"
        )
        daily_wallpaper_image_alt = daily_wallpaper_image["title"]

        search_wallpaper_image = bing_search_wallpaper_data[i]
        search_wallpaper_image_url = search_wallpaper_image["thumbnail"]["thumbnailUrl"]
        search_wallpaper_image_alt = search_wallpaper_image["displayText"]

        trending_images_image = bing_trending_images_data[3]["tiles"][i]
        trending_images_image_url = trending_images_image["image"]["thumbnailUrl"]
        trending_images_image_alt = trending_images_image["query"]["displayText"]

        md_content += f"| ![{daily_wallpaper_image_alt}]({daily_wallpaper_image_url}) [{daily_wallpaper_image_alt}]({daily_wallpaper_image_url}) | ![{search_wallpaper_image_alt}]({search_wallpaper_image_url}) [{search_wallpaper_image_alt}]({search_wallpaper_image_url}) | ![{trending_images_image_alt}]({trending_images_image_url}) [{trending_images_image_alt}]({trending_images_image_url}) |\n"

    update_readme("IMAGES", md_content)


# bing

BING_DOMAIN = "https://bing.com"

MKTs = ["en-US", "zh-CN"]
