var express = require('express')
var fs = require('fs')
var fm = require('front-matter')
var app = express()

var singleBlog = function(fullPath, slug, isContentRequired) {
  var blog = {}
  var content = fm(fs.readFileSync(fullPath, 'utf-8'))
  blog = content.attributes
  blog.slug = slug
  if (isContentRequired) {
    blog.content = content.body
  }
  return blog
}

app.get('/', function (req, res) {
  // allow cros origin access
  res.header('Access-Control-Allow-Origin', '*')
  var path = __dirname + '\/blogs'
  var files = fs.readdirSync(path)

  var json = {}

  var qSlug = req.query.slug || ''
  var qImg = req.query.img || ''
  var qTag = req.query.tag || ''
  if (qSlug) {
    json = singleBlog(path+'\/'+qSlug+'.md', qSlug, true)
  } else if (qImg) {
    if (qImg == 'home'){
      json.imgs = []
      let imgs = fs.readdirSync('..\/static\/img\/home')
      imgs.forEach((img, index) => {
        json.imgs[index] = './img/home/'+img
      })
    }
  } else if (qTag) {
    if (qTag == 'all_tags') {
      json.tags = {}
      for (let i = 0; i <  files.length; i++) {
        let blogPost = singleBlog(path + '\/' + files[i],files[i].replace('.md', ''))
        let tags = blogPost.tags || ['none']
        let entry = {
          title: blogPost.title,
          slug: blogPost.slug
        }
        for (let j = 0; j < tags.length; j++) {
          if (json.tags[tags[j]]) {
            json.tags[tags[j]].push(entry)
          } else {
            json.tags[tags[j]] = []
            json.tags[tags[j]].push(entry)
          }
        }
      }
    } else {
      json.blogs = []
      for (let i = 0; i < files.length; i++) {
        let blogPost = singleBlog(path + '\/' + files[i], files[i].repalce('.md', ''))
        let tags = blogPost.tags || ''
        let entry = {
          title: blogPost.title,
          slug: blogPost.slug
        }
        for (let j = 0; j <  tags.length; j++) {
          if(tags[j] == qTag) {
            json.blogs.push(blogPost)
          }
        }
      }
    }
  } else {
    json.blogs = []
    for (let i = 0; i < files.length; i++) {
      if (!files[i].startsWith('.')){
        let blogPost = singleBlog(path + '\/' + files[i], files[i].replace('.md', ''))
        json.blogs.push(blogPost)
      }
    }
  }
  res.send(json)
})

app.listen(4000, () => {
  console.log('express server running at http://127.0.0.1:4000')
})
