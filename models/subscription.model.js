

import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
    name:{
        type: String,
        required:[true, 'Name is required'],
        trim: true,
        minLength: 2,
        maxLength: 100,
    },
    price:{
        type: Number,
        required:[true, 'Price is required'],
        min: [0, 'Price must be greater than 0'],
        max: [1000, 'Price must be less than 1000'],

    },
    currency:{
        type: String,
        enum: ['USD', 'EUR', 'GBP', 'INR'],
        default: 'INR',    
    },
    frequency:{
        type: String,
        enum: ['Daily', 'Weekly', 'Monthly', 'Yearly'],
        default: 'Monthly',
    },
    category:{
        type: String,
        enum:['sports', 'music', 'movies', 'news', 'other'],
        required:[true, 'Category is required'],
    },
    paymentMethod:{
        type: String,
        required:true,
        trim:true,
    },
    status:{
        type: String,
        enum: ['active', 'cancelled','expired'],
        default: 'active',
    },
    startDate:{
        type: Date,
        default: Date.now,
        requird:true,
        validate: {
            validator: (value) => {
                return value <= new Date();
            },
            message: 'Start date must be in the past',
        }
    },
    renewalDate:{
        type: Date,
        requird:true,
        validate: {
            validator: function (value) {
                return value > this.startDate;
            },
            message: 'Renewal date must be after start date',
        }
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:[true, 'User is required'],
        index: true,
    }
}, 
{ timestamps:true})

//Renewal Date function
subscriptionSchema.pre('save', function(next){
    if (!this.renewalDate) {
        const renewalPeriods = {
            Daily: 1,
            Weekly: 7,
            Monthly: 30,
            Yearly: 365,
        }

        this.renewalDate = new Date(this.startDate)
        this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriods[this.frequency]);
    }

    if(this.renewalDate < new Date()){
        this.status = 'expired';
    }

    next();
})

const Subscription = mongoose.model('Subscription', subscriptionSchema);

export default Subscription