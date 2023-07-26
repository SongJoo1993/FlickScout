import { useAtom } from "jotai";
import { favouritesAtom } from "@/store";
import { Col, Row, Card } from "react-bootstrap";
import Movies from "@/components/Movies";

export default function Favourites() {
  const [favouritesMovie, setFavouritesMovie] = useAtom(favouritesAtom);

  return (
    <div>
      {favouritesMovie.length > 0 ? (
        <Row className="gy-4">
          {favouritesMovie.map((currentObjectID) => (
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
