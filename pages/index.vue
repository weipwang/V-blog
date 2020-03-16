<template>
  <section id="posts">
    <post-preview
      v-for="post in posts"
      :key="post.date"
      :id="post.date"
      :title="post.title"
      :excerpt="post.descript"
      :thumbnailUrlImage="post.thumbnail"
    />
  </section>
</template>

<script>
import PostPreview from '@/components/Blog/PostPreview.vue'
import axios from 'axios'

export default {
  components: {
    PostPreview
  },
  asyncData(context)  {
    return axios.get('http://127.0.0.1:4000')
      .then(res => {
        const posts = res.data.blogs
        return { posts }
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
