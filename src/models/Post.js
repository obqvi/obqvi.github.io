import Backendless from 'backendless';

const postCollection = Backendless.Data.of('Post');
const favoritePostCollection = Backendless.Data.of('FavoritePost');
const lastShowingPostsCollection = Backendless.Data.of('LastShowingPosts');

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

export async function getAllPosts() {
    return await postCollection.find();
}

export async function getPostById(id) {
    return await postCollection.findById(id, {
        relations: ['userId', 'categoryId']
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

export async function checkIsFavoritePostById(postId) {
    const builder = Backendless.DataQueryBuilder.create().setWhereClause(`postId = '${postId}'`);
    return await favoritePostCollection.findFirst(builder);
}

export async function removeFromFavoritePost(favoritePostId) {
    return await favoritePostCollection.remove(favoritePostId);
}

export async function getLastShowingPosts(userId) {
    const builder = Backendless.DataQueryBuilder.create().setWhereClause(`userId = '${userId}'`);
    builder.setRelated(['postId']);
    return await lastShowingPostsCollection.find(builder);
}

export async function setAsLastShowingPost(postId, userId) {
    return await lastShowingPostsCollection.save({ postId, userId });
}

export async function setRelationToLastShowingPost(lastShowingPostId, postId) {
    const parentObject = { objectId: lastShowingPostId };
    const childObject = { objectId: postId };
    const children = [childObject];

    return await lastShowingPostsCollection.setRelation(parentObject, 'postId', children);
}

export async function removeRelationPostFromLastShowing(postId) {
    return await lastShowingPostsCollection.bulkDelete(`postId = '${postId}'`);
}

export async function removeListLastShowingPosts(userId) {
    return await lastShowingPostsCollection.bulkDelete(`userId = '${userId}'`);
}

export async function likePost(post) {
    return await postCollection.save(post);
}