import useSWR from "swr";
import { useState, useRef } from "react";
import { Card, Button } from "react-bootstrap";
import NoImg from "../public/no-img.jpg";
import SingleMovieModal from "./SingleMovieModal";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

function Movies(props) {
  const { movieID } = props;
  const [modalShow, setModalShow] = useState(false);
  const target = useRef(null);

  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/movies/${movieID}`,
  );

  return (
    <>
      <OverlayTrigger overlay={<Tooltip id="button-tooltip-2">Check out this movie</Tooltip>}>
        <Card
          style={{
            display: "block",
            width: "auto",
            position: "relative",
            height: "100%",
            cursor: "pointer"
          }}
          onClick={() => {
            setModalShow(true);
          }}
        >
          <Card.Img
            height="70%"
            variant="top"
            src={data?.poster || NoImg.src}
            style={{ objectFit: "cover" }}
          />
          <Card.Body 
            style={{ height: "30%", position: "relative" }}
            onClick={() => {
              setModalShow(true);
            }}
          >
            <Card.Title>{data?.title || "N/A"}</Card.Title>
          </Card.Body>
        </Card>
      </OverlayTrigger>
      <br />
      {modalShow && (
        <SingleMovieModal
          show={modalShow}
          onHide={() => {
            setModalShow(false);
          }}
          removedMovie={() => {
            props.movieDeleted();
            setModalShow(false);
          }}
          movieid={movieID}
        />
      )}
      </>
  );
}

export default Movies;
