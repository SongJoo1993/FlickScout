import Card from "react-bootstrap/Card";

export default function PageHeader(props) {
  return (
    <>
      <Card className="bg-light">
        <Card.Body>
          <strong>{props.textHead}</strong> {props.textTail}{" "}
          {props.totalMovies ? `(${props.totalMovies} Movies Searched)` : ""}
        </Card.Body>
      </Card>
      <br />
    </>
  );
}
