import useSWR from 'swr';
import {useState, useEffect, useMemo} from 'react';
import {Pagination, Accordion} from 'react-bootstrap';
import MovieDetails from "@/components/MovieDetails";
import PageHeader from "@/components/PageHeader";

const PER_PAGE = 10;

export default function Home() {
  const [page, setPage] = useState(1);
  const [pageData, setPageData] = useState([]);
  const [total, setTotal] = useState(0);
  const address = useMemo(() => {
    return `http://localhost:8080/api/movies?page=${page}&perPage=${PER_PAGE}`
  }, [page]);

  const { data, error, isLoading } = useSWR(address);

  useEffect(() => {
    if(data) {
      setPageData(data.pageData);
      setTotal(data.total);
    }
  }, [data]);

  if(error) {
    return <p>Error!</p>
  } else if(isLoading) {
    return <p>Loading...</p>
  }

  function firstPage() {
    setPage(1);
  }

  function lastPage() {
    setPage(total / PER_PAGE);
  }

  function prevPage() {
    if(page > 1) setPage(pg => pg - 1);
  }

  function nextPage() {
    setPage(pg => pg + 1);
  }
  
  return (
    <>
      <PageHeader textHead ="Film Collection :" textTail ="Sorted by Date"/>
      <Accordion defaultActiveKey="0">
        {pageData?.map(movie => (
            <Accordion.Item eventKey={movie._id} key={movie._id}>
              <Accordion.Header>
                <strong>{movie.title}</strong>&nbsp;
                {movie.year && movie.directors ? `(${movie.year}:${movie.directors})` : ""}
              </Accordion.Header>
              <Accordion.Body>
                <MovieDetails movie={movie}/>
              </Accordion.Body>
            </Accordion.Item>
          ))}
      </Accordion>
      <br />
      <Pagination>
        <Pagination.First onClick={firstPage}/>
        <Pagination.Prev onClick={prevPage}/>
        <Pagination.Item>{page}</Pagination.Item>
        <Pagination.Next onClick={nextPage}/>
        <Pagination.Last onClick={lastPage} />
      </Pagination>
    </>
  )
}