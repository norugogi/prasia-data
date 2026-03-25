let data=[];

let chart;

const classMap={
SolarSentinel:"태양감시자",
Enforcer:"집행관",
IncenseArcher:"향사수",
MirageBlade:"환영검사",
RuneScribe:"주문각인사",
WildWarrior:"야만투사",
AbyssRevenant:"심연추방자"
};

fetch("all_servers_ranking.json")
.then(res=>res.json())
.then(json=>{

data=json;

showTab("level");

});

function showTab(type){

document.getElementById("playerList").innerHTML="";

let stats={};

if(type==="level"){

document.getElementById("col1").innerText="레벨";

data.forEach(p=>{

if(p.level<80) return;

stats[p.level]=(stats[p.level]||0)+1;

});

}

if(type==="grade"){

document.getElementById("col1").innerText="토벌등급";

data.forEach(p=>{

if(p.grade<20) return;

stats[p.grade]=(stats[p.grade]||0)+1;

});

}

if(type==="class"){

document.getElementById("col1").innerText="직업";

data.forEach(p=>{

let c=classMap[p.class]||p.class;

stats[c]=(stats[c]||0)+1;

});

}

renderStats(stats,type);

}

function renderStats(stats,type){

let total=data.length;

let html="";

let labels=[];
let values=[];

let keys=Object.keys(stats);

if(type==="class"){

keys.sort();

}else{

keys.sort((a,b)=>b-a); // 숫자 내림차순

}

keys.forEach(key=>{

let count=stats[key];
let percent=(count/total*100).toFixed(2);

html+=`<tr onclick="showPlayers('${type}','${key}')">
<td>${key}</td>
<td>${count}</td>
<td>${percent}%</td>
</tr>`;

labels.push(key);
values.push(count);

});

document.getElementById("statsTable").innerHTML=html;

drawChart(labels,values);

}

function showPlayers(type,value){

let players=[];

if(type==="level"){

players=data.filter(p=>p.level==value);

}

if(type==="grade"){

players=data.filter(p=>p.grade==value);

}

if(type==="class"){

players=data.filter(p=>(classMap[p.class]||p.class)==value);

}

let html="";

players.forEach(p=>{

html+=`
<tr>
<td>${p.name}</td>
<td>${p.guild}</td>
<td>${classMap[p.class]||p.class}</td>
<td>${p.level}</td>
<td>${p.grade}</td>
</tr>
`;

});

document.getElementById("playerList").innerHTML=html;

}

function drawChart(labels,dataValues){

if(!document.getElementById("showGraph").checked) return;

const ctx=document.getElementById("chart");

if(chart) chart.destroy();

chart=new Chart(ctx,{

type:"bar",

data:{
labels:labels,
datasets:[{
label:"인원",
data:dataValues
}]
},

options:{
plugins:{
legend:{display:false}
},
scales:{
y:{
beginAtZero:true
}
}
}

});

}

function toggleGraph(){

let panel=document.getElementById("graphPanel");

if(document.getElementById("showGraph").checked){

panel.style.display="block";

}else{

panel.style.display="none";

}

}
