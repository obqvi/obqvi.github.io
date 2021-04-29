import Backendless from 'backendless';

export async function register(email, password, username) {
    var user = new Backendless.User();

    user.email = email;
    user.password = password;
    user.username = username;

    return await Backendless.UserService.register(user);
}

export function login(email, password) {
    return Backendless.UserService.login(email, password, true);
}