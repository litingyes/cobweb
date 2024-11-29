from json import dumps
from os import environ, path
from requests import get
from utils import ensure_path_exists, get_database_path, getToday, update_readme


def pull_search_wallpaper():
    target_dir = path.join(get_database_path(), "bing", "search-wallpaper")
    key = environ.get("AZURE_SUBSCRIPTION_KEY")

    r = get(
        "https://api.bing.microsoft.com/v7.0/images/search",
        headers={"Ocp-Apim-Subscription-Key": key},
        params={
            "count": 8,
            "mkt": 'en-US',
            "q":  'wallpaper',
            "safeSearch": "Strict",
            "color": "ColorOnly",
            "freshness": "Day",
            "aspect": "Wide",
            "imageType": "Photo",
            "license": "Public",
            "size": "Wallpaper",
        },
    )
    data = r.json()['queryExpansions']
    target_file = path.join(target_dir,getToday() + ".json")
    ensure_path_exists(target_file)
    with open(target_file, "w") as f:
        f.write(dumps(data, ensure_ascii=False, indent=2))
        
    first_image = data[0]
    md_content = f"![{first_image['displayText']}]({first_image['thumbnail']['thumbnailUrl']}) Today: [{first_image['displayText']}]({first_image['thumbnail']['thumbnailUrl']})"
    update_readme("BING_SEARCH_WALLPAPER", md_content)
            
if __name__ == "__main__":
    pull_search_wallpaper()