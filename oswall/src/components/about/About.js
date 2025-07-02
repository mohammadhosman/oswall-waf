import React from "react";
import { Container, Row, Col, Card } from 'react-bootstrap';
import oswallLogo from '../../images/common/oswall-logo-no-background.png';
import aboutVideo from '../../videos/about.mp4';
import NavigationBar from '../common/NavigationBar';
import Footer from '../common/Footer';
import '../../styling/common/App.css';
import "../../styling/about/About.css";

function About() {
  return (
    <div id="app">
      <NavigationBar />
      <header id="about-hero" style={{ position: 'relative', width: '100vw', height: '60vh', overflow: 'hidden' }}>
        <video
          autoPlay
          muted
          playsInline
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 0,
            opacity: 1 // show video fully
          }}
          src={aboutVideo}
          onEnded={e => e.target.pause()} // freeze on last frame
        />
      </header>
      <Container className="my-5">
        <Row className="justify-content-center mb-4">
          <Col md={10} className="text-center">
            <p className="lead">
              OsWall is designed to make web application security simple, effective, and accessible for everyone. With a clean dashboard, customizable security rules, and instant IP blocking, you can protect your site with just a few clicks.
            </p>
          </Col>
        </Row>
        <Row className="g-4">
          <Col md={4} sm={6} xs={12}>
            <Card className="h-100 shadow-sm text-center">
              <Card.Body>
                <i className="bi bi-shield-check display-4 text-primary mb-3"></i>
                <Card.Title>Easy to Use</Card.Title>
                <Card.Text>
                  No security expertise required. OsWall’s intuitive interface lets you manage your site’s protection with ease.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} sm={6} xs={12}>
            <Card className="h-100 shadow-sm text-center">
              <Card.Body>
                <i className="bi bi-tools display-4 text-success mb-3"></i>
                <Card.Title>Customizable</Card.Title>
                <Card.Text>
                  Set your own rate limits and rules, and instantly block unwanted traffic. You’re always in control.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} sm={12} xs={12}>
            <Card className="h-100 shadow-sm text-center">
              <Card.Body>
                <i className="bi bi-lightning-charge display-4 text-warning mb-3"></i>
                <Card.Title>Fast & Lightweight</Card.Title>
                <Card.Text>
                  OsWall is built for speed and efficiency, so your site stays secure without slowing down.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row className="justify-content-center mt-5">
          <Col md={10} className="text-center">
            <h4 className="fw-bold mb-3">Built for Modern Web Security</h4>
            <p>
              OsWall is designed to help you protect your web applications with confidence. Whether you're a developer, business owner, or IT professional, OsWall makes security simple and effective.
            </p>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
}

export default About;