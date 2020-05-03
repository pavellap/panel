import Axios from "axios";

export default class Parser {
    constructor(sectionId, url, config) {
        this.url ="http://188.32.187.157:5000/getpage/config_id=" + 1 + '&page_id=' + 1;
        this.data = null;
        this.section = sectionId;
        this.url = url;
        this.config = config;
    }

    testFetchData = () => {
        Axios.get(this.url).then(response => {
            this.data = response.data.list;
            console.log("Данные полученные в парсере", this.data);
        })
    };

    parseFetchedData = (data) => {
        const messages = [];
        const subscriptions = [];
        const profiles = [];
        const helloMessages = [];
        this.data.forEach(item => {
            if (item.type === "message")
                messages.push(item);
            else if (item.type === "form")
                profiles.push(item);
            else if (item.type === "subscription")
                subscriptions.push(item);
        });
        return [messages, subscriptions, profiles, helloMessages]
    }
}


const parse = new Parser();
