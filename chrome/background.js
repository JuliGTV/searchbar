
var domain = "http://127.0.0.1:8080/"



// Listeners     


chrome.omnibox.onInputEntered.addListener(function(text) {
    chrome.identity.getProfileUserInfo()
    .then(res => res.id)
    .then(id => {
        console.log("getting url for: " + text)
        fetch(domain + `get_url/user=${id}/q=${encodeURIComponent(text)}`)
        .then(res => res.text())
        .then(data => {
        console.log("URL received: " + data)
        chrome.tabs.update({'url': data.slice(1,-2)})       //weird slicing necessary to get valid url for some reason (remove "")
        })
    }) 
})


chrome.runtime.onMessage.addListener(function(message, sender, sendResponse){
    console.log("message recieved: " + JSON.stringify(message))
    if (message.type == "newkey") {
        newKey(message.body)
    } else if (message.type == 'getkeys') {
        getkeys(sendResponse)
        return true
    }
}) 




function newKey(message){    
    chrome.identity.getProfileUserInfo()
    .then(res => res.id)
    .then(id => {
        console.log("posting new kword: " + message + "for user: " + id)
        fetch(domain + "new_key", {                                 //"https://searchbar-iaklo4m3da-uc.a.run.app/input-suggestion",{
            method: "POST",
            body: JSON.stringify({'id': id, 'new':message})
        })
    })
}


function getkeys(sendResponse){
    chrome.identity.getProfileUserInfo()
    .then(res => res.id)
    .then(id => {
        console.log("getting keys for user: " + id)
        fetch(domain + `get_user_keys/user=${id}`)
        .then(res =>  res.json())
        .then(keys => {
            console.log("sending response: " + keys)
            sendResponse(keys)
        })
    })
}