const form = document.querySelector(".create-todo-list");
const input = document.querySelector("#todoInput");
const listElements = document.querySelector(".tasks");
const addTodoButton = document.querySelector(".addTodobtn");
const personalCategory = document.getElementById("category1");
const bussinessCategory = document.getElementById("category2");


document.addEventListener("DOMContentLoaded", getLocalTodos);

addTodoButton.addEventListener("click", () => {
    const task = input.value.trim();

    if (!task) {
        alertMessage ();
        return; 
    }

  
    const todo = {
        text: task,   
        class:"" 
    };


    createTodoElement(todo);
    saveLocalTodos(todo);

    
   

    
    input.value = "";

    console.log("Success!!");
});


function createTodoElement(todo) {
    const todoListSection = document.createElement("label");
    todoListSection.classList.add("todoListsSection");
    const outter = document.createElement("span")
    outter.setAttribute("id","outterPart")
    

    if(bussinessCategory.checked){
        outter.classList.add("outterPartBussiness")
        todo.class = "outterPartBussiness";
        
        
    } 
    else if(personalCategory.checked){
        outter.classList.add("outterPartPersonal") 
        todo.class = "outterPartPersonal";
    }

    else if (todo.class === "outterPartPersonal"){
        outter.classList.add("outterPartPersonal")
    }
    else if (todo.class === "outterPartBussiness"){
        outter.classList.add("outterPartBussiness")
    }

    else {
        outter.classList.add("outterPartPersonal")
    }

  
console.log(todo)

    const taskInput = document.createElement("input");
    taskInput.classList.add("todoInput2");
    taskInput.setAttribute("id","taskInput")
    taskInput.value = todo.text;
    taskInput.setAttribute("readonly", "readonly");

    const actions = document.createElement("div");
    actions.classList.add("actions");

    const editBtn = document.createElement("button");
    editBtn.classList.add("editBtn");
    editBtn.innerText = "edit";

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("deleteBtn");
    deleteBtn.innerText = "delete";

    const radio = document.createElement("input");
    radio.type = "checkbox";
    radio.setAttribute("id", "myCheckbox");

    todoListSection.appendChild(radio);
    todoListSection.appendChild(outter)
    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);
    todoListSection.appendChild(taskInput);
    todoListSection.appendChild(actions);
    listElements.appendChild(todoListSection);

    // Event listener for editing a todo
    editBtn.addEventListener("click", () => {
        if (editBtn.innerText.toLowerCase() === "edit") {
            taskInput.removeAttribute("readonly");
            taskInput.focus();
            editBtn.innerHTML = "save";
        } else {
            taskInput.setAttribute("readonly", "readonly");
            editBtn.innerHTML = "edit";
        }
    });

    
    deleteBtn.addEventListener("click", () => {
        todoListSection.classList.add("delete");
        removeLocalTodos(todoListSection);
        todoListSection.addEventListener("transitionend", () => {
            todoListSection.remove();
        });
    });
}

function saveLocalTodos(todo) {
    let todos = [];

    if (localStorage.getItem("todos")) {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}


function getLocalTodos() {
    const todos = JSON.parse(localStorage.getItem("todos")) || [];

    todos.forEach(createTodoElement);
}


function removeLocalTodos(todo) {
    let todos = JSON.parse(localStorage.getItem("todos")) || [];
    console.log(todos)
    const text = todo.querySelector(".todoInput2").value;
    console.log(text)
    const todoIndex = todos.findIndex((item) => item.text === text);

    if (todoIndex !== -1) {
        todos.splice(todoIndex, 1);
        localStorage.setItem("todos", JSON.stringify(todos));
    }
}





function alertMessage (){
    const alertBox = document.createElement("div");
        alertBox.classList.add("alert","show")
        const icon = document.createElement("span");
        icon.classList.add("fas", "fa-exclamation-circle");
        const message = document.createElement("span");
        message.classList.add("msg");
        message.innerHTML= "PLEASE FILL OUT THE TASK!"
        const closeButton = document.createElement("span");
        closeButton.innerText="CLOSE"
        closeButton.classList.add("close-btn");
        const times = document.createElement("span");
        times.classList.add("fas", "fa-times");
        closeButton.appendChild(times);
        alertBox.appendChild(icon);
        alertBox.appendChild(message);
        alertBox.appendChild(closeButton);
        document.body.appendChild(alertBox); 

        function removeAlertBox (){
            alertBox.remove();
        }

        setTimeout(removeAlertBox, 5000);
        

        closeButton.addEventListener("click", function() {
            alertBox.remove();
        });

}
    
    





