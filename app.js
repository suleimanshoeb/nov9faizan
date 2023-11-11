const express=require('express')
const mongoose=require('mongoose')
const empmodel=require("./model/empmodel")
const cors=require('cors')

const app=express()
app.use(express.json());
app.use(cors())
const port=2888

mongoose.connect('mongodb://127.0.0.1:27017/empldb').then(()=>{
    console.log('Mongo DB Connect Successfull')
})

app.get('/',(req,res)=>{
    res.send('Emplooye Data')
})
app.get('/empall',async(req,res)=>{
    const result=await empmodel.find({})
    res.send(result)
})

app.post('/empdel',async(req,res)=>{
  const result=await empmodel.findOneAndDelete({_id:req.body._id},req.body)
  res.send(`${req.body.fname}${req.body.lname}Delete Sucessfull`)
})
app.post('/empupd',async(req,res)=>{
  const result=await empmodel.findOneAndUpdate({_id:req.body._id},req.body)
  res.send(`${req.body.fname}${req.body.lname}Update Sucessfull`)
})
 
app.post('/addemp',(req,res)=>{
    const result=new empmodel(req.body)
    result.save()
    res.send(` New Employee${req.body.fname} ${req.body.lname}`)
})

app.listen(port,()=>{
    console.log(`server is up port no ${port}`)
})