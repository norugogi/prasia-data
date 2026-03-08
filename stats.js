let players = []

const classMap = {

SolarSentinel : "태양감시자",
AbyssRevenant : "심연추방자",
MirageBlade : "환영검사",
Enforcer : "집행관",
IncenseArcher : "향사수",
Runescribe : "주문각인사"

}

fetch("players.json")
.then(res=>res.json())
.then(data=>{

players = data.map(p=>({

name:p.gc_name,
level:p.gc_level,
grade:Number(p.string_map.grade),
class:classMap[p.class] || p.class

}))

updateCharts()

})



let chart


function updateCharts(){

const levelFilter=document.getElementById("levelFilter")
const gradeFilter=document.getElementById("gradeFilter")
const classFilter=document.getElementById("classFilter")

let filtered=players.filter(p=>{

return (levelFilter.value=="all" || p.level>=levelFilter.value)
&& (gradeFilter.value=="all" || p.grade>=gradeFilter.value)
&& (classFilter.value=="all" || p.class==classFilter.value)

})

buildLevelChart(filtered)
buildTable(filtered)

}



function buildLevelChart(list){

let counts={}

list.forEach(p=>{

counts[p.level]=(counts[p.level]||0)+1

})

let labels=Object.keys(counts).sort((a,b)=>a-b)
let values=labels.map(l=>counts[l])


if(chart) chart.destroy()

chart=new Chart(document.getElementById("levelChart"),{

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
plugins:{
legend:{display:false}
},
scales:{
x:{ticks:{color:"white"}},
y:{ticks:{color:"white"}}
}
}

})

}



function buildTable(list){

let tbody=document.querySelector("#statsTable tbody")

tbody.innerHTML=""

let total=list.length

let levelCounts={}

list.forEach(p=>{
levelCounts[p.level]=(levelCounts[p.level]||0)+1
})

Object.keys(levelCounts)
.sort((a,b)=>a-b)
.forEach(level=>{

let count=levelCounts[level]

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
