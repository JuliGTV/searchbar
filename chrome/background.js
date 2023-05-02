
chrome.omnibox.onInputStarted.addListener(function() {
    chrome.omnibox.setDefaultSuggestion({description: "Click below"})
})

var text2
chrome.omnibox.onInputChanged.addListener(function(text, suggest) {            
    text2 = text
    suggest([{'content': "https://www.google.com/search?q=" + text, 'description': "input "+ text}])   //weird slicing necessary to get valid url for some reason (remove "")
})


chrome.omnibox.onInputEntered.addListener(function(text) {
    fetch("https://searchbar-iaklo4m3da-uc.a.run.app/suggestions/q=" + encodeURIComponent(text2))
    .then(res => res.text())
    .then(data => {
    console.log(data)
    chrome.tabs.update({'url': data.slice(1,-2)})
})
}) 