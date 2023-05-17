from urllib.parse import quote
from searchbar.interface import TableInterface

def defaultURL(text): return "https://www.google.com/search?q=" + text

# search takes the string that has been put into the searchbar + the users id and returns a URL
def search(text, user, interface):
    print(interface.get_URL('gen','yt'))
    split = text.split()
    key = split[0]; content = quote(" ".join(split[1:]))
    if not text: return "https://www.google.com/search?q="
    template = interface.get_URL(user, key)
    if not template:  template = interface.get_URL('gen', key)
    print(key)
    print(template)
    if not template: return defaultURL(content)
    if '%s' in template:
        template = template % content
    return template
