8
    console.log("hello");

     //Todo List
     let todos = JSON.parse(localStorage.getItem("todos")) || [];

    function addTodo(){
      

      let  input = document.querySelector("#input");

     let task =input.value;

     if(task == ""){
        alert("Please Enter Task");
        return;
     }
     else
    {
      todos.push({
      text: input.value,
      completed: false
     })
        console.log(todos);
        
     }

      localStorage.setItem("todos" , JSON.stringify(todos))
      displayTask();
      updateCounts();
      input.value ="";
    };

     function displayTask(arr = todos){
        let list = document.getElementById("list");

        list.innerHTML = " "; // clear old list

        for(let i = 0; i < arr.length; i++){  

        list.innerHTML += `
        <li class ="todo_item ${arr[i].completed ? 'done' : ''}">
            <span class="btn_group">
            <input type="checkbox" class="check"  ${arr[i].completed ? "checked" : ""} onchange="completeTodo(${i})">

            <span  class="task_text">
            ${arr[i].text}
            </span>
            </span>
            <div class="button_group">

            <button class="delete_btn" onclick = "deleteTodo(${i})"><i class="fa-solid fa-trash"></i>Delete</button>
            <button class="complete_btn" onclick = "completeTodo(${i})">
            ${arr[i].completed
               ? '<i class="fa-solid fa-rotate-left"></i> Undo'
               : '<i class="fa-solid fa-check"></i> Complete'
            }
            </button>
            <button class="edit_btn" onclick = "editTodo(${i})"><i class="fa-solid fa-pen"></i>Edit</button>

            </div>
            

        </li>`;

        }
        updateCounts();
     }

     function deleteTodo(index){
      todos.splice(index , 1);
      localStorage.setItem("todos", JSON.stringify(todos))
      displayTask();
      updateCounts();
     }

     function completeTodo(index){
      todos[index].completed = !todos[index].completed;
      localStorage.setItem("todos", JSON.stringify(todos))
      displayTask();
      updateCounts();
     }

     function editTodo(index)
     {
         let updateValue = prompt("Edit Task");// built-in input box
         todos[index].text = updateValue;
         localStorage.setItem("todos", JSON.stringify(todos));
         console.log(updateValue);

         displayTask();
         updateCounts();

     }
 
     function searchTodo(){

    let searchValue =
    document.getElementById("search").value.toLowerCase();

    
    let filteredTodos = todos.filter((item)=>{

        return item.text.toLowerCase().includes(searchValue);

    });

    
    displayTask(filteredTodos);
    updateCounts();

}

    function updateCounts(){
        const totalCounts = document.getElementById("count");
        const activeTaskCount = document.getElementById("active");
        const complete = document.getElementById("complete");

        totalCounts.textContent = todos.length;

        activeTaskCount.textContent = todos.filter(todos => !todos.completed).length;

        complete.textContent =todos.filter(todos => todos.completed).length;
        
    }
   // Filter Buttons. ........All..........



   let allBtn = document.getElementById("allBtn");

     allBtn.addEventListener("click", () => {
      
      displayTask(todos);
     })
    
     let activeBtn = document.getElementById("activeBtn");
     activeBtn.addEventListener('click' , () => {
        activeBtn = todos.filter(todos => !todos.completed);
        displayTask(activeBtn);
     })

     let completeBtn = document.getElementById("completeBtn");
     completeBtn.addEventListener('click' , () => {
        completeBtn = todos.filter(todos => todos.completed);
        displayTask(completeBtn);
     })
     updateCounts();

   


 


















   






























    