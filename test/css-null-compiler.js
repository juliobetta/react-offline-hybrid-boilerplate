function noop() {
  return null;
}

require.extensions['.css']   = noop;
require.extensions['.scss']  = noop;
require.extensions['.svg']   = noop;
require.extensions['.woff2'] = noop;
require.extensions['.styl']  = noop;
require.extensions['.png']   = noop;
