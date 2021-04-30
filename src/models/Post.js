import Backendless from 'backendless';

const postCollection = Backendless.Data.of('Post');

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