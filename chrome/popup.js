//document.addEventListener('DOMContentLoaded', documentEvents  , false);
console.log("something wnflsadnf.,mdnsa.,")
function submit(input1, input2) { 
    console.log(input1.value + "   " + input2.value);
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
 console.log("jksdfjlf")  
document.getElementById('form').addEventListener('submit', 
  function() {
    
    // console.log("something else") 
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

