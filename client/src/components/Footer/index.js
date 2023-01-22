import React from "react";
import {Container, Row, Col } from 'react-bootstrap';
import {BrowseRouter as Router, Link} from 'react-router-dom';
import etsyImg from '../../assets/etsy.png';
import instaImg from '../../assets/insta.webp';
import mailImg from '../../assets/mail.png';

const Footer = () => {
  return (
    <div className="footer text-center text-light bg-dark">
      <Container>
        <Row>
        <Col className="my-2">
          <img src={instaImg} height={50} width={50} alt="Instagram Logo"/>
          @fifthstreetprintingco
        </Col>
        <Col className="my-2">
        {/* Link to? change to real email address... */}
        <a href="mailto:tdegirol@gmail.com">
              <img src={mailImg} height={50} width={50} alt="Mail Logo"/>
              fifthstreetprintingco@gmail.com
            </a>
        </Col>
        <Col className="my-2">
            <a href="https://www.etsy.com/shop/FifthStPrintingCo">
              <img src={etsyImg} height={50} width={100} alt="Etsy Logo"/>
            </a>
        </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Footer;