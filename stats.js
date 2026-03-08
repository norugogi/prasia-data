fetch("players.json")
.then(res=>res.json())
.then(data=>{

let players=data.map(p=>({

name:p.gc_name,
level:Number(p.gc_level),
grade:Number(p.string_map.grade),
class:p.class

}))


const classMap={

SolarSentinel:"태양감시자",
AbyssRevenant:"심연추방자",
MirageBlade:"환영검사",
Enforcer:"집행관",
IncenseArcher:"향사수",
Runescribe:"주문각인사"

}


players.forEach(p=>{
p.class=classMap[p.class] || p.class
})

const levelRanges={
"86":0,
"87":0,
"88":0,
"89":0,
"90":0,
"91":0,
"92":0
}

players.forEach(p=>{
if(levelRanges[p.level]!==undefined)
levelRanges[p.level]++
})


let gradeCount={}

players.forEach(p=>{

let g=p.grade

if(!gradeCount[g]) gradeCount[g]=0

gradeCount[g]++

})


let classCount={}

players.forEach(p=>{

let c=p.class

if(!classCount[c]) classCount[c]=0

classCount[c]++

})


function renderChart(canvasId,labels,data){

new Chart(
document.getElementById(canvasId),

{
type:"bar",

data:{
labels:labels,

datasets:[{
label:"인원",
data:data
}]
},

options:{
plugins:{
legend:{
labels:{color:"white"}
}
},

scales:{
x:{ticks:{color:"white"}},
y:{ticks:{color:"white"}}
}

}

}

)

}


function renderTable(tableId,labels,data,total){

let tbody=document.querySelector("#"+tableId+" tbody")

labels.forEach((l,i)=>{

let count=data[i]

let percent=((count/total)*100).toFixed(1)

tbody.innerHTML+=`
<tr>
<td>${l}</td>
<td>${count}</td>
<td>${percent}%</td>
</tr>
`

})

}


const total=players.length



const levelLabels=Object.keys(levelRanges)
const levelValues=Object.values(levelRanges)

renderChart("levelChart",levelLabels,levelValues)
renderTable("levelTable",levelLabels,levelValues,total)



const gradeLabels=Object.keys(gradeCount)
const gradeValues=Object.values(gradeCount)

renderChart("gradeChart",gradeLabels,gradeValues)
renderTable("gradeTable",gradeLabels,gradeValues,total)



const classLabels=Object.keys(classCount)
const classValues=Object.values(classCount)

renderChart("classChart",classLabels,classValues)
renderTable("classTable",classLabels,classValues,total)

})
