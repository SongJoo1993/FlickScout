import { useRouter } from "next/router";
import {useState, useEffect, useMemo} from 'react';
import useSWR from 'swr';
import Movies from "@/components/Movies";
import PageHeader from "@/components/PageHeader";
import {Pagination, Row, Col} from 'react-bootstrap';

const PER_PAGE = 10;

export default function SearchResults () {
    const [page, setPage] = useState(1);
    const [pageData, setPageData] = useState([]);
    const [total, setTotal] = useState(0);
    const [disabled, setDisabled] = useState(false);
    const router = useRouter();
    var queryStr = "";
    let totalPage = Math.ceil(total / PER_PAGE);
    console.log(totalPage);
    // var resultStr = "";
    // Make result string dynamically

    for(const props in router.query) {
        queryStr += `&${props}=${router.query[props]}`;
    }
    queryStr = queryStr.slice(1);
    
    const { data, error, isLoading } = useSWR(`http://localhost:8080/api/search?${queryStr}&page=${page}&perPage=${PER_PAGE}`);

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
        console.log("curPage",curPage);
        let pageRange = [];
        // 0-10 => 10, 11 - 20 => 20
        let curMaxPage = Math.ceil(curPage/10)*10;
        // when curPage % 10 is true, curMaxPage and curMinPage equal
        // and printing only 1 page number since no min and max numbers to be printed
        // curPage -1 prevents this bug
        let curMinPage = Math.floor((curPage - 1)/10)*10;
        
        if(curMaxPage > totalPage) curMaxPage = totalPage;
        for(curMinPage; curMinPage <= curMaxPage; curMinPage++) {
            if(curMinPage > 0) {
                pageRange.push(
                    <Pagination.Item key={curMinPage} active={curMinPage === curPage} onClick={pageClicked}>
                      {curMinPage}
                    </Pagination.Item>
                  )
            }}
        // for(curPage; curPage < maxPage && curPage <= totalPage; curPage++) {
        //   pageRange.push(
        //     <Pagination.Item key={curPage} active={curPage === page} onClick={pageClicked}>
        //       {curPage}
        //     </Pagination.Item>
        //   )}
        // console.log(pageRange);
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
      if(page > 1) setPage(pg => pg - 1);
    }

    function pageClicked(event) {
      const curPage = parseInt(event.target.innerText);
      setPage(curPage);
    }

    function nextPage() {
      setPage(page + 1);
    }
    
    return(
        <>
        <PageHeader textHead ="Advanced Search Result Sorted by Date Ascending" textTail = " " totalMovies={data?.total}/>
        <Row xs={1} md={2} lg={4} className="g-4">
        {pageData?.map(movie => (
          <Col key={movie._id} className='h-100'>
            <Movies movieID={movie._id}/>
          </Col>
        ))}
        </Row>
        <br />
        <Pagination>
          <Pagination.First onClick={firstPage}/>
          <Pagination.Prev onClick={prevPage}/>
          {pageGenerator(page)}
          {disabled ?
            <Pagination.Next disabled/>
            : <Pagination.Next onClick={nextPage}/>
          }
          <Pagination.Last onClick={lastPage} />
        </Pagination>
        </>
    )
}