import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Form, Button, Alert } from "react-bootstrap";
import shieldImage from "../../images/login/shield.png";
import NavigationBar from "../common/NavigationBar";
import Footer from "../common/Footer";
import "../../styling/common/App.css";
import "../../styling/login/LoginForm.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const backendUrl = process.env.REACT_APP_BACKEND_URL;
      const response = await axios.post(`${backendUrl}/api/auth/login`, { email, password });
      localStorage.setItem("token", response.data.token);
      setLoading(false);
      navigate("/dashboard");
    } catch (err) {
      setLoading(false);
      setError("Login failed. Please check your credentials and try again.");
    }
  };

  return (
    <div
      id="app"
      style={{
        minHeight: "100vh",
        backgroundImage: `url(${shieldImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "rgba(0,0,0,0.7)", // dark overlay
          zIndex: 0,
        }}
      />
      <NavigationBar />
      <Container className="my-5" style={{ position: "relative", zIndex: 1 }}>
        <Row className="justify-content-center">
          <Col md={6} lg={5}>
            <Card
              className="shadow-sm p-4"
              style={{
                background: "rgba(30,30,30,0.95)",
                color: "white",
                border: "none",
              }}
            >
              <Card.Body>
                <h3 className="mb-4 text-center">Sign In</h3>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <div className="d-grid mb-3">
                    <Button
                      variant="primary"
                      type="submit"
                      size="lg"
                      disabled={loading}
                    >
                      {loading ? "Signing in..." : "Login"}
                    </Button>
                  </div>
                </Form>
                <div className="text-center mt-3">
                  <span>Don't have an account? </span>
                  <a href="/register">Register</a>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
}

export default Login;