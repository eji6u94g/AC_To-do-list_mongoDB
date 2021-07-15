const express = require('express')
const router = express.Router()
const todoData = require('../../models/todo.js')

//index page
router.get('/', (req, res) => {
  //get all of data from Todo models
  todoData.find()
    .lean() //把 Mongoose 的 Model 物件轉換成乾淨單純的 JavaScript 資料陣列
    .sort({ _id: 'asc' }) //依_id來排序資料, _id有生成前後順序差別, 所以也可以看成是根據創建時間排序
    .then(todos => res.render('index', { todos }))
    .catch(error => console.error(error))
})

module.exports = router