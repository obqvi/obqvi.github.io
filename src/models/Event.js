import Backendless from 'backendless';

const eventCollection = Backendless.Data.of('Event');

export async function createEvent(data) {
    return await eventCollection.save(data);
}

export async function getEventById(id) {
    return await eventCollection.findById(id);
}

export async function getEvents() {
    return await eventCollection.find();
}