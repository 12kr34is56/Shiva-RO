//create the required instances

const {Schema,model} = require("mongoose"); //for creating the schema and model
const uuid = require("uuid"); //for generating the user id
const bcrypt = require("bcrypt"); //for storing the password in hash format


//create the schema

const userSchema = new Schema({
    id : {type : String, unique : true},
    fullName: {type: String, default: "" },
    email : {type: String, unique : true ,required : true},
    password : {type : String, required : true},
    phoneNumber: { type: String, default: "" },
    address: { type: String, default: "" },
    state: { type: String, default: "" },
    profileProgress : {type: Number, default: 0},
    createdOn: {type: Date},
    updatedOn: {type: Date}
});

//their are things we want to save before the operation began or while save function
userSchema.pre("save",function(next){
    this.id = uuid.v1(),
    this.createdOn = new Date(), //so current the date is added
    this.updatedOn = new Date()

    //hash the password
    const salt = bcrypt.genSaltSync(8);
    const hash = bcrypt.hashSync(this.password,salt);
    this.password = hash;
    next();
});

userSchema.pre(['update', "findOneAndUpdate", "updateOne"],function(next){
    const update = this.getUpdate();
    delete update._id;
    delete update.id;

    this.update = new Date();

    next();
});

//create the model

const UserModel = model("User",userSchema);

//export the model
module.exports = UserModel;