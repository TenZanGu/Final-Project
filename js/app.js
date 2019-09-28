const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const time = document.getElementById("time");
const setup = document.getElementById("ethusd");
const list = document.getElementById("list");
const input = document.getElementById("input");
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

let LIST, id;
let data = localStorage.getItem("TODO");

  $.ajax(setup);
$.ajax({
    url:"https://api.etherscan.io/api?module=stats&action=ethprice&apikey=YourApiKeyToken",
    success: function(json) {
        setup.textContent="EthUSD Price: "+json.result.ethusd
        console.log("hello");
    },
});
if(data){
    LIST = JSON.parse(data);
    id = LIST.length; 
    loadList(LIST); 
}else{
    LIST = [];
    id = 0;
}

function loadList(array){
    array.forEach(function(item){
        addToDo(item.name, item.id, item.done, item.trash);
    });
}

clear.addEventListener("click", function(){
    localStorage.clear();
    location.reload();
});

function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
  }
function startTime() {
    var today=new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
   time.innerHTML =h + ":" + m + ":" + s;
    var t = setTimeout(startTime, 500);
    
}
const options = {weekday : "long", month:"short", day:"numeric"};
const today = new Date();
dateElement.innerHTML = today.toLocaleDateString("en-US", options);


function addToDo(toDo, id, done, trash){
    
    if(trash){ return; }
    
    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";
    
    const item = `<li class="item">
                    <i class="fa ${DONE} co" job="complete" id="${id}"></i>
                    <p class="text ${LINE}">${toDo}</p>
                    <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
                  </li>
                `;
    
    const position = "beforeend";
    
    list.insertAdjacentHTML(position, item);
}

document.addEventListener("keyup",function(even){
    if(event.keyCode == 13){
        const toDo = input.value + ", " + today.toLocaleDateString("en-US", options);
        if(toDo){
            addToDo(toDo, id, false, false);
            
            LIST.push({
                name : toDo,
                id : id,
                done : false,
                trash : false
            });
            
            localStorage.setItem("TODO", JSON.stringify(LIST));
            
            id++;
        }
        input.value = "";
    }
});

function completeToDo(element){
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);
    
    LIST[element.id].done = LIST[element.id].done ? false : true;
}

function removeToDo(element){
    element.parentNode.parentNode.removeChild(element.parentNode);
    
    LIST[element.id].trash = true;
}

list.addEventListener("click", function(event){
    const element = event.target;
    const elementJob = element.attributes.job.value;
    
    if(elementJob == "complete"){
        completeToDo(element);
    }else if(elementJob == "delete"){
        removeToDo(element);
    }

    localStorage.setItem("TODO", JSON.stringify(LIST));
});
















