import { createStore,
         applyMiddleware }          from 'redux';
import { routerMiddleware }         from 'react-router-redux';
import thunk                        from 'redux-thunk';
import createLogger                 from 'redux-logger';
import { PRODUCTION }               from '../constants';
import reducers                     from '../reducers';

const loggerMiddleware = createLogger({
  level: 'info',
  collapsed: true,
});


export default function configureStore(browserHistory = null) {
  const availableMiddlewares = {
    shared:      [thunk],
    development: [loggerMiddleware],
    production:  [],
    test:        []
  };

  if(browserHistory) {
    availableMiddlewares.shared.push(routerMiddleware(browserHistory));
  }

  const middlewares = [
    ...availableMiddlewares.shared,
    ...availableMiddlewares[process.env.NODE_ENV]
  ];

  const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);
  return createStoreWithMiddleware(reducers);
}
