import { 
    SET_SCREAMS, 
    SET_SCREAM,
    LOADING_DATA, 
    LIKE_SCREAM, 
    UNLIKE_SCREAM, 
    DELETE_SCREAM, 
    LOADING_UI, 
    CLEAR_ERRORS,
    POST_SCREAM,
    SET_ERRORS,
    STOP_LOADING_UI,
    SUBMIT_COMMENT,
    VALIDATE_TEST,
    INVALIDATE_TEST
} from '../types';
import axios from 'axios'

// GET ALL SCREAMS
export const getScreams = () => (dispatch) => {
    dispatch({ type: LOADING_DATA });
    axios.get('/screams')
        .then(res => {
            dispatch({
                type: SET_SCREAMS,
                payload: res.data
            });
        })
        .catch(err => {
            dispatch({
                type: SET_SCREAMS,
                payload: []
            });
        });
}

//GET A SCREAM
export const getScream = (screamId) => dispatch => {
    dispatch({ type: LOADING_UI });
    axios.get(`/screams/${screamId}`)
    .then(res => {
        dispatch({
            type: SET_SCREAM,
            payload: res.data
        });
        dispatch({ type: STOP_LOADING_UI })
    })
    .catch(err => console.log(err));
}

//POST A SCREAM
export const postScream = (newScream) => (dispatch) => {
    dispatch({ type: LOADING_UI})
    axios.post('/screams', newScream)
    .then(res => {
        dispatch({
            type: POST_SCREAM,
            payload: res.data
        });
        dispatch(clearErrors());
    })
    .catch(err => {
        dispatch({
            type: SET_ERRORS,
            payload: err.response.data
        })
    })
}

// LIKE A SCREAM
export const likeScream = (screamId) => dispatch => {
    axios.get(`/screams/${screamId}/like`)
    .then(res => {
        dispatch({
            type: LIKE_SCREAM,
            payload: res.data
        })
    })
    .catch(err => console.log(err));
}

// TEST VALIDATE TEST
export const validateTest = (likeId) => dispatch => {
    axios.get(`/likes/${likeId}/success`)
    .then(res => {
        dispatch({
            type: VALIDATE_TEST,
            payload: res.data
        })
    })
    .catch(err => console.log(err));
}

// TEST INVALIDATE TEST
export const invalidateTest = (likeId) => dispatch => {
    axios.get(`/likes/${likeId}/failure`)
    .then(res => {
        dispatch({
            type: INVALIDATE_TEST,
            payload: res.data
        })
    })
    .catch(err => console.log(err));
}

// UNLIKE A SCREAM
export const unlikeScream = (screamId) => dispatch => {
    axios.get(`/screams/${screamId}/unlike`)
    .then(res => {
        dispatch({
            type: UNLIKE_SCREAM,
            payload: res.data
        })
    })
    .catch(err => console.log(err));
}

//SUBMIT COMMENT
export const submitComment = (screamId, commentData) => (dispatch) => {
    axios.post(`/screams/${screamId}/comment`, commentData)
    .then(res => {
        dispatch({
            type: SUBMIT_COMMENT,
            payload: res.data
        });
        dispatch(clearErrors());
    })
    .catch(err => {
        dispatch({
            type: SET_ERRORS,
            payload: err.response.data
        })
    })
}

//DELETE SCREAM
export const deleteScream = (screamId) => (dispatch) => {
    axios
      .delete(`/screams/${screamId}`)
      .then(() => {
        dispatch({ type: DELETE_SCREAM, payload: screamId });
      })
      .catch((err) => console.log(err));
  };


//GET USER DATA
export const getUserData = (userHandle) => dispatch => {
      dispatch({ type: LOADING_DATA });
      axios.get(`/user/${userHandle}`)
      .then(res => {
          dispatch({
              type: SET_SCREAMS,
              payload: res.data.screams
          });
      })
      .catch(() => {
          dispatch({
              type: SET_SCREAMS,
              payload: null
          })
      })
  }

//CLEAR ERRORS
export const clearErrors = () => dispatch => {
      dispatch({ type: CLEAR_ERRORS });
  }