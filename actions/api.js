import axios from "axios";

const mainURL = "http://192.168.56.1:7000/"

export const API_TYPES = {
    USER: `${mainURL}User`,
    CAR: `${mainURL}Car`,
    SPENDINGS: `${mainURL}Spendings`,
    COSTS: `${mainURL}Costs`,
    TRANSACTIONS: `${mainURL}Transactions`,
}

/**
 * test3@gamil.com
 * 1234Aa
 */
export default {

    request(url) {
        return {
            fetchAll: () => axios.get(url),
            fetchById: id => axios.get(url + id),
            create: newRecord => axios.post(url,newRecord),
            update: (id, updatedRecord) => axios.put(url + id, updatedRecord),
            delete: id => axios.delete(url + id),
            userLogin: user => axios.post(url + "/login", user),
            userRegister: (password, user) => axios.post(url + `/register?password=${password}`, user),
            fetchUserCars: id => axios.get(url + "/GetUserCars" + id),
            fetchLogs: id => axios.get(url + "/GetLogs" + id),
            fetchSpendings: id => axios.get(url + "/GetSpendings" + id),
            sendEmail: email => axios.post(url + "/Email", email)
        }
    }
}


