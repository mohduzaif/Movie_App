import React, { Component } from "react";
// import { movies } from './getMovies';

export default class List extends Component {
  constructor() {
    // console.log("Constructor called!!");
    super();
    this.state = {
      hover: "",
      movies: [],
      currpage: 1,
      favouriteMovies: localStorage.getItem("movies") ? JSON.parse(localStorage.getItem("movies")).map((movieObj) => movieObj.id) : [], //conatin movies id.
    };
    // this.updatedMovies = [];
  }

  handleEnter = (id) => {
    this.setState({
      hover: id,
    });
  };
  handleLeave = () => {
    this.setState({
      hover: "",
    });
  };

  async componentDidMount() {
    // console.log("component did mount called");
    let result = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=d0b8333ad911dd05f71c4eddecd0f830&language=en-US&page=1`
    );
    let data = await result.json();
    // console.log(data);
    // console.log(data.results);

    this.setState({
      movies: data.results,
    });
  }

  componentDidUpdate() {
    // console.log("Componentcd DidUpdate Called");
  }

  async getUdatedMovies() {
    let result = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=d0b8333ad911dd05f71c4eddecd0f830&language=en-US&page=${this.state.currpage}`
    );
    let data = await result.json();
    // console.log(data);
    // console.log(data.results);

    this.setState({
      movies: [...data.results],
    });
  }

  handlePrevPage = () => {
    if (this.state.currpage > 1) {
      this.setState(
        {
          currpage: this.state.currpage - 1,
        },
        this.getUdatedMovies
      );
    }
  };

  handleNextPage = () => {
    this.setState(
      {
        currpage: this.state.currpage + 1,
      },
      this.getUdatedMovies
    );
  };

  handleFavourites = (movieObj) => {
    // console.log(movieObj);
    let updatedMovies = JSON.parse(localStorage.getItem("movies")) || [];
    if (this.state.favouriteMovies.includes(movieObj.id)) {
      // if id already present remove that movie from the favourite.
      updatedMovies = updatedMovies.filter((movie) => movie.id !== movieObj.id);
    } else {
      // if id is not present then, add that movie into the favourites.
      updatedMovies.push(movieObj);
    }

    localStorage.setItem("movies", JSON.stringify(updatedMovies));

    // console.log(this.updatedMovies);
    let tempMovie = updatedMovies.map((movieObj) => movieObj.id);
    this.setState({
      favouriteMovies: [...tempMovie],
    });
  };

  componentWillUnmount() {
    // console.log("Will Unmount called");
  }

  render() {
    // let allMovies = movies.results;
    // console.log("Render Method called");
    return (
      <>
        {this.state.movies.length === 0 ? (
          <div className="spinner">
            <div className="spinner-border text-primary" role="status">
              <span className="sr-only"></span>
            </div>
          </div>
        ) : (
          <>
            <div>
              <h3 className="trending display-4" style={{ margin: "1rem" }}>
                Trending
              </h3>
              <div className="movies-list">
                {this.state.movies.map((movieObj) => {
                  return (
                    <div
                      className="card movie-card"
                      onMouseEnter={() => this.handleEnter(movieObj.id)}
                      onMouseLeave={this.handleLeave}
                      key={movieObj.id}
                    >
                      <img
                        src={`https://image.tmdb.org/t/p/original/${movieObj.backdrop_path}`}
                        className="card-img-top movie-img"
                        alt="..."
                      />
                      <h5 className="card-title movie-title">
                        {movieObj.original_title}
                      </h5>
                      <div className="button-wrapper">
                        {this.state.hover === movieObj.id && (
                          <a
                            href="#/"
                            className="btn btn-info movie-button"
                            onClick={() => {
                              this.handleFavourites(movieObj);
                            }}
                          >
                            {this.state.favouriteMovies.includes(movieObj.id)
                              ? `Remove from Favourites`
                              : `Add to Favourites`}
                          </a>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <nav aria-label="Page navigation example" className="pagination">
              <ul className="pagination">
                <li className="page-item" onClick={this.handlePrevPage}>
                  <a className="page-link" href="#/">
                    Previous
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#/">
                    {this.state.currpage}
                  </a>
                </li>
                <li className="page-item" onClick={this.handleNextPage}>
                  <a className="page-link" href="#/">
                    Next
                  </a>
                </li>
              </ul>
            </nav>
          </>
        )}
      </>
    );
  }
}
