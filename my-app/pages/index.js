import useSWR from "swr";
import Alert from "react-bootstrap/Alert";
import PageHeader from "@/components/PageHeader";
import Movies from "@/components/Movies";
import { useState, useEffect } from "react";
import { Pagination, Row, Col } from "react-bootstrap";
import { getToken } from "../lib/authenticate";

const PER_PAGE = 12;

export default function Home(props) {
  const [page, setPage] = useState(1);
  const [pageData, setPageData] = useState([]);
  const [total, setTotal] = useState(0);
  const [disabled, setDisabled] = useState(false);
  const [movieDeleted, setMovieDeleted] = useState(false);
  const { title } = props;
  let totalPage = Math.ceil(total / PER_PAGE);

  const address = title
    ? `${process.env.NEXT_PUBLIC_API_URL}/movies?page=${page}&perPage=${PER_PAGE}&title=${title}`
    : `${process.env.NEXT_PUBLIC_API_URL}/movies?page=${page}&perPage=${PER_PAGE}`;

  const fetcher = (url) =>
    fetch(url, { headers: { Authorization: `JWT ${getToken()}` } }).then(
      (res) => res.json(),
    );

  const { data, error, isLoading } = useSWR(address, fetcher);

  useEffect(() => {
    if (data) {
      setPageData(data.pageData);
      setTotal(data.total);
    }
  }, [data]);
  
  // (page value cahnge -> manual loading variable (state varaible) to true) inside useEffect
  // when isLoading true,  manual loading variable to true too
  useEffect(() => {
    if (page < Math.ceil(total / PER_PAGE)) {
      setDisabled(false);
    } else if (page == Math.ceil(total / PER_PAGE)) {
      setDisabled(true);
    }
  }, [page]);

  if (error) {
    return <p>Error!</p>;
  } else if (isLoading) {
    return <p>Loading...</p>;
  }

  function pageGenerator(curPage) {
    let pageRange = [];
    let curMaxPage = Math.ceil(curPage / 10) * 10;
    let curMinPage = Math.floor((curPage - 1) / 10) * 10;

    if (curMaxPage > totalPage) curMaxPage = totalPage;
    for (curMinPage; curMinPage <= curMaxPage; curMinPage++) {
      if (curMaxPage - curMinPage != 10 && curMinPage > 0) {
        pageRange.push(
          <Pagination.Item
            key={curMinPage}
            active={curMinPage === curPage}
            onClick={pageClicked}
          >
            {curMinPage}
          </Pagination.Item>,
        );
      }
    }
    return pageRange;
  }

  function firstPage() {
    setPage(1);
  }

  function lastPage() {
    setPage(Math.ceil(total / PER_PAGE));
    setDisabled(true);
  }

  function prevPage() {
    if (page > 1) setPage((pg) => pg - 1);
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
      {movieDeleted ? (
        <Alert
          variant="primary"
          onClose={() => {
            setMovieDeleted(false);
            setPage(1);
          }}
          dismissible
        >
          <Alert.Heading>Successfully Deleted!</Alert.Heading>
        </Alert>
      ) : (
        <>
          {title ? (
            <PageHeader
              textHead="Search Key Word:"
              textTail={title.toUpperCase()}
              totalMovies={total}
            />
          ) : (
            <PageHeader
              textHead="Film Collection :"
              textTail="Sorted by Date Descending Order"
            />
          )}
          <Row xs={1} md={2} lg={4} className="g-4">
            {pageData?.map((movie) => (
              <Col key={movie._id} style={{ height: "30rem" }}>
                <Movies
                  movieID={movie._id}
                  movieDeleted={() => setMovieDeleted(true)}
                />
              </Col>
            ))}
          </Row>
          <br />
          <Pagination>
            <Pagination.First onClick={firstPage} />
            <Pagination.Prev onClick={prevPage} />
            {pageGenerator(page)}
            {disabled ? (
              <Pagination.Next disabled />
            ) : (
              <Pagination.Next onClick={nextPage} />
            )}
            <Pagination.Last onClick={lastPage} />
          </Pagination>
        </>
      )}
    </>
  );
}
