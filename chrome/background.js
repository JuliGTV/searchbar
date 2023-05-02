
chrome.omnibox.onInputStarted.addListener(function() {
    chrome.omnibox.setDefaultSuggestion({description: "Click below"})
})

var text2
chrome.omnibox.onInputChanged.addListener(function(text, suggest) {            ///////////something is going on that fails in the translate case
    text2 = text
    suggest([{'content': "https://www.google.com/search?q=" + text, 'description': "input "+ text}])   //weird slicing necessary to get valid url for some reason (remove "")
})


chrome.omnibox.onInputEntered.addListener(function(text) {
    fetch("http://127.0.0.1:5000/suggestions/q=" + encodeURIComponent(text2))
    .then(res => res.text())
    .then(data => {
    console.log(data)
    chrome.tabs.update({'url': data.slice(1,-2)})
})
}) 