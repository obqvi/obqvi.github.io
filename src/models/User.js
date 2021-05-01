import Backendless from 'backendless';

export async function register(email, password, username) {
    var user = new Backendless.User();

    user.email = email;
    user.password = password;
    user.username = username;

    return await Backendless.UserService.register(user);
}

export async function login(email, password) {
    return await Backendless.UserService.login(email, password, true);
}

export async function updateEmail(id, email) {
    const user = new Backendless.User();
    user.email = email;
    user.objectId = id;
    return await Backendless.UserService.update(user);
}

export async function updateUsername(id, username) {
    const user = new Backendless.User();
    user.username = username;
    user.objectId = id;
    return await Backendless.UserService.update(user);
}

export async function updatePassword(id, password) {
    const user = new Backendless.User();
    user.password = password;
    user.objectId = id;
    return await Backendless.UserService.update(user);
}