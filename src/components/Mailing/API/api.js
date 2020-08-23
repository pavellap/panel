import url from "../../../config";
import Axios from "axios";


export async function fetchMailings() {
    try {
        const endpoint = url + '/mailings'
        const response = await Axios.get(endpoint);
        return response.data["mails"];
    }
    catch (e) {
        console.log("Произошла ошибка при получении всех рассылок...");
        throw e;
    }
}

export async function fetchProfiles() {
    try {
        const endpoint = url + '/forms'
        const response = await Axios.get(endpoint);
        return response.data.forms;
    }
    catch (e) {
        console.log("Произошла ошибка при получении анкет в рассылках...");
        throw e;
    }
}

export async function fetchGroups() {
    try {
        const endpoint = url + '/groups'
        const response = await Axios.get(endpoint);
        return response.data.groups;
    }
    catch (e) {
        console.log("Произошла ошибка при получении групп в рассылках...");
        throw e;
    }
}

export async function fetchUsers() {
    try {
        const endpoint = url + '/clients';
        const response = await Axios.get(endpoint);
        return response.data.users
    }
    catch (e) {
        console.log("Произошла ошибка при получении пользователей бота в рассылках...");
        throw e;
    }
}

export async function fetchSubs() {
    try {
        const endpoint = url + '/subs';
        const response = await Axios.get(endpoint);
        return response.data.subs
    }
    catch (e) {
        console.log("Произошла ошибка при получении тарифов в рассылках...");
        throw e;
    }
}

export async function addMailing(data) {
    try {
        const endpoint = url + '/mailings';
        const response = await Axios.post(endpoint, data);
        return response.data;
    }
    catch (e) {
        console.log("Произошла ошибка при сохранении новой рассылки");
        throw e;
    }
}
