
export default function SingleMovieModalInfo(props) {
    const {
        _id,
        title,
        poster,
        directors,
        genres,
        plot,
        imdb,
        rated,
        cast,
        awards,
      } = props.movieData;
    return (
    <div style={{ textAlign: "left" }}>
        <h6>
        <strong>Director</strong>:{" "}
          {directors.length !== 0 ? directors.join(", ") : "N/A"}
        </h6>
        <h6>
          <strong>Cast</strong>: {cast.length !== 0 ? cast?.join(", ") : "N/A"}
        </h6>
        <h6>
          <strong>Genre</strong>: {genres.length !== 0 ? genres?.join(", ") : "N/A"}
        </h6>
        <h6>
          <strong>Motion Picture Rating (MPAA): </strong>
          {rated ? rated : "N/A"}
        </h6>
        <h6>
          <strong>IMDb Rating</strong>: {imdb?.rating ? imdb.rating : "N/A"}
        </h6>
        <h6>
          <strong>Awards</strong>: {awards?.text ? awards.text : "N/A"}
        </h6>
        <p>
          <strong>Plot</strong>: {plot ? plot : "N/A"}
        </p>
    </div>
  );
}
