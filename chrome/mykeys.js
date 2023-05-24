console.log("mykeys.js invoked");
chrome.runtime.sendMessage({type: "getkeys"})
    .then(jsonData => {
        // Loop through the outer JSON object keys
        console.log("message received: " + JSON.stringify(jsonData));
        for (var key in jsonData) {
            if (jsonData.hasOwnProperty(key)) {
                var innerObj1 = jsonData[key];
                var innerObj = innerObj1.content;

                // Create a new table for each key
                var table = document.createElement("table");

                // Create the table caption with the key as the title
                var caption = document.createElement("caption");
                caption.textContent = key;
                table.appendChild(caption);

                // Create the table header row
                var thead = document.createElement("thead");
                var headerRow = thead.insertRow();
                var keyHeader = document.createElement("th");
                keyHeader.textContent = "Key word";
                var valueHeader = document.createElement("th");
                valueHeader.textContent = "URL";
                headerRow.appendChild(keyHeader);
                headerRow.appendChild(valueHeader);
                table.appendChild(thead);

                // Create the table body
                var tbody = document.createElement("tbody");
                for (var subKey in innerObj) {
                    if (innerObj.hasOwnProperty(subKey)) {
                        var value = innerObj[subKey];
                        var row = tbody.insertRow();
                        var keyCell = row.insertCell();
                        var valueCell = row.insertCell();
                        keyCell.textContent = subKey;
                        valueCell.textContent = value;
                    }
                }
                table.appendChild(tbody);

                // Append the table to the body of the HTML page
                document.body.appendChild(table);
            }
        }
    });
