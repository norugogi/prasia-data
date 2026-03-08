fetch("data/characters.json")
.then(res=>res.json())
.then(data=>{

document.getElementById("total").innerText=data.length

let totalLevel=0
let servers=new Set()

data.forEach(c=>{
 totalLevel+=c.level
 servers.add(c.server)
})

let avg=(totalLevel/data.length).toFixed(1)

document.getElementById("avgLevel").innerText=avg
document.getElementById("serverCount").innerText=servers.size

})