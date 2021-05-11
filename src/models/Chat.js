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
    return await Backendless.Data.of('Messages').save(data);
}