import useSWR from 'swr';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import NoImg from '../public/no-img.jpg';

function SingleMovieModal(props) {
    const { data, error } = useSWR(`http://localhost:8080/api/movies/${props.movieid}`);
    const { title, poster, directors, genres, plot, imdb, rated, cast, awards } = data;
    console.log(data);

    // function commaGenerator(ary) {
    //     let str = ""
    //     ary.forEach(elm => str += "elm")
    // }

    return (
        <>
            <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
                <Modal.Header>
                    <Modal.Title style={{ margin: "0 auto"}} id="contained-modal-title-vcenter">
                    <h2>{title}</h2>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ textAlign: "center"}}>
                    <img 
                    className="img-fluid"
                    src={poster || NoImg.src}
                    alt={`image of ${title}`}
                    style={{ marginTop: '20px', minWidth: '300px', maxHeight: '500px' ,minHeight: '300px', marginBottom: '25px'}}
                    />
                    <h6><strong>Director</strong>: {directors ? directors.join(', ') : 'N/A'}</h6>
                    <h6><strong>Cast</strong>: {cast ? cast.join(', ') : 'N/A'}</h6>
                    <h6><strong>Genre</strong>: {genres?.join(', ')}</h6>
                    <h6><strong>Motion Picture Rating (MPAA): </strong>{rated ? rated : 'N/A'}</h6>
                    <h6><strong>IMDb Rating</strong>: {imdb.rating ? imdb.rating : 'N/A'}</h6>
                    <h6><strong>Awards</strong>: {awards.text ? awards.text : 'N/A'}</h6>
                    <p></p>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        </>
  );
}

export default SingleMovieModal;

// function App() {
//   const [modalShow, setModalShow] = React.useState(false);

//   return (
//     <>
//       <Button variant="primary" onClick={() => setModalShow(true)}>
//         Launch vertically centered modal
//       </Button>

//       <MyVerticallyCenteredModal
//         show={modalShow}
//         onHide={() => setModalShow(false)}
//       />
//     </>
//   );
// }

// render(<App />);