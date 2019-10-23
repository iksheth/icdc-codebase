import { combineReducers } from 'redux';
import layout from '../components/Layout/LayoutState';
// import dashboard from '../';
import dashboard from '../pages/dashboard/dashboardState';

export default combineReducers({
  layout,
  dashboard,
});
