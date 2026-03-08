let players = []

let levelChart
let gradeChart
let classChart

// 직업 영문 → 한글 변환
const classNames = {

SolarSentinel: "태양감시자",
AbyssRevenant: "심연추방자",
MirageBlade: "환영검사",
Enforcer: "집행관",
IncenseArcher: "향사수",
Runescribe: "주문각인사"

}

// 데이터 로드
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

const levelFilter = document.getElementById("levelFilter")
const gradeFilter = document.getElementById("gradeFilter")
const classFilter = document.getElementById("classFilter")

levels.forEach(l=>{
levelFilter.innerHTML += `<option value="${l}">${l}</option>`
})

grades.forEach(g=>{
gradeFilter.innerHTML += `<option value="${g}">${g}</option>`
})

classes.forEach(c=>{

let name = classNames[c] || c

classFilter.innerHTML += `<option value="${c}">${name}</option>`

})

levelFilter.onchange = updateCharts
gradeFilter.onchange = updateCharts
classFilter.onchange = updateCharts

}

function updateCharts(){

const levelFilter = document.getElementById("levelFilter")
const gradeFilter = document.getElementById("gradeFilter")
const classFilter = document.getElementById("classFilter")

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

levelStats[p.level] = (levelStats[p.level]||0) + 1
gradeStats[p.grade] = (gradeStats[p.grade]||0) + 1

let className = classNames[p.class] || p.class
classStats[className] = (classStats[className]||0) + 1

})

drawChart("levelChart",levelStats,"레벨 분포")
drawChart("gradeChart",gradeStats,"등급 분포")
drawChart("classChart",classStats,"직업 분포")

}

function drawChart(canvasId,stats,title){

let labels = Object.keys(stats)
let values = Object.values(stats)

if(window[canvasId]) window[canvasId].destroy()

window[canvasId] = new Chart(document.getElementById(canvasId),{

type:"bar",

data:{
labels:labels,
datasets:[{
label:title,
data:values,
backgroundColor:"#4CAF50"
}]
},

options:{
responsive:true,
plugins:{
legend:{display:false},
title:{
display:true,
text:title
}
}
}

})

}
