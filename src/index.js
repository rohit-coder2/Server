import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';

import connectToDatabase from "./mongoose/db.js";
import User from './model/user.model.js';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';


const app = express();

app.use(cors());

app.use(cors({
    origin: '*',
}));

app.use(express.json());


app.get("/contact", async (req, res) => {
    const user = await User.find({ active : true });
    res.json({
        user , status : true
    });
});

app.get("/contact/:id", async (req, res) => {
    const user = await User.findOne({ active : true, _id : req.params.id });
    res.json({
        user , status : true
    });
});

app.post("/login" , async (req , res)=>{
    try {
        console.log(req?.body?.email)
        console.log(req?.body?.password)
        const user = await User.findOne({email : req.body.email});
        console.log(user)
        if(!user){
            return res.json({"message" : "user is founded" , user}).status(400);
        }
        // const isValid =  await user.comparePassword(req.body.password).json(400);
        const isValid =  await bcrypt.compare(req?.body?.password , user?.password);
        if(!isValid) return res.json({"error":"password incorrect"});
        const token = await jwt.sign(user);
        return res.json({token})
    } catch (error) {
        console.log(error);
        return res.json({"error":"you are not a user"}).status(500)
    }
} )

app.post("/contact", async (req, res) => {
    console.log(req.body)
    const user = await User.create(req.body);
    console.log(req.body)
    res.json({
        "message": "Data Posted successfully"
    });
});


// app.delete("/contact/:id", async (req, res) => {
//     const user = await User.deleteOne({_id : req.params.id });
//     console.log(req.body)
//     res.json({
//         "message": "Data Deleted successfully"
//     });
// });


app.put("/contact/:id", async (req, res) => {
    try {
        console.log(req.body);

        await User.updateOne(
            { _id: new mongoose.Types.ObjectId(req.params.id) },
            { $set: { ...req.body } }
        );

        res.json({
            message: "Data updated successfully"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "An error occurred while updating data",
            error: error.message
        });
    }
});



app.delete("/contact/:id", async (req, res) => {
    const user = await User.updateOne({_id : req.params.id }, {active : false});
    console.log(req.body);
    res.json({
        "message": "Data Deleted successfully"
    });
});
        

app.listen(2000, () => {
    connectToDatabase()
    console.log('server is running on port 2000');
})
