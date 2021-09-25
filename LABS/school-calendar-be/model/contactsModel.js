const db = require('../db/dbConfig');

module.exports = {
    findContactsByAdmin,
    findContactById,
    updateContact,
    addContact,
    deleteContact
}

// find all contacts by adminId
function findContactsByAdmin(id){
    return db('contact_admin')
        .join('contacts', 'contact_admin.contactId', 'contacts.id')
        .where('adminId', id)
        .select('adminId', 'contactId', 'firstName', 'lastName', 'phoneNumber', 'email');
}

// get a specific contact
function findContactById(id){
    return db('contact_admin')
        .join('contacts', 'contact_admin.contactId', 'contacts.id')
        .where('contactId', id)
        .select('contact_admin.adminId', 'contact_admin.contactId', 'contacts.firstName', 'contacts.lastName', 'contacts.phoneNumber', 'contacts.email')
        .first();
}

// update a contact
function updateContact(id, newContactInfo){
    return db('contacts')
            .where({id})
            .update(newContactInfo)
}

// add a contact
async function addContact(adminId, newContactInfo){

    // add contact to the contacts table
    return await db('contacts')
        .insert(newContactInfo)
        .returning(["id"])
        .then(response => {
            console.log('from addContact', response);
            // add relationship to contact_admin
            return db('contact_admin')
            .insert({adminId, contactId: response[0].id})
            .returning(["id"]);
        })
        .catch(err => {console.log('error from addContact', err)})

}
// delete a contact
function deleteContact(id){
    return db('contacts')
            .where({id})
            .delete()
}
