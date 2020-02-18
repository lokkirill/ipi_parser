import React from 'react';
import { render } from 'react-dom';
import PopupLoading from './containers/popup/PopupLoading';
import "../css/popup.css";

const root = document.getElementById('root');
render(<PopupLoading />, root);
