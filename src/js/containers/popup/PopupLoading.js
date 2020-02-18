import React from 'react';
// import Header from '../../components/profile/Header';
import Loading from '../../lib/Loading';

export default ({ children }) => (
  <div className='cashback-app cashback-extension'>
    <div className='content'>
      {/* <div>
        <Header showBack={false} hideLink disableHelp />
      </div> */}
      <div className='text-center'>{children}</div>
      <Loading />
    </div>
  </div>
);
