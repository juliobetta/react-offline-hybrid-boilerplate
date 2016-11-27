import React         from 'react';
import { IndexRoute,
         Route }     from 'react-router';
import Main          from 'views/layouts/main';
import Welcome       from 'views/pages/welcome';


export default function configRoutes(store) {

  return (
    <Route>
      <Route path='/' component={Main}>
        <IndexRoute component={Welcome} />
      </Route>
    </Route>
  );
}
