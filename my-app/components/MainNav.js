import { Container, Nav, Navbar, Form} from "react-bootstrap"
import Button from "react-bootstrap/Button"
import Link from "next/link"
import { useForm } from "react-hook-form";
import Alert from "react-bootstrap/Alert";

export default function MainNav() {
    const { register, handleSubmit, setValue } = useForm({
        defaultValues :  {
            searchValue: undefined,
        }
    })
    
    // const {watch} = useForm();
    // const watchUserName = watch('searchValue');
    
    function searchValidation(data) {
        console.log(`length=${data.searchValue.length}`)
        if(data.searchValue.length <= 0) {
            console.log('length is 0!')
            return (
                <Alert variant={"danger"}>
                    <p>Please Enter a movie name you want to search.</p>
                </Alert>
            )  
        }
        console.log(data.searchValue);
    }

    function submitForm(data) {
        searchValidation(data);
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
                        placeholder="Search"
                        {...register("searchValue")}
                        className="me-2"
                        aria-label="Search"
                        />
                        {/* {watchUserName}
                        </Form.Control> */}
                        <Button variant="primary" type="submit">Search</Button>
                </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        <br /><br />
        </>
    )
  }