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

// 看板模块
app.use('/dashboard', dashboard);

// 启动服务
app.listen(3000, () => {
    console.log('启动成功');
});
