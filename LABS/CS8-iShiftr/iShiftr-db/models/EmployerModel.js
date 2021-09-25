const mongoose       = require("mongoose");
const bcrypt         = require("bcrypt");
const { Schema }     = mongoose;
const ObjectId       = mongoose.Schema.Types.ObjectId;
const Employee       = require("./EmployeeModel");
const Salt_Rounds    = 12;

const EmployerSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: Number,
        required: true,
    },
    admin: {
        type:Boolean,
        default: true,
    },
    paid:{
        type:Boolean,
        default:false,
    },
    employees: [{ type: ObjectId, ref:'Employee'}],
    schedules: [{type:ObjectId, ref: 'Schedule'}]
});

EmployerSchema.pre('save', function(next) {
    console.log('saved');
    bcrypt.hash(this.password, Salt_Rounds, (error, hash) => {
        if (error) {
            return next(error);
        }
        this.password = hash;
        return next();
    });
});

EmployerSchema.methods.checkPassword = function (plainTextPW, callback) {
    bcrypt.compare (plainTextPW, this.password, (error, isValid) => {
        if (error) {
            return callback(error);
        }
        callback(null, isValid);
    });
};

EmployerSchema.methods.getUserName = function () {
    return this.username;
};

EmployerSchema.statics.getAllData = async function () {
    try{
        const data = await EmployerSchema.find({});
        return data;
    } catch (error) {
        return error;
    }
};

EmployerSchema.path('password').validate(function(password) {
    return password && password.length >= 5;
}, 'Password must contain five characters');

module.exports = mongoose.model('Employer', EmployerSchema, 'employers')