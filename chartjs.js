var page, system;

system = require('system');

page = require('webpage').create();

page.onError = function(message, trace) {
  var stack;
  stack = ['PHANTOM ERROR: ' + message];
  if (trace && trace.length) {
    stack.push('TRACE:');
    trace.forEach(function(t) {
      var ref;
      return stack.push(' -> ' + (t.file || t.sourceURL) + ': ' + t.line + ((ref = t["function"]) != null ? ref : ' (in function ' + t["function"](+{
        ')': ''
      })));
    });
  }
  console.error(stack.join('\n'));
  return phantom.exit(1);
};

page.onCallback = function(data) {
  page.clipRect = data.clipRect;
  page.render(data.dest);
  return phantom.exit();
};

page.injectJs('./vendor/jquery/jquery-2.1.0.min.js');

page.injectJs('./vendor/Chart.js/Chart.min.js');

page.evaluate(function(dest, width, height, type, data, opts) {
  var canvas, chart, dataObj, optsObj;
  canvas = $('<canvas />').attr({
    width: width,
    height: height
  }).appendTo($('body'));
  dataObj = $.parseJSON(data);
  optsObj = opts ? $.parseJSON(opts) : {};
  optsObj.onAnimationComplete = function() {
    return window.callPhantom({
      clipRect: canvas[0].getBoundingClientRect(),
      dest: dest
    });
  };
  chart = new Chart(canvas[0].getContext('2d'));
  switch (type) {
    case 'line':
      return chart.Line(dataObj, optsObj);
    case 'bar':
      return chart.Bar(dataObj, optsObj);
    case 'radar':
      return chart.Radar(dataObj, optsObj);
    case 'polar':
      return chart.PolarArea(dataObj, optsObj);
    case 'pie':
      return chart.Pie(dataObj, optsObj);
    case 'doughnut':
      return chart.Doughnut(dataObj, optsObj);
    default:
      throw new Error('Invalid chart type.');
  }
}, system.args[1], system.args[2], system.args[3], system.args[4], system.args[5], system.args[6]);
