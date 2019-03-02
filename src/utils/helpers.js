export const mapPosts = posts =>
  posts
    .filter(({ node }) => !node.frontmatter.draft)
    .map(({ node }) => ({
      ...node.frontmatter,
      ...node.fields,
      description: node.frontmatter.description || node.excerpt,
    }));
