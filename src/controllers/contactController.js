const Contact = require('../models/ContactModel');

exports.index = (request, response) => {
    response.render('contact', {
        contact: {}
    });
};
exports.create = async (request, response) => {
    try {
        const contact = new Contact(request.body);
        await contact.register();
    
        if(contact.errors.length > 0) {
            request.flash('errors', contact.errors);
            request.session.save(() => response.redirect('/contact/index'));
            return;
        }
    
        request.flash('success', "You've successfully created a new contact");
        request.session.save(() => response.redirect(`/contact/index/${contact.contact._id}`));
        return;
    } catch(e) {
        console.log(e);
        return response.render('404');
    }
};

exports.editIndex = async function(request, response) {
    if(!request.params.id) return response.render('404');
    try {
        const contact = await Contact.searchById(request.params.id);
        if(!contact) return response.render('404');
        return response.render('contact', { contact });

    } catch(e) {
        console.log(e);
        return response.redirect('/');
    }
};

exports.edit = async function(request, response) {
    try {
        if(!request.params.id) return response.render('404');
        const contact = new Contact(request.body);
        await contact.edit(request.params.id);
    
        if(contact.errors.length > 0) {
            request.flash('errors', contact.errors);
            request.session.save(() => response.redirect('/contact/index'));
            return;
        }
    
        request.flash('success', "You've successfully edited your contact");
        request.session.save(() => response.redirect(`/contact/index/${contact.contact._id}`));
        return;
    } catch(e) {
        console.log(e);
        return response.render('404');
    }
};

exports.delete = async function(request, response) {
    if(!request.params.id) return response.render('404');

    const contact = await Contact.delete(request.params.id);
    if(!contact) return response.render('404');

    request.flash('success', "You've successfully deleted your contact");
    request.session.save(() => response.redirect('back'));
    return;
};