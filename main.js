const todoControl = document.querySelector (".todo-control"),
todoList = document.querySelector (".todo-list"),
todoCompleted = document.querySelector (".todo-completed"),
todoContainer = document.querySelector (".todo-container");

let obj;
let storageData = JSON.parse(localStorage.getItem("obj"));
if (storageData==null){
    obj = [
    {
        value: "Сварить кофе",
        completed: false
    },

    {
        value: "Помыть посуду",
        completed: true
    }
];
}else{
    obj = storageData;
};

const resolve = () =>{
    let tempObj=[];
    if (obj==null) obj=[];
    obj.forEach((el)=>{
        if (el!=null) tempObj.push(el);
    });
    obj=tempObj;     
};

const render = () =>{
    todoList.textContent="";
    todoCompleted.textContent="";

    resolve();

    for(let i=0; i<obj.length;i++){
        if (obj[i]!=null){
            const li = document.createElement("li");
            li.classList.add("todo-item");
            li.innerHTML = `<span class="text-todo">${obj[i].value}</span>
            <div class="todo-buttons">
            <button class="todo-remove"></button>
            <button class="todo-complete"></button>
            </div>`;
            if (obj[i].completed) todoCompleted.append(li);
            else todoList.append(li);
         };
    };
    localStorage.obj=JSON.stringify(obj);
}
render();

todoControl.addEventListener("submit", (event) =>{
    event.preventDefault();
    const input = todoControl.querySelector("input");
    if (input.value!=""){
        newObj = {value: input.value, completed: false}
        obj.push(newObj);
        input.value = "";
    }
    render();
} );

const search = (elem) =>{
    const elemText = elem.querySelector("span").textContent,
    elemCompleted = todoCompleted.contains(elem);
    obj.forEach((el, index) =>{
        if(el.value === elemText) {
            if (el.completed === elemCompleted) {
                ind = index;
            }
        }
    })
        return ind;
}

todoContainer.addEventListener("click", (event) =>{
    event.preventDefault();
    const target = event.target;
    if(!target.matches("button")) return;
    let index = search(target.closest("li"));
    if (target.matches(".todo-complete")){
        if (obj[index].completed=obj[index].completed==true){
            obj[index].completed = false;
        }
        else{
            obj[index].completed = true;
        }
    }
    else if (target.matches(".todo-remove")){
        delete obj[index];
    };
    render();
})