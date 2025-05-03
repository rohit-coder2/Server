import mongoose from "mongoose";

const  connectToDatabase = async () => {    
    try {
        await mongoose.connect('mongodb+srv://rohit26722498:rohit20061909@cluster0.fpawupm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
        console.log('Connected to database')
    }catch (error) {
        console.log('Error connecting to database:')
    }
}

 export default connectToDatabase;