let todoControl = document.querySelector (".todo-control"),
todoList = document.querySelector (".todo-list"),
todoCompleted = document.querySelector (".todo-completed"),
todoContainer = document.querySelector (".todo-container"),
cooka=document.cookie.split("=");
obj = JSON.parse(cooka[1]?cooka[1]:"[]");

const render = () =>{
    todoList.textContent="";
    todoCompleted.textContent="";
    let tempObj=[];
    if (obj==null) obj=[];
    obj.forEach((el)=>{
        if (el!=null) tempObj.push(el);
    });
    obj=tempObj;     
    
    obj.forEach((el) =>{
        const li = document.createElement("li");
        li.classList.add("todo-item");
        li.innerHTML = `<span class="text-todo">${el.value}</span>
        <div class="todo-buttons">
        <button class="todo-remove"></button>
        <button class="todo-complete"></button>
        </div>`;
        if (el.completed) todoCompleted.append(li);
        else todoList.append(li);
    });
    document.cookie = "todo-list=" + JSON.stringify(obj);
    console.log(document.cookie);
};
render();

todoControl.addEventListener("submit", (event) =>{
    event.preventDefault();
    let input = todoControl.querySelector("input");
    if (input.value!=""){
        newObj = {value: input.value, completed: false}
        input.value="";
        obj.push(newObj);
        render();
    }else{
        alert("Введите текст!");
    };
} );

const search = (elem) =>{
    let elemText = elem.querySelector("span").textContent,
    elemCompleted = todoCompleted.contains(elem);
    obj.forEach((el, index) =>{
        if(el.value === elemText) {
            if (el.completed === elemCompleted) ind = index;
        }
    })
    return ind;
}

todoContainer.addEventListener("click", (event) =>{
    event.preventDefault();
    let target = event.target;
    if(!target.matches("button")) return;
    let index = search(target.closest("li"));
    if (target.matches(".todo-remove")){
        delete obj[index];
    }else if (target.matches(".todo-complete")){
        obj[index].completed=obj[index].completed==true?false:true;
    };
    render();
});

