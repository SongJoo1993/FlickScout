import Link from "next/link"
import Card from 'react-bootstrap/Card';
import MovieDetails from "@/components/MovieDetails";
import PageHeader from "@/components/PageHeader";

// This function gets called at build time
export function getStaticProps() {
  // Call an external API endpoint to get posts
  return new Promise((resolve,reject)=>{
    fetch('http://localhost:8080/api/movies/573a1391f29313caabcd6f98').then(res=>res.json()).then(data=>{
      resolve({ props: { movie: data } })
    })
  })
}

export default function About(props) {
    return (
      <>
        <PageHeader textHead="Project Developer:" textTail="Song Joo"/>
        <Card className="bg-light">
            <Card.Body>
              <p>
                <span><strong>Developer's Message:</strong></span> 
                Hello, my name is Song Joo. I am a future full-stack developer! My experience as a marketing professional is where I first learned how to structure and manage website content which ultimately led me to the world of web development. I am eager to leverage my experience at a global corporation and technical skills learnt from Computer Programming Program at Seneca College in a web developer role.
              </p>
              <p>
                Link to the info about my favorite movie: <Link href="/movies/The Ace of Hearts">{props.movie.title}</Link>
              </p>
            </Card.Body>
            <MovieDetails movie={props.movie} />            
          </Card>
      </>
    )
  }