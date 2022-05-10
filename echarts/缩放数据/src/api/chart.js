import axios from 'axios';

export function getData (start, end) {
    return axios({
        url: 'http://localhost:3001/test',
        method: 'get',
        params: {
            start,
            end,
        },
    });
}
