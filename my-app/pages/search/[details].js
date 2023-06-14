import { useRouter } from "next/router"
import useSWR from 'swr';

export default function searchResultByDetails() {
    const router = useRouter();
    const {details} = router.query;
    const {title, director, cast, runTimeFrom, runTimeTo,
        genre, country, language, fromRate, toRate, fromDate, toDate} = router.query;
    const {data, error} = useSWR(`
    http://localhost:8080/api/search?${details}`);

//   const { objectID } = router.query;
  return (
    <>
    <h1>searchResultByDetails Page</h1>
    </>
  )
}