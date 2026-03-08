function showTab(name){

document.querySelectorAll(".tab-content").forEach(el=>{
el.classList.remove("active")
})

document.querySelectorAll(".tab").forEach(el=>{
el.classList.remove("active")
})

document.getElementById(name).classList.add("active")

event.target.classList.add("active")

}



const classKR = {

SolarSentinel:"태양감시자",
Enforcer:"집행관",
IncenseArcher:"향사수",
MirageBlade:"환영검사",
RuneScribe:"주문각인사",
AbyssRevenant:"심연추방자"

}



fetch("players.json")
.then(res=>res.json())
.then(players=>{

function getLevel(p){
return p.gc_level ?? p.level
}

function getGrade(p){
return p.string_map?.grade ?? p.grade
}

function getClass(p){
return p.class
}



function count(fn){

const map={}

players.forEach(p=>{

const v=fn(p)

if(v===undefined) return

map[v]=(map[v]||0)+1

})

return map

}



function renderChart(id,labels,data){

const el=document.getElementById(id)

if(!el) return

new Chart(el,{
type:"bar",
data:{
labels:labels,
datasets:[{
label:"인원",
data:data
}]
},
options:{
plugins:{legend:{display:false}}
}
})

}



function renderTable(id,labels,data){

const div=document.getElementById(id)

if(!div) return

const total=data.reduce((a,b)=>a+b,0)

let html="<table class='statTable'>"

html+="<tr><th></th>"

labels.forEach(l=>{
html+=`<th>${l}</th>`
})

html+="</tr>"

html+="<tr><td>인원</td>"

data.forEach(v=>{
html+=`<td>${v}</td>`
})

html+="</tr>"

html+="<tr><td>%</td>"

data.forEach(v=>{
const p=((v/total)*100).toFixed(1)
html+=`<td>${p}%</td>`
})

html+="</tr>"

html+="</table>"

div.innerHTML=html

}



const levelData=count(getLevel)

const levelLabels=Object.keys(levelData).sort((a,b)=>a-b)
const levelValues=levelLabels.map(l=>levelData[l])

renderChart("levelChart",levelLabels,levelValues)
renderTable("levelTable",levelLabels,levelValues)



const gradeData=count(getGrade)

const gradeLabels=Object.keys(gradeData).sort((a,b)=>a-b)
const gradeValues=gradeLabels.map(l=>gradeData[l])

renderChart("gradeChart",gradeLabels,gradeValues)
renderTable("gradeTable",gradeLabels,gradeValues)



const classData=count(getClass)

const classKeys=Object.keys(classData)

const classLabels=classKeys.map(c=>classKR[c]||c)
const classValues=classKeys.map(c=>classData[c])

renderChart("classChart",classLabels,classValues)
renderTable("classTable",classLabels,classValues)

})
