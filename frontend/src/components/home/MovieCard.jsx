import { NavLink } from 'react-router-dom'

const imageBaseUrl = "https://image.tmdb.org/t/p/w500";
const MovieCard = ({movie}) => {
  console.log(movie)

  if(!movie){
    return
  }
  return (
    <div className='bg-[#23232578] text-[#ffd] max-w-[600px] w-full flex flex-col sm:flex-row gap-6 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300'>
      <div className='w-full sm:max-w-[350px] h-[300px] sm:h-full'>
        <img
          src={`${imageBaseUrl}/${movie.poster_path}`} alt={`${movie.title}`}
          className="w-full h-full object-cover rounded-lg mb-4"
        />
      </div>
      <div className='max-w-full md:max-w-[350px] w-full'>
        <h3 className="text-xl font-semibold mb-2">{movie.title}</h3>
        <p className="text-gray-300 mb-4">{movie.overview}</p>
        <div className='flex justify-between items-center gap-6'>

        <p className="text-gray-300 mb-4">Rated {movie.vote_average}/10</p>
        <p className="text-gray-300 mb-4">{movie.release_date}</p>
        </div>
        <NavLink to={`/movie-details/${movie.id}`} className=" text-blue-500 hover:text-blue-700 transition-colors duration-300">
          View Details
        </NavLink>
      </div>

    </div>
  )
}

export default MovieCard