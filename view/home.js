'use strict';
const chalk = require('chalk');
const env = require('../config/env');

const title = '😃  Welcome to use React-ost-cli';
const description = 'A simple CLI for scaffolding React projects ♍';
const criticalWidth = 60;
const version = require('../package').version;
const colorSequence = [
  'green',
  'magenta',
  'cyan',
  'greenBright',
  'blueBright',
  'cyanBright'
];

const getColor = () => Math.floor(Math.random() * 5);
const getWidth = () => {
  let termWidth;
  if (process.stdout.isTTY) {
    termWidth = process.stdout.columns - 10;
  } else {
    termWidth = criticalWidth;
  }
  return termWidth;
};
module.exports = function () {
  const termWidth = process.env.NODE_ENV === env.prod ? getWidth() : criticalWidth;
  if (termWidth >= criticalWidth) {
    console.log(chalk[colorSequence[getColor()]](`
  ┌${'─'.repeat(termWidth)}┐
  ${' '.repeat((termWidth - title.length) / 2)}${title}
  ${' '.repeat((termWidth - description.length) / 2)}${description}
  ${' '.repeat((termWidth - version.length) / 2)}V${version}
  └${'─'.repeat(termWidth)}┘`)
    );
  } else {
    console.log(chalk[colorSequence[getColor()]](`
  ┌${'─'.repeat(termWidth)}┐
   ${title}
   ${description}
   v${version}
  └${'─'.repeat(termWidth)}┘`)
    );
  }
};
