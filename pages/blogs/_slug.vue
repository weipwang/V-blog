<template>
  <div class=''>
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
      return axios.get('http://127.0.0.1:4000?slug='+content.params.slug)
        .then(res => {
          let blog = res.data
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
        var rendererMD = new marked.Renderer()
        var html = marked(this.blog.content, {
          renderer: rendererMD,
          gfm: true,
          tables: true,
          breaks: false,
          pedantic: false,
          sanitize: false,
          smartList: true,
          smartypants: false,
          highlight: function(code)  {
            return hljs.highlightAuto(code).value
          }
        })

        html = html.replace(/href\=\"http"/g, "target=\"_blank\" href=\"http")
        html = html.replace(/href\=\"\#/g, "href=\"blogs/"+ this.blog.slug + "#")
        return html
      }
    }
  }
</script>
<style scoped >

</style>
