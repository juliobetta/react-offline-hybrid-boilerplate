import { TEST, DEVELOPMENT, DESKTOP } from '../constants';

import PouchDB from 'pouchdb';
import Find    from 'pouchdb-find';
import Search  from 'pouchdb-quick-search';

PouchDB.plugin(Find);
PouchDB.plugin(Search);

if(process.env.NODE_ENV === DEVELOPMENT) {
  PouchDB.debug.enable('*');
}

const dbOptions = (() => {
  if(process.env.NODE_ENV === TEST) {
    PouchDB.plugin(window.memoryAdapter);
    return { adapter: 'memory' };
  }

  if(process.env.ENV === DESKTOP && memdown !== undefined) {
    return { db: memdown };
  }

  return {};
})();


export const setupDatabase = (database = {}) => {
  const { local, remote } = database;

  const output = {
    local  : new PouchDB(local, dbOptions),
    remote : (remote && new PouchDB(remote, { skipSetup: true })) || null
  };

  return output;
};

/* istanbul ignore next */
export const onSync = (database, {onChange, onError, onComplete}) => (
  database.local.sync(database.remote, {
    live: true,
    retry: true
  }).on('change',   onChange)
    .on('complete', onComplete)
    .on('error',    onError)
);

export const destroy = (databaseName) => {
  const database = new PouchDB(databaseName, dbOptions);
  return database.destroy();
};
