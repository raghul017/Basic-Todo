const express = require("express")
const cors = require("cors")
const {createTodo, updateTodo} = require("./types")
const { todo } = require("./db")
const app = express()
app.use(cors())
app.use(express.json())




app.post("/todo" , async(req,res)=>{
    const createPayLoad = req.body;
    const parsePayLoad = createTodo.safeParse(createPayLoad)
    if (!parsePayLoad.success) {
      res.status(411).json({
        msg : "You sent the wrong inputs"
      })
      return;
    }
    await todo.create(
      {
        title : createPayLoad.title,
        description : createPayLoad.description,
        completed :false
      }
    )

    res.json({
      msg : "todo created"
    })
})

app.get("/todos",async(req,res) =>{
  const todos = await todo.find({})
 
  res.json({
    todos
  })
})


app.put("/completed" ,async (req,res)=>{
    const updatePayLoad = req.body;
    const parsePayLoad  = updateTodo.safeParse(updatePayLoad);

    if (!parsePayLoad.success) {
      res.status(411).json({
        msg : "You sent wrong inputs"
      })
      return;
    }

    
    await todo.findOneAndUpdate({
      _id : req.body.id
    },{
      completed : true
    })

    res.json({
      msg : "Todo marked as completed"
    })
})

app.listen(3000)