import * as ActionTypes from './ActionTypes';
import {baseURL} from '../shared/baseURL';
import moment from 'moment';

export const fetchComments = () => (dispatch) => {
  return fetch(baseURL + 'comments')
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            'Error' + response.status + ':' + response.statusText,
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        var errorMessage = new Error(error.message);
        throw errorMessage;
      },
    )
    .then((response) => response.json())
    .then((comments) => dispatch(addComments(comments)))
    .catch((error) => dispatch(commentsFailed(error.message)));
};

export const commentsFailed = (errorMessage) => ({
  type: ActionTypes.COMMENTS_FAILED,
  payload: errorMessage,
});

export const addComments = (comments) => ({
  type: ActionTypes.ADD_COMMENTS,
  payload: comments,
});

export const fetchDishes = () => (dispatch) => {
  dispatch(dishesLoading());
  return fetch(baseURL + 'dishes')
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            'Error' + response.status + ':' + response.statusText,
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        var errorMessage = new Error(error.message);
        throw errorMessage;
      },
    )
    .then((response) => response.json())
    .then((dishes) => dispatch(addDishes(dishes)))
    .catch((error) => dispatch(dishesFailed(error.message)));
};

export const dishesLoading = () => ({
  type: ActionTypes.DISHES_LOADING,
});

export const dishesFailed = (errorMessage) => ({
  type: ActionTypes.DISHES_FAILED,
  payload: errorMessage,
});

export const addDishes = (dishes) => ({
  type: ActionTypes.ADD_DISHES,
  payload: dishes,
});

export const fetchPromos = () => (dispatch) => {
  dispatch(promosLoading());
  return fetch(baseURL + 'promotions')
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            'Error' + response.status + ':' + response.statusText,
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        var errorMessage = new Error(error.message);
        throw errorMessage;
      },
    )
    .then((response) => response.json())
    .then((promotions) => dispatch(addPromos(promotions)))
    .catch((error) => dispatch(promosFailed(error.message)));
};

export const promosLoading = () => ({
  type: ActionTypes.PROMOS_LOADING,
});

export const promosFailed = (errorMessage) => ({
  type: ActionTypes.PROMOS_FAILED,
  payload: errorMessage,
});

export const addPromos = (promotions) => ({
  type: ActionTypes.ADD_PROMOS,
  payload: promotions,
});

export const fetchLeaders = () => (dispatch) => {
  dispatch(leadersLoading());

  return fetch(baseURL + 'leaders')
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            'Error' + response.status + ':' + response.statusText,
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        var errorMessage = new Error(error.message);
        throw errorMessage;
      },
    )
    .then((response) => response.json())
    .then((leaders) => dispatch(addLeaders(leaders)))
    .catch((error) => dispatch(leadersFailed(error.message)));
};

export const leadersLoading = () => ({
  type: ActionTypes.LEADERS_LOADING,
});

export const leadersFailed = (errorMessage) => ({
  type: ActionTypes.LEADERS_FAILED,
  payload: errorMessage,
});

export const addLeaders = (leaders) => ({
  type: ActionTypes.ADD_LEADERS,
  payload: leaders,
});

export const postFavorite = (dishId) => (dispatch) => {
  setTimeout(() => {
    dispatch(addFavorite(dishId));
  }, 500);
};
export const addFavorite = (dishId) => ({
  type: ActionTypes.ADD_FAVORITE,
  payload: dishId,
});

export const deleteFavorite = (dishId) => ({
  type: ActionTypes.DELETE_FAVORITE,
  payload: dishId,
});

export const addComment = (comment) => ({
  type: ActionTypes.ADD_COMMENT,
  payload: comment,
});

export const postComment = (newComment) => (dispatch) => {
  const myDate = new Date();
  const currentDate = new Date(
    myDate.getTime() - myDate.getTimezoneOffset() * 60000,
  ).toISOString();
  newComment.date = currentDate;
  newComment.id = null;
  setTimeout(() => {
    dispatch(addComment(newComment));
  }, 500);
};
