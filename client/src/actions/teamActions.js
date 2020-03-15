import axios from 'axios';


import {
  GET_ERRORS,
  GET_TEAMS,
  GET_TEAM,
  LOADING_TEAM,
  SET_CURRENT_TEAM
} from './types';

export const getAllTeams = () => (dispatch) => {
  dispatch({ type: LOADING_TEAM });
  axios.get('/api/team')
    .then((res) => dispatch({
      type: GET_TEAMS,
      payload: res.data
    }))
    .catch((err) => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }));
};

export const getTeam = (id) => (dispatch) => {
  axios.get(`/api/team/${id}`)
    .then((res) => dispatch({
      type: GET_TEAM,
      payload: res.data
    }))
    .catch((err) => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }));
};

export const setCurrentTeam = (currentTeam) => (dispatch) => {
  dispatch({
    type: SET_CURRENT_TEAM,
    payload: currentTeam
  });
};
