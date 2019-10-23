import React from "react"
import Section from "../components/Section"
import styled from "styled-components"

const Layout = styled.div`
  margin: 0 20px;
  * {
    box-sizing: border-box;
    font-family: Montserrat;
  }
`

export default props => {
  console.log(props.data.markdownRemark)
  const { sections } = props.data.markdownRemark.frontmatter

  return (
    <Layout>
      {sections &&
        sections.map((section, i) => <Section key={i} {...section} />)}
    </Layout>
  )
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
      html
      frontmatter {
        title
        sections {
          buttonText
          desktopImage
          header
          mobileImage
          description
          type
          features {
            image
            title
            description
          }
          numberedFeatures
        }
      }
    }
  }
`
