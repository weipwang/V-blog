<template>
  <section id="posts">
    <post-preview
      v-for="post in posts"
      :key="post.date"
      :id="post.slug"
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
    return axios.get('http://127.0.0.1:3000/api')
      .then(res => {
        const posts = res.data
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
