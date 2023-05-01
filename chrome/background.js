
chrome.omnibox.onInputStarted.addListener(function() {
    chrome.omnibox.setDefaultSuggestion({description: "Select one of the options below."})
})


chrome.omnibox.onInputChanged.addListener(function(text, suggest) {
    fetch("http://127.0.0.1:5000/suggestions/q=" + encodeURIComponent(text))
    .then(res => res.text())
    .then(data => {
    console.log(data)
    suggest([{'content': data.slice(1,-2), 'description': 'go to: ' + data.slice(1,-2)}])   //weird slicing necessary to get valid url for some reason (remove "")
})
})

chrome.omnibox.onInputEntered.addListener(function(text) {
    chrome.tabs.update({'url': text})
}) 