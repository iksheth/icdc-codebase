import { compose } from 'recompose';
import { connect } from 'react-redux';

import NavBarView from './NavBarView';
// import { signOut } from '../../pages/login/LoginState';
import { toggleSidebar } from '../Layout/LayoutState';

export default compose(
  connect(
    (state) => ({
      isSidebarOpened: state.layout.isSidebarOpened,
    }),
    { toggleSidebar },
  ),
)(NavBarView);
