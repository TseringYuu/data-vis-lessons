/**
 * @description
 *    可视化编辑器接口
 */

const express = require('express');
const bodyParser = require('body-parser');
const dashboard = require('./routes/dashboard');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    next();
});

app.use('/dashboard', dashboard);

// 启动服务
app.listen(80, () => {
    console.log('启动成功');
});
