export * from './common';
export * from './defaults';
export * from './errors';
export * from './ui';
export * from './urls';

import common from './common';
import defaults from './defaults';
import errors from './errors';
import ui from './ui';
import urls from './urls';

const constants = {
  ...common,
  defaults,
  errors,
  ui,
  urls,
} as const;

export type Constants = typeof constants;
export default constants;
