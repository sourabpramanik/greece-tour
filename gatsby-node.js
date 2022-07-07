const path = require("path");

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const pages = [
    "/",
    "/tours",
    "/terms",
    "/privacy",
    "/contact",
    "/about",
    "/vehicle-selection",
    "/customer-data-form",
    "/checkout",
    "/pay-done",

    // "/home-2",
    // "/home-1-header-2",
    // "/listing-stay",
    // "/listing-stay-map",
    // "/listing-stay-detail",
    // "/listing-experiences",
    // "/listing-experiences-map",
    // "/listing-experiences-detail",
    // "/listing-car",
    // "/listing-car-map",
    // "/listing-car-detail",
    // "/listing-real-estate-map",
    // "/listing-real-estate",
    // "/listing-flights",
    // "/author",
    // "/account",
    // "/account-password",
    // "/account-savelists",
    // "/account-billing",
    // "/blog",
    // "/blog-single",
    // "/add-listing-1",
    // "/add-listing-2",
    // "/add-listing-3",
    // "/add-listing-4",
    // "/add-listing-5",
    // "/add-listing-6",
    // "/add-listing-7",
    // "/add-listing-8",
    // "/add-listing-9",
    // "/add-listing-10",
    //
    // "/signup",
    // "/login",
    // "/subscription",
  ];

  pages.map((page) => {
    createPage({
      path: page,
      component: path.resolve("./src/pages/index.tsx"),
      context: { slug: page },
      // defer: true,
    });
  });

  const suggestedTours = await graphql(`
    {
      allStrapiTours(filter: { showOnHomePage: { eq: true } }) {
        nodes {
          address: tags
          title
          prices {
            Price
          }
          href
          id
          galleryImgs {
            url
          }
        }
      }
    }
  `);
  const tours = await graphql(`
    {
      allStrapiTours {
        nodes {
          address: tags
          title
          href
          id
          tourDuration
          imageList: galleryImgs {
            url
          }
          languages {
            OfferedLanguage
            id
          }
          privateShared {
            privateShared
          }
          showOnHomePage
          prices {
            Price
          }
          stopDescription {
            description
            duration
            title
            id
          }
        }
      }
    }
  `);
  tours.data.allStrapiTours.nodes.forEach((tour) => {
    createPage({
      path: `/tours/${tour.href}`,
      component: path.resolve("./src/AFolder/template/tour-template.jsx"),
      context: { tour: tour, suggestedTours: suggestedTours },
      defer: true,
    });
  });

  const transfers = await graphql(`
    {
      allStrapiTransfers {
        nodes {
          name: Title
          href: strapiId
          Price {
            Max_Persons
            Prefix
            Price
          }
          locations {
            Locations
            id
          }
          MainImage {
            url
          }
        }
      }
    }
  `);
  transfers.data.allStrapiTransfers.nodes.forEach((transfer) => {
    createPage({
      path: `/transfers/${transfer.href}`,
      component: path.resolve("./src/AFolder/template/transfer-template.jsx"),
      context: { transfer: transfer },
      defer: true,
    });
  });
};

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        deepmerge$: path.resolve(
          __dirname,
          "node_modules/deepmerge/dist/umd.js"
        ),
      },
    },
  });
};
