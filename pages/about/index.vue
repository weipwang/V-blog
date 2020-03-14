<template>
  <div id="about-page" v-editable='blok'>
    <h1>{{title}}</h1>
  <section>
    <p>{{content}}</p>
  </section>
  </div>
</template>

<script>
export default {
  asyncData(context) {
    return context.app.$storyapi.get('cdn/stories/about', {
      version: context.isDev ? 'draft' : 'published',
    }).then(res => {
      return {
        blok: res.data.story.content,
        title: res.data.story.content.title,
        content: res.data.story.content.content
      }
    })
  },
  mounted() {
    this.$storybridge.on('change', () => {
      window.location.reload()
    })
  }
}
</script>

<style>
#about-page {
  width: 80%;
  max-width: 500px;
  margin: auto;
}

#about-page p {
  white-space: pre-line;
}
</style>



