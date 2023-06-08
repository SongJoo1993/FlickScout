import { useRouter } from "next/router"
import useSWR from 'swr'
import MovieDetails from "@/components/MovieDetails"
import Error from "next/error"
import PageHeader from "@/components/PageHeader"
import { Card } from "react-bootstrap"

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
      {data?.map(movie => (
        <Card key={movie._id}>
          <Card.Header>
            <PageHeader textHead="Movie Title:" textTail={movie.title}/>
          </Card.Header>
          <Card.Body>
            <MovieDetails movie={movie}/>
          </Card.Body>
        </Card>
      ))}
    </>
    )
}