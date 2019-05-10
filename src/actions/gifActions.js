import { GET_GIFS, ADD_GIF, REMOVE_GIF, RESET_STATE } from "./types";

export const getGifs = () => dispatch => {
  dispatch({
    type: GET_GIFS,
    payload: null
  });
};

export const addGif = gifData => dispatch => {
  //dispatch gif to be added
  dispatch({
    type: ADD_GIF,
    payload: gifData
  });
};

export const removeGif = index => dispatch => {
  //dispatch id for removal from gif array
  dispatch({
    type: REMOVE_GIF,
    payload: index
  });
};

export const resetState = () => dispatch => {
  dispatch({
    type: RESET_STATE,
    payload: null
  });
};
