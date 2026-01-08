import mongoose from "mongoose";

const personSchema = new mongoose.Schema({
    // name: String,
    // age: Number,
    // email: String,

    name: { type: String, required: true },
    age: { type: Number, required: true },
    email: { type: String, required: true, unique: true },
    userOrder: { type: Object, default: {} }
}, { timestamps: true })

export const Person = mongoose.model("Person", personSchema);

