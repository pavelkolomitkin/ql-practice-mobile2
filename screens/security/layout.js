import React from 'react';
import CommonLayout from '../../components/common/layout';

const Layout = ({ title, children }) => {
 return (
  <CommonLayout>
      { children }
  </CommonLayout>
 );
};

export default Layout;