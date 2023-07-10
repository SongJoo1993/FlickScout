import useSWR from 'swr';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import NoImg from '../public/no-img.jpg';
import { useAtom } from 'jotai';
import { favouritesAtom } from '@/store';
import { useState } from 'react';

function SingleMovieModal(props) {
  console.log(props.movieid);
  const { data, error } = useSWR(
    `http://localhost:8080/api/movies/${props.movieid}`,
  );
  const {
    _id,
    title,
    poster,
    directors,
    genres,
    plot,
    imdb,
    rated,
    cast,
    awards,
  } = data;
  const [favouritesMovie, setFavouritesMovie] = useAtom(favouritesAtom);
  const [showAdded, setShowAdded] = useState(() => emptyFavLists());

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
            style={{ margin: '0 auto' }}
            id="contained-modal-title-vcenter"
          >
            <h2>{title}</h2>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ textAlign: 'center' }}>
          {/* Move the Image to the center */}
          <img
            className="img-fluid"
            src={poster || NoImg.src}
            alt={`image of ${title}`}
            style={{
              marginTop: '20px',
              minWidth: '300px',
              maxHeight: '500px',
              minHeight: '300px',
              marginBottom: '25px',
            }}
          />
          <div style={{ textAlign: 'left' }}>
            <h6>
              <strong>Director</strong>:{' '}
              {directors ? directors?.join(', ') : 'N/A'}
            </h6>
            <h6>
              <strong>Cast</strong>: {cast ? cast?.join(', ') : 'N/A'}
            </h6>
            <h6>
              <strong>Genre</strong>: {genres?.join(', ')}
            </h6>
            <h6>
              <strong>Motion Picture Rating (MPAA): </strong>
              {rated ? rated : 'N/A'}
            </h6>
            <h6>
              <strong>IMDb Rating</strong>: {imdb?.rating ? imdb.rating : 'N/A'}
            </h6>
            <h6>
              <strong>Awards</strong>: {awards?.text ? awards.text : 'N/A'}
            </h6>
            <p>
              <strong>Plot</strong>: {plot ? plot : 'N/A'}
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
          <Button
            variant={showAdded ? 'primary' : 'outline-primary'}
            onClick={favouritesClicked}
          >
            {showAdded ? '+ Favourite(added)' : '+ Favourite'}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default SingleMovieModal;
