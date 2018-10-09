let mongoURL=''
if (process.env.NODE_ENV == "production") {
  mongoURL = "mongodb://root:admin123@ds161312.mlab.com:61312/node-vue-ele-app"
} else {
  mongoURL="mongodb://localhost:27017/vue-node-ele"
}


module.exports = {
  mongoURL,
  secretOrkey: 'secret'
}
