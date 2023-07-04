import { useRouter } from "next/router"
import { useState } from 'react';
import useSWR from 'swr'
import Carousel from 'react-bootstrap/Carousel'
import NoImg from '../../public/no-img.jpg'
import Alert from 'react-bootstrap/Alert';
import Home from '../index';
import PageHeader from "@/components/PageHeader";
import { getToken } from "../../lib/authenticate";

// import SingleMovieModal from '@/components/SingleMovieModal'

const PER_PAGE = 100;

export default function MovieTitle() {
  const router = useRouter();
  const {title} = router.query;
  const fetcher = (url) => fetch(url, { headers: { Authorization: `JWT ${getToken()}` }}).then((res) => res.json());
  const {data, error} = useSWR(`http://localhost:8080/api/movies?page=1&perPage=${PER_PAGE}&title=${title}`, fetcher);
  const [modalShow, setModalShow] = useState(false);

  function backToHome() {
    router.push('/');
  }

  console.log("title detail page entered", data)

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
              <img 
                className="img-fluid"
                src={movie.poster || NoImg.src}
                alt={`image of ${movie.title}`}
                style={{ marginTop: '20px', minWidth: '300px', maxHeight: '500px' ,minHeight: '300px', marginBottom: '25px'}}
                onClick={() => {setModalShow(true)}}
              />
            </div>
          <Carousel.Caption style={{position: 'relative', left: 'auto', right: 'auto'}}>
            <h3>{movie.title} {movie.year && movie.directors ? `(${movie.year} : ${movie.directors})` : ""}</h3>
            {/* <p>{movie.fullplot}</p> */}
          </Carousel.Caption>
          {/* {
          modalShow ? 
          <SingleMovieModal 
              show={modalShow}
              onHide={() => setModalShow(false)}
              movieid={movie._id}
          /> : <></>
          } */}
      </Carousel.Item>
      ))}
      </Carousel>
    </>
    )
}