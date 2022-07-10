import axios from 'axios';

export function save (list) {
    console.log(JSON.stringify(list));
    return axios({
        method: 'post',
        url: 'http://localhost/dashboard',
        data: {
            config: JSON.stringify(list),
        },
    });
}
