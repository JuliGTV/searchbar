var sgtns;
fetch("http://127.0.0.1:5000/suggestions")
    .then(res => res.json())
    .then(data => {  //not sure if all the stuff below actually needs to be inside here. need to research async further
        
        function suggestions(text, sug) {
            sgtns = JSON.parse(JSON.stringify(sug))
            for (i in sgtns){
                console.log(sgtns[i].content)
                sgtns[i].content = sgtns[i].content.replace("${text}", text)
                sgtns[i].description = sgtns[i].description.replace("${text}", text)  //this may not always work if {text} can appear in urls, there is probably a better way
            }
        
            return sgtns
        }
        
        chrome.omnibox.onInputStarted.addListener(function() {
            chrome.omnibox.setDefaultSuggestion({description: "Select one of the options below."})
        })
        
        
        chrome.omnibox.onInputChanged.addListener(function(text, suggest) {
            suggest(suggestions(text, data))
        })
        
        chrome.omnibox.onInputEntered.addListener(function(text) {
            chrome.tabs.update({url: text});
        })
    })
console.log("helloooo")





// url: "https://imgur.com/a/O25jaEb", 