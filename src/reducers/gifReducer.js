import { ADD_GIF, REMOVE_GIF, GET_GIFS, RESET_STATE } from "../actions/types";

const initialState = {
  gifs: [],
  gif: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_GIFS:
      return {
        ...state,
        gifs: [...state.gifs]
      };
    case ADD_GIF:
      return {
        ...state,
        gifs: [...state.gifs, action.payload]
      };
    case REMOVE_GIF:
      return {
        ...state,
        gifs: [
          ...state.gifs.slice(0, action.payload),
          ...state.gifs.slice(action.payload + 1)
        ]
      };
    case RESET_STATE:
      return {
        ...state,
        gifs: []
      };
    default:
      return state;
  }
}
