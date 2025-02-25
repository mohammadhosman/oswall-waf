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
                                width="50px" 
                                height="50px"
                            />
                            <h2>OsWall Web App Security</h2>
                            <p>Company Tagline Here</p>
                        </Stack>
                    </Col>
                    <Col>
                        <Nav className="flex-column fs-5">
                            Useful Links
                            <NavLink></NavLink>
                            <NavLink></NavLink>
                            <NavLink></NavLink>
                        </Nav>
                    </Col>
                    <Col>
                        Column 3
                    </Col>
                </Row>
            </Container>
        </footer>
    );
}

export default Footer;