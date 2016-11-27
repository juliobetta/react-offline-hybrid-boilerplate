import React                    from 'react';
import ReactDOM                 from 'react-dom';
import { hashHistory }          from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { PT_BR, EN }            from './scripts/constants';
import configureStore           from './scripts/store';
import Root                     from './scripts/views/root';

import './theme/base.scss';


const store   = configureStore(hashHistory);
const history = syncHistoryWithStore(hashHistory, store);
const target  = document.querySelector('main');
const node    = <Root routerHistory={history} store={store} />;

ReactDOM.render(node, target);

if('offlineRuntime' in window) {
  offlineRuntime.install();
}
