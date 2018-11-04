module.exports = {
  plugins: [
    'gatsby-plugin-styled-components',
    {
      resolve: `gatsby-plugin-layout`,
      options: {
        component: require.resolve(`./src/components/Layout.js`)
      }
  }
  ],
  pathPrefix: `/hodler-react`,
}