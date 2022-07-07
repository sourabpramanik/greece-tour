
// https://www.gatsbyjs.com/plugins/gatsby-plugin-google-gtag/
// https://www.gatsbyjs.com/dashboard/bbedc863-3b4c-470d-ab59-ac0d5a4caf09/sites/23b49f4c-a03b-4dbb-b905-ce72474e2bc4/deploys?newsite=true
// https://www.gatsbyjs.com/plugins/gatsby-plugin-gatsby-cloud/
// https://www.gatsbyjs.com/dashboard/bbedc863-3b4c-470d-ab59-ac0d5a4caf09/sites/23b49f4c-a03b-4dbb-b905-ce72474e2bc4/deploys
module.exports = {
    flags: {
        DEV_SSR: true
    },
    siteMetadata: {
        title: `Tour-Greece`,
        description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
        author: `@gatsbyjs`,
        siteUrl: `https://gatsbystarterdefaultsource.gatsbyjs.io/`,
    },
    plugins: [
        `gatsby-plugin-image`,
        `gatsby-plugin-sharp`,
        `gatsby-transformer-sharp`,
        `gatsby-plugin-typescript`,
        `gatsby-plugin-react-helmet`,
        `gatsby-plugin-tsconfig-paths`,
        `gatsby-plugin-postcss`,

        {
            resolve: `gatsby-plugin-sass`,
            options: {
                postCssPlugins: [
                    require("tailwindcss"),
                    require("./tailwind.config.js"),
                ],
            },
        },
        {
            resolve: `gatsby-plugin-typescript`,
            options: {
                isTSX: true, // defaults to false
                jsxPragma: `jsx`, // defaults to "React"
                allExtensions: true, // defaults to false
            },
        },
        {
            resolve: `gatsby-source-strapi`,
            options: {
                apiURL: `https://dry-oasis-20423.herokuapp.com`,
                queryLimit: 1000, // Default to 100
                collectionTypes: [`tours`, 'carousel-fleets', `transfers`, `vehicle-lists`, 'clients'],
                // singleTypes: [`home-page`],
            }
        },
        {
            resolve: 'gatsby-plugin-crisp-chat',
            options: {
                websiteId: "16f1a9e2-087f-479a-8f9f-0ae9492f33cb",
                enableDuringDevelop: true, // Optional. Disables Crisp Chat during gatsby develop. Defaults to true.
                defer: true, // Optional. Sets the Crisp loading script to defer instead of async. Defaults to false.
                enableImprovedAccessibility: false // Optional. Sets aria-label attribute on pop-up icon for screen readers. Defaults to true.
            },
        },
        {
          resolve: "gatsby-plugin-content-hash",
          options: { 
                build_root_path: `${__dirname}/public`,         
                hashing_target_file_names: ['page-data.json']   
          },
        },
    ],
}