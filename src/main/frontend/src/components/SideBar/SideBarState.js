import TOGGLE_SIDEBAR from '../../store';


export const initialState = {
  isSidebarOpened: true,
};

export default function LayoutReducer(state = initialState, { type }) {
  switch (type) {
    case TOGGLE_SIDEBAR:
      return {
        ...state,
        isSidebarOpened: !state.isSidebarOpened,
      };
    default:
      return state;
  }
}
