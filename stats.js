fetch("data/characters.json")
.then(res=>res.json())
.then(data=>{

let tbody=document.querySelector("#table tbody")

data.forEach(c=>{

let row=document.createElement("tr")

row.innerHTML=`
<td>${c.server}</td>
<td>${c.name}</td>
<td>${c.guild}</td>
<td>${c.level}</td>
<td>${c.class}</td>
<td>${c.grade}</td>
`

tbody.appendChild(row)

})

})