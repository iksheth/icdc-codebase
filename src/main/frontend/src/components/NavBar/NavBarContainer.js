import { compose, lifecycle } from 'recompose';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { isEqual } from 'lodash';


import NavBarView from './NavBarView';
// import { signOut } from '../../pages/login/LoginState';
import { toggleSidebar } from '../Layout/LayoutState';

export default compose(
  withRouter,
  connect(
    (state) => ({
      isSidebarOpened: state.layout.isSidebarOpened,
    }),
    { toggleSidebar },
  ),
  lifecycle({
    // componentDidMount() {
    //   let lastPathname = this.props.location.pathname;
    //   this.removeListen = this.props.history.listen(location => {
    //     if (location.pathname !== lastPathname) {
    //       window.scrollTo(0, 0);
    //       lastPathname = location.pathname;
    //     }
    //   });
    // },
    // componentWillUnmount(){
    //   this.removeListen();
    // },
    shouldComponentUpdate({ location: nextLocation }) {
      const pathName = this.props.location.pathname;
      console.log('pathName', pathName);
      console.log('location', nextLocation.pathname);

      return (
        true
      );
    },
  }),
)(NavBarView);
