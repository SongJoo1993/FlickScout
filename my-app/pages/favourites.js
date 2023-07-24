import useSWR from "swr";
import { useAtom } from "jotai";
import { useEffect } from 'react';
import { favouritesAtom } from "@/store";
import { Col, Row, Card } from "react-bootstrap";
import Movies from "@/components/Movies";
import { readToken } from "../lib/authenticate";

export default function Favourites() {
  const [favouritesMovie, setFavouritesMovie] = useAtom(favouritesAtom);
  const userID = readToken()._id; 
  
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/user/getFavorites/${userID}`,
    );

  useEffect(() => {
    if(data?.length > 0) {
      // Add elements in data that are not in favouritesMovie to favouritesMovie
      let filteredList = data.filter(val => !favouritesMovie.includes(val));
      // console.log("filteredList: ", filteredList);
      // console.log("favouritesMovie: ", favouritesMovie);
      // setFavouritesMovie((current) => [...current, ...data]);
    }
    console.log(favouritesMovie);
    console.log(data);
  }, []);    
  
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
