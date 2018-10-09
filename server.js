const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const app = express();

//引入users.js
const users = require('./routes/api/vue-ele-users')
//引入profiles
const profiles = require('./routes/api/profiles')

//DB config
const db = require('./config/database').mongoURL;

//Connct to mongodb
mongoose.connect(db)
    .then(() => console.log("MongoDB Connected 数据库连接成功"))
    .catch(err => console.log(err))

//使用body-parser中间件
app.use(bodyParser.urlencoded({ extends: false }));
app.use(bodyParser.json())
//passport初始化
app.use(passport.initialize());
require('./config/passport')(passport);


// app.get('/', (req, res) => {
//     res.send('hello world')
// })

//使用routes
app.use('/api/vueusers', users);
app.use('/api/profiles', profiles);

const port = process.env.PORT || 9000;

app.listen(port, () => {
    console.log(`Server running on port `+port)
})