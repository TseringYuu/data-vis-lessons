/**
 * @description
 *      看板接口:
 *          1. 获取看板列表
 *          2. 按照id获取看板
 *          3. 添加看板
 *          4. 删除看板
 *          5. 更新看板
 */

const express = require('express');
const router = express.Router();
const mysql = require('mysql');

// const pool = mysql.createPool({
//     connectionLimit: 10,
//     host: 'drag_and_drop_db',
//     port: 3306,
//     user: 'root',
//     password: '123456',
//     database: 'dashboard',
// })

// pool.getConnection((err, db) => {
//     if (err) {
//         console.log(err);
//         return;
//     }

    // 获取看板列表
    router.get('/list', (req, res) => {
        // db.release();
        // db.query('select * from dashboard', (err, results, fields) => {
        //     res.send(err || results);
        // });
        res.send('获取看板列表');
    });

//     // 按照id获取看板
//     router.get('/:id', (req, res) => {
//         res.send('dashboard id');
//     });

//     // 添加看板
//     router.post('/', (req, res) => {
//         res.send('dashboard add');
//     });

//     // 删除看板
//     router.delete('/:id', (req, res) => {
//         res.send('dashboard delete');
//     });

//     // 更新看板
//     router.put('/:id', (req, res) => {
//         res.send('dashboard update');
//     });

// });

module.exports = router;
