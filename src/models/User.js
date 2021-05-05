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

export async function logout() {
    return await Backendless.UserService.logout();
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

export async function updatePersonalInfo(data) {
    const user = new Backendless.User();
    user.objectId = data.id;
    user.city = data.city;
    user.phoneNumber = data.phoneNumber;
    user.url = data.url;
    return await Backendless.UserService.update(user);
}

export async function uploadImageUser(file, url) {
    return await Backendless.Files.upload(file, url, true);
}