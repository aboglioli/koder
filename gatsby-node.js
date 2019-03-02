const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');
const _ = require('lodash');

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === 'MarkdownRemark') {
    const slug = createFilePath({ node, getNode, basePath: 'pages' });
    createNodeField({
      node,
      name: 'slug',
      value: slug,
    });
  }
};

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  return graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
              title
              date
              category
              tags
              collection
              draft
            }
            fields {
              slug
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      throw result.errors;
    }

    const posts = result.data.allMarkdownRemark.edges;
    const requiredFields = ['title', 'date', 'category'];

    posts.forEach(({ node }) => {
      if (requiredFields.some(field => !node.frontmatter[field])) {
        throw new Error(`Missing required field in ${node.fields.slug}`);
      }
    });

    // create post detail page
    posts
      .filter(({ node }) => !node.frontmatter.draft)
      .forEach(({ node }) => {
        createPage({
          path: node.fields.slug,
          component: path.resolve('./src/templates/blog-post.js'),
          context: {
            slug: node.fields.slug,
            collection: node.frontmatter.collection,
          },
        });
      });

    // create category page
    let categories = posts
      .map(({ node }) => node.frontmatter.category)
      .filter(category => !!category);

    categories = _.uniq(categories);

    categories.forEach(category => {
      createPage({
        path: `/category/${_.kebabCase(category)}`,
        component: path.resolve('./src/templates/category.js'),
        context: {
          category,
        },
      });
    });

    // create tag page
    let tags = posts.reduce((tags, { node }) => {
      if (node.frontmatter.tags) {
        return [...tags, ...node.frontmatter.tags];
      }

      return tags;
    }, []);

    tags = _.uniq(tags);

    tags.forEach(tag => {
      createPage({
        path: `/tag/${_.kebabCase(tag)}/`,
        component: path.resolve('./src/templates/tag.js'),
        context: {
          tag,
        },
      });
    });
  });
};
