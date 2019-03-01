import React from 'react';
import { Link, graphql, StaticQuery } from 'gatsby';
import kebabCase from 'lodash/kebabCase';

import { rhythm } from '../utils/typography';

const Nav = () => (
  <StaticQuery
    query={query}
    render={({ allMarkdownRemark: { group } }) => {
      const categories = group
        .map(item => item.fieldValue)
        .filter(category => !!category);

      return (
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            fontSize: rhythm(0.5),
            backgroundColor: 'rgba(255, 229, 100, 0.2)',
            borderRadius: rhythm(1 / 8),
            padding: rhythm(1 / 4),
            marginBottom: rhythm(1),
            border: `1px solid rgba(0, 0, 0, 0.1)`,
          }}
        >
          {categories.map((category, i) => (
            <div key={category}>
              <Link
                style={{
                  fontWeight: 'bold',
                  color: 'inherit',
                }}
                to={`/category/${kebabCase(category)}`}
              >
                {category}
              </Link>
              {i < categories.length - 1 && (
                <span
                  style={{
                    marginLeft: rhythm(1 / 8),
                    marginRight: rhythm(1 / 8),
                  }}
                >
                  •
                </span>
              )}
            </div>
          ))}
        </div>
      );
    }}
  />
);

const query = graphql`
  query {
    allMarkdownRemark(limit: 2000) {
      group(field: frontmatter___category) {
        fieldValue
      }
    }
  }
`;

export default Nav;
