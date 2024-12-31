const mongoose=require('mongoose')
const userSchema=new mongoose.Schema({
username:{
type:String,
required:true
},
email:{
required:true,
type:String,
unique:true
},
password:{
type:String,
required:true
}
})

const users=mongoose.model("users",userSchema)
module.exports=users