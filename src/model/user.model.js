import bcrypt from "bcryptjs";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required : true
    },
    email : {
        type: String,
        required : true
    },
    password : {
        type:String,
        required : true
    },
    active : {
        type : Boolean,
        default : true
    },
    phone : {
        type : Number,
        required : true
    }
});

userSchema.pre("save" , async function(next) {
    try {
        if(!this.isModified("password")) return next();
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        console.log(error);
    }
    
})

userSchema.methods.comparePassword = async function (password) {
    return  bcrypt.compare(password,this.password);
}

const User = mongoose.model('User', userSchema);

export default User;


