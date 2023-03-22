const mongoose = require('mongoose');
const { async } = require('regenerator-runtime');
const validator = require('validator');

const ContactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    lastname: { type: String, required: false, default: '' },
    email: { type: String, required: false, default: '' },
    telephone: { type: String, required: false, default: '' },
    createdIn: { type: Date, default: Date.now }
});

const ContactModel = mongoose.model('Contact', ContactSchema);

function Contact(body) {
    this.body = body;
    this.errors = [];
    this.contact = null;
}


Contact.prototype.register = async function() {
    this.validate();
    if(this.errors.length > 0) return;
    this.contact = await ContactModel.create(this.body);
};

Contact.prototype.validate = function() {
    this.cleanUp();


    if(this.body.email && !validator.isEmail(this.body.email)) this.errors.push('Your Email is not valid.');
    if(!this.body.name) this.errors.push('You must fill the name field.');
    if(!this.body.email && !this.body.telephone) {
        this.errors.push('You must add Email OR Telephone number.');
    }

};

Contact.prototype.cleanUp = function() {
    for(const key in this.body) {
        if(typeof this.body[key] !== 'string') {
            this.body[key] = '';
        }
    }

    this.body = {
        name: this.body.name,
        lastname: this.body.lastname,
        email: this.body.email,
        telephone: this.body.telephone,
    };

};

Contact.prototype.edit = async function(id) {
    if(typeof id !== 'string') return;
    this.validate();
    if(this.errors.length > 0) return;
    this.contact = await ContactModel.findByIdAndUpdate(id, this.body, { new: true});
};

// STATIC METHODS

Contact.searchById = async function(id) {
    if(typeof id !== 'string') return;
    try {
       const contact = await ContactModel.findById(id);
       return contact;
   } catch(e) {
    request.flash('warning', "This route doesn't exist.");
    response.redirect(`/`);
   }
};

Contact.searchContacts = async function() {
    const contacts = await ContactModel.find()
    .sort({ createdIn: -1 });
    return contacts;
};

Contact.delete = async function(id) {
    if(typeof id !== 'string') return;

    const contact = await ContactModel.findOneAndDelete({_id: id});
    return contact;
};

module.exports = Contact;

