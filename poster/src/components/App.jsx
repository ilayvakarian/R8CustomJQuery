import React from "react"
// import { moviesData } from "../moviesData";
import MovieItem from "./MovieItem"
import {API_URL, API_KEY_3 } from "../utils/api"
import MovieTabs from "./MovieTabs"


// UI = fn(state, props)

// App = new React.Component()

class App extends React.Component {
  constructor() {
    super();
   
    this.state = {
      movies: [],
      moviesWillWatch: [],
      sort_by: "popularity.desc",
      pages: "1",
      total_pages: "500"
    };

    console.log("Constructor");
  }

  deleteMovie = movie => {
    console.log(movie.id);
    
    const updateMovies = this.state.movies.filter(item => item.id !== movie.id);
    console.log(updateMovies);

    // this.state.movies = updateMovies;
    this.setState({
      movies: updateMovies
    });
  };

  componentDidMount() {
    console.log("DidMount");
    this.getMovies();
    console.log("after fetch")
  }

  componentDidUpdate(prevProps,prevState) {
    console.log("didUpdate")
    console.log("prev",prevProps,prevState)
    console.log("this",this.props,this.state)
    console.log("============================================")
    if (prevState.sort_by !== this.state.sort_by){
      this.getMovies();
      console.log("call API")
    }
    if (prevState.pages !== this.state.pages){
      this.getMovies();
      console.log("call API")
    }
  }
  
//   getPage = () => {

//     const total_pages = [ 1,2,3 ]
    
  
// }
  
  getMovies = () => {
    fetch(`${API_URL}discover/movie?api_key=${API_KEY_3}&sort_by=${this.state.sort_by}&page=${this.state.pages}`).then( (response) => {
      console.log("then",response)
      return response.json()
    }).then((data) => {
      console.log("data",data.total_pages)
      this.setState({
        movies: data.results,
        total_pages: data.total_pages
      })
    })
  }

  addMovieToWillWatch = movie => {
    const updateMoviesWillWatch = [...this.state.moviesWillWatch];
    updateMoviesWillWatch.push(movie);

    this.setState({
      moviesWillWatch: updateMoviesWillWatch
    });
  };

  deleteMovieFromWillWatch = movie => {
    const updateMoviesWillWatch = this.state.moviesWillWatch.filter(
      item => item.id !== movie.id
    );

    this.setState({
      moviesWillWatch: updateMoviesWillWatch
    });
  };

  updateSortBy = value => {
    this.setState({
      sort_by: value
    })
  }

  updatePages = page => {
    // console.log("udatePage --- ",page)
    this.setState({
      pages: page
    })
  }

  render() {
    console.log("render",this.state.sort_by,this.state.pages);
    return (
      <div className="container">
        <div className="row mt-4">
          <div className="col-9">
            <div className="row mb-4">
              <div className="col-12">
              <MovieTabs 
                sort_by={this.state.sort_by}
                updateSortBy={this.updateSortBy}
                pages={this.state.pages}
                updatePages={this.updatePages}
                total_pages={this.state.total_pages}
              />
              </div>
            </div>
            <div className="row">
              {this.state.movies.map(movie => {
                return (
                  <div className="col-6 mb-4" key={movie.id}>
                    <MovieItem
                      data={movie}
                      deleteMovie={this.deleteMovie}
                      addMovieToWillWatch={this.addMovieToWillWatch}
                      deleteMovieFromWillWatch={this.deleteMovieFromWillWatch}
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="col-3">
            <h4>Will Watch: {this.state.moviesWillWatch.length} movies</h4>
            <ul className="list-group">
              {this.state.moviesWillWatch.map(movie => (
                <li key={movie.id} className="list-group-item">
                  <div className="d-flex justify-content-between">
                    <p>{movie.title}</p>
                    <p>{movie.vote_average}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
       
      </div>
    );
  }
}

export default App;
