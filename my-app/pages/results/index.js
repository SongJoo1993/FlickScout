import { useRouter } from "next/router";
import { useState, useEffect, useMemo } from "react";
import useSWR from "swr";
import Movies from "@/components/Movies";
import PageHeader from "@/components/PageHeader";
import { Pagination, Row, Col } from "react-bootstrap";
import Alert from "react-bootstrap/Alert";

const PER_PAGE = 12;

export default function SearchResults() {
  const [page, setPage] = useState(1);
  const [pageData, setPageData] = useState([]);
  const [total, setTotal] = useState(0);
  const [disabled, setDisabled] = useState(false);
  const router = useRouter();
  var queryStr = "";
  let totalPage = Math.ceil(total / PER_PAGE);

  for (const props in router.query) {
    queryStr += `&${props}=${router.query[props]}`;
  }
  queryStr = queryStr.slice(1);

  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/movies/search?${queryStr}&page=${page}&perPage=${PER_PAGE}`,
  );

  useEffect(() => {
    if (data) {
      setPageData(data.pageData);
      setTotal(data.total);
    }
  }, [data]);

  useEffect(() => {
    if (page < Math.ceil(total / PER_PAGE)) {
      setDisabled(false);
    } else if (page == Math.ceil(total / PER_PAGE)) {
      setDisabled(true);
    }
  }, [page]);

  function backToHome() {
    router.push("/search");
  }

  if (error) {
    return <p>Error!</p>;
  } else if (isLoading) {
    return <p>Loading...</p>;
  } else if (data?.pageData?.length === 0) {
    return (
      <>
        <br />
        <Alert variant="danger" onClose={() => backToHome()} dismissible>
          <Alert.Heading> No Results Found .</Alert.Heading>
        </Alert>
      </>
    );
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
      <PageHeader
        textHead="Advanced Search Result Sorted by Date Ascending"
        textTail=" "
        totalMovies={data?.total}
      />
      <Row xs={1} md={2} lg={4} className="g-4">
        {pageData?.map((movie) => (
          <Col key={movie._id} style={{ height: "30rem" }}>
            <Movies movieID={movie._id} />
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
  );
}
