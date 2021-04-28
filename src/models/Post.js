import Backendless from 'backendless';

const postCollection = Backendless.Data.of('Post');

export async function createPost(data) {
    return postCollection.save(data);
}

export async function imageUpload(image, path) {
    return await Backendless.Files.upload(image, path, true);
}

export async function getAllPosts() {
    return await postCollection.find();
}