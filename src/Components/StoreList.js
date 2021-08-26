import React from "react";
import styled from "styled-components";

const StoreList = ({ cashback, name, logo, text }) => {
  return (
    <Card>
      <InnerCard>
        <Logo className="logo" src={logo} />
        <Title>{name}</Title>
        <SubTitle>{text}</SubTitle>
        <CashBackText>Upp till {cashback}</CashBackText>
      </InnerCard>
    </Card>
  );
};

export default StoreList;

const Card = styled.div`
  height: 200px;
  width: 400px;
  display: flex;
  align-items: flex-start;
  border: 1px solid #b0215e;
  border-radius: 8px;
  background: rgb(204, 203, 212);
  background: linear-gradient(
    90deg,
    rgba(204, 203, 212, 1) 8%,
    rgba(196, 214, 218, 1) 50%
  );
  background-size: cover;
  transition: all 0.2s;

  &:hover {
    box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.4);
    transform: scale(1.01);
  }
`;

const InnerCard = styled.div`
  height: 70%;
  width: 60%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  background: white;
  border: 1px solid black;
  border-radius: 8px;
  margin: 40px 10px;
`;

const Title = styled.h2`
  font-size: 16px;
  color: black;
  text-align: start;
  font-weight: 700;
  color: #181818;
  text-shadow: 0px 2px 2px #a6f8d5;
  margin: 0;
`;

const SubTitle = styled.div`
  color: #b0215e;
  text-align: center;
`;

const Logo = styled.img`
  margin: 10px 0;
  width: 100%;
`;

const CashBackText = styled.div`
  color: rgba(253, 67, 142, 1);
  text-align: center;
  font-size: 12px;
  font-weight: 700;
  text-shadow: 0px 1px 1px #000;
`;
