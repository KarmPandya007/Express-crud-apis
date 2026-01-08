import express from 'express';
import { Person } from '../models/Person.js';

export const getAllPersons = async (req, res) => {
    try {
        const allPersons = await Person.find()
        res.status(200).json({ success: true, count: allPersons.length, allPersons })
    } catch (err) {
        res.send(err.message)
    }
}

export const getPersonById = async (req, res) => {
    try {
        const { id } = req.params;
        const personData = await Person.findById(id);
        res.status(200).json({
            success: true,
            personData
        })
        // console.log(personData)
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

export const addPerson = async (req, res) => {
    try {
        const { name, age, email } = req.body;
        const newPerson = new Person({
            name,
            age,
            email
        })
        await newPerson.save();
        res.send("Person Added")
        // console.log(newPerson)
    } catch (err) {
        res.send(err.message)
    }
}

export const updatePersonById = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, age } = req.body;
        const personData = await Person.findOneAndUpdate({ _id: id }, { name, email, age })

        // await personData.save();

        console.log(personData)
        res.send("Person Data Updated")
    } catch (err) {
        res.send(err.message);
    }
}

export const deletePersonById = async (req, res) => {
    try {
        const { id } = req.params;
        const personData = await Person.findOneAndDelete({ _id: id })

        // await personData.save();

        console.log(personData)
        res.send("Person Data Deleted");
    } catch (err) {
        res.send(err.message);
    }
}

