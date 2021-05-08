import Backendless from 'backendless';

const commentCollection = Backendless.Data.of('Comment');

export async function createComment(comment) {
    return await commentCollection.save(comment);
}

export async function getAllCommentsByPostId(postId) {
    const builder = Backendless.DataQueryBuilder.create().setWhereClause(`postId = '${postId}'`);
    builder.setRelated(['userId']);
    builder.setSortBy(['created DESC']);
    return await commentCollection.find(builder);
}

export async function getAllCommentsByEventId(eventId) {
    const builder = Backendless.DataQueryBuilder.create().setWhereClause(`eventId = '${eventId}'`);
    builder.setRelated(['userId']);
    builder.setSortBy(['created DESC']);
    return await commentCollection.find(builder);
}

export async function removeComment(id) {
    return await commentCollection.remove(id);
}