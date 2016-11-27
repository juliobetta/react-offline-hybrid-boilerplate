import 'babel-polyfill';
import { jsdom } from 'jsdom';
import crypto from 'crypto';
import cryptiles from 'cryptiles';

global.document = jsdom('<!doctype html><html><body></body></html>');
global.window = document.defaultView;
global.navigator = global.window.navigator;
window.memoryAdapter = require('pouchdb-adapter-memory');
window.crypto = crypto;
window.crypto.getRandomValues = cryptiles.randomString;
window.localStorage = window.sessionStorage = {
  getItem(key) {
    return this[key] || null;
  },
  setItem(key, value) {
    this[key] = value;
  },
  removeItem(key) {
    this[key] = undefined;
  },
};
