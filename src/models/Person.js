import Backendless from 'backendless';

const personCollection = Backendless.Data.of('Person');

export async function createPerson(data) {
    return await personCollection.save(data);
}

export async function getAllOtherPersons(userId) {
    const builder = Backendless.DataQueryBuilder.create().setRelated(['user']);
    builder.setWhereClause(`ownerId != '${userId}'`);
    return await personCollection.find(builder);
}

export async function getPersonByUserId(userId) {
    const builder = Backendless.DataQueryBuilder.create()
        .setRelated(['user', 'friendRequests', 'friends'])
        .setWhereClause(`ownerId = '${userId}'`);
    return await personCollection.findFirst(builder);
}

export async function getAllChatRequests(userId) {
    const builder = Backendless.DataQueryBuilder.create();
    builder.setRelated(['friendRequests.user']);
    builder.setWhereClause(`ownerId = '${userId}'`);
    return await personCollection.findFirst(builder);
}

export async function confirmRequest(id) {
    personCollection.remove(id);
}