import Card from "react-bootstrap/Card";
import PageHeader from "@/components/PageHeader";

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
          <p>
            <span>
              <strong>Project Name: </strong>
            </span>
            Flick Scout
          </p>
          <p>
            <span>
              <strong>
                Project Details:{" "}
                <a href="https://github.com/SongJoo1993/MovieSearchEngine/blob/prettier-test/README.md">
                  Click for Details!
                </a>{" "}
              </strong>
            </span>
          </p>
        </Card.Body>
      </Card>
    </>
  );
}
