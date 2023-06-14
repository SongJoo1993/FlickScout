import useSWR from 'swr';
import Link from "next/link"
import { Card, Button } from 'react-bootstrap';
import NoImg from '../public/no-img.jpg';

//receive ID and spread
function Movies(props) {
    const {movieID} = props;
    const { data, error } = useSWR(`http://localhost:8080/api/movies/${movieID}`);
    
    return (
        <>
            <Card style={{ width: 'auto' }}>
                <Card.Img 
                height="20%"
                variant="top" 
                src={data?.poster || NoImg.src}
                style={{objectFit: 'cover'}}
                />
                <Card.Body>
                    <Card.Title>{data?.title || "N/A"}</Card.Title>
                    <Card.Text>
                    <strong>Director:</strong>{data?.directors}<br />
                    </Card.Text>
                <Link href={`/movies/${data?.title}`} passHref>
                    <Button variant="primary"><strong>Details</strong></Button>
                </Link>
                </Card.Body>
            </Card> 
            <br />
        </>
    )
}

export default Movies;