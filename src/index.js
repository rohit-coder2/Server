import express from 'express';
import cors from 'cors';

import connectToDatabase from "./mongoose/db.js";
import User from './model/user.model.js';

const app = express();

app.use(cors());

app.use(cors({
    origin: '*',
}));

app.use(express.json());


app.get("/contact", async (req, res) => {
    const user = await User.find();
    res.json({
        user
    });
});

app.post("/contact", async (req, res) => {
    const user = await User.create(req.body);
    console.log(req.body)
    res.json({
        "message": "Data Posted successfully"
    });
});
app.delete("/contact/:id", async (req, res) => {
    const user = await User.deleteOne({_id : req.params.id });
    console.log(req.body)
    res.json({
        "message": "Data Deleted successfully"
    });
});
        

// app.update("/contact/:id", async (req, res) => {
//     console.log(req.body);
//     const user = await User.updateOne({_id : req.params.id});
//     res.json({
//         "message": "Data Posted successfully"
//     });
// });

app.listen(2000, () => {
    connectToDatabase()
    console.log('server is running on port 2000');
})
