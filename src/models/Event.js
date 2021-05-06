import Backendless from 'backendless';

const eventCollection = Backendless.Data.of('Event');

export async function createEvent(data) {
    return await eventCollection.save(data);
}