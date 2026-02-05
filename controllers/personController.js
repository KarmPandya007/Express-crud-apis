import { Person } from '../models/Person.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

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
    const { name, age, email, password, role } = req.body;

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newPerson = new Person({
        name,
        email,
        password: hashedPassword,
        role: role || 'user' // Default to user if not provided (though schema handles default)
    });
    await newPerson.save();

    // Generate Token
    const token = jwt.sign({ id: newPerson._id, role: newPerson.role }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });

    res.status(201).json({ success: true, message: "Person Added", token, data: newPerson });
});

export const loginPerson = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Check for user email
    const person = await Person.findOne({ email });

    if (person && (await bcrypt.compare(password, person.password))) {
        res.json({
            success: true,
            _id: person._id,
            name: person.name,
            email: person.email,
            role: person.role,
            token: jwt.sign({ id: person._id, role: person.role }, process.env.JWT_SECRET, {
                expiresIn: '30d'
            })
        });
    } else {
        const error = new Error("Invalid credentials");
        error.statusCode = 401;
        throw error;
    }
});

export const updatePersonById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name, email, age } = req.body;

    // Check ownership or admin privilege
    if (req.user.role !== 'admin' && req.user._id.toString() !== id) {
        const error = new Error("Not authorized to update this person's data");
        error.statusCode = 403;
        throw error;
    }

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

