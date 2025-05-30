import axios from 'axios';

const OMDB_API_KEY = process.env.OMDB_API_KEY;
const OMDB_BASE_URL = 'http://www.omdbapi.com/';

export interface Movie {
  title: string;
  year: string;
  imdbId: string;
  type: string;
  poster: string;
}

export interface MovieDetails extends Movie {
  plot: string;
  actors: string;
  director: string;
  genre: string;
  runtime: string;
  imdbRating: string;
}

interface OMDBMovie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

interface OMDBMovieDetails extends OMDBMovie {
  Plot: string;
  Actors: string;
  Director: string;
  Genre: string;
  Runtime: string;
  imdbRating: string;
}

interface SearchResponse {
  Search: OMDBMovie[];
  totalResults: string;
  Response: string;
}

export const searchMovies = async (query: string): Promise<Movie[]> => {
  try {
    console.log( { OMDB_API_KEY });
    const response = await axios.get<SearchResponse>(OMDB_BASE_URL, {
      params: {
        apikey: OMDB_API_KEY,
        s: query,
        type: 'movie'
      }
    });
    return (response.data.Search || []).map(movie => ({
      title: movie.Title,
      year: movie.Year,
      imdbId: movie.imdbID,
      type: movie.Type,
      poster: movie.Poster
    }));
  } catch (error) {
    console.error('Error searching movies:', error);
    return [];
  }
};

export const getMovieDetails = async (imdbId: string): Promise<MovieDetails | null> => {
  try {
    const response = await axios.get<OMDBMovieDetails>(OMDB_BASE_URL, {
      params: {
        apikey: OMDB_API_KEY,
        i: imdbId,
        plot: 'full'
      }
    });
    return {
      title: response.data.Title,
      year: response.data.Year,
      imdbId: response.data.imdbID,
      type: response.data.Type,
      poster: response.data.Poster,
      plot: response.data.Plot,
      actors: response.data.Actors,
      director: response.data.Director,
      genre: response.data.Genre,
      runtime: response.data.Runtime,
      imdbRating: response.data.imdbRating
    };
  } catch (error) {
    console.error('Error fetching movie details:', error);
    return null;
  }
}; 