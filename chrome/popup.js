//document.addEventListener('DOMContentLoaded', documentEvents  , false);
console.log("popup.js invoked")
function submit(input1, input2) { 
    console.log("message sent: "+ input1.value + ":" + input2.value);
    chrome.runtime.sendMessage(message = {'type': 'newkey', 'body': {[input1.value] : input2.value}})
}

const isValidUrl = urlString=> {
  try { 
    return Boolean(new URL(urlString)); 
  }
  catch(e){ 
    return false; 
  }
}
  
document.getElementById('form').addEventListener('submit', 
  function() {
    
    console.log("event triggered") 
    // var key = document.getElementById('key')
    // var url = document.getElementById('url')

    if (key.value == "" || key.value.includes(" ")) {
      alert("Please input a keyword with no spaces.")
    } else if (!isValidUrl(url.value)) {
      alert("Please input valid url.")
    } else{
      submit(key, url);
    }
   
    
});

