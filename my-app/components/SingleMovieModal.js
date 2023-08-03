import useSWR from "swr";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import NoImg from "../public/no-img.jpg";
import { useAtom } from "jotai";
import { favouritesAtom } from "@/store";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Alert from "react-bootstrap/Alert";
import SingleMovieModalInfo from "@/components/SingleMovieModalInfo";
import SingleMovieModalEdit from "@/components/SingleMovieModalEdit";

function SingleMovieModal(props) {
  const router = useRouter();
  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/movies/${props.movieid}`,
  );
  const {
    _id,
    title,
    poster,
    genres
  } = data;
  const [favouritesMovie, setFavouritesMovie] = useAtom(favouritesAtom);
  const [showAdded, setShowAdded] = useState(() => emptyFavLists());
  const [showEdit, setShowEdit] = useState(false);
  const [editMade, setEditMade] = useState(false);

  useEffect(() => {
    console.log("edit made",editMade);
    console.log("showEdit",showEdit);
  }, [editMade]);

  function emptyFavLists() {
    return favouritesMovie.includes(_id);
  }


  function favouritesClicked() {
    if (showAdded) {
      setFavouritesMovie((current) => current.filter((fav) => fav != _id));
      setShowAdded(false);
    } else {
      setFavouritesMovie((current) => [...current, _id]);
      setShowAdded(true);
    }
  }

  function eidtClicked() {
    if (showEdit) {
      setShowEdit(false);
    } else {
      setShowEdit(true);
    }
  }

  if (!data) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        backdrop="static"
      >
        <Modal.Header>
          <Modal.Title
            style={{ margin: "0 auto" }}
            id="contained-modal-title-vcenter"
          >
            <h2>{title}</h2>
          </Modal.Title>
          {showEdit ? 
            <></> : 
            <Button onClick={eidtClicked} style={{width:"4rem", fontSize: "1rem"}}>
            Edit
          </Button>
          }
        </Modal.Header>
        <Modal.Body style={{ textAlign: "center" }}>
          {/* Move the Image to the center */}
          <img
            className="img-fluid"
            src={poster || NoImg.src}
            alt={`image of ${title}`}
            style={{
              marginTop: "20px",
              minWidth: "300px",
              maxHeight: "500px",
              minHeight: "300px",
              marginBottom: "25px",
            }}
          />
          {showEdit ? 
          <SingleMovieModalEdit 
            movieData={data}
            saveEdit={() => {
              setEditMade(true);
              setShowEdit(false);
            }  
            }
          /> :  editMade ? 
          (<Alert variant="primary">
            <Alert.Heading>Successfully Edited!</Alert.Heading>
          </Alert>)
          :
          <SingleMovieModalInfo
            movieData={data}
          />}
        </Modal.Body>
        { showEdit ? <></> :
          <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
          <Button
            variant={showAdded ? "primary" : "outline-primary"}
            onClick={favouritesClicked}
          >
            {showAdded ? "+ Favourite (added)" : "+ Favourite"}
          </Button>
        </Modal.Footer>}
      </Modal>
    </>
  );
}

export default SingleMovieModal;
