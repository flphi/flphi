import Axios from 'axios';

const API_BASE_URL = "http://localhost:5000"; // TODO: changer pour l'IP du serveur

class RestClient {
    constructor() {
        this.axios = Axios.create({baseURL: API_BASE_URL});

        this.get = this.axios.get;
        this.post = this.axios.post;
        this.put = this.axios.put;
        this.delete = this.axios.delete;
    }

    setHeader = (key, value) => {
        this.axios.defaults.headers.common[key] = value;
    }
}

export default new RestClient();