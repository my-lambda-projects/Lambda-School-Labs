const db = require('../db/dbConfig');

module.exports = {
    findGroupsByAdminId,
    addGroup, 
    findGroupByGroupId,
    findContactsByGroupId,
    addContact,
    deleteContactFromGroup,
    findGroupsByContact,
    deleteGroup,
    updateGroup,
    addContacts

}

// find groups by adminId
function findGroupsByAdminId(adminId){
    return db("groups")
            .where({adminId})
}

// add group
function addGroup(newGroupInfo){
    return db('groups')
            .insert(newGroupInfo)
            .returning(["id"])
}

// find group by groupId
function findGroupByGroupId(id){
    return db("groups")
    .where({id})
    .first();
}

// find contacts for a group
function findContactsByGroupId(groupId) {
    return db('contacts')
        .join('contact_group', 'contact_group.contactId', 'contacts.id')
        .where({'contact_group.groupId': groupId});
}

// add contact to a group
function addContact(contactId, groupId){
    return db('contact_group')
        .insert({contactId: contactId, groupId: groupId})
        .returning(["id"]);

}

// delete contact from a group
function deleteContactFromGroup(contactId, groupId){
    return db('contact_group')
        .where({ id : contactId })
        // .delete();
        // .whereIn(['contactId', 'groupId'], [contactId, groupId])
        .delete();
            
}

// async function deleteAvailability(eventId, userId, availabilityStart) {
// 	try {
// 		let res = await db("event_availabilities")
// 			.where({ eventId: eventId })
// 			.andWhere({ userId: userId })
// 			.andWhere({ availabilityStart: availabilityStart })
// 			.del();
// 		return res;
// 	} catch (err) {
// 		console.log(err);
// 		return err;
// 	}
// }

// find groups for a contact
function findGroupsByContact(contactId) {
    return db('contact_group')
        .where({contactId})
        .join('groups', 'contact_group.groupId', 'groups.id');
}

// update group
function updateGroup(id, newGroupInfo){
    return db('groups')
            .where({id})
            .update(newGroupInfo)
}

// delete group
function deleteGroup(id){
    console.log('I am running');
    return db('groups')
        .where({id})
        .delete();
}

// async function addContacts(contacts, groupId){
//     for(let i = 0; i < contacts.length; i++){
//         await addContact(contacts[i], groupId)
//         .then(response => {
            
//         })
//         .catch(error => {
//             console.log('Add contact to the group error',error)
//         });
//     }
// }

async function addContacts(contacts, groupId){
        let counter = 0;
        for(let i = 0; i < contacts.length; i++){
            await addContact(contacts[i], groupId)
            counter++;            
        }
        return counter;
    }
