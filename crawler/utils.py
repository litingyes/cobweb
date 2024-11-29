from os import getcwd, path, makedirs
from datetime import datetime, timezone
from re import DOTALL, MULTILINE, compile, escape

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

# bing

BING_DOMAIN = "https://bing.com"

MKTs = ["en-US", "zh-CN"]