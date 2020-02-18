import React from 'react';

const Reload = props => (
  <svg
    {...props}
    viewBox='0 0 100 100'
    preserveAspectRatio='xMidYMid'
    className='lds-reload'
    style={{ background: '#000' }}
  >
    <g transform='rotate(311.901 50 50)'>
      <path d='M50 15A35 35 0 1 0 74.787 25.213' fill='none' stroke='#FFF' strokeWidth='8' />
      <path d='M49 -1L49 31L65 15L49 -1' fill='#FFF' />
      <animateTransform
        attributeName='transform'
        type='rotate'
        calcMode='linear'
        values='0 50 50;360 50 50'
        keyTimes='0;1'
        dur='1s'
        begin='0s'
        repeatCount='indefinite'
      />
    </g>
  </svg>
);

export default Reload;
