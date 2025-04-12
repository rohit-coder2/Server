import mongoose from "mongoose";

const  connectToDatabase = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/');
        console.log('Connected to database')
    }catch (error) {
        console.log('Error connecting to database:')
    }
}

 export default connectToDatabase;