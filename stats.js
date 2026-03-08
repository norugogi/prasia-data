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



fetch("players.json")
.then(res => res.json())
.then(players => {

function countBy(key){

const map = {}

players.forEach(p=>{

let value = p[key]

if(key==="grade"){
value = p.string_map?.grade
}

if(value===undefined) return

map[value] = (map[value] || 0) + 1

})

return map

}



function renderChart(id, labels, data){

new Chart(
document.getElementById(id),
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
legend:{display:false}
}
}
})

}



function renderTable(id, labels, data){

const div = document.getElementById(id)

let html="<table>"
html+="<tr><th>값</th><th>인원</th></tr>"

labels.forEach((l,i)=>{
html+=`<tr><td>${l}</td><td>${data[i]}</td></tr>`
})

html+="</table>"

div.innerHTML=html

}



const levelData=countBy("gc_level")

const levelLabels=Object.keys(levelData).sort((a,b)=>a-b)
const levelValues=levelLabels.map(l=>levelData[l])

const levelFiltered=levelLabels.filter(l=>Number(l)>=80)
const levelFilteredValues=levelFiltered.map(l=>levelData[l])

renderChart("levelChart",levelFiltered,levelFilteredValues)
renderTable("levelTable",levelLabels,levelValues)



const gradeData=countBy("grade")

const gradeLabels=Object.keys(gradeData).sort((a,b)=>a-b)
const gradeValues=gradeLabels.map(l=>gradeData[l])

const gradeFiltered=gradeLabels.filter(l=>Number(l)>=15)
const gradeFilteredValues=gradeFiltered.map(l=>gradeData[l])

renderChart("gradeChart",gradeFiltered,gradeFilteredValues)
renderTable("gradeTable",gradeLabels,gradeValues)



const classData=countBy("class")

const classLabels=Object.keys(classData)
const classValues=classLabels.map(l=>classData[l])

renderChart("classChart",classLabels,classValues)
renderTable("classTable",classLabels,classValues)

})
