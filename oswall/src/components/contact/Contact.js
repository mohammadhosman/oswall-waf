import React from "react";
import { Container, Row, Col, Card } from 'react-bootstrap';
import contactVideo from '../../videos/home.mp4'; // Use your 1920x1080 video here
import NavigationBar from '../common/NavigationBar';
import Footer from '../common/Footer';
import '../../styling/common/App.css';
import '../../styling/contact/ContactForm.css';

function Contact() {
  return (
    <div id="app">
      <NavigationBar />
      <header id="contact-hero" style={{ position: 'relative', width: '100vw', height: '60vh', overflow: 'hidden' }}>
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
            filter: 'brightness(0.6) blur(1px)'
          }}
          src={contactVideo}
          onEnded={e => e.target.pause()} // freeze on last frame
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
          background: 'rgba(0,0,0,0.3)'
        }}>
          <h1 className="display-4 fw-bold mb-3">Contact Us</h1>
          <h5 className="mb-4">We're here to help. Reach out with your questions or feedback!</h5>
        </div>
      </header>
      <Container className="my-5">
        <Row className="justify-content-center">
          <Col md={7} lg={6}>
            <Card className="shadow-lg border-0 rounded-4 p-4" style={{ background: 'rgba(255,255,255,0.95)' }}>
              <Card.Body>
                <h3 className="mb-4 text-center text-primary">Send us a message</h3>
                {/* Contact form import and usage */}
                {/* <ContactForm /> */}
                {/* Inline form for clarity, you can replace with <ContactForm /> if you prefer */}
                <form id="contact-form">
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">Your Name</label>
                    <input type="text" className="form-control" id="name" placeholder="Enter your name" />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" placeholder="Enter your email" />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="message" className="form-label">Message</label>
                    <textarea className="form-control" id="message" rows="5" placeholder="Type your message here..."></textarea>
                  </div>
                  <div className="d-grid">
                    <button type="submit" className="btn btn-primary btn-lg rounded-pill shadow">Send Message</button>
                  </div>
                </form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
}

export default Contact;