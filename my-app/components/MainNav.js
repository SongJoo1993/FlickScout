import { Container, Nav, Navbar, Form} from "react-bootstrap"
import Button from "react-bootstrap/Button"
import Link from "next/link"
import { useForm } from "react-hook-form";
import { useRouter } from 'next/router';
// import AlertMessage from "./Alert";

export default function MainNav() {
    const router = useRouter();
    const { register, handleSubmit } = useForm({
        defaultValues :  {
            searchValue: undefined,
        }
    })
    
    function searchValidation(data) {
        if(data.searchValue.length <= 0) {
            return alert("Please enter the movie name.")
        }
        return true;
    }

    function submitForm(data) {
        const title = data.searchValue;
        if(searchValidation(data)) {
            router.push(`/movies/${title}`); // navigate to the home route "/"
        }
    }

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
                </Nav>
                <Form className="d-flex" onSubmit={handleSubmit(submitForm)}>
                    <Form.Control
                    type="search"
                    placeholder="Quick Search By Title"
                    {...register("searchValue")}
                    className="me-2"
                    aria-label="Search"
                    />
                    <Button variant="primary" type="submit">Search</Button>
                </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        <br /><br />
        </>
    )
}