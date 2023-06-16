import useSWR from 'swr';
import {useState, useEffect, useMemo} from 'react';
import {Pagination, Accordion, Row, Col} from 'react-bootstrap';
import MovieDetails from "@/components/MovieDetails";
import PageHeader from "@/components/PageHeader";
import Movies from "@/components/Movies";

const PER_PAGE = 10;

export default function Home(props) {
  const [page, setPage] = useState(1);
  const [pageData, setPageData] = useState([]);
  const [total, setTotal] = useState(0);
  const [disabled, setDisabled] = useState(false);
  const {title, totalPage} = props;
    
  const address = title ? 
  `http://localhost:8080/api/movies?page=${page}&perPage=${PER_PAGE}&title=${title}`
  : useMemo(() => { 
    return `http://localhost:8080/api/movies?page=${page}&perPage=${PER_PAGE}`}, [page]);

  const { data, error, isLoading } = useSWR(address);

  useEffect(() => {
    if(data) {
      setPageData(data.pageData);
      setTotal(data.total);
    }

  }, [data]);

  useEffect(() => {
    if(page < Math.ceil(total / PER_PAGE))  {
      setDisabled(false);
    } else if(page == Math.ceil(total / PER_PAGE)) {
      setDisabled(true);
    }
  },[page]);

  if(error) {
    return <p>Error!</p>
  } else if(isLoading) {
    return <p>Loading...</p>
  }

  function pageGenerator(curPage) {
    const maxPage = curPage + 10;
    let a = [];
    for(curPage; curPage < maxPage; curPage++) {
      a.push(
        <Pagination.Item key={curPage} active={curPage === page} onClick={pageClicked}>
          {curPage}
        </Pagination.Item>
      )
    }
    return a;
  }

  function firstPage() {
    setPage(1);
  }

  function lastPage() {
    setPage(Math.ceil(total / PER_PAGE));
    setDisabled(true);
  }

  function prevPage() {
    if(page > 1) setPage(pg => pg - 1);
  }

  function pageClicked(event) {
    const curPage = parseInt(event.target.innerText);
    setPage(curPage);
  }

  function nextPage() {
    setPage(page + 1);
  }

  return (
    <>
      {title ? 
        <PageHeader textHead ="Search Key Word:" textTail = {title.toUpperCase()} totalMovies={total}/>
      : <PageHeader textHead ="Film Collection :" textTail ="Sorted by Date"/>
      }
      <Row xs={1} md={2} lg={4} className="g-4">
        {pageData?.map(movie => (
          <Col key={movie._id} className='h-100'>
            <Movies movieID={movie._id}/>
          </Col>
        ))}
      </Row>
      {/* <Accordion defaultActiveKey="0">
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
      </Accordion> */}
      <br />
      <Pagination>
        <Pagination.First onClick={firstPage}/>
        <Pagination.Prev onClick={prevPage}/>
        {pageGenerator(page)}
        {/* <Pagination.Item>
          {page}
        </Pagination.Item> */}
        {/* <Pagination.Item>
          {page+1}
        </Pagination.Item> */}
        {disabled ?
          <Pagination.Next disabled/>
          : <Pagination.Next onClick={nextPage}/>
        }
        <Pagination.Last onClick={lastPage} />
      </Pagination>
    </>
  )
}