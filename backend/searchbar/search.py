from collections import defaultdict
from urllib.parse import quote
from searchbar.interface import TableInterface

def defaultURL(text): return "https://www.google.com/search?q=" + text


def search(text, user, interface):
    split = text.split()
    key = split[0]; content = quote(" ".join(split[1:]))
    if not text: return "https://www.google.com/search?q="
    template = interface.get_cell(user, key)
    if not template:  template = interface.get_cell('gen', key)
    if not template: return defaultURL(content)
    if '%s' in template:
        template = template % content
    return template
