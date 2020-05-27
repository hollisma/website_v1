import React from 'react'
import { graphql, PageProps, Link } from 'gatsby'
import styled from 'styled-components'
import { Layout, SEO } from '../components'
import { list_item } from '../styles'

const Section = styled(list_item.section)`
  transition: all 0.2s ease;
  &:hover {
    background-color: #ed9;
  }
`
const BlogLink = styled(Link)`
  font-size: 2em;
  font-weight: bold;
  color: black;
  text-decoration: none;
`
const Post = styled.p`
  margin-top: 1em;
  font-size: 1.25em;
  font-family: Merriweather;
  line-height: 1.5em;
`

type Data = {
  postsQuery: {
    posts: {
      node: {
        fields: {
          slug: string
        }
        frontmatter: {
          title: string
        }
        excerpt: string
        html: string
      }
    }[]
  }
}

const Blog = ({ data, location }: PageProps<Data>) => {
  const { posts } = data.postsQuery
  console.log(posts)

  return (
    <Layout location={location}>
      <SEO title='Hollis Ma | Blog' />
      {posts &&
        posts.map(({ node }, i) => {
          const { fields, frontmatter, excerpt, html } = node
          const { title } = frontmatter

          return (
            <Section key={i}>
              <BlogLink to={fields!.slug}>{title}</BlogLink>
              <Post>{excerpt}</Post>
            </Section>
          )
        })}
    </Layout>
  )
}

export default Blog

export const pageQuery = graphql`
  {
    postsQuery: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/blog/" } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      posts: edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
          }
          excerpt(pruneLength: 200)
          html
        }
      }
    }
  }
`
