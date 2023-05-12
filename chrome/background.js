
// chrome.omnibox.onInputStarted.addListener(function() {
//     chrome.omnibox.setDefaultSuggestion({description: "Click below"})
// })


chrome.omnibox.onInputEntered.addListener(function(text) {
    chrome.identity.getProfileUserInfo()
    .then(res => res.id)
    .then(id => {
        fetch(`http://127.0.0.1:8080/suggestions/${id}/q=${encodeURIComponent(text)}`)
        .then(res => res.text())
        .then(data => {
        console.log(data)
        chrome.tabs.update({'url': data.slice(1,-2)})       //weird slicing necessary to get valid url for some reason (remove "")
        })
    }) 
})


function newKey(message){    
    chrome.identity.getProfileUserInfo()
    .then(res => res.id)
    .then(id => {
        console.log(id)
        fetch("http://127.0.0.1:8080/input-suggestion", {                                 //"https://searchbar-iaklo4m3da-uc.a.run.app/input-suggestion",{
            method: "POST",
            body: JSON.stringify({'id': id, 'new':message})
        })
    })
}


chrome.runtime.onMessage.addListener(function(message){
    console.log("message recieved")
    console.log(JSON.stringify(message))
    if (message.type = 'newKey') {
        newKey(message.body)
    }
    
}) 