import styled from "styled-components"

const Jumbotron = styled.div`
  margin: 0 -20px;
  background-image: url(${props => props.backgroundImage});
  background-size: contain;
  background-position: center right;
  background-repeat: no-repeat;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  padding: 36px;
  background-size: cover;

  h1,
  h2,
  h3,
  h4 {
    margin-top: 10px;
  }

  h1 {
    font-size: 2rem;
  }

  @media (min-width: 700px) {
    h1 {
      font-size: 2.5rem;
      margin-top: 30px;
    }
  }

  @media (min-width: 900px) {
    background-size: 75%;
    h1 {
      font-size: 2.5rem;
      margin-top: 30px;
    }
  }

  @media (min-width: 1200px) {
    background-size: 60%;
    h1 {
      font-size: 2.5rem;
      margin-top: 30px;
    }
  }

  ${props => props.customCSS}
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
  }
  @media (min-width: 900px) {
    width: 35%;
    text-align: left;
    align-items: flex-start;
  }
`

export default Jumbotron
export { JumbotronContent }
