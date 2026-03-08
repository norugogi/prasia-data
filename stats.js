let players = []

let levelChart
let gradeChart
let classChart

fetch("players.json")
.then(r => r.json())
.then(data => {

players = data

initFilters()

updateCharts()

})

function initFilters(){

let levels = [...new Set(players.map(p=>p.level))]
let grades = [...new Set(players.map(p=>p.grade))]
let classes = [...new Set(players.map(p=>p.class))]

levels.sort((a,b)=>a-b)
grades.sort((a,b)=>a-b)

levels.forEach(l=>{
document.getElementById("levelFilter")
.innerHTML += `<option value="${l}">${l}</option>`
})

grades.forEach(g=>{
document.getElementById("gradeFilter")
.innerHTML += `<option value="${g}">${g}</option>`
})

classes.forEach(c=>{
document.getElementById("classFilter")
.innerHTML += `<option value="${c}">${c}</option>`
})

levelFilter.onchange = updateCharts
gradeFilter.onchange = updateCharts
classFilter.onchange = updateCharts

}

function updateCharts(){

let filtered = players.filter(p=>{

return (levelFilter.value=="all" || p.level==levelFilter.value)
&& (gradeFilter.value=="all" || p.grade==gradeFilter.value)
&& (classFilter.value=="all" || p.class==classFilter.value)

})

drawCharts(filtered)

}

function drawCharts(data){

let levelStats = {}
let gradeStats = {}
let classStats = {}

data.forEach(p=>{

levelStats[p.level]=(levelStats[p.level]||0)+1
gradeStats[p.grade]=(gradeStats[p.grade]||0)+1
classStats[p.class]=(classStats[p.class]||0)+1

})

drawChart("levelChart",levelStats,"레벨 분포")
drawChart("gradeChart",gradeStats,"등급 분포")
drawChart("classChart",classStats,"직업 분포")

}

function drawChart(id,stats,title){

let labels = Object.keys(stats)
let values = Object.values(stats)

if(window[id]) window[id].destroy()

window[id] = new Chart(document.getElementById(id),{

type:"bar",

data:{
labels:labels,
datasets:[{
label:title,
data:values
}]
},

options:{
plugins:{
legend:{display:false}
}
}

})

}
