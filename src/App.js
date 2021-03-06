import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import image from "./criptocoins.png";
import Form from "./components/Form";
import criptocoinsService from "./services/criptocoinsService";
import Quote from "./components/Quote";
import Spinner from "./components/Spinner";

const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  @media (min-width: 992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`;

const Image = styled.img`
  max-width: 100%;
  margin-top: 5rem;
`;

const Heading = styled.h1`
  font-family: "Bebas Neue", cursive;
  color: #fff;
  text-align: left;
  font-weight: 700;
  font-size: 50px;
  margin-bottom: 50px;
  margin-top: 80px;

  &::after {
    content: "";
    width: 100px;
    height: 6px;
    background-color: #66a2fe;
    display: block;
  }
`;

function App() {
  const [coin, setCoin] = useState("");
  const [criptocoin, setCriptocoin] = useState("");
  const [result, setResult] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getData() {
      try {
        const result = await criptocoinsService.getFullData(coin, criptocoin);
  
        setLoading(true);
  
        setTimeout(() => {
          setLoading(false);
          setResult(result.DISPLAY[criptocoin][coin]);
        }, 3000);
      } catch (error) {
        console.log("Not connection possible!!!");
      }
    }
    if (coin === "") {
      return;
    }

    getData();
  }, [coin, criptocoin]);

  const component = loading ? <Spinner /> : <Quote result={result} />;

  return (
    <Container>
      <div>
        <Image src={image} alt="imagen_of_criptocoins" />
      </div>
      <div>
        <Heading>Instant coin quote</Heading>
        <Form setCoin={setCoin} setCriptocoin={setCriptocoin} />
        {component}
      </div>
    </Container>
  );
}

export default App;
