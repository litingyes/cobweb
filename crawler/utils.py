from os import getcwd, path, makedirs
from datetime import datetime, timezone


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
