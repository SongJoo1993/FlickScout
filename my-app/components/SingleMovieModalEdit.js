import { useForm } from "react-hook-form";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function SingleMovieModalInfo(props) {    
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
      } = props.movieData;
    
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm({
        defaultValues: {
          directors: (directors.length !== 0 ? directors?.join(", ") : "N/A"),
          cast: "",
          runTimeFrom: 0,
          runTimeTo: 0,
          genre: [],
          countries: "",
          languages: "",
          fromRate: "",
          toRate: "",
          fromDate: "",
          toDate: "",
        },
      });
    return (
    <Form style={{textAlign: "left"}}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Director (Prev: <strong>{directors.length !== 0 ? directors.join(", ") : "N/A"}</strong>)</Form.Label>
        <Form.Control 
            {...register("directors")}
            className="mb-1"
            type="text" 
        />
        <Form.Label>Cast (Prev: <strong>{cast.length !== 0 ? cast?.join(", ") : "N/A"}</strong>)</Form.Label>
        <Form.Control 
            className="mb-1"
            type="text" 
        />
        <Form.Label>Genre (Prev: <strong>{genres.length !== 0 ? genres?.join(", ") : "N/A"}</strong>)</Form.Label>
        <Form.Control 
            {...register("title")}
            className="mb-1"
            type="text" 
        />
        <Form.Label>Motion Picture Rating (MPAA): (Prev: <strong>{rated ? rated : "N/A"}</strong>)</Form.Label>
        <Form.Control className="mb-1" type="text" />
        <Form.Label>IMDb (Prev: <strong>{imdb?.rating ? imdb.rating : "N/A"}</strong>)</Form.Label>
        <Form.Control className="mb-1" type="text" />
        <Form.Label>Awards (Prev: <strong>{awards?.text ? awards.text : "N/A"}</strong>)</Form.Label>
        <Form.Control className="mb-1" type="text" />
        <Form.Label>Plot (Prev: <strong>{plot ? plot : "N/A"}</strong>)</Form.Label>
        <Form.Control className="mb-1" type="text" />
      </Form.Group>
      <Button variant="primary" type="submit">Save</Button>
    </Form>
  );
}
