console.log("loggitylog")

var sugs;


function suggestions(sgtns, text) {
    for (i in sgtns){

        sgtns[i].content = sgtns[i].content.replace("{text}", text)
        sgtns[i].description = sgtns[i].description.replace("{text}", text)  //this may not always work if {text} can appear in urls, there is probably a better way
    }

    return sgtns
}



fetch("http://127.0.0.1:5000/suggestions")
    .then(res => res.json())
    .then(data => {
        //console.log(data)
        sugs = data
        console.log(sugs[0])
        for (s in sugs){
            console.log(sugs[s].content)
            sugs[s]
        }
        console.log(suggestions(sugs, "hello"))

    })



console.log([{"thing":"things"}])