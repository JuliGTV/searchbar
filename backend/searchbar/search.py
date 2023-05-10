from collections import defaultdict
from urllib.parse import quote
from searchbar.interface import TableInterface

def defaultURL(text): return "https://www.google.com/search?q=" + text


def search(text, interface):
    split = text.split()
    key = split[0]; content = quote(" ".join(split[1:]))
    if not text: return "https://www.google.com/search?q="
    template = interface.get_cell('URL', key)
    if not template: return defaultURL(content)
    url = template % content
    return url
