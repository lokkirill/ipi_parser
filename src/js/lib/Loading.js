import React from 'react';
import Reload from '../components/icons/Reload';
import cx from 'classnames';
import PropTypes from 'prop-types';

const Loading = ({ fullPage = false, inline = false, width = 60, height = 60 }) =>
  inline ? (
    <div className='lds-dual-ring-inline'>
      <Reload width={width} height={height} />
    </div>
  ) : (
    <div className={cx('justify-content-center align-items-center loadingOverlay', { fullPage })}>
      <div className='lds-dual-ring'>
        <Reload width={width} height={height} />
      </div>
    </div>
  );

Loading.propTypes = {
  inline: PropTypes.bool,
  width: PropTypes.number,
  height: PropTypes.number,
  fullPage: PropTypes.bool
};

export default Loading;
