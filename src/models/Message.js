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

export async function getAllMessagesByUserId(id) {
    const dataQuery = Backendless.DataQueryBuilder.create()
        .setRelated(['receiverId', 'senderId']);
    return await messageCollection.find(dataQuery);
}

// export async function subscribeForChannel() {
//     return await Backendless.Messaging.subscribe('chat');
// }