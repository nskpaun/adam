/*
 * Interpreter
 * This interprets commands
 */

var ALARM_SET_COMMAND = 'set alarm for ';

var Interpreter = {
  interpret: function(input, state) {
    input = input.toLowerCase().trim();
    console.log("NATE " + input);
    var result = Interpreter.getQuestionAnswer(input, state);
    if(result) {
      return result;
    }

    var index = input.indexOf(ALARM_SET_COMMAND);
    if (index > -1) {
      var toParse = input.substring(ALARM_SET_COMMAND.length, input.length);
      var response = 'ok setting alarm for ' + toParse;
      var hours = Number(toParse.substring(index, index+1));
      return {echoWords: response, command: 'setAlarm', data: hours}
    } else if (input.indexOf('hi adam') > -1) {
      return {echoWords: 'hi nate'};
    } else if (input.indexOf('you ok') > -1) {
      return {echoWords: 'never better!'}
    }

    return {echoWords: input};
  },

  getQuestionAnswer: function(input, state) {
    var echoWords = state.echoWords;
    if (echoWords === Interpreter.QUESTIONS.SNOOZE) {
      return input === 'yes' ?
        {echoWords: 'Ok will do', command: 'setAlarm', data: 0.15} :
        {echoWords: 'Ok fine be lazy'};
    }
    return null;
  },

  QUESTIONS: {
    SNOOZE: 'Would you like me to try again in 10 minutes?',
  },
}

export default Interpreter;
