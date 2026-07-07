

     //Todo List
     let todos = [];

     async function getTodos(){
      const response =  await fetch("http://localhost:3000/todos");
      const result = await response.json();

      console.log(result);

      todos = result.data;

      displayTask();
      updateCounts();
     }

    async function addTodo(){
      

      let  input = document.querySelector("#input");
      const dueDate = document.querySelector("#dueDate");
      const PriorityInput = document.querySelector("#priority");


     let task =input.value; 

     if(task == ""){
        alert("Please Enter Task");
        return;
     }
     else
    {
      await fetch ("http://localhost:3000/todos",{
         method: "POST",
         headers: {
            "Content-Type": "application/json"
         },
         body: JSON.stringify({
            text:input.value,
            completed:false,
            dueDate: dueDate.value,
            priority: PriorityInput.value
         })
      });
        
     
       await getTodos();
    }

      //displayTask();
      //updateCounts();
      input.value ="";
    };

     function displayTask(arr = todos){
        let list = document.getElementById("list");

        list.innerHTML = " "; // clear old list

        for(let i = 0; i < arr.length; i++){  

         let priorityColor ="";
         let priorityBg ="";

            if(arr[i].priority === "High")
            {
               priorityColor = "white";
               priorityBg = "blue";
            }
            else if(arr[i].priority === "Medium")
            {
               priorityColor = "white";
               priorityBg="blue";
            }
            else if(arr[i].priority === "Low")
            {
               priorityColor = "white";
               priorityBg = "blue";

            }
            console.log(arr[i].priority , priorityColor);


        list.innerHTML += `
        <li class ="todo_item ${arr[i].completed ? 'done' : ''}">
            <span class="btn_group">
            <input type="checkbox" class="check"  ${arr[i].completed ? "checked" : ""} 
            onchange="completeTodo(${i})">
            <span  class="task_text">
            ${arr[i].task}
            </span>
            </span>

            <span class="due_date">
            ${new Date(arr[i].dueDate). toLocaleDateString()}
            </span>
            
            <span class="priority" style="color:${priorityColor};
            background:${priorityBg}">
            ${arr[i].priority}
            </span>

            


            <div class="button_group">

            <button class="delete_btn" onclick = "deleteTodo(${i})">
            <i class="fa-solid fa-trash"></i>Delete</button>
            <button class="complete_btn" onclick = "completeTodo(${i})">
            ${arr[i].completed
               ? '<i class="fa-solid fa-rotate-left"></i> Undo'
               : '<i class="fa-solid fa-check"></i> Complete'
            }
            </button>
            <button class="edit_btn" onclick = "editTodo(${i})">
            <i class="fa-solid fa-pen"></i>Edit</button>

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

        return item.task.toLowerCase().includes(searchValue);

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
     
     let clearCompleteBtn = document.getElementById("clearCompleteBtn");

      clearCompleteBtn.addEventListener("click" , () => {
          for(let i=todos.length - 1; i >= 0; i--){
      if(todos[i].completed){
         todos.splice(i, 1);
      }
      localStorage.setItem("todos" , JSON.stringify(todos));
      displayTask(todos);
      updateCounts();
     }

      })

   
//theme change property
let theme = document.getElementById("theme_btn");

theme.addEventListener("click", () => {
   document.body.classList.toggle("light-mode");

   if(document.body.classList.contains("light-mode")){
      theme.innerHTML = "🌙";
   }
   else{
      theme.innerHTML = "☀️";
   }

});

//Sort Tasks
let sort = document.querySelector("#sort_tasks");

console.log(sort);

sort.addEventListener('change' , () =>{
      console.log("Before:", todos);
      console.log("First Priority:", todos[0]?.priority);


   todos.sort((a,b) => {
      console.log(a,b);
      return 0;
   });






   let sortValue = sort.value;

   const priorityOrder ={
      High : 3,
      Medium : 2,
      Low : 1

   };

   console.log("After:", todos);



   if (sortValue ===  "HighToLow")
   {
      todos.sort((a,b) => 
      {

         return priorityOrder[b.priority] - priorityOrder[a.priority];
      });
   }
   else if (sortValue === "LowToHigh")
   {
      todos.sort((a,b) => {
      return priorityOrder[a.priority] - priorityOrder[b.priority];
   });
   }
   console.log(todos);
   displayTask();
   
});



     updateCounts();

     getTodos();
   


 


















   






























    