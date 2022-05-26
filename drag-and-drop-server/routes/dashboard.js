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

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'db',
    port: 3306,
    user: 'root',
    password: '123456',
    database: 'drag_and_drop_db',
})

pool.getConnection((err, db) => {
    if (err) {
        console.error(err);
        return;
    }

    // 获取看板列表
    router.get('/list', (req, res) => {
        db.query('SELECT * FROM dashboard', (err, results, fields) => {
            res.send(err || results);
        });
    });

    // 按照id获取看板
    router.get('/:id', (req, res) => {
        db.query('SELECT * FROM dashboard WHERE id = ?', [req.params.id], (err, results, fields) => {
            res.send(err || results);
        });
    });

    // 添加看板
    router.post('/', (req, res) => {
        const { config } = req.body;
        db.query(`INSERT INTO dashboard(config) VALUES('${ config }')`, (err, results, fields) => {
            res.send(err || results);
        });
    });

    // 删除看板
    router.delete('/:id', (req, res) => {
        db.query(`DELETE FROM dashboard WHERE id=${ req.params.id }`, (err, results, fields) => {
            res.send(err || results);
        });
    });

    // 更新看板
    router.put('/:id', (req, res) => {
        db.query(`UPDATE dashboard SET config='${ req.body.config }' WHERE id=${ req.params.id }`, (err, results, fields) => {
            res.send(err || results);
        });
    });

});

module.exports = router;
