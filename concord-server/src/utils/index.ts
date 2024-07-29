import userList from '../assets/users.json';

export const version = "v" + (process.env.APP_VERSION as string).split(".")[0];

export const getRandomName = () => {
    return userList[Math.floor(Math.random()*500)];
}