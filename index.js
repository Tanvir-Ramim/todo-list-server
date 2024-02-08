const express =require('express');
const app =express();
const cors =require('cors')
const { MongoClient, ServerApiVersion,ObjectId } = require('mongodb');
require ('dotenv').config()
const port =process.env.PORT || 5000 ;

// middleware
app.use(cors());
app.use(express.json())



const uri = "mongodb+srv://Qtec-job-task:Ps1Qf8peehQjQg9M@cluster0.sikjemj.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

      const allTaskCollection=client.db('TaskManage').collection('ALlTask')


      app.post('/allTask',async(req,res)=>{
           try{
                const alltask=req.body
                const result=await allTaskCollection.insertOne(alltask)
                return res.send(result)
           }
           catch
           {
            return res.send({error:true})
           }
      })

      app.get('/allTask',async(req,res)=>{
           try{
             const result =await allTaskCollection.find().toArray()
             return res.send(result)
           }
           catch{
            return res.send({error:true})
          }
      })
      app.delete('/allTaskdele/:id',async(req,res)=>{
          try{
            const id=req.params.id
            console.log(id)
            const query={_id: new ObjectId(id)}
            const result= await allTaskCollection.deleteOne(query)
            console.log(result)
            res.send(result)
          }
          catch{
           return res.send({error:true})
         }

      })
     

      app.put('/allTask',async(req,res)=>{
          try{
           const info=req.body
           const filter={_id : new ObjectId(info.id)}
           const options = { upsert: true };
           const {
            newtaskName,newdescription,newpriority,newdeadline,id
          } = info || {}
        
          const updateInfo={
            $set :{
              taskName:newtaskName,
              description: newdescription,
              priority:newpriority,
              deadline :newdeadline
            }
          }
           
          const result =await allTaskCollection.updateOne(filter,updateInfo,options)
          return res.send(result)

          }
          catch{

          }
      })





    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);






app.get('/',(req,res)=>{
      res.send('Server Is running')
})
// Ps1Qf8peehQjQg9M
// Qtec-job-task
app.listen(port ,()=>{
       console.log(`Server Is running on port ${port}`)
})