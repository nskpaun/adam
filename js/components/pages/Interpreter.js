/*
 * Interpreter
 * This interprets commands
 */

var ALARM_SET_COMMAND = 'set alarm for ';

var Interpreter = {
  interpret: function(input) {
    var index = input.indexOf(ALARM_SET_COMMAND);
    if (index > -1) {
      var toParse = input.substring(ALARM_SET_COMMAND.length, input.length);
      var response = 'ok setting alarm for ' + toParse;
      var hours = Number(toParse.substring(index, index+1));
      return {echoWords: response, command: 'setAlarm', data: hours}
    } else if (input.indexOf('hi adam') > -1) {
      return {echoWords: 'hi nate'};
    }

    return {echoWords: input};
  }
}

export default Interpreter;
