// @login &register
const express = require('express');
const router = express.Router();
var crypto = require('crypto');
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken');
const User = require('../../module/UserVueEle');
const keys = require('../../config/database');
const passport = require('passport')

//$route GET api/users/test
//@desc 返回的请求的json数据
//@access public
router.get('/test', (req, res) => {
  res.json({
    msg: "longin works"
  })
})

//$route POST api/users/register
//@desc 返回的请求的json数据
//@access public
router.post('/register', (req, res) => {
  //console.log(req.body)
  //查询数据库中是否有该邮箱注册
  User.findOne({
      email: req.body.emal
    })
    .then((user) => {
      if (user) {
        return res.status(400).json("邮箱已被注册!")
      } else {
        const avatar = gravatar.url(req.body.email, {
          s: '200',
          r: 'pg',
          d: 'mm'
        });
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          avatar,
          password: req.body.password,
          identity: req.body.identity
        })
        // bcrypt.genSalt(10, (err, salt) => {
        //   bcrypt.hash(newUser.password, salt, (err, hash) => {
        //     if (err) throw err;
        //     newUser.password = hash;
        //     newUser.save()
        //       .then(user => res.json(user))
        //       .catch(err => console.log(err))
        //   });
        // });
        var md5 = crypto.createHash('md5');//定义加密方式:md5不可逆,此处的md5可以换成任意hash加密的方法名称；
        md5.update(content);
        var d = md5.digest('hex');

      }
    })
})

//$route POST api/users/test
//@desc 返回token jwt passport
//@access public
router.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  //查询数据库
  User.findOne({
      email
    })
    .then((user) => {
      if (!user) {
        return res.status(404).json( "用户不存在!")
      }
      //密码匹配
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          const rule = {
            id: user.id,
            name: user.name,
            avatar: user.avatar,
            identity: user.identity
          }
          //jwtoken.sign('规则','加密名字','{过期时间}','箭头函数')
          jwt.sign(rule, keys.secretOrkey, {
            //expiresIn: 3600  token 过期时间
            expiresIn: 3600
          }, (err, token) => {
            if (err) throw err;
            res.json({
              scuccess: true,
              token: "Bearer " + token
            })
          })
          //res.json({msg:"success"})
        } else {
          return res.status(400).json( "密码错误")
        }
      })
    });

})

//$route POST api/users/current
//@desc 返回token jwt user
//@access private

//rotuer.get('/current', '验证token', (req, res) => {
router.get('/current', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  res.json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email,
    identity: req.user.identity
  })
})


module.exports = router;
