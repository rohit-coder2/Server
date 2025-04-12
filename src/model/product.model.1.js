import mongoose from "mongoose";

const productShchema = new mongoose.Schema({
    titel : {
        type : String,
        required : true
    },
    price : {
        type : Number,
        required : true
    },
    description : {
        type : String,
        required : true
    }
});

const product = mongoose.model("product", productShchema);

export default product;