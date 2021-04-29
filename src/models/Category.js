import Backendless from 'backendless';

const categoryCollection = Backendless.Data.of('Category');

export async function createCategory(data) {
    return categoryCollection.save(data);
}