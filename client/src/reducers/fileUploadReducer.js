import {
  ADD_FILE,
  CLEAR_FILE
} from '../actions/types';

const initialState = {
  fileName: '',
  filePath: '',
  isLoaded: false
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_FILE:
      return {
        ...state,
        fileName: action.payload.fileName,
        filePath: action.payload.filePath,
        isLoaded: true
      };
    case CLEAR_FILE:
      return {
        ...state,
        fileName: null,
        filePath: null,
        isLoaded: false
      };
    default:
      return state;
  }
}
