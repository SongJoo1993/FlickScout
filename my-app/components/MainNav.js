import { Container, Nav, Navbar, Form, Button} from "react-bootstrap"
import Link from "next/link"

export default function MainNav() {
    return (
        <>
        <Navbar className="navbar-dark bg-dark fixed-top" >
            <Container>
                <Navbar.Brand>Movie Search Engine</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Link href="/" passHref legacyBehavior><Nav.Link>Movies</Nav.Link></Link>
                    <Link href="/about" passHref legacyBehavior><Nav.Link>About</Nav.Link></Link>
                    <Link href="/search" passHref legacyBehavior><Nav.Link>Advanced Search</Nav.Link></Link>
                    <Form className="d-flex">
                        <Form.Control
                        type="search"
                        placeholder="Search"
                        className="me-2"
                        aria-label="Search"
                        />
                        <Button variant="outline-success">Search</Button>
                    </Form>
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        <br /><br />
        </>
    )
  }