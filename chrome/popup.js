//document.addEventListener('DOMContentLoaded', documentEvents  , false);

function submit(input1, input2) { 
    console.log(input1.value + "   " + input2.value);
    chrome.runtime.sendMessage(message = {[input1.value] : input2.value})
    // console.log("Triggered!!!")
}
console.log("something")
   
document.getElementById('form').addEventListener('submit', 
  function() { submit(document.getElementById('key'), document.getElementById('url'));
});

