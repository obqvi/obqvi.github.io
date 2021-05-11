import Backendless from 'backendless';

const messageCollection = Backendless.Data.of('Message');

export async function send(data) {
    return await messageCollection.save(data);
}

export async function setRelationTo(to, column, parentObject, childObject) {
    const parent = { objectId: parentObject };
    const child = { objectId: childObject };
    const children = [child];

    return await Backendless.Data.of(to).setRelation(parent, column, children);
}

export async function getReceiverdMessagesByUserId(id) {
    const dataQuery = Backendless.DataQueryBuilder.create()
        .setRelated(['receiverId', 'senderId', 'postId']);
        dataQuery.setWhereClause(`receiverId = '${id}'`);
    return await messageCollection.find(dataQuery);
}

export async function getSendedMessagesByUserId(senderId) {
    const dataQuery = Backendless.DataQueryBuilder.create()
        .setRelated(['receiverId', 'senderId', 'postId']);
        dataQuery.setWhereClause(`senderId = '${senderId}'`);
    return await messageCollection.find(dataQuery);
}

export async function getReceivedMessagesByUserId(receiverId) {
    const dataQuery = Backendless.DataQueryBuilder.create()
        .setRelated(['receiverId', 'senderId', 'postId']);
        dataQuery.setWhereClause(`receiverId = '${receiverId}'`);
    return await messageCollection.find(dataQuery);
}