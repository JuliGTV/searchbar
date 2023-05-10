
chrome.omnibox.onInputStarted.addListener(function() {
    chrome.omnibox.setDefaultSuggestion({description: "Click below"})
})

var text2
chrome.omnibox.onInputChanged.addListener(function(text, suggest) {            
    text2 = text
    suggest([{'content': "https://www.google.com/search?q=" + text, 'description': "input "+ text}])   
})


chrome.omnibox.onInputEntered.addListener(function(text) {
    fetch("http://127.0.0.1:8080/suggestions/q=" + encodeURIComponent(text2))
    .then(res => res.text())
    .then(data => {
    console.log(data)
    chrome.tabs.update({'url': data.slice(1,-2)})       //weird slicing necessary to get valid url for some reason (remove "")
})
}) 

chrome.runtime.onMessage.addListener(function(message){
    console.log("message recieved")
    console.log(JSON.stringify(message))
    fetch("http://127.0.0.1:8080/input-suggestion", {                                 //"https://searchbar-iaklo4m3da-uc.a.run.app/input-suggestion",{
        method: "POST",
        body: JSON.stringify(message)
    })
}) 