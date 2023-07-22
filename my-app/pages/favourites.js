import useSWR from "swr";
import { useAtom } from "jotai";
import { favouritesAtom } from "@/store";
import { Col, Row, Card } from "react-bootstrap";
import Movies from "@/components/Movies";
import { readToken } from "../lib/authenticate";

export default function Favourites() {
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
  const userID = readToken()._id; 
  // get request for updated favouritesList
  

  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/user/getFavorites/${userID}`,
  );
  console.log(data);

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
