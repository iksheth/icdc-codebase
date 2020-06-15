import {

} from '../../utils/dashboardUtilFunctions';


export const initialState = {
  files: [],
  error: '',
  isError: false,
  deleted: [],
};


export const TOGGLE_CHEKCBOX_IN_FILE_TABLE = 'TOGGLE_CHEKCBOX_IN_CASE_TABLE';
export const INIT_CART = 'INIT_CART';
export const CART_QUERY_ERR = 'CART_QUERY_ERR';
export const READY_CART = 'READY_CART';
export const DELETE_FILE = 'DELETE_CASES';
export const DELETE_FILE_WITH_RECORD = 'DELETE_CASES_WITH_RECORD';

export const deleteFilesAction = (payload) => ({
  type: DELETE_FILE,
  payload,
});

export const deleteFilesWithRecordAction = (payload) => ({
  type: DELETE_FILE_WITH_RECORD,
  payload,
});

const deleteFiles = (selected, files) => {
  if (!selected || selected.length === 0) return files;
  return files.filter((id) => !selected.includes(id));
};


export const getCart = () => ({
  type: INIT_CART,
});


const shouldInitCart = (state) => state.cart.files !== JSON.parse(localStorage.getItem('userSelectedFiles'));

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
    files: ids,
  };
  return ({
    type: TOGGLE_CHEKCBOX_IN_FILE_TABLE,
    payload,
  });
}


export default function CARTReducer(state = initialState, action) {
  switch (action.type) {
    case DELETE_FILE: {
      const afterDeletion = deleteFiles(action.payload, state.files);
      localStorage.setItem('userSelectedFiles', JSON.stringify(afterDeletion));
      return {
        ...state,
        files: afterDeletion,
      };
    }
    case DELETE_FILE_WITH_RECORD: {
      const afterDeletion = deleteFiles(action.payload, state.files);
      localStorage.setItem('userSelectedFiles', JSON.stringify(afterDeletion));
      return {
        ...state,
        files: afterDeletion,
        deleted: action.payload,
      };
    }

    case INIT_CART: {
      return {
        ...state,
        isError: false,
        files: JSON.parse(localStorage.getItem('userSelectedFiles')) || [],
      };
    }


    case TOGGLE_CHEKCBOX_IN_CASE_TABLE: {
      const previousState = Object.assign([], state.files);
      // remove duplicates in case's ids.
      const unique = action.payload.files.length > 0
        ? Array.from(
          new Set(
            previousState.concat(action.payload.files),
          ),
        ) : previousState;

      localStorage.setItem('userSelectedFiles', JSON.stringify(unique) || []);
      return {
        ...state,
        isError: false,
        cases: unique,
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
