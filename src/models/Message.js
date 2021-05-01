import Backendless from 'backendless';

const messageCollection = Backendless.Data.of('Message');

export async function sendMessageToUser(data) {
    return await messageCollection.save(data);
}

export async function getAllMessagesByUserId(id) {
    const dataQuery = Backendless.DataQueryBuilder.create()
        .setRelated(['receiverId', 'senderId']);
    return await messageCollection.find(dataQuery);
}

export async function subscribeForChannel() {
    return await Backendless.Messaging.subscribe('chat');
}