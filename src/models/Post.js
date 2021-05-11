import Backendless from 'backendless';

const postCollection = Backendless.Data.of('Post');
const favoritePostCollection = Backendless.Data.of('FavoritePost');
const historyPosts = Backendless.Data.of('historyPosts');

export async function createPost(data) {
    return postCollection.save(data);
}

export async function setRelationToCategory(postId, categoryId) {
    const parentObject = { objectId: postId };
    const childObject = { objectId: categoryId };
    const children = [childObject];

    return Backendless.Data.of('Post').setRelation(parentObject, 'categoryId', children);
}

export async function setRelationToUser(postId, userId) {
    const parentObject = { objectId: postId };
    const childObject = { objectId: userId };
    const children = [childObject];

    return Backendless.Data.of('Post').setRelation(parentObject, 'userId', children);
}

export async function imageUpload(image, path) {
    return await Backendless.Files.upload(image, path, true);
}

export async function getAllPosts(pageNumber, userId) {
    const builder = Backendless.LoadRelationsQueryBuilder.create().setRelated(['userId']);
    builder.setPageSize(2).setOffset(pageNumber * 2).setSortBy('created desc');

    if(userId) {
        builder.setWhereClause(`userId = '${userId}'`);
    }

    return await postCollection.find(builder);
}

export async function getAllPostsByUserId(id) {
    const builder = Backendless.LoadRelationsQueryBuilder.create().setRelated(['userId']);
    builder.setWhereClause(`userId = '${id}'`);
    return await postCollection.find(builder);
}

export async function getPostById(id) {
    return await postCollection.findById(id, {
        relations: ['categoryId', 'userId', 'previousPosts.postId']
    });
}

export async function removePostById(id) {
    return postCollection.remove(id);
}

export async function setAsFavoritePost(userId) {
    return await favoritePostCollection.save({ userId });
}

export async function setRelationToPost(favoritePostId, postId) {
    const parentObject = { objectId: favoritePostId };
    const childObject = { objectId: postId };
    const children = [childObject];

    return await favoritePostCollection.setRelation(parentObject, 'postId', children);
}

export async function getFavoritePostsByUserId(userId) {
    const builder = Backendless.LoadRelationsQueryBuilder.create().setRelated(['postId']);
    builder.setWhereClause(`userId = '${userId}'`);
    return await favoritePostCollection.find(builder);
}

export async function getPostsByCategoryId(id) {
    const builder = Backendless.LoadRelationsQueryBuilder.create().setRelated(['categoryId', 'userId']);
    builder.setWhereClause(`categoryId = '${id}'`);
    return await postCollection.find(builder);
}

export async function checkIsFavoritePostById(postId) {
    const builder = Backendless.DataQueryBuilder.create().setWhereClause(`postId = '${postId}'`);
    return await favoritePostCollection.findFirst(builder);
}

export async function removeFromFavoritePost(favoritePostId) {
    return await favoritePostCollection.remove(favoritePostId);
}

export async function getLastShowingPosts(userId) {
    const builder = Backendless.DataQueryBuilder.create().setWhereClause(`userId = '${userId}'`);
    builder.setSortBy(['updated DESC']);
    builder.setRelated(['postId']);
    return await historyPosts.find(builder);
}

export async function setAsLastShowingPost(postId, userId) {
    return await historyPosts.save({ postId, userId });
}

export async function updateHistoryPosts(objectId, userId) {
    return await historyPosts.save({ objectId, userId });
}

export async function setRelationToLastShowingPost(lastShowingPostId, postId) {
    const parentObject = { objectId: lastShowingPostId };
    const childObject = { objectId: postId };
    const children = [childObject];

    return await historyPosts.setRelation(parentObject, 'postId', children);
}

export async function removeRelationPostFromLastShowing(postId) {
    return await historyPosts.bulkDelete(`postId = '${postId}'`);
}

export async function removeListLastShowingPosts(userId) {
    return await historyPosts.bulkDelete(`userId = '${userId}'`);
}

export async function likePost(post) {
    return await postCollection.save(post);
}

export async function disableComments(post) {
    return await postCollection.save(post);
}

export async function searchPostsByQuery(data) {
    const queryBuilder = Backendless.DataQueryBuilder.create();
    queryBuilder.addProperties(['objectId', 'title']);
    queryBuilder.setWhereClause(`title LIKE '%${data}%'`);
    return await postCollection.find(queryBuilder);
}