import { useRouter } from "next/router"
import useSWR from 'swr'
import Carousel from 'react-bootstrap/Carousel';
import NoImg from '../../public/no-img.jpg'
import Image from 'next/image'
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
  } else if(data?.pageData?.length === 0) {
    return (
        <p>{title} doesn't Exist in our System!</p>
      )
  }

  return (
    <>
      <Carousel variant="dark" className="w-100 h-100">
      {data?.pageData?.map(movie => (
        <Carousel.Item className="c-container" key={movie._id}>
            <div style={{display: 'flex', justifyContent: 'center'}}>
            <img 
              className="img-fluid"
              src={movie.poster || NoImg.src}
              alt={`image of ${movie.title}`}
              style={{ marginTop: '20px', minWidth: '300px', maxHeight: '500px' ,minHeight: '300px', marginBottom: '25px'}}
            />
            </div>
          <Carousel.Caption style={{position: 'relative', left: 'auto', right: 'auto'}}>
            <h3>{movie.title}</h3>
            <p>{movie.fullplot}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
      </Carousel>
    </>
    )
}