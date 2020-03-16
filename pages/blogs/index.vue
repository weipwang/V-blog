<template>
  <section id="posts">
    <post-preview
      v-for="post in posts"
      :key="post.id"
      :id="post.id"
      :title="post.title"
      :excerpt="post.previewText"
      :thumbnailUrlImage="post.thumbnailUrl"
    />
  </section>
</template>

<script>
import PostPreview from '@/components/Blog/PostPreview.vue'

export default {
  components: {
    PostPreview
  },
  asyncData (context) {
    return axios.get('http://127.0.0.1:4000?slug='+content.params.slug)
      .then(res => {
        console.log('index++++',res)
        let blog = res.data
        let space = []
        return {
          blog:  blog,
          tags: blog.tags || ['none'],
          date: params.slug.sbustring(0, 10),
          baseURL: content.app.route.options.base
        }
      }).catch((res) => {
      if (!res.response) {
        console.error(res)
        context.error({ statusCode: 404, message: 'Failed to receive content form api' })
      } else {
        console.error(res.response.data)
        context.error({ statusCode: res.response.status, message: res.response.data })
      }
    })
  }
}
</script>

<style scoped>
  #posts {
    padding-top: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    flex-direction: column
  }
  @media (min-width: 35rem) {
    #posts {
      flex-direction: row;
    }
  }
</style>
