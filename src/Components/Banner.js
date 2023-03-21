import React, { Component } from "react";
// import {movies} from './getMovies'
export default class Banner extends Component {

    /* Here we are fetch the movies data using axios api*/
    constructor() {
      super();
      this.state = {
        movies : [],
      }
    } 

    async componentDidMount() {
      let result = await fetch("https://api.themoviedb.org/3/movie/popular?api_key=d0b8333ad911dd05f71c4eddecd0f830&language=en-US&page=1");
      let data = await result.json();
      // console.log(data.results); //data is an object.

      this.setState({
        movies : [...data.results]
      });
    }

    render() {
        // let movie = movies.results;
        return(
          <>
            {
              this.state.movies.length === 0 ? (
                <div className="spinner">
                  <div className="spinner-border text-warning" role="status">
                    <span className="sr-only"></span>
                  </div>
                </div>
              ) : (
                <div className="card banner-card" >
                <img src={`https://image.tmdb.org/t/p/original/${this.state.movies[0].backdrop_path}`} className="card-img-top banner-img" alt="..." />
                  <h5 className="card-title banner-title">{this.state.movies[0].original_title}</h5>
                  <p className="card-text banner-text">
                    {this.state.movies[0].overview}
                  </p>
                  {/* <a href="#" class="btn btn-primary">
                    Go somewhere
                  </a> */}
              </div>
              ) 
            }
          </>
        );
    }
}