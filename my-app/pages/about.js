import Card from 'react-bootstrap/Card';
import PageHeader from '@/components/PageHeader';

// This function gets called at build time
export function getStaticProps() {
  // Call an external API endpoint to get posts
  return new Promise((resolve, reject) => {
    fetch('http://localhost:8080/api/movies/573a1391f29313caabcd6f98')
      .then((res) => res.json())
      .then((data) => {
        resolve({ props: { movie: data } });
      });
  });
}

export default function About(props) {
  return (
    <>
      <PageHeader textHead="Project Developer:" textTail="Song Joo" />
      <Card className="bg-light">
        <Card.Body>
          <p>
            <span>
              <strong>Hello Message: </strong>
            </span>
            Hello, my name is Song Joo. I am a future full-stack developer who
            is dedicated to maintaining a continuous learning mindset and
            tackling challenges with resilience. My goal is to contribute to web
            solutions while fostering positive collaborations.
          </p>
        </Card.Body>
        {/* Project Description to be added! */}
        <Card.Body>
          <p>
            <span>
              <strong>Project Name: </strong>
            </span>
            Movie Search Engine
          </p>
          <p>
            <span>
              <strong>
                Project Details:{' '}
                <a href="https://github.com/SongJoo1993/MovieSearchEngine/blob/prettier-test/README.md">
                  Click for Details!
                </a>{' '}
              </strong>
            </span>
          </p>
        </Card.Body>
      </Card>
    </>
  );
}
