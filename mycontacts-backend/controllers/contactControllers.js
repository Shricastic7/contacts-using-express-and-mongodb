const asyncHandler = require('express-async-handler');
const Contact = require('../models/contactModel');
//@desc Get all contacts
//@route GET /api/contacts
//@access public 
const getContacts = asyncHandler(async (req,res) => {
    const contacts = await Contact.find();
    res.json(contacts);
});

//@desc Post contact
//@route POST /api/contacts
//@access public 
const createContact = asyncHandler( async (req,res) => {
    console.log(res.body);
    const {name, email, phone} = req.body;
``
    if(!name || !email || !phone){
        res.status(400);
        throw new Error("All fiels are mandatory!");    
    }

    const contact = await Contact.create({
        name, 
        email, 
        phone,
    })

    res.status(201).json(contact);
});

//@desc Get one contact 
//@route GET /api/contacts
//@access public 
const getContact = asyncHandler(async (req,res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    res.status(200).json(contact);
});

//@desc Create one contact 
//@route PUT /api/contacts
//@access public 
const updateContact = asyncHandler(async (req,res) => {
    const contact = await Contact.findById(req.params.id);

    if(!contact){
        res.status(404);
        throw new Error("Contact not found!");
    }
    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new : true}
    );
    res.status(200).json(updatedContact);
});

//@desc Delete one contact 
//@route DELETE /api/contacts
//@access public 
const deleteContact = asyncHandler(async (req,res) => {
    const contact = await Contact.findById(req.params.id);

    if(!contact){
        res.status(404);
        throw new Error("Contact not found!");
    }

    await Contact.deleteOne();
    res.status(200).json(contact);
});

module.exports ={getContacts, createContact, getContact, updateContact, deleteContact,};