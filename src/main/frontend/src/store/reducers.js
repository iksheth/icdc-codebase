/*eslint-disable */
import { combineReducers } from 'redux';

import layout from '../components/Layout/LayoutState';
import dashboard from './reducer/dashboard';


export default combineReducers({
  layout,
  dashboard,
});
