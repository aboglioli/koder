export const mapPosts = posts =>
  posts.map(({ node }) => ({
    ...node.frontmatter,
    ...node.fields,
    description: node.frontmatter.description || node.excerpt,
  }));
