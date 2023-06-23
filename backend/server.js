import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { MongoClient } from 'mongodb';

const app = express();
// connection

const uri = 'mongodb://localhost:27017'; 
const client = new MongoClient(uri);
async function connectToMongoDB() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
  }
}
connectToMongoDB();



app.use(
  cors({
    origin: ["http://localhost:3001"],
    methods: ["POST", "GET", "PUT"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.static("public"));


app.post('/userDetails', async (req, res) => {
  const details = req.body;
  console.log('details', details);

  try {
    const db = client.db('safalvir'); 
    const collection = db.collection('users');

    const newUser = {
      firstName: details.firstName,
      lastName:details.lastName,
      age: details.age,
      address: details.address,
      mobileNumber: details.mobileNumber,
      message: details.message
    };
    console.log("newUser-->",newUser)
    const result = await collection.insertOne(newUser);
    console.log('User inserted:', result.insertedId);

    return res.json({ Status: 'Success' });
  } catch (error) {
    console.error('Failed to insert user', error);
    return res.status(500).json({ Error: 'Insert user error in MongoDB' });
  }
});


app.listen(8081, () => {
  console.log("Running on port 8081");
});
