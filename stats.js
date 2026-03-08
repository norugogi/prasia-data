let players=[]

const classMap={

SolarSentinel:"태양감시자",
AbyssRevenant:"심연추방자",
MirageBlade:"환영검사",
ENFORCER:"집행관",
IncenseArcher:"향사수",
Runescribe:"주문각인사"

}



fetch("players.json")

.then(res=>res.json())

.then(data=>{

players=data.map(p=>({

name:p.gc_name,
level:p.gc_level,
grade:Number(p.string_map?.grade || 0),
class:classMap[p.class] || p.class

}))

buildStats()

})



function buildStats(){

let levelCounts={}

players.forEach(p=>{

levelCounts[p.level]=(levelCounts[p.level]||0)+1

})

let labels=Object.keys(levelCounts).sort((a,b)=>a-b)

let values=labels.map(l=>levelCounts[l])

buildChart(labels,values)

buildTable(labels,values)

}



function buildChart(labels,values){

new Chart(document.getElementById("levelChart"),{

type:"bar",

data:{

labels:labels,

datasets:[{

label:"레벨 분포",

data:values,

backgroundColor:"#4fc3f7"

}]

},

options:{

plugins:{legend:{display:false}},

scales:{

x:{ticks:{color:"white"}},

y:{ticks:{color:"white"}}

}

}

})

}



function buildTable(labels,values){

let tbody=document.querySelector("#statsTable tbody")

tbody.innerHTML=""

let total=values.reduce((a,b)=>a+b,0)

labels.forEach((level,i)=>{

let count=values[i]

let percent=((count/total)*100).toFixed(1)

let row=document.createElement("tr")

row.innerHTML=`

<td>Lv ${level}</td>

<td>${count}</td>

<td>${percent}%</td>

`

tbody.appendChild(row)

})

}
