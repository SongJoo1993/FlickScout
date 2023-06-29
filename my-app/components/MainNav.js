import { Container, Nav, Navbar, Form, NavDropdown, Dropdown } from "react-bootstrap"
import Button from "react-bootstrap/Button"
import Link from "next/link"
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from 'next/router';
import { useAtom } from 'jotai';
import { searchHistoryAtom } from '@/store';
import {FaRegUserCircle} from 'react-icons/fa';

export default function MainNav() {
    const router = useRouter();
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
    const [isExpanded, setIsExpanded] = useState(false);
    
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
            setSearchHistory(current => [...current, `title=${title}`]);
            router.push(`/movies/${title}`); // navigate to the home route "/"
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
        <Navbar className="navbar-dark bg-dark fixed-top" expand='lg' expanded={isExpanded}>
            <Container>
                <Navbar.Brand>Movie Search Engine</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={handleToggle}/>
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Link href="/" passHref legacyBehavior><Nav.Link>Movies</Nav.Link></Link>
                    <Link href="/about" passHref legacyBehavior><Nav.Link>About</Nav.Link></Link>
                    <Link href="/search" passHref legacyBehavior><Nav.Link>Advanced Search</Nav.Link></Link>
                </Nav>
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
                {/* Add Icon inside title in the below tag */}
                <Dropdown style={{marginLeft: "0.7rem"}}>
                    <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                        <FaRegUserCircle />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Link href="/login" passHref legacyBehavior>
                            <Dropdown.Item>Sign in</Dropdown.Item>
                        </Link>
                        <Link href="/signup" passHref legacyBehavior>
                            <Dropdown.Item>Sign up</Dropdown.Item>
                        </Link>
                    </Dropdown.Menu>
                </Dropdown>
                {/* Appear Below when logged in successfully 
                <Nav>
                  <NavDropdown title="User Name" id="basic-nav-dropdown">
                      <Link href="/favourites" passHref legacyBehavior>
                        <NavDropdown.Item active={router.pathname === "/favourites"} onClick={expandOff}>
                          Favourites
                        </NavDropdown.Item>
                      </Link>
                      <Link href="/history" passHref legacyBehavior>
                        <NavDropdown.Item active={router.pathname === "/history"} onClick={expandOff}>
                          History
                        </NavDropdown.Item>
                      </Link>
                    </NavDropdown>
                </Nav> */}
                </Navbar.Collapse>
            </Container>
        </Navbar>
        <br /><br />
        </>
    )
}