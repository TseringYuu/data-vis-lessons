const app = require('express')();

// 加请求头
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

app.get('/', function (req, res) {
    let data = [];
    const { area, level } = req.query;
    switch (level) {
        case '0':
            // data is chinese cities
            data = [
                { name: '北京', value: Math.round(Math.random() * 1000) },
                { name: '天津', value: Math.round(Math.random() * 1000) },
                { name: '上海', value: Math.round(Math.random() * 1000) },
                { name: '重庆', value: Math.round(Math.random() * 1000) },
            ];
            break;
        case '1':
            data = [
                {
                    name: '海淀区',
                    value: 9
                },
                {
                    name: '西城区',
                    value: 8
                },
                {
                    name: '东城区',
                    value: 7
                },
                {
                    name: '朝阳区',
                    value: 6
                },
                {
                    name: '丰台区',
                    value: 5
                },
                {
                    name: '石景山区',
                    value: 4
                },
                {
                    name: '通州区',
                    value: 3
                },
                {
                    name: '顺义区',
                    value: 2
                },
                {
                    name: '昌平区',
                    value: 1
                },
                {
                    name: '大兴区',
                    value: 0
                },
                {
                    name: '怀柔区',
                    value: 0
                },
                {
                    name: '平谷区',
                    value: 0
                },
                {
                    name: '门头沟区',
                    value: 0
                },
                {
                    name: '密云区',
                    value: 0
                },
                {
                    name: '延庆区',
                    value: 0
                },
            ];
            break;
        case '2':
            data = [
                {
                    name: '五道口',
                    value: 9
                },
                {
                    name: '上地',
                    value: 8
                },
                {
                    name: '清河',
                    value: 7
                },
                {
                    name: '东直门',
                    value: 6
                },
                {
                    name: '马家堡',
                    value: 5
                },
            ];

        default:
            break;
    }
    res.send(data);
});

app.listen(8080, function () {
    console.log('Example app listening on port 8080!');
});
