/* eslint-disable */
import {

} from '../../utils/dashboardUtilFunctions';


export const initialState = {
  error: '',
  isError: false,
  deleted: [],
  fileIDs:[],
};


export const TOGGLE_CHEKCBOX_IN_TABLE = 'TOGGLE_CHEKCBOX_IN_TABLE';
export const INIT_CART = 'INIT_CART';
export const CART_QUERY_ERR = 'CART_QUERY_ERR';
export const READY_CART = 'READY_CART';
export const DELETE_FILES = 'DELETE_FILES';
export const DELETE_FILES_WITH_RECORD = 'DELETE_FILES_WITH_RECORD';

export const deleteFilesAction = (payload) => ({
  type: DELETE_FILES,
  payload,
});


// TBD
export function receiveCases(casesIds) {
  const payload = {
    cases: casesIds,
  };
  return ({
    type: TOGGLE_CHEKCBOX_IN_TABLE,
    payload,
  });
};

// TBD
export const deleteCasesAction = (payload) => ({
  type: DELETE_FILES,
  payload,
});


export const deleteFilesWithRecordAction = (payload) => ({
  type: DELETE_FILES_WITH_RECORD,
  payload,
});

const deleteFiles = (selected, files) => {
  if (!selected || selected.length === 0) return files;
  return files.filter((id) => !selected.includes(id));
};


export const getCart = () => ({
  type: INIT_CART,
});


const shouldInitCart = (state) => state.cart.fileIDs !== JSON.parse(localStorage.getItem('userSelectedFiles'));

const readyCart = () => ({
  type: READY_CART,
});


export function initCart() {
  return (dispatch, getState) => {
    if (shouldInitCart(getState())) {
      return dispatch(getCart());
    }
    return dispatch(readyCart());
  };
}


export const toggleCheckboxInCaseTable = (payload) => ({
  type: TOGGLE_CHEKCBOX_IN_CASE_TABLE,
  payload,
});


export function receiveFiles(ids) {
  const payload = {
    fileIDs: ids,
  };
  return ({
    type: TOGGLE_CHEKCBOX_IN_TABLE,
    payload,
  });
}


export default function CARTReducer(state = initialState, action) {
  switch (action.type) {
    case DELETE_FILES: {
      const afterDeletion = deleteFiles(action.payload, state.fileIDs);
      localStorage.setItem('userSelectedFiles', JSON.stringify(afterDeletion));
      return {
        ...state,
        fileIDs: afterDeletion,
      };
    }
    case DELETE_FILES_WITH_RECORD: {
      const afterDeletion = deleteFiles(action.payload, state.fileIDs);
      localStorage.setItem('userSelectedFiles', JSON.stringify(afterDeletion));
      return {
        ...state,
        fileIDs: afterDeletion,
        deleted: action.payload,
      };
    }

    case INIT_CART: {
      return {
        ...state,
        isError: false,
        fileIDs: JSON.parse(localStorage.getItem('userSelectedFiles')) || [],
      };
    }


    case TOGGLE_CHEKCBOX_IN_TABLE: {
      const previousState = Object.assign([], state.fileIDs);
      // remove duplicates in case's ids.
      const unique = action.payload.fileIDs.length > 0
        ? Array.from(
          new Set(
            previousState.concat(action.payload.fileIDs),
          ),
        ) : previousState;

      localStorage.setItem('userSelectedFiles', JSON.stringify(unique) || []);
      return {
        ...state,
        isError: false,
        fileIDs: unique,
      };
    }
    case CART_QUERY_ERR: {
      return {
        ...state,
        isError: true,
        error: action.payload,
      };
    }

    case READY_CART: {
      return {
        ...state,
      };
    }
    default:
      return state;
  }
}
