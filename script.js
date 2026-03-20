let quizData = {

web:[
{
type:"single",
question:"Which language runs in browser?",
options:["Python","Java","JavaScript","C"],
answer:["JavaScript"]
},
{
type:"multi",
question:"Select frontend technologies",
options:["HTML","CSS","Node.js","JavaScript"],
answer:["HTML","CSS","JavaScript"]
},
{
type:"fill",
question:"HTML stands for ______ Markup Language",
answer:["Hypertext"]
}
],

gk:[
{
type:"single",
question:"Capital of India?",
options:["Mumbai","Delhi","Chennai","Kolkata"],
answer:["Delhi"]
},
{
type:"single",
question:"Largest planet?",
options:["Mars","Jupiter","Earth","Saturn"],
answer:["Jupiter"]
},
{
type:"fill",
question:"The national animal of India is _____",
answer:["Tiger"]
}
],

science:[
{
type:"single",
question:"Water chemical formula?",
options:["CO2","H2O","O2","NaCl"],
answer:["H2O"]
},
{
type:"multi",
question:"Which are states of matter?",
options:["Solid","Liquid","Gas","Energy"],
answer:["Solid","Liquid","Gas"]
},
{
type:"fill",
question:"Earth revolves around the ____",
answer:["Sun"]
}
]

};

let questions = [];
let current = 0;
let score = 0;
let timer;
let time = 15;
let nextBtn = document.getElementById("nextBtn");
let feedbackEl = document.getElementById("feedback");

function startQuiz(topic){

questions = quizData[topic];

document.getElementById("topicBox").classList.add("hidden");
document.getElementById("quizBox").classList.remove("hidden");

current = 0;
score = 0;

loadQuestion();

}

function loadQuestion(){

clearInterval(timer);
feedbackEl.textContent = "";
feedbackEl.className = "";

let q = questions[current];

document.getElementById("question").innerText = q.question;

document.getElementById("options").innerHTML="";
document.getElementById("fillInput").value = "";
document.getElementById("fillInput").style.display="none";

if(q.type==="single" || q.type==="multi"){

q.options.forEach(opt=>{

let div=document.createElement("div");
div.className="option";

let input=document.createElement("input");

input.type = q.type==="single" ? "radio" : "checkbox";
input.name="option";
input.value=opt;

div.appendChild(input);
div.append(" "+opt);

document.getElementById("options").appendChild(div);

});

}

if(q.type==="fill"){
document.getElementById("fillInput").style.display="block";
}

updateProgress();
nextBtn.disabled = true;
nextBtn.textContent = "Next";

startTimer();

}

function updateProgress(){
let progress = ((current + 1) / questions.length) * 100;
document.getElementById("progressBar").style.width = progress + "%";
}

function showFeedback(isCorrect){
clearInterval(timer);
feedbackEl.textContent = isCorrect ? "✅ Correct!" : "❌ Wrong!";
feedbackEl.className = isCorrect ? "correct" : "wrong";
nextBtn.disabled = false;
nextBtn.textContent = "Next";
}

function startTimer(){

time = 15;
document.getElementById("time").innerText=time;

timer=setInterval(()=>{

time--;
document.getElementById("time").innerText=time;

if(time===0){
nextQuestion();
}

},1000);

}

function checkAnswer(){

let q = questions[current];
let correct=false;

if(q.type==="single"){

let selected=document.querySelector("input[name='option']:checked");

if(selected && q.answer.includes(selected.value)){
correct=true;
}

}

if(q.type==="multi"){

let selected=document.querySelectorAll("input[name='option']:checked");

let values=[...selected].map(el=>el.value);

if(JSON.stringify(values.sort())===JSON.stringify(q.answer.sort())){
correct=true;
}

}

if(q.type==="fill"){

let value=document.getElementById("fillInput").value.trim().toLowerCase();

if(value===q.answer[0].toLowerCase()){
correct=true;
}

}

if(correct) score++;

return correct;

}

function nextQuestion(){

let correct = checkAnswer();
showFeedback(correct);

setTimeout(() => {
current++;

if(current < questions.length){

loadQuestion();

}else{

document.getElementById("quizBox").classList.add("hidden");
document.getElementById("resultBox").classList.remove("hidden");

document.getElementById("score").innerText =
"Your Score: " + score + " / " + questions.length;

}

}, 1500);

}

document.getElementById("nextBtn").onclick=nextQuestion;
