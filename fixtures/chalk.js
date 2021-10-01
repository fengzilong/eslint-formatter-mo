'use strict'
// from chalk, used as fixture

import ansiStyles from 'ansi-styles';
import supportsColor from 'supports-color';
import {
  stringReplaceAll,
  stringEncaseCRLFWithFirstIndex,
} from './util.js';
import template from './templates.js';

const {stdout: stdoutColor, stderr: stderrColor} = supportsColor;
const {isArray} = Array;

const GENERATOR = Symbol('GENERATOR');
const STYLER = Symbol('STYLER');
const IS_EMPTY = Symbol('IS_EMPTY');

// `supportsColor.level` → `ansiStyles.color[name]` mapping
const levelMapping = [
  'ansi',
  'ansi',
  'ansi256',
  'ansi16m',
];

const styles = Object.create(null);

const applyOptions = (object, options = {}) => {
  if (options.level && !(Number.isInteger(options.level) && options.level >= 0 && options.level <= 3)) {
    throw new Error('The `level` option should be an integer from 0 to 3');
  }

  // Detect level if not set manually
  const colorLevel = stdoutColor ? stdoutColor.level : 0;
  object.level = options.level === undefined ? colorLevel : options.level;
};

export default chalk;
