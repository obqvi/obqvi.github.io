import Backendless from 'backendless';

export async function setRelationTo(childId, parentId, column, model) {
    const parentObject = { objectId: childId };
    const childObject = { objectId: parentId };
    const children = [childObject];

    return await Backendless.Data.of(`${model}`).setRelation(parentObject, `${column}`, children);
}

export async function addRelationTo(childId, parentId, column, model) {
    const parentObject = { objectId: childId };
    const childObject = { objectId: parentId };
    const children = [childObject];

    return await Backendless.Data.of(`${model}`).addRelation(parentObject, `${column}`, children);
}

export async function delRelationTo(childId, parentId, column, model) {
    const parentObject = { objectId: childId };
    const childObject = { objectId: parentId };
    const children = [childObject];

    return await Backendless.Data.of(`${model}`).deleteRelation(parentObject, `${column}`, children);
}