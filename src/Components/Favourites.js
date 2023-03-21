import React, { Component } from "react";
// import Navbar from "./Navbar";
export default class Favourites extends Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      genre: [],
      currGenre: "All Genre",
      currText: "",
      limitPerPage: 5,
      currPage: 1,
    };
  }

  async componentDidMount() {
    // console.log("component did mount called");
    // let result = await fetch(
    //   `https://api.themoviedb.org/3/movie/popular?api_key=d0b8333ad911dd05f71c4eddecd0f830&language=en-US&page=1`
    // );
    // let data = await result.json();
    let data = JSON.parse(localStorage.getItem("movies"));
    // console.log(data);
    // console.log(data.results);

    let genreId = {
      28: "Action",
      12: "Adventure",
      16: "Animation",
      35: "Comedy",
      80: "Crime",
      99: "Documentary",
      18: "Drama",
      10751: "Family",
      14: "Fantasy",
      36: "History",
      27: "Horror",
      10402: "Music",
      9648: "Mystery",
      10749: "Romance",
      878: "Sci-Fi",
      10770: "TV",
      53: "Thriller",
      10752: "War",
      37: "Western",
    };

    let allGenre = [];
    // here we can also used filter to make this allGenre array.
    data.map((movieObj) => {
      if (!allGenre.includes(genreId[movieObj.genre_ids[0]])) {
        // let movieType = genreId[movieObj.genre_ids[0]];
        allGenre.push(genreId[movieObj.genre_ids[0]]);
      }
    });
    allGenre.unshift("All Genre");
    // console.log(allGenre);

    this.setState({
      movies: [...data],
      genre: [...allGenre],
    });
  }

  handleGenre = (e) => {
    let genre = e.target.innerText;
    // console.log(genre);
    this.setState({
      currGenre: genre,
    });
  };

  handleText = (e) => {
    // console.log(e.target.value);
    this.setState({
      currText: e.target.value,
    });
  };

  getFilterMovies = (filteredMovies) => {
    let getMovies = filteredMovies.filter((movieObj) => {
      let movieName = movieObj.original_title.toLowerCase();
      return movieName.includes(this.state.currText);
    });
    return getMovies;
  };

  handleSortPopularityAsc = () => {
    let allMovies = this.state.movies;
    allMovies.sort((objectA, objectB) => {
      return objectA.popularity - objectB.popularity;
    });
    this.setState({
      movies: [...allMovies],
    });
  };
  handleSortPopularityDesc = () => {
    let allMovies = this.state.movies;
    allMovies.sort((objectA, objectB) => {
      return objectB.popularity - objectA.popularity;
    });
    this.setState({
      movies: [...allMovies],
    });
  };
  handleSortRatingAsc = () => {
    let allMovies = this.state.movies;
    allMovies.sort((objectA, objectB) => {
      return objectA.vote_average - objectB.vote_average;
    });
    this.setState({
      movies: [...allMovies],
    });
  };
  handleSortRatingDesc = () => {
    let allMovies = this.state.movies;
    allMovies.sort((objectA, objectB) => {
      return objectB.vote_average - objectA.vote_average;
    });
    this.setState({
      movies: [...allMovies],
    });
  };

  handleDelete = (id) => {
    // console.log(id);
    let newMovies = this.state.movies.filter( (movieObj) => {
      return movieObj.id !== id;
    });
    this.setState({
      movies : [...newMovies],
    });
    localStorage.setItem("movies", JSON.stringify(newMovies));
  };

  render() {
    let genreId = {
      28: "Action",
      12: "Adventure",
      16: "Animation",
      35: "Comedy",
      80: "Crime",
      99: "Documentary",
      18: "Drama",
      10751: "Family",
      14: "Fantasy",
      36: "History",
      27: "Horror",
      10402: "Music",
      9648: "Mystery",
      10749: "Romance",
      878: "Sci-Fi",
      10770: "TV",
      53: "Thriller",
      10752: "War",
      37: "Western",
    };

    // filter those movies according to the click on the genre.
    let filteredMovies = this.state.movies;
    if (this.state.currText !== "") {
      //called a getFilterMovies function to get the seached movies.
      filteredMovies = this.getFilterMovies(this.state.movies);

      // filteredMovies = filteredMovies.filter( (movieObj) => {
      //   let movieName = movieObj.original_title.toLowerCase();
      //   return movieName.includes(this.state.currText);
      // });
    }
    if (this.state.currGenre !== "All Genre") {
      filteredMovies = filteredMovies.filter(
        (movieObj) => genreId[movieObj.genre_ids[0]] === this.state.currGenre
      );
    }
    // else {
    //   filteredMovies = this.state.movies;
    // }
    
    let noOfPages = Math.ceil(filteredMovies.length / this.state.limitPerPage);
    let pagesArr = [];
    for (let i = 1; i <= noOfPages; ++i) {
      pagesArr.push(i);
    }
    let startIdx = (this.state.currPage - 1) * this.state.limitPerPage;
    let endIdx = startIdx + this.state.limitPerPage;

    filteredMovies = filteredMovies.slice(startIdx, endIdx);

    return (
      <>
        {/* <Navbar /> */}
        <div className="row">
          <div className="col-3 p-5">
            <ul class="list-group">
              {this.state.genre.map((genre) => {
                return this.state.currGenre === genre ? (
                  <li class="list-group-item active">{genre}</li>
                ) : (
                  <li class="list-group-item" onClick={this.handleGenre}>
                    {genre}
                  </li>
                );
              })}
              {/* <li class="list-group-item">Action</li>
              <li class="list-group-item">Fantasy</li>
              <li class="list-group-item">Animation</li> */}
            </ul>
          </div>
          <div className="col p-5">
            <div className="Inupt-tags">
              <input
                type="text"
                className="col-9"
                placeholder="Search"
                value={this.state.currText}
                onChange={this.handleText}
              ></input>
              <input
                type="number"
                className="col-3"
                placeholder="Results per page"
                value={this.state.limitPerPage}
                onChange={(e) =>
                  this.setState({ limitPerPage: Number(e.target.value) })
                }
              ></input>
            </div>
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">Title</th>
                  <th scope="col">Genre</th>
                  <th scope="col">
                    <i
                      class="fa-solid fa-sort-up"
                      onClick={this.handleSortPopularityAsc}
                    />
                    Popularity
                    <i
                      class="fa-solid fa-sort-down"
                      onClick={this.handleSortPopularityDesc}
                    />
                  </th>
                  <th scope="col">
                    <i
                      class="fa-solid fa-sort-up"
                      onClick={this.handleSortRatingAsc}
                    />
                    Rating
                    <i
                      class="fa-solid fa-sort-down"
                      onClick={this.handleSortRatingDesc}
                    />
                  </th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {filteredMovies.map((movieObj) => (
                  <tr>
                    <td>
                      <img
                        src={`https://image.tmdb.org/t/p/original/${movieObj.backdrop_path}`}
                        style={{ width: "7rem" }}
                        alt=""
                      />
                      {movieObj.original_title}
                    </td>
                    <td>{genreId[movieObj.genre_ids[0]]}</td>
                    <td>{movieObj.popularity}</td>
                    <td>{movieObj.vote_average}</td>
                    <td>
                      <button
                        className="btn btn-outline-danger"
                        onClick={() => {
                          this.handleDelete(movieObj.id);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <nav aria-label="Page navigation example" className="pagination">
            <ul className="pagination">
              {pagesArr.map((pageNumber) => {
                return (
                  <li
                    className="page-item"
                    onClick={() =>
                      this.setState({ currPage: Number(pageNumber) })
                    }
                  >
                    <a className="page-link" href="#/">
                      {pageNumber}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </>
    );
  }
}
