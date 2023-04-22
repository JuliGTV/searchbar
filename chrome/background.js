function suggestions(text) {
    sgtns = []
    sgtns.push({deletable: true, content: "https://imgur.com/a/O25jaEb", description: "Zebedee"})
    sgtns.push({deletable: true, content: "http://www.google.com/search?q=" + text, description: "Search Google for: "+ text})
    sgtns.push({deletable: true, content: `https://translate.google.co.uk/?sl=auto&tl=en&text=${text}%0A&op=translate`, description: `translate ${text} to English`})

    return sgtns
}


chrome.omnibox.onInputChanged.addListener(function(text, suggest) {
    suggest(suggestions(text))
})