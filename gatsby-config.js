module.exports = {
  siteMetadata: {
    url: 'https://koder.dev',
    title: 'Koder',
    author: 'Alan Boglioli',
    email: 'alan.boglioli@gmail.com',
    description: 'Blog about coding and development',
    siteUrl: 'https://koder.dev',
    image: 'logo.png',
    social: {
      github: 'https://github.com/aboglioli',
      linkedin: 'https://www.linkedin.com/in/alanboglioli/',
      twitter: 'https://twitter.com/alanboglioli',
      instagram: 'https://instagram.com/alanboglioli',
      facebook: 'https://facebook.com/alan.boglioli',
    },
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-typography',
      options: {
        pathToConfigModule: 'src/utils/typography',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'blog',
        path: `${__dirname}/content/blog`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'assets',
        path: `${__dirname}/content/assets`,
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: 'gatsby-remark-responsive-iframe',
            options: {
              wrapperStyle: 'margin-bottom: 1.0725rem',
            },
          },
          {
            resolve: 'gatsby-remark-prismjs',
            options: {
              inlineCodeMarker: '÷',
            },
          },
          'gatsby-remark-copy-linked-files',
        ],
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'UA-82052179-3',
      },
    },
    'gatsby-plugin-feed',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Koder',
        short_name: 'Koder',
        start_url: '/',
        background_color: `#ffffff`,
        theme_color: `#663399`,
        display: 'minimal-ui',
        icon: 'static/logo.png',
      },
    },
    'gatsby-plugin-offline',
    'gatsby-plugin-sitemap',
  ],
};
