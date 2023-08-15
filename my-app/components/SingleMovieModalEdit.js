import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from "react-bootstrap/Alert";

export default function SingleMovieModalEdit(props) {
  const router = useRouter();
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
          title: (title.length !== 0 ? title : "N/A"),
          directors: (directors.length !== 0 ? directors?.join(", ") : "N/A"),
          cast: (cast.length !== 0 ? cast?.join(", ") : "N/A"),
          genre: (genres.length !== 0 ? genres?.join(", ") : "N/A"),
          rated: (rated !== undefined ? rated : "NOT RATED"),
          imdb: (imdb != undefined &&  imdb.rating !== 0 ? imdb.rating : "N/A"),
          awards: (awards != undefined && awards?.text?.length !== 0 ? awards.text : "N/A"),
          plot: (plot !== undefined ? plot : "N/A")          
        },
      });

      async function updateMovie(userID, data) {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/movies/${userID}`, {
          method: `PUT`,
          body: JSON.stringify({
            data: data
          }),
          headers: {
            "content-type": "application/json",
          },
        });
        const resData = await res.json();

        if(res.status === 200) {
          return true;
        }
        else {
          throw new Error(resData.message);
        }
      }

      function submitForm(data) {
        // With data and _id, submit updated info to the server!
        try {
          if(updateMovie(_id, data)) {
            console.log(props)
            props.saveEdit();
          }
        }
        catch(err) {
          return (
            <>
              <Alert variant="danger" onClose={() => router.push("/")} dismissible>
                <Alert.Heading> Edit Failed! Please try again.</Alert.Heading>
              </Alert>
            </>
          );
        }
      }

    return (
    <Form 
      style={{textAlign: "left"}}
      onSubmit={handleSubmit(submitForm)}
    >
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Title</Form.Label>
        <Form.Control 
            {...register("title")}
            className="mb-1"
            type="text" 
        />
        <Form.Label>Director</Form.Label>
        <Form.Control 
            {...register("directors")}
            className="mb-1"
            type="text" 
        />
        <Form.Label>Cast</Form.Label>
        <Form.Control
          {...register("cast")}
          className="mb-1"
          type="text" 
        />
        <Form.Label>Genre</Form.Label>
        <Form.Control 
            {...register("genre")}
            className="mb-1"
            type="text" 
        />
        <Form.Label>Motion Picture Rating (MPAA):</Form.Label>
        <Form.Control
          {...register("rated")}
          className="mb-1" 
          type="text" 
          />
        <Form.Label>IMDb</Form.Label>
        <Form.Control
          {...register("imdb")}
          className="mb-1" 
          type="text" 
          />
        <Form.Label>Awards</Form.Label>
        <Form.Control
          {...register("awards")}
          className="mb-1" 
          type="text" 
          />
        <Form.Label>Plot</Form.Label>
        <Form.Control
          {...register("plot")}
          className="mb-1" 
          as="textarea" 
          />
      </Form.Group>
      <Button variant="primary" type="submit">Save</Button>
    </Form>
  );
}
