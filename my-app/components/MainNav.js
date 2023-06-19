import { Container, Nav, Navbar, Form} from "react-bootstrap"
import Button from "react-bootstrap/Button"
import Link from "next/link"
import { useForm } from "react-hook-form";
import { useRouter } from 'next/router';
import { useAtom } from "jotai";
import { useState } from "react";
// import AlertMessage from "./Alert";

export default function MainNav() {
    const router = useRouter();
    const [searchField, setSearchField] = useState("");
    const [isExpanded, setIsExpanded] = useState(false);
    // const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

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

    function submitForm(data, e) {
        const title = data.searchValue;
        e.target.reset();
        if(searchValidation(data)) {
            setIsExpanded(false);
            router.push(`/movies/${title}`);
        }
    }

    const handleToggle = () => {
        isExpanded ? setIsExpanded(false) : setIsExpanded(true);
    };
  
    const expandOff = () => {
        setIsExpanded(false);
    };

    return (
        <>
        <Navbar 
        className="navbar-dark bg-dark fixed-top" 
        expand='lg'
        expanded={isExpanded}
        >
            <Container>
                <Navbar.Brand>Movie Search Engine</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={handleToggle}/>
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Link href="/" passHref legacyBehavior>
                        <Nav.Link onClick={expandOff}>Movies</Nav.Link>
                    </Link>
                    <Link href="/about" passHref legacyBehavior>
                        <Nav.Link onClick={expandOff}>About</Nav.Link>
                    </Link>
                    <Link href="/search" passHref legacyBehavior>
                        <Nav.Link onClick={expandOff}>Advanced Search</Nav.Link>
                    </Link>
                </Nav>
                &nbsp;
                <Form className="d-flex" onSubmit={handleSubmit(submitForm)}>
                    <Form.Control
                    type="search"
                    placeholder="Quick Search by Title"
                    {...register("searchValue")}
                    className="me-2"
                    aria-label="Search"
                    />
                    <Button variant="secondary" type="submit">Search</Button>
                </Form>
                &nbsp;
                </Navbar.Collapse>
            </Container>
        </Navbar>
        <br /><br />
        </>
    )
}