import { useAtom } from 'jotai';
import { favouritesAtom } from '@/store';
import { Col, Row, Card } from 'react-bootstrap';
import Movies from '@/components/Movies';
// import ArtworkCard from '@/components/ArtworkCard';

export default function Favourites() {    
    const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);    
    console.log(favouritesList);

    return (
        <div>
            {favouritesList.length > 0 ? (
            <Row className="gy-4">
                {favouritesList.map((currentObjectID) => (
                <Col lg={3} key={currentObjectID}>
                    <Movies movieID={currentObjectID} />
                </Col>
                ))}
            </Row>
            ) : (
            <Card>
                <Card.Body>
                    <h4>Nothing Here</h4>
                    Try searching for something else.
                </Card.Body>
            </Card>
            )}
        </div>
    );
}