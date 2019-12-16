import axios from "axios";

const baseURL = "http://192.168.43.43:8048";
const baseURL2 = "http://192.168.43.246:8000";

const queryAll = (url) => {
    return new Promise((resolve, reject) => {
        axios({
            method: 'post',
            url: baseURL + url
        }).then(res => {
            resolve(res.data);
        }).catch(err => reject(err));
    });
};

const queryCase = (url, caseId) => {
    return new Promise((resolve, reject) => {
        axios({
            method: 'post',
            url: baseURL + url,
            data: {
                caseId: caseId
            }
        }).then(res => {
            resolve(res.data);
        }).catch(err => reject(err));
    });
};


const fetchSimilar = (url, desc) => {
    return new Promise((resolve, reject) => {
        axios({
            method: 'post',
            url: baseURL2 + url,
            data: {
                description: desc,
            }
        }).then(res => {
            resolve(res.data);
        }).catch(err => reject(err));
    });
};

export {
    queryAll,
    queryCase,
    fetchSimilar
}