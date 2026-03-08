fetch("players.json")

.then(res=>res.json())

.then(data=>{

let players=data.map(p=>({

name:p.name,
level:Number(p.level),
grade:Number(p.grade),
class:p.class,
guild:p.guild,
world:p.world

}))


const classMap={

SolarSentinel:"태양감시자",
AbyssRevenant:"심연추방자",
MirageBlade:"환영검사",
Enforcer:"집행관",
IncenseArcher:"향사수",
RuneScribe:"주문각인사"

}


players.forEach(p=>{

p.class=classMap[p.class] || p.class

})


const total=players.length



function countBy(arr,key){

let result={}

arr.forEach(p=>{

let v=p[key]

if(!result[v]) result[v]=0

result[v]++

})

return result

}


function renderChart(canvasId,labels,data){

new Chart(

document.getElementById(canvasId),

{

type:"bar",

data:{

labels:labels,

datasets:[{

label:"인원",

data:data,

backgroundColor:"#4e79ff"

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


function renderTable(tableId,labels,data){

let tbody=document.querySelector("#"+tableId+" tbody")

tbody.innerHTML=""

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



const levelData = countBy(players,"level")

const levelLabels = Object.keys(levelData)
const levelValues = Object.values(levelData)

/* 그래프용 필터 */

const levelLabelsFiltered = levelLabels.filter(l => Number(l) >= 80)

const levelValuesFiltered = levelLabelsFiltered.map(l => levelData[l])

renderChart(
"levelChart",
levelLabelsFiltered,
levelValuesFiltered
)

/* 표는 전체 유지 */

renderTable(
"levelTable",
levelLabels,
levelValues
)

renderChart(

"levelChart",

Object.keys(levelData),

Object.values(levelData)

)

renderTable(

"levelTable",

Object.keys(levelData),

Object.values(levelData)

)



const gradeData = countBy(players,"grade")

const gradeLabels = Object.keys(gradeData)
const gradeValues = Object.values(gradeData)

/* 그래프용 필터 */

const gradeLabelsFiltered = gradeLabels.filter(g => Number(g) >= 15)

const gradeValuesFiltered = gradeLabelsFiltered.map(g => gradeData[g])

renderChart(
"gradeChart",
gradeLabelsFiltered,
gradeValuesFiltered
)

/* 표는 전체 유지 */

renderTable(
"gradeTable",
gradeLabels,
gradeValues
)
renderChart(

"gradeChart",

Object.keys(gradeData),

Object.values(gradeData)

)

renderTable(

"gradeTable",

Object.keys(gradeData),

Object.values(gradeData)

)



const classData=countBy(players,"class")

renderChart(

"classChart",

Object.keys(classData),

Object.values(classData)

)

renderTable(

"classTable",

Object.keys(classData),

Object.values(classData)

)



})


