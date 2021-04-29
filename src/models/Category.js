import Backendless from 'backendless';

const categoryCollection = Backendless.Data.of('Category');

export function createCategory(data) {
    return categoryCollection.save(data);
}

export function getAllCategories() {
    return categoryCollection.find();
}

export function getAllSubCategoriesById(id) {
    var whereClause = `categoryId = '${id}'`;
    var queryBuilder = Backendless.DataQueryBuilder.create().setWhereClause(whereClause);
    return categoryCollection.find(queryBuilder);
}

export function setRelationCategoryToSelf(parentCategoryId, childCategiryId) {
    const parentObject = { objectId: parentCategoryId };
    const childObject = { objectId: childCategiryId };
    const children = [childObject];

    return Backendless.Data.of('Category').setRelation(parentObject, 'categoryId', children);
}

export function deleteCategoryById(id) {
    return categoryCollection.remove(id);
}