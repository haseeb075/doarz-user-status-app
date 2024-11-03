import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies } from './redux/movieSlice';
import { setUserStatus as setUserStatusInRedux } from './redux/userSlice';
import { useUserContext } from './context/UserContext';

function App() {
  const dispatch = useDispatch();

  // Redux state
  const reduxMovies = useSelector((state) => state.movies.movies);
  const movieStatus = useSelector((state) => state.movies.status);
  const reduxUserStatus = useSelector((state) => state.user.userStatus);

  // Context state
  const { contextUserStatus, updateUserStatusInContext } = useUserContext();

  // Local state to track where the user status is managed (Context or Redux)
  const [userSource, setUserSource] = useState('Context');

  useEffect(() => {
    // Dispatch action to fetch movies into Redux
    dispatch(fetchMovies());
  }, [dispatch]);

  // Function to toggle between Context and Redux for user status
  const toggleUserSource = () => {
    setUserSource((prevSource) => (prevSource === 'Context' ? 'Redux' : 'Context'));
  };

  // Function to update user status in both Redux and Context
  const updateUserStatus = (status) => {
    if (userSource === 'Context') {
      updateUserStatusInContext(status);
    } else {
      dispatch(setUserStatusInRedux(status));
    }
  };

  // Determine the current user status based on the selected source
  const currentUserStatus = userSource === 'Context' ? contextUserStatus : reduxUserStatus;

  return (
    <div>
      <h1>Movie App</h1>
      
      {/* Display and toggle user status source */}
      <div>
        <h2>User Status: {currentUserStatus} (Source: {userSource})</h2>
        <button className="btn btn-primary mr-2" onClick={() => updateUserStatus('guest')}>Set Guest</button>
        <button className="btn btn-primary mr-2" onClick={() => updateUserStatus('member')}>Set Member</button>
        <button className="btn btn-primary mr-2" onClick={() => updateUserStatus('admin')}>Set Admin</button>
        <button className="btn btn-secondary" onClick={toggleUserSource}>
          Toggle User Source (Currently: {userSource})
        </button>
      </div>

      {/* Display Movies from Redux */}
      <div>
        <h2>Movies from Redux</h2>
        {movieStatus === 'loading' && <p>Loading movies...</p>}
        {movieStatus === 'failed' && <p>Failed to fetch movies.</p>}
        {movieStatus === 'succeeded' && (
          <div className="row">
            {reduxMovies.map((movie) => (
              <div className="col-md-4 mb-4" key={movie.id}>
                <div className="card h-100">
                  {movie.image && movie.image.medium && (
                    <img src={movie.image.medium} className="card-img-top" alt={movie.name} />
                  )}
                  <div className="card-body">
                    <h5 className="card-title">{movie.name}</h5>
                    <p className="card-text">Premiered: {movie.premiered}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

export default App;
