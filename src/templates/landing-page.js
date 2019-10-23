import React from "react"

export default props => {
  console.log(props.data.markdownRemark.frontmatter)
  return <div>Landing Page</div>
}

export const pageQuery = graphql`
  query LandingPageBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        sections {
          buttonText
          desktopImage
          header
          mobileImage
          type
        }
      }
    }
  }
`
