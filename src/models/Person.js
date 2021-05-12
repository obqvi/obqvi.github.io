import Backendless from 'backendless';

const personCollection = Backendless.Data.of('Person');

export async function createPerson(data) {
    return await personCollection.save(data);
}

export async function getAllPersons() {
    const currentUserId = Backendless.UserService.currentUser.objectId;
    const builder = Backendless.DataQueryBuilder.create().setRelated(['user']);
    builder.setWhereClause(`ownerId != '${currentUserId}'`);
    return await personCollection.find(builder);
}

export async function getPersonByUserId(userId) {
    const builder = Backendless.DataQueryBuilder.create().setRelated(['user']).setWhereClause(`ownerId = '${userId}'`);
    return await personCollection.findFirst(builder);
}