const express= require('express');               //importing express,node framework
const storage=require('node-persist');           //importing node-persist for temporary storage
const cors= require('cors');                     //importing cors (midddleware for connecting frontend to backend)

//intializing storage
async function init(){               
   await storage.init()
   await storage.clear();      //to clear storage
}

//creating server
const app= express(); 

app.use(cors());                   //for connecting frontend to backend
//Parser to read data coming from Request object 
app.use(express.json());

app.get("/todo",async (req,res)=>{                       // api to get all tasks
    const renderTask1 =await storage.values();            //getting all tasks
    res.status(200).send(renderTask1);
})
app.post("/todo",async(req,res)=>{                   //api to add task
    const{task,desc}=req.body;                     //destructuring
    await storage.setItem(task,req.body);                   //storing task in storage
    res.status(201).send("Task Added Successfully");
})


//server is listening on port 3000 
app.listen(5000,()=>{
    console.log("Server has Started and it's running on 5000 port");
    init();                                                //calling init function
});