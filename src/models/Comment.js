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

export async function setCommentRelationToUser(commentId, userId) {
    const parentObject = { objectId: commentId };
    const childObject = { objectId: userId };
    const children = [childObject];

    return await commentCollection.setRelation(parentObject, 'userId', children);
}

export async function setCommentRelationToPost(commentId, postId) {
    const parentObject = { objectId: commentId };
    const childObject = { objectId: postId };
    const children = [childObject];

    return await commentCollection.setRelation(parentObject, 'postId', children);
}

export async function removeComment(id) {
    return await commentCollection.remove(id);
}