const bcrypt = require('bcryptjs');

async function generateGroupInviteHash(groupId, adminId){

    // input string that contains groupId and adminId
    const input = `group${groupId}admin${adminId}`;

    // generate the hash
    const rounds = 8;
    const salt = bcrypt.genSaltSync(rounds);
    const hash = await bcrypt.hashSync(input, salt);

    // replace all '/' in the hash with 0 - to avoid issues in URL params
    const groupInviteHash = hash.split('/').join('0');
    console.log(`replaced ${hash} to ${groupInviteHash}`);

    // return groupInviteHash
    return groupInviteHash;
}

module.exports = {generateGroupInviteHash};
