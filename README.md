# Koder.dev

[![CircleCI](https://circleci.com/gh/aboglioli/koder.svg?style=svg)](https://circleci.com/gh/aboglioli/koder)

This website is made using my own
[gatsby-blog-starter](https://github.com/aboglioli/gatsby-blog-starter).

A template for building blogs about coding and development with Gatsby.

Let's write and share code.

## Features

- Built with [Gatsby](https://www.gatsbyjs.org): A lot of features!
- Content mangement through GraphQL, plugins and transformers.
- Uses React for pages and templates with all the power de components.
- Posts have category and tags.
- Category and tags pages are generated automatically.
- Highlight code and portions of code.
- Content (posts in markdown format) and web source are separate.
- Local development tool watch for changes.
- Easy customization.

## Use

Folders:

- `src/`: web code using React. Customize views and styles here.
- `content/`: blog posts.

After cloning this repository, install all dependencies:
```
yarn install
```

Local development:
```
yarn develop
```

Build project. Files are generated in `public/` folder.
```
yarn  build
```

Deploy (requires configuration in `package.json`):
```
yarn deploy
```

You can configure that scripts in `package.json`.

## Posts

Available *frontmatter* fields:

- title: `title: Starting an amazing adventure`. *Required*.
- date: `date: 2019-03-01 15:21:00` or `2019-03-01`. *Required*.
- description: `description: It will be shown in main page`
- category: `category: Backend`. *Required*.
- tags: `tags: [GraphQL, NodeJS]`.
- collection: `collection: Amazing adventure`.

`collection` is a special field. All posts with the same collection name
(string) are going to be grouped and a content table generated to navigate
between those posts. [An Adventure in
Go](https://koder.dev/an-adventure-in-go/01) shows how it works.
