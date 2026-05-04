let current="startPage";
const backBtn=document.getElementById("backBtn");

function typeCalculate(){
    let exp = document.getElementById("typeInput").value;

    if(exp.trim()==""){
        document.getElementById("typeResult").innerText="Enter expression";
        return;
    }

    try{
        let result = eval(exp);
        document.getElementById("typeResult").innerText = result;
        saveHistory(exp + " = " + result);
    }catch{
        document.getElementById("typeResult").innerText="Invalid Expression";
    }
}

function clearType(){
    document.getElementById("typeInput").value="";
    document.getElementById("typeResult").innerText="";
}

function add(val){
    display.value += val;
}

function calcUI(){
    try{
        let result = eval(display.value);
        saveHistory(display.value + " = " + result);
        display.value = result;
    }catch{
        display.value="Error";
    }
}

function clearDisplay(){
    display.value="";
}

function calculateAge(){
    let dob = new Date(document.getElementById("dob").value);

    if(!dob.getTime()){
        document.getElementById("ageResult").innerText="Select valid date";
        return;
    }

    let today = new Date();

    let years = today.getFullYear() - dob.getFullYear();
    let months = today.getMonth() - dob.getMonth();
    let days = today.getDate() - dob.getDate();

    if(days < 0){
        months--;
        days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }

    if(months < 0){
        years--;
        months += 12;
    }

    let output = years + " Years " + months + " Months " + days + " Days";
    document.getElementById("ageResult").innerText = output;
    saveHistory("Age: " + output);
}

function clearAge(){
    document.getElementById("dob").value="";
    document.getElementById("ageResult").innerText="";
}

function show(id){
    document.querySelectorAll(".box").forEach(b=>b.classList.remove("active"));
    document.getElementById(id).classList.add("active");
    current=id;
    setBG(id);
    backBtn.style.display=(id=="startPage"||id=="dashboard")?"none":"block";
}

function goBack(){

    if(current === "typeCalc" || current === "uiCalc"){
        show("calcMenu");
    }

    else if(current === "calcMenu"){
        show("dashboard");
    }

    else if(current === "agePage" || current === "dateDiffPage"){
        show("ageMenu");
    }

    else if(current === "ageMenu"){
        show("dashboard");
    }

    else if(current === "timeCurrentPage" || current === "timeBetweenPage"){
        show("timeMenu");
    }

    else if(current === "timeMenu"){
        show("dashboard");
    }

    else if(current === "historyPage"){
        show("dashboard");
    }

    else{
        show("dashboard");
    }
}

function setBG(id){
    document.body.className="";
    if(id=="startPage") document.body.classList.add("bg-start");
    else if(id=="dashboard") document.body.classList.add("bg-dash");
    else if(id.includes("calc")) document.body.classList.add("bg-calc");
    else if(id.includes("age")||id.includes("date")) document.body.classList.add("bg-age");
    else if(id.includes("time")) document.body.classList.add("bg-time");
    else if(id=="historyPage") document.body.classList.add("bg-history");
}

/* History Functions */
function saveHistory(text){
    let h=JSON.parse(localStorage.getItem("history")||"[]");
    h.push(text);
    localStorage.setItem("history",JSON.stringify(h));
}

function loadHistory(){
    let list=document.getElementById("historyList");
    list.innerHTML="";
    let h=JSON.parse(localStorage.getItem("history")||"[]");
    h.forEach((x,i)=>{
        list.innerHTML+=`<div class="historyItem">${x}<button class="smallBtn" onclick="deleteHistory(${i})">✕</button></div>`;
    });
}

function deleteHistory(i){
    let h=JSON.parse(localStorage.getItem("history")||"[]");
    h.splice(i,1);
    localStorage.setItem("history",JSON.stringify(h));
    loadHistory();
}

function clearHistory(){
    localStorage.removeItem("history");
    loadHistory();
}

/* Time Functions */
function convertTo24(h,a){
    h=parseInt(h);
    if(a=="PM"&&h!=12)h+=12;
    if(a=="AM"&&h==12)h=0;
    return h;
}

function dateDiff(){

    let d1 = new Date(document.getElementById("d1").value);
    let d2 = new Date(document.getElementById("d2").value);

    if(!d1.getTime() || !d2.getTime()){
        document.getElementById("dateResult").innerText="Select valid dates";
        return;
    }

    let diff = Math.abs(d2 - d1);

    let days = Math.floor(diff / (1000 * 60 * 60 * 24));
    let years = Math.floor(days / 365);
    let months = Math.floor((days % 365) / 30);
    let remainingDays = (days % 365) % 30;

    let output = years + " Years " + months + " Months " + remainingDays + " Days";

    document.getElementById("dateResult").innerText = output;

    saveHistory("Date Difference: " + output);
}

function clearDateDiff(){
    document.getElementById("d1").value="";
    document.getElementById("d2").value="";
    document.getElementById("dateResult").innerText="";
}

function timeBetween(){
    let h1v=convertTo24(h1.value,ampm1.value);
    let h2v=convertTo24(h2.value,ampm2.value);
    let m1v=parseInt(m1.value);
    let m2v=parseInt(m2.value);

    if(isNaN(h1v)||isNaN(h2v)||isNaN(m1v)||isNaN(m2v)){
        document.getElementById("timeBetweenResult").innerText="Enter valid time";
        return;
    }

    let t1=h1v*60+m1v;
    let t2=h2v*60+m2v;
    if(t2<t1)t2+=1440;

    let diff=t2-t1;
    let hrs=Math.floor(diff/60);
    let mins=diff%60;

    let output="Difference: "+hrs+" hr "+mins+" min";
    document.getElementById("timeBetweenResult").innerText=output;
    saveHistory(output);
}

function timeFromCurrent(){
    let now=new Date();
    let currentMin=now.getHours()*60+now.getMinutes();

    let hv=convertTo24(curh.value,curampm.value);
    let mv=parseInt(curm.value);

    if(isNaN(hv)||isNaN(mv)){
        document.getElementById("timeCurrentResult").innerText="Enter valid time";
        return;
    }

    let userMin=hv*60+mv;
    if(userMin<currentMin)userMin+=1440;

    let diff=userMin-currentMin;
    let hrs=Math.floor(diff/60);
    let mins=diff%60;

    let output="From now: "+hrs+" hr "+mins+" min";
    document.getElementById("timeCurrentResult").innerText=output;
    saveHistory(output);
}

function clearTime(){
    document.getElementById("timeCurrentResult").innerText="";
    document.getElementById("timeBetweenResult").innerText="";
    curh.value="";curm.value="";
    h1.value="";m1.value="";
    h2.value="";m2.value="";
}
