let data=[];

function update(){

fetch("all_servers_ranking.json")
.then(res=>res.json())
.then(json=>{

data=json;

let count=data.filter(p=>p.grade>=24).length;

let now=new Date();

let time=
String(now.getMonth()+1).padStart(2,"0")+"/"+
String(now.getDate()).padStart(2,"0")+" "+
String(now.getHours()).padStart(2,"0")+":"+
String(now.getMinutes()).padStart(2,"0");

document.getElementById("counter").innerText=
`토벌 25 달성 현황 : ${count}명 (${time} 기준)`;

});

}

update();


setInterval(update,300000);
