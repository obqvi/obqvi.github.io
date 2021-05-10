import Backendless from 'backendless';

const eventCollection = Backendless.Data.of('Events');
const historyEvents = Backendless.Data.of('historyEvents');

export async function createEvent(data) {
    return await eventCollection.save(data);
}

export async function setAsLastShowingEvent(eventId, userId) {
    return await historyEvents.save({ eventId, userId });
}

export async function updateHistoryEvent(objectId, userId) {
    return await historyEvents.save({ objectId, userId });
}

export async function getLastShowingEvents(userId) {
    const builder = Backendless.DataQueryBuilder.create();
    builder.setWhereClause(`userId = '${userId}'`);
    builder.setRelated(['userId', 'eventId']);
    builder.setSortBy(['updated DESC']);
    return await historyEvents.find(builder);
}

export async function removeHistory(userId) {
    return await historyEvents.bulkDelete(`userId = '${userId}'`);
}

export async function getEventById(id) {
    return await eventCollection.findById(id, {
        relations: ['userId', 'previousEvents.eventId', 'interestedUsers', 'likes']
    });
}

export async function getEvents() {
    return await eventCollection.find();
}

export async function removeEventById(id) {
    return await eventCollection.remove(id);
}