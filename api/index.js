var express = require('express')
var fs = require('fs')
var fm = require('front-matter')
var app = express()

var singleBlog = function(fullPath, slug) {
  var blog = {}
  var content = fm(fs.readFileSync(fullPath, 'utf-8'))
  blog = content.attributes
  blog.slug = slug
  blog.content = content.body
  return blog
}

app.get('/', function (req, res) {
  res.header('Access-Control-Allow-Origin', '*')
  var path = __dirname + '/blogs'
  var files = fs.readdirSync(path)
  var blogs = []
  var query = req.query
  for (let i = 0; i < files.length; i++) {
    if (files[i].startsWith('.')) continue;
    let blogPost = singleBlog(path + '/' + files[i], files[i].replace('.md', ''))
    blogs.push(blogPost)
  };
  // 标题查询
  if (query.slug) {
    var blog = blogs.filter((blog) => {
      return blog.slug == query.slug
    })
    res.send(blog)
  } else if (query.tag) { //标签查询
    var tags = blogs.filter((blog) => {
      return blog.tags.find(tag => tag == query.tag)
    })
    res.send(tags)
  }

  res.send(blogs)
})

module.exports = {
  path: '/api',
  handler: app
}
