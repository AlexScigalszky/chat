const http = require('http');
const axios = require('axios').default;

const get = (url) => {
    return new Promise((resolve, reject) => {
        http.get(url, (resp) => {
            let data = '';

            resp.on('data', (chunk) => {
                data += chunk;
            });

            resp.on('end', () => {
                resolve(data);
            });

        }).on("error", (err) => {
            reject(err);
        });
    })

};


const post = (url, params) => {
    return axios.post(url, params);
};


exports.post = post;
exports.get = get;
