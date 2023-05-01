function makeSuggestion(text){
    console.log('make sug')
    return {'content': 'https://www.atlassian.com/git/tutorials/using-branches?section=git-branch', 'description': `send [${text}] to the backend`}
    
}

chrome.omnibox.onInputStarted.addListener(function() {
    chrome.omnibox.setDefaultSuggestion({description: "Select one of the options below."})
})


chrome.omnibox.onInputChanged.addListener(function(text, suggest) {
    fetch("http://127.0.0.1:5000/suggestions/q=" + encodeURIComponent(text))
    .then(res => res.text())
    .then(data => {
    suggest([{'content': data, 'description': 'go to: ' + data}])
})
})

chrome.omnibox.onInputEntered.addListener(function(text) {
    console.log(text)
    chrome.tabs.update({'url': text})
})