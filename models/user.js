const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const {isEmail} = require('validator')

const Schema = mongoose.Schema
const userSchema = new Schema({
    email: {
        type: String,
        required: [true, "Missing email"],
        lowercase: true,
        index: true,
        validate: [isEmail, "Invalid email"],
        unique: true,
    },
    password:{
        type:String,
        required:[true,"Missing Password"],
        minlength:[8,"Password is too short must be atleast 8 characters"]
    }
})


//before saving to db
userSchema.pre("save", async function (next) {
    const hash = await bcrypt.hashSync(this.password, 10);
    this.password = hash;
    next();
});

// static method to login user
userSchema.statics.login = async function ({email, password}) {
    const user = await this.findOne({ email });
    if (user) {
        const auth = await bcrypt.compareSync(password, user.password)
        if (auth) {
            return user;
        }
        else throw Error("Incorrect Password");

    }
    throw Error("Incorrect Email");
};



module.exports = mongoose.model('User',userSchema)