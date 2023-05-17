
// chrome.omnibox.onInputStarted.addListener(function() {
//     chrome.omnibox.setDefaultSuggestion({description: "Click below"})
// })

var domain = "http://127.0.0.1:8080/"
chrome.omnibox.onInputEntered.addListener(function(text) {
    chrome.identity.getProfileUserInfo()
    .then(res => res.id)
    .then(id => {
        console.log("getting url for: " + text)
        fetch(domain + `suggestions/${id}/q=${encodeURIComponent(text)}`)
        .then(res => res.text())
        .then(data => {
        console.log("URL received: " + data)
        chrome.tabs.update({'url': data.slice(1,-2)})       //weird slicing necessary to get valid url for some reason (remove "")
        })
    }) 
})


function newKey(message){    
    chrome.identity.getProfileUserInfo()
    .then(res => res.id)
    .then(id => {
        console.log("posting new kword: " + message + "for user: " + id)
        fetch(domain + "input-suggestion", {                                 //"https://searchbar-iaklo4m3da-uc.a.run.app/input-suggestion",{
            method: "POST",
            body: JSON.stringify({'id': id, 'new':message})
        })
    })
}


chrome.runtime.onMessage.addListener(function(message){
    console.log("message recieved: " + JSON.stringify(message))
    if (message.type == "newkey") {
        newKey(message.body)
    } else if (message.type == 'getKeys') {
        getkeys()
    }
    
}) 


function getkeys(){
    chrome.identity.getProfileUserInfo()
    .then(res => res.id)
    .then(id => {

    })
}