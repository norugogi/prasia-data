let characters = []

async function loadData(){

const res = await fetch("data/prasia_characters.json")
characters = await res.json()

render()

}

function render(){

const tbody = document.querySelector("#rankingTable tbody")
tbody.innerHTML = ""

const guild = document.getElementById("guildFilter").value
const search = document.getElementById("searchBox").value.toLowerCase()

let list = characters

if(guild !== "ALL"){

list = list.filter(c => c.guild_name === guild)

}

if(search){

list = list.filter(c => c.gc_name.toLowerCase().includes(search))

}

list.sort((a,b)=>a.ranking-b.ranking)

list.slice(0,200).forEach(c=>{

const tr = document.createElement("tr")

tr.innerHTML = `

<td>${c.ranking}</td>
<td>${c.gc_name}</td>
<td>${c.gc_level}</td>
<td>${c.class}</td>
<td class="guild${c.guild_name}">${c.guild_name}</td>
<td>${c.server}</td>

`

tbody.appendChild(tr)

})

}

document.getElementById("guildFilter").addEventListener("change",render)
document.getElementById("searchBox").addEventListener("input",render)

loadData()