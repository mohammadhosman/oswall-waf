import React from "react";
import ReactDOM from 'react-dom/client';
import NavigationBar from "../common/NavigationBar.js";
import Footer from "../common/Footer.js";
import { Container, Row, Col, Card } from 'react-bootstrap';
import "../../styling/common/App.css";
import oswallLogo from '../../images/common/oswall-logo-no-background.png';
import Hero from '../common/Hero.js';
import heroVideo from '../../videos/home.mp4';

function Index() {
  const isLoggedIn = !!localStorage.getItem('token'); // or use your auth context

  return (
    <div id="app">
      <NavigationBar />
      {/* Video background for hero section */}
      {/*
      <div style={{ position: 'relative', width: '100%', height: '60vh', overflow: 'hidden' }}>
        <video
          autoPlay
          loop
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
            filter: 'brightness(0.5)'
          }}
          src={heroVideo}
        />
        <div style={{
          position: 'relative',
          zIndex: 1,
          width: '100%',
          height: '60vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          textAlign: 'center',
        }}>
          <h1 className="display-4 fw-bold mb-3">OsWall Web Application Firewall</h1>
          <h4 className="mb-4">Made to protect your web app</h4>
          <a href={isLoggedIn ? "/dashboard" : "/register"} className="btn btn-lg btn-primary">
            {isLoggedIn ? "Dashboard" : "Register"}
          </a>
        </div>
      </div>
      */}
      <Hero 
        title="OsWall Web Application Firewall"
        subtitle="Made to protect your web app"
        showButton={true}
        buttonText={isLoggedIn ? "Dashboard" : "Register"}
        buttonLink={isLoggedIn ? "/dashboard" : "/register"}
        backgroundVideo={heroVideo}
        backgroundImage={require('../../images/index/hero.jpg')}
      />
      <Container className="my-5">
        <Row className="justify-content-center mb-4">
          <Col md={8} className="text-center">
            <img src={oswallLogo} alt="OsWall Logo" style={{ maxWidth: 120 }} className="mb-3" />
            <h2 className="fw-bold">Why OsWall?</h2>
            <p className="lead">Protect your web applications with customizable security rules, IP blocking, and real-time analytics—all in a user-friendly dashboard.</p>
          </Col>
        </Row>
        <Row className="g-4">
          <Col md={4} sm={6} xs={12}>
            <Card className="h-100 shadow-sm text-center">
              <Card.Body>
                <i className="bi bi-shield-lock display-4 text-primary mb-3"></i>
                <Card.Title>Custom Security Rules</Card.Title>
                <Card.Text>
                  Define your own rate limits and protection rules for your site. Stay in control of your security.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} sm={6} xs={12}>
            <Card className="h-100 shadow-sm text-center">
              <Card.Body>
                <i className="bi bi-ban display-4 text-danger mb-3"></i>
                <Card.Title>IP Blocking</Card.Title>
                <Card.Text>
                  Instantly block malicious IPs and manage your blocklist with ease from your dashboard.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} sm={12} xs={12}>
            <Card className="h-100 shadow-sm text-center">
              <Card.Body>
                <i className="bi bi-gear display-4 text-secondary mb-3"></i>
                <Card.Title>Easy Setup</Card.Title>
                <Card.Text>
                  Get started in minutes with a simple, user-friendly dashboard and clear setup instructions.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row className="justify-content-center mt-5">
          <Col md={8} className="text-center">
            <h4 className="fw-bold mb-3">Ready to get started?</h4>
            <a href={isLoggedIn ? "/dashboard" : "/register"} className="btn btn-lg btn-primary">
              {isLoggedIn ? "Go to Dashboard" : "Create Your Free Account"}
            </a>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
}

export default Index;
