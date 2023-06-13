import { useRouter } from "next/router"
import useSWR from 'swr'
import Carousel from 'react-bootstrap/Carousel'
import NoImg from '../../public/no-img.jpg'
import Alert from 'react-bootstrap/Alert';
import Home from '../index';
import PageHeader from "@/components/PageHeader";

const PER_PAGE = 100;

export default function MovieTitle() {
  const router = useRouter();
  const {title} = router.query;
  const {data, error} = useSWR(`http://localhost:8080/api/movies?page=1&perPage=${PER_PAGE}&title=${title}`);
  console.log(router.query);
  function backToHome() {
    router.push('/');
  }

  if(data?.pageData == null || data?.pageData == undefined) {
    return null;
  }
  else if(data?.pageData?.length === 0) {
    return (
        <>
          <br />
          <Alert variant='danger' onClose={() => backToHome()} dismissible>
            <Alert.Heading> No Results Found with "{title.toUpperCase()}".</Alert.Heading>
          </Alert>
        </>
      )
  }
  else if (data?.pageData?.length >= 10) {
    return (
      <>
        <Home title={title} totalPage={data.pageData.length}/>
      </>
    )
  }

  return (
    <>
      <PageHeader textHead ="Search Key Word:" textTail = {title.toUpperCase()} totalMovies={data?.pageData.length}/>
      <Carousel variant="dark" className="w-100 h-100">
      {data?.pageData?.map(movie => (
        <Carousel.Item className="c-container" key={movie._id}>
            <div style={{display: 'flex', justifyContent: 'center'}}>
            <a href={"/singleMovie/" + movie._id}>
            <img 
              className="img-fluid"
              src={movie.poster || NoImg.src}
              alt={`image of ${movie.title}`}
              style={{ marginTop: '20px', minWidth: '300px', maxHeight: '500px' ,minHeight: '300px', marginBottom: '25px'}}
            />
            </a>
            </div>
          <Carousel.Caption style={{position: 'relative', left: 'auto', right: 'auto'}}>
            <h3>{movie.title} {movie.year && movie.directors ? `(${movie.year} : ${movie.directors})` : ""}</h3>
            <p>{movie.fullplot}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
      </Carousel>
    </>
    )
}