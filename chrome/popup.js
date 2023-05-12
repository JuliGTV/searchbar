//document.addEventListener('DOMContentLoaded', documentEvents  , false);

function submit(input1, input2) { 
    console.log(input1.value + "   " + input2.value);
    chrome.runtime.sendMessage(message = {[input1.value] : input2.value})
    // console.log("Triggered!!!")
}
function isValidUrl(string) {
  let url;
  
  try {
    url = new URL(string);
  } catch (_) {
    return false;  
  }

  return true;
}
   
document.getElementById('form').addEventListener('submit', 
  function() { 
    var key = document.getElementById('key')
    var url = document.getElementById('url')

    if (key == "" || " " in key){
      alert("Please input a keyword with no spaces.")
    } else if (!isValidUrl(url)) {
      alert("Please input a valid URL.")
    } else{
      submit(key, url);
    }
    
    
});

