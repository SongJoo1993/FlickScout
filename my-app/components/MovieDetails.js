import { Container, Row, Col } from "react-bootstrap"

export default function MovieDetails(props) {
    const {poster} = props.movie;   

    return (
        <Container>
            <Row>
            {poster ? <Col md><img src={poster} alt="poster" className="w-100" /><br /><br /></Col> : <></>}
            <Col md>
              <strong>Directed By:</strong> {props.movie.directors.join(',')}<br /><br />
              <p>{props.movie.fullplot}</p>
              <strong>Cast:</strong> {props.movie.cast.join(', ') || "N/A"} <br /><br />
              <strong>Awards:</strong> {props.movie.awards.text || "N/A"}<br />
              <strong>IMDB Rating:</strong> {props.movie.imdb.rating} ({props.movie.imdb.votes} votes)
            </Col>
            </Row>
        </Container>
    )
}