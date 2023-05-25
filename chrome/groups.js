var editable = ['Peronal'];
var leavable = [];
var unleaveable = ['General', 'Personal'];
var defaultOption = "Please select an option"

console.log("groups.js invoked");
chrome.runtime.sendMessage({ type: "getkeys" })
    .then(jsonData => {
        for (var key in jsonData) {
            if (!unleaveable.includes(key)) {
                leavable.push(key);
                obj = jsonData[key];
                if (obj.editable) {
                    editable.push(key);
                }
            }
        }
        // Populating the 'leaveGroupName' dropdown menu
        var leaveGroupSelect = document.getElementById("leaveGroupName");
        var leaveGroupDefaultOption = document.createElement("option");
        leaveGroupDefaultOption.value = "";
        leaveGroupDefaultOption.textContent = defaultOption;
        leaveGroupDefaultOption.disabled = true;
        leaveGroupDefaultOption.selected = true;
        leaveGroupSelect.appendChild(leaveGroupDefaultOption);

        leavable.forEach(function (group) {
            var option = document.createElement("option");
            option.value = group;
            option.textContent = group;
            leaveGroupSelect.appendChild(option);
        });

        // Populating the 'newGroup' dropdown menu
        var newGroupSelect = document.getElementById("newGroup");
        var newGroupDefaultOption = document.createElement("option");
        newGroupDefaultOption.value = "";
        newGroupDefaultOption.textContent = defaultOption;
        newGroupDefaultOption.disabled = true;
        newGroupDefaultOption.selected = true;
        newGroupSelect.appendChild(newGroupDefaultOption);

        editable.forEach(function (group) {
            var option = document.createElement("option");
            option.value = group;
            option.textContent = group;
            newGroupSelect.appendChild(option);
        });

        // Populating the 'deleteGroup' dropdown menu
        var deleteGroupSelect = document.getElementById("deleteGroup");
        var deleteGroupDefaultOption = document.createElement("option");
        deleteGroupDefaultOption.value = "";
        deleteGroupDefaultOption.textContent = defaultOption;
        deleteGroupDefaultOption.disabled = true;
        deleteGroupDefaultOption.selected = true;
        deleteGroupSelect.appendChild(deleteGroupDefaultOption);

        editable.forEach(function (group) {
            var option = document.createElement("option");
            option.value = group;
            option.textContent = group;
            deleteGroupSelect.appendChild(option);
        });

        deleteGroupSelect.addEventListener("change", function () {
            var selectedGroup = deleteGroupSelect.value;
            var keySelect = document.getElementById("deleteKey");
            keySelect.innerHTML = ""; // Clear existing options

            if (selectedGroup && editable.includes(selectedGroup)) {
                var groupKeys = jsonData[selectedGroup].content;
                Object.keys(groupKeys).forEach(function (key) {
                    var option = document.createElement("option");
                    option.value = key;
                    option.textContent = key;
                    keySelect.appendChild(option);
                });
            }
        });
    });

var joinButton = document.getElementById("joinGroupBtn");
joinButton.addEventListener("click", function () {
    var message = { type: "join", body: document.getElementById("joinGroupName").value }
    console.log("sending message: "+ message);
    chrome.runtime.sendMessage({ type: "join", body: document.getElementById("joinGroupName").value });
});

var leaveButton = document.getElementById("leaveGroupBtn");
leaveButton.addEventListener("click", function () {
    var message = { type: "leave", body: document.getElementById("leaveGroupName").value }
    if (message.body != defaultOption) {
        console.log("sending message: "+ message);
        chrome.runtime.sendMessage(message);
    }
});

const isValidUrl = urlString=> {
    try { 
      return Boolean(new URL(urlString)); 
    }
    catch(e){ 
      return false; 
    }
  }

var ngkButton = document.getElementById("newGroupKeyBtn")
ngkButton.addEventListener("click", function () {
    group = document.getElementById("newGroup").value;
    key = document.getElementById("newKey").value;
    url = document.getElementById("newValue").value;
    if (isValidUrl(url) && group!= defaultOption) {
        var message = { type: "ngk", body: { group: group, key: key, url: url } }
        console.log("sending message: "+ message);
        chrome.runtime.sendMessage(message);
    } else { alert("Please enter a valid URL"); }
});

var dgkButton = document.getElementById("deleteGroupKeyBtn")
dgkButton.addEventListener("click", function () {
    group = document.getElementById("deleteGroup").value;
    key = document.getElementById("deleteKey").value;
    if (group!= defaultOption && key!= defaultOption) {
        var message = { type: "dgk", body: { group: group, key: key } }
        console.log("sending message: "+ message);
        chrome.runtime.sendMessage(message);
    }
})

var createButton = document.getElementById("createGroupBtn");
createButton.addEventListener("click", function () {
    group = document.getElementById("createGroup").value;
    if (group!= "") {
        var message = { type: "creategroup", body: group }
        console.log("sending message: "+ message);
        chrome.runtime.sendMessage(message);
    }
})