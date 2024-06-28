const mongoose = require("mongoose")

mongoose.connect("mongodb+srv://Raghul:Rag%402005@raghul.gd64ldd.mongodb.net/")

const todoSchema = mongoose.Schema({
  title : String,
  description : String,
  completed : Boolean
})

const todo = mongoose.model('todos' , todoSchema);

module.exports= {
  todo
}