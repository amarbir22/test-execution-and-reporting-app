import {
  ADD_TEAM,
  CLEAR_TEAM_MESSAGE,
  GET_TEAM,
  GET_TEAMS,
  LOADING_TEAM,
  SET_CURRENT_TEAM
} from '../actions/types';

const initialState = {
  existingTeams: [],
  currentTeam: {
    id: '',
    teamName: undefined,
    teamEmail: '',
    teamApps: [],
    date: ''
  },
  isLoading: true
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_TEAM:
      return {
        ...state,
        message: action.payload.message,
        currentTeam: action.payload.team,
        isLoading: false
      };
    case GET_TEAM:
      return {
        ...state,
        currentTeam: action.payload,
        isLoading: false
      };
    case GET_TEAMS:
      return {
        ...state,
        existingTeams: action.payload.existingTeams,
        isLoading: false
      };
    case SET_CURRENT_TEAM:
      // TODO this is same as GET_TEAM which needs to be fixed!
      return {
        ...state,
        currentTeam: action.payload,
        isLoading: false
      };
    case LOADING_TEAM:
      return {
        ...state,
        isLoading: true
      };
    case CLEAR_TEAM_MESSAGE:
      return {
        ...state,
        message: null
      };
    default:
      return state;
  }
}
