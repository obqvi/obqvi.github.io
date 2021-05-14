import Backendless from 'backendless';

export function subscribeDoubleGroup() {
    return Backendless.Messaging.subscribe('chat');
}

export async function sendMessage(message, user) {
    return await Backendless.Messaging.publish('chat', message, { headers: user });
}

export function messagingConnectListener() {
    return Backendless.RT.addConnectEventListener();
}

export async function saveMessage(data) {
    return await Backendless.Data.of('Chat').save(data);
}

export async function getAllMessagesByChatRoom(room) {
    const builder = Backendless.DataQueryBuilder.create()
        .setRelated(['senderId', 'receiverId'])
        .setWhereClause(`room = '${room}'`);

    return await Backendless.Data.of('Chat').find(builder);
}

export async function getChatRoom(id, otherUserId) {
    const builder = Backendless.DataQueryBuilder.create()
    builder.setWhereClause(`firstUserId = '${otherUserId}' and secondUserId = '${id}' or firstUserId = '${id}' and secondUserId = '${otherUserId}'`);
    builder.addProperty('objectId');

    return await Backendless.Data.of('ChatRooms').findFirst(builder);
}

export async function createChatRoom(id, otherUserId) {
    return await Backendless.Data.of('ChatRooms').save({ firstUserId: id, secondUserId: otherUserId });
}