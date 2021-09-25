const mongoose       = require("mongoose");
const bcrypt         = require("bcrypt");
const { Schema }     = mongoose;
const ObjectId       = mongoose.Schema.Types.ObjectId;
const Employer       = require("./EmployerModel");
const Salt_Rounds    = 12;

const EmployeeSchema = new Schema({
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
    availability: {
        type: String,
        required: true,
    },
    availableHours: {
        startTime:String,
        endTime:String,
    },
    workHours: {
        type: String,
        required: false,
    },
    timeOffDate:{
        type: Date,
        required:false,
    },
    timeOffReason:{
        type: String,
        required: false,
    },
    timeOffApproved: {
        type: Boolean,
        required: false,
        default: false,
    },
    admin:{
        type:Boolean,
        default: false,
    },
    employer: [{ type: ObjectId, ref:'Employer'}],
    schedules: [{type:ObjectId, ref: 'Schedule'}]
});

EmployeeSchema.pre('save', function(next) {
    console.log('saved');
    bcrypt.hash(this.password, Salt_Rounds, (error, hash) => {
        if (error) {
            return next(error);
        }
        this.password = hash;
        return next();
    });
});

EmployeeSchema.methods.checkPassword = function (plainTextPW, callback) {
    bcrypt.compare (plainTextPW, this.password, (error, isValid) => {
        if (error) {
            return callback(error);
        }
        callback(null, isValid);
    });
};

EmployeeSchema.methods.getUserName = function () {
    return this.username;
};

EmployeeSchema.statics.getAllData = async function () {
    try{
        const data = await EmployeeSchema.find({});
        return data;
    } catch (error) {
        return error;
    }
};

EmployeeSchema.path('password').validate(function(password) {
    return password && password.length >= 5;
}, 'Password must contain five characters');

module.exports = mongoose.model('Employee', EmployeeSchema, 'employees')