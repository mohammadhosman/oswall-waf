import React from "react";
import "../../styling/common/Footer.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Stack from "react-bootstrap/Stack";
import Image from "react-bootstrap/Image";
import Nav from "react-bootstrap/Nav";
import NavLink from "react-bootstrap/NavLink";

function Footer() {
    return (
        <footer id="footer">
            <Container fluid>
                <Row className="bg-dark text-white">
                    <Col className="mx-5">
                        <Stack>
                            <Image 
                                src={require("../../images/common/oswall-logo-large-no-bg.png")} 
                                alt="oswall logo" 
                                rounded
                                width="100px" 
                                height="100px"
                            />
                            <h3>OsWall Security</h3>
                        </Stack>
                    </Col>
                    <Col>
                        <Nav className="flex-column fs-5">
                            Useful Links
                            <NavLink href="#" target="_blank" className="second-column-link">Home</NavLink>
                            <NavLink href="#" target="_blank" className="second-column-link">About</NavLink>
                            <NavLink href="#" target="_blank" className="second-column-link">Contact</NavLink>
                        </Nav>
                    </Col>
                    <Col>
                        <h4>Contact Us!</h4>
                        <p>info@oswall.security</p>
                        <p>+1(604)-555-5555</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
}

export default Footer;