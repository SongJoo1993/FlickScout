import { useRouter } from "next/router";
import useSWR from 'swr';


export default function SearchResults () {
    const router = useRouter();
    var queryStr = "";
    
    for(const props in router.query) {
        queryStr += `&${props}=${router.query[props]}`;
    }
    queryStr = queryStr.slice(1);
    
    const { data, error } = useSWR(`http://localhost:8080/api/search?${queryStr}`);

    return(
        <>
            <h1>searchResultByDetails Page</h1>
        </>
    )
}