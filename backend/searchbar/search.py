from collections import defaultdict
from urllib.parse import quote

def defaultURL(text): return "https://www.google.com/search?q=" + text

searchDict = {
    'yt': lambda text: "https://www.youtube.com/results?search_query=" + (text),
    'tr': lambda text: f"https://translate.google.co.uk/?sl=auto&tl=en&text={text}&op=translate",
    'zeb': lambda _ : "https://imgur.com/a/O25jaEb"
}


def search(text):
    split = text.split()
    key = split[0]; content = quote(" ".join(split[1:]))
    if not text: return "https://www.google.com/search?q="
    if not key in searchDict:
        return defaultURL(quote(text))
    f = searchDict[key]
    return f(content)
