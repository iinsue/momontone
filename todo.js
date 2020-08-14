const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = 'toDos';

let toDos = [];

function deleteToDo(event){
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function(toDo){
        return toDo.id !== parseInt(li.id); // 문자를 숫자로
    }); // filter: list에 있는 모든 item을 위한 함수를 실행시키는 것.
    toDos = cleanToDos;
    saveToDos();
}

function saveToDos(){
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}   // JSON.stringify는 자바스크립트 Object를 String으로 바꿔준다.
    // JSON: JavaScript Object Notation
    // (데이터 전달 시, 자바스크립트가 다룰 수 있도록 object로 바꿔주는 기능인 셈)

function paintToDo(text){
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = toDos.length + 1;
    delBtn.innerText = "❌";
    delBtn.addEventListener("click", deleteToDo);
    span.innerText = text;
    li.appendChild(delBtn);
    li.appendChild(span);
    li.id = newId;
    toDoList.appendChild(li);
    const toDoObj = {
        text: text,
        id: newId
    };
    toDos.push(toDoObj);
    saveToDos();
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value="";
}

function loadToDos(){
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if(loadedToDos !== null) {
        const parsedToDos = JSON.parse(loadedToDos);
        // JSON.parse는 String을 자바스크립트 Object로 바꿔주는 역할
        parsedToDos.forEach(function(toDo){
            paintToDo(toDo.text);
        });
        // forEach는 기본적으로 함수를 실행하는데,
        // array에 담겨있는 것들 각각에 한번씩 함수를 실행시켜주는 것.
        // 괄호안에서 바로 함수를 만들어 parsedToDos에 있는 것들 각각에 대해 실행.
    }
}

function init() {
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit);
}

init();