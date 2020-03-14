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
    return context.app.$storyapi.get('cdn/stories', {
      version: context.isDev ? 'draft' : 'published',
      starts_with: 'blog/'
    }).then((res) => {
      return {
        posts: res.data.stories.map(bp => {
        return {
          id: bp.slug,
          title: bp.content.title,
          previewText: bp.content.summary,
          thumbnailUrl: bp.content.thumbnail,
          }
        })
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
