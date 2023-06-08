import { useRouter } from "next/router"
import useSWR from 'swr'
import MovieDetails from "@/components/MovieDetails"
import Error from "next/error"
import PageHeader from "@/components/PageHeader"
import { Card } from "react-bootstrap"
import Carousel from 'react-bootstrap/Carousel';
import Image from 'next/image'
import NoImg from '../../public/no-img.jpg'

export default function MovieTitle() {
  const router = useRouter();
  const {title} = router.query;
  const {data, error} = useSWR(`http://localhost:8080/api/movies?page=1&perPage=10&title=${title}`);

  if(data == null || data == undefined) {
    return null;
  } else if(data.length === 0) {
    return <Error statusCode={404} />
  }

  return (
    <>
      <Carousel variant="dark" className="w-100 h-100">
      {data?.map(movie => (
        // <Card key={movie._id}>
        //   <Card.Header>
        //     <PageHeader textHead="Movie Title:" textTail={movie.title}/>
        //   </Card.Header>
        //   <Card.Body>
        //     <MovieDetails movie={movie}/>
        //   </Card.Body>
        // </Card>
        <Carousel.Item className="c-container">
            <Image 
              className="img-fluid"
              src={movie.poster || NoImg}
              alt={`image of ${movie.title}`}
              width={800}
              height={800}
            />
          <Carousel.Caption>
            <h3>{movie.title}</h3>
            <p>{movie.fullplot}</p>
          </Carousel.Caption>
          <style jsx> {`
          .c-container {
            display: "flex",
            justifyContent: "center",
          }
          `} </ style>
        </Carousel.Item>
      ))}
      </Carousel>
    </>
    )
}