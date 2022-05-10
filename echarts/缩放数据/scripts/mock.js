const express = require('express');
const app = express();
const port = 3001;

app.get('/test', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    const { start, end } = req.query;
    const fr = Math.floor((end - start) / 10);
    res.send({
        msg: 'ok',
        data: new Array(10).fill(0).map((d, i) => ({
            timestamp: Number(start) + fr * i,
            value: Math.floor(Math.random() * 100),
        })),
    });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${ port }`)
});
