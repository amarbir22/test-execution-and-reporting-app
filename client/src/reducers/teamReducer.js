import {
  GET_TEAMS,
  GET_TEAM, ADD_TEAM,
  LOADING_TEAM
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
        currentTeam: action.payload,
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
    case LOADING_TEAM:
      return {
        ...state,
        isLoading: true
      };
    default:
      return state;
  }
}
