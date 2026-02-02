import { Person } from '../models/Person.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const getAllPersons = asyncHandler(async (req, res) => {
    const allPersons = await Person.find();
    res.status(200).json({ success: true, count: allPersons.length, allPersons });
});

export const getPersonById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const personData = await Person.findById(id);
    if (!personData) {
        const error = new Error("Person not found");
        error.statusCode = 404;
        throw error;
    }
    res.status(200).json({
        success: true,
        personData
    });
});

export const addPerson = asyncHandler(async (req, res) => {
    const { name, age, email } = req.body;
    const newPerson = new Person({
        name,
        age,
        email
    });
    await newPerson.save();
    res.status(201).json({ success: true, message: "Person Added", data: newPerson });
});

export const updatePersonById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name, email, age } = req.body;
    const personData = await Person.findOneAndUpdate({ _id: id }, { name, email, age }, { new: true });

    if (!personData) {
        const error = new Error("Person not found");
        error.statusCode = 404;
        throw error;
    }

    res.status(200).json({ success: true, message: "Person Data Updated", data: personData });
});

export const deletePersonById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const personData = await Person.findOneAndDelete({ _id: id });

    if (!personData) {
        const error = new Error("Person not found");
        error.statusCode = 404;
        throw error;
    }

    res.status(200).json({ success: true, message: "Person Data Deleted" });
});

