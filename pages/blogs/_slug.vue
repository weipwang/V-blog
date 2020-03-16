<template>
  <div class='markdown-body'>
    <div v-html="compiledMarkdown" ></div>
  </div>
</template>
<script>
import marked from 'marked'
import hljs from 'highlight.js'
import axios from 'axios'
export default {
  asyncData(content) {
    console.log(content.params)
    return axios.get('http://127.0.0.1:3000/api?slug=' + content.params.slug).then(res => {
      let blog = res.data[0]
      console.log(blog)
      let space = []
      return {
        blog: blog,
        tags: blog.tags || ['home'],
        data: content.params.slug.substring(0, 10),
        baseURL: content.app.router.options.base
      }
    })
  },
  computed: {
    compiledMarkdown: function() {
      marked.setOptions({
        renderer: new marked.Renderer(),
        gfm: true,
        tables: true,
        breaks: false,
        pedantic: false,
        sanitize: false,
        smartLists: true,
        smartypants: false,
        highlight: function (code) {
          return hljs.highlightAuto(code).value
        }
      })
      var html = marked(this.blog.content)
      html = html.replace(/href\=\"http"/g, 'target="_blank" href="http')
      html = html.replace(/href\=\"\#/g, 'href="blogs/' + this.blog.slug + '#')
      return html
    }
  }
}
</script>
<style scoped >
.markdown-body {
		box-sizing: border-box;
		min-width: 200px;
		max-width: 980px;
		margin: 0 auto;
		padding: 45px;
	}

	@media (max-width: 767px) {
		.markdown-body {
			padding: 15px;
		}
	}
</style>
