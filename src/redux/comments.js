import * as ActionTypes from './ActionTypes';
export const comments = (
  state = {errorMessage: null, comments: []},
  action,
) => {
  switch (action.type) {
    case ActionTypes.ADD_COMMENTS:
      return {
        ...state,
        errorMessage: null,
        comments: action.payload,
      };
    case ActionTypes.ADD_COMMENT:
      action.payload.id = state.comments.length;
      console.log(state.comments.date);
      if (state.comments.some((el) => el === action.payload)) {
        return state;
      } else {
        return {
          ...state,
          errorMessage: null,
          comments: state.comments.concat(action.payload),
        };
      }
    case ActionTypes.COMMENTS_FAILED:
      return {
        ...state,
        errorMessage: action.payload,
        comments: [],
      };
    default:
      return state;
  }
};
