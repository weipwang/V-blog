const axios = require('axios');
export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: "v-blog+",
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content:  "an awesome blog about v-blog build with nuxt and storyblok"}
    ],
    // link: [{
    //   rel: 'stylesheet',
    //   href: 'https://highlightjs.org/static/demo/styles/dracula.css'
    // }]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    'highlight.js/styles/gml.css'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    ['storyblok-nuxt', {
      accessToken: process.env.NODE_ENV == 'production' ? '93023vY9AqObFFZdQJc5sQtt' :
      'n3tEG3ZlHyodsEQqrVDVrwtt',
      cacheProvider: 'memory'
    }],
  ],

  generate: {
    // generate时自动生成动态路由
    // routes: function () {
    //   return axios.get(
    //     "https://api.storyblok.com/v1/cdn/stories?version=published&token=93023vY9AqObFFZdQJc5sQtt&starts_with=blog&cv=" + Math.floor(Date.now() / 1e3)
    //   )
    //   .then(res => {
    //     const blogPosts = res.data.stories.map(bp => bp.full_slug)
    //     return [
    //       '/',
    //       'blog',
    //       'about',
    //       ...blogPosts
    //     ]
    //   })
    //   .catch(err => {
    //     console.log(err)
    //   })
    // }
  },

  serverMiddleware: [
    '~/api/index'
  ],
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  }
}
