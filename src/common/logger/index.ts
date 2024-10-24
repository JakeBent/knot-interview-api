/* eslint-disable no-console */

import chalk, { Chalk } from 'chalk';

export class Logger {
  public static _sharedLogger: Logger;

  successColor: Chalk;
  infoColor: Chalk;
  errorColor: Chalk;
  debugColor: Chalk;

  constructor(
    successColor: Chalk = chalk.green,
    infoColor: Chalk = chalk.cyan,
    errorColor: Chalk = chalk.red,
    debugColor: Chalk = chalk.white,
  ) {
    this.successColor = successColor;
    this.infoColor = infoColor;
    this.errorColor = errorColor;
    this.debugColor = debugColor;
  }

  public info = (text: String) => {
    console.log(this.infoColor(text));
  };

  public success = (text: String) => {
    console.log(this.successColor(text));
  };

  public error = (text: String | undefined) => {
    console.log(this.errorColor(text));
  };

  public debug = (text: String | undefined) => {
    console.log(this.debugColor(text));
  };

  public static get sharedLogger(): Logger {
    if (!this._sharedLogger) {
      this._sharedLogger = new Logger();
    }

    return this._sharedLogger;
  }
}

export default Logger.sharedLogger;
