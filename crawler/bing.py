from json import dumps
from os import environ, path
from utils import ensure_path_exists, get_database_path, getToday
from requests import get

MKTs = ["en-US", "zh-CN"]


def pull_daily_wallpaper():
    target_dir = path.join(get_database_path(), "bing", "daily-wallpaper", getToday())

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

def pull_trending_images():
    target_dir = path.join(get_database_path(), "bing", "trending-images", getToday())
    key = environ.get('AZURE_SUBSCRIPTION_KEY')
    
    for mkt in MKTs:
        r = get(
            "https://api.bing.microsoft.com/v7.0/images/trending",
            headers={'Ocp-Apim-Subscription-Key':key},
            params={'safeSearch':'Strict', 'count':8,'mkt':mkt}
        )
        data = r.json()["categories"]
        target_file = path.join(target_dir, mkt + ".json")
        ensure_path_exists(target_file)
        with open(target_file, "w") as f:
            f.write(dumps(data, ensure_ascii=False, indent=2))
    
    

def pull_from_bing():
    pull_daily_wallpaper()
    pull_trending_images()
