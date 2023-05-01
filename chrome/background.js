function makeSuggestion(text){
    return {'content': text, 'description': `send [${text}] to the backend`}
}

chrome.omnibox.onInputStarted.addListener(function() {
    chrome.omnibox.setDefaultSuggestion({description: "Select one of the options below."})
})


chrome.omnibox.onInputChanged.addListener(function(text, suggest) {
    suggest(makeSuggestion(text))
})

chrome.omnibox.onInputEntered.addListener(function(text) {
    fetch("http://127.0.0.1:5000/suggestions/q=" + encodeURIComponent(text))
    .then(res => res.text())
    .then(data => {
    chrome.tabs.update({url: data});
})
})