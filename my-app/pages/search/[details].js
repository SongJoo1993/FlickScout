import { useRouter } from "next/router"

export default function searchResultByDetails() {
    const router = useRouter();
    const {title, director, cast, runTimeFrom, runTimeTo,
        genre, country, language, fromRate, toRate, fromDate, toDate} = router.query;
    // const {data, error} = useSWR(`http://localhost:8080/api/movies/search?title=${title}&`);
    
    console.log(router.query);
    

//   const { objectID } = router.query;
  return (
    <>
    <h1>searchResultByDetails Page</h1>
    </>
  )
}