import { Container, Row, Col } from "react-bootstrap";

function Footer() {
  const currYear = new Date().getFullYear();

  return (
    <footer className="footer-bg text-light">
      <Container>
        <Row>
          <Col className="text-center py-3">
            <p>MusicStore &copy; {currYear}</p>
          </Col>
        </Row>
      </Container>
    </footer>
  )

}

export default Footer;