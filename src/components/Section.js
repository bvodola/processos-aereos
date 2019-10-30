import React from "react"
import styled from "styled-components"
import Markdown from "react-markdown"

const Jumbotron = styled.div`
  margin: 0 -20px;

  @media (min-width: 700px) {
    background-image: url(${props => props.backgroundImage});
    background-size: contain;
    background-position: center right;
    background-repeat: no-repeat;
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    padding: 36px;

    h1 {
      font-size: 2.5rem;
      margin-top: 30px;
    }
  }

  h1,
  h2,
  h3,
  h4 {
    margin-top: 10px;
  }

  h1 {
    font-size: 2rem;
  }

  @media (max-width: 900px) {
    background-size: cover;
  }
`

const JumbotronContent = styled.div`
  background: rgba(255, 255, 255, 0.8);
  border-radius: 4px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  @media (min-width: 700px) {
    width: 45%;
    text-align: left;
    align-items: flex-start;
  }
  @media (min-width: 900px) {
    width: 35%;
  
`

const Button = styled.a`
  background-color: ${props =>
    props.variant === "outlined" ? "#fff" : "#f39"};
  color: ${props => (props.variant === "outlined" ? "#f39" : "#fff")};
  border: 1px solid #f39;
  border-radius: ${props => (props.variant === "outlined" ? "30px" : "4px")};
  padding: 15px 20px;
  cursor: pointer;
  box-shadow: none;
`

const MobileImage = styled.img`
  width: 200px;
  @media (min-width: 700px) {
    display: none;
  }
`

const FeaturesWrapper = styled.div`
  background-color: ${props => props.bgColor || "#fff"};
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 -20px;
  margin-top: 30px;
  padding: 40px 20px;
}

  h3 {
    text-align: center;
    font-weight: 500;
    margin-bottom: 0;
  }

  .description {
    margin-top: 10px;
    text-align: center;
    line-height: initial;
  }
`

const Features = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  margin-top: 30px;

  @media (min-width: 700px) {
    flex-direction: row;
    padding: 0 ${props => 15 / props.numberOfFeatures}%;
    > * {
      width: ${props => `calc( ${100 / props.numberOfFeatures}% - 40px )`};
    }
  }

  @media (min-width: 1200px) {
    padding: 0 ${props => 60 / props.numberOfFeatures}%;
  }
`

const Feature = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 20px;
  text-align: center;

  img {
    height: ${props => props.imageHeight || "100px"};
    margin: 10px;
  }

  h2 {
    margin: 0;
    font-weight: 500;
  }

  p {
    margin-top: 10px;
    line-height: initial;
  }
`

const Counter = styled.div`
  border: 1px solid #999;
  border-radius: 100%;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Grid = styled.div`
  margin: 0 -20px;
  padding: 20px;
  background-color: ${props => props.bgColor};
  @media (min-width: 700px) {
    display: flex;
    flex-direction: row;
    padding: ${props => props.mdPadding};
    > * {
      width: ${props => `calc( ${100 / props.gridSize}% )`};
    }
  }
  @media (min-width: 1200px) {
    padding: ${props => props.lgPadding};
  }
`

const Section = props => {
  const { type } = props

  if (type === "jumbotron") {
    // =========
    // Jumbotron
    // =========
    return (
      <Jumbotron backgroundImage={props.desktopImage}>
        <JumbotronContent>
          {props.mobileImage && <MobileImage src={props.mobileImage} alt="" />}
          <Markdown source={props.header} />
          <Button>{props.buttonText}</Button>
        </JumbotronContent>
      </Jumbotron>
    )
  } else if (type === "features") {
    // ========
    // Features
    // ========
    return (
      <FeaturesWrapper bgColor={props.bgColor}>
        <h3>{props.header}</h3>
        <p className="description">{props.description}</p>
        <Features numberOfFeatures={props.features.length}>
          {props.features.map((feature, i) => (
            <Feature key={i} imageHeight={props.imageHeight}>
              {props.numberedFeatures && <Counter>{String(i + 1)}</Counter>}
              <img src={feature.image} alt="" />
              <h2>{feature.title}</h2>
              <p>{feature.description}</p>
            </Feature>
          ))}
        </Features>

        {props.buttonText && (
          <Button variant={"outlined"} href={props.buttonLink}>
            {props.buttonText}
          </Button>
        )}
      </FeaturesWrapper>
    )
  } else if (type === "grid") {
    // ====
    // GRID
    // ====
    return (
      <Grid
        gridSize={props.gridSize}
        lgPadding={props.lgPadding}
        mdPadding={props.mdPadding}
        bgColor={props.bgColor}
      >
        {props.gridSections.map(section => (
          <Section
            key={Math.random()
              .toString(36)
              .substring(7)}
            {...section}
          />
        ))}
      </Grid>
    )
  } else if (type === "textEditor") {
    // ====
    // TEXT
    // ====
    return (
      <div style={{ margin: "20px" }}>
        <Markdown source={props.textContent} />
      </div>
    )
  } else if (type === "empty") {
    // =====
    // EMPTY
    // =====
    return <div>&nbsp;</div>
  } else {
    // ================
    // No section found
    // ================
    return <div>Section type not found</div>
  }
}

export default Section
