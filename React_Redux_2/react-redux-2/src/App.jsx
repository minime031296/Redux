import { useState, useEffect } from 'react';
import axios from 'axios'; 
import './App.css';
import { legacy_createStore } from 'redux';
import { useDispatch, useSelector } from 'react-redux';

const API_REQUEST = "API_REQUEST";
const API_SUCCESS = "API_SUCCESS";
const API_FAILURE = "API_FAILURE";
const API_TOTALPAGES = "API_TOTALPAGES";

const fetchReducer = (state = { isLoading: false, isError: false, footballmatches: [], currentPage: 1, totalPages: 0 }, { type, payload }) => {
  switch (type) {
    case API_REQUEST:
      return { ...state, isLoading: payload };
    case API_SUCCESS:
      return { ...state, footballmatches: payload, isLoading: false };
    case API_FAILURE:
      return { ...state, isError: payload, isLoading: false };
    case API_TOTALPAGES:
      return { ...state, totalPages: payload, isLoading: false };
    default:
      return state;
  }
};

// Action creators
const setLoading = (isLoading) => ({
  type: API_REQUEST,
  payload: isLoading
});

const setFootballMatches = (footballmatches) => ({
  type: API_SUCCESS,
  payload: footballmatches
});

const setError = (isError) => ({
  type: API_FAILURE,
  payload: isError
});

const setCurrentPage = (currentPage) => ({
  type: API_TOTALPAGES,
  payload: currentPage
});


export const store = legacy_createStore(fetchReducer);

function App() {
  const dispatch = useDispatch();
  const per_page = 3;

  const { isLoading, footballmatches, isError, currentPage, totalPages } = useSelector((state) => state);

  const getData = async () => {
    dispatch(setLoading(true));
    try {
      let res = await axios.get(`https://jsonmock.hackerrank.com/api/football_matches?page=2`);
      dispatch(setFootballMatches(res.data.data));
      dispatch(setCurrentPage(res.data.page));
      dispatch(setTotalPages(res.data.total_pages));
    } catch (error) {
      dispatch(setError(true));
      console.log(error);
    }
  };

  const indexOfLastPage = currentPage * per_page;
  const indexOfFirstPage = indexOfLastPage - per_page;
  const currentPages = footballmatches.slice(indexOfFirstPage, indexOfLastPage);

  const paginate = (pageNumber) => {
    dispatch(setCurrentPage(pageNumber));
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <pre>
        {JSON.stringify(footballmatches)}
      </pre>
      {currentPages.map((match, ind) => {
        return (
          <div key={ind}>
            <p>{match.competition}</p>
            <p>{match.year}</p>
            <p>{match.round}</p>
          </div>
        );
      })}
      {/* Pagination */}
      {Array.from({ length: totalPages }, (_, i) => (
        <button key={i} onClick={() => paginate(i + 1)}>
          {i + 1}
        </button>
      ))}
    </>
  );
}

export default App;
