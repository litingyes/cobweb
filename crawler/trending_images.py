from json import dumps
from os import environ, path
from requests import get
from utils import ensure_path_exists, update_readme,get_database_path,MKTs


def pull_trending_images():
    target_dir = path.join(get_database_path(), "bing", "trending-images")
    key = environ.get("AZURE_SUBSCRIPTION_KEY")
    md_content = (
        "\n|Popular nature and landmark | Popular wallpaper |\n| :----: | :----: |\n"
    )

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

        if mkt == "en-US":
            for i in range(8):
                nature_or_landmark = data[2]["tiles"][i]
                nature_or_landmark_description = nature_or_landmark["query"][
                    "displayText"
                ]
                nature_or_landmark_url = nature_or_landmark["image"]["thumbnailUrl"]
                wallpaper = data[3]["tiles"][i]
                wallpaper_description = wallpaper["query"]["displayText"]
                wallpaper_url = wallpaper["image"]["thumbnailUrl"]
                md_content += f"| [![{nature_or_landmark_description}]({nature_or_landmark_url}) {nature_or_landmark_description}]({nature_or_landmark_url}) | [![{wallpaper_description}]({wallpaper_url}) {wallpaper_description}]({wallpaper_url}) |\n"
            update_readme("BING_TRENDING_IMAGES", md_content)
            
if __name__ == "__main__":
    pull_trending_images()