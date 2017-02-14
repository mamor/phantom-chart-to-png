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

page.injectJs('./node_modules/jquery/dist/jquery.min.js');
page.injectJs('./node_modules/chart.js/dist/Chart.js');

page.evaluate(function(dest, width, height, data) {
  var canvas = $('<canvas />').attr({
    id: 'chart',
    width: width,
    height: height
  }).appendTo($('body'));

  var chart = document.getElementById('chart');

  var dataObj = JSON.parse(data);
  dataObj.options = dataObj.options || {};
  dataObj.options.animation = {
    onComplete: function() {
      return window.callPhantom({
        clipRect: chart.getBoundingClientRect(),
        dest: dest
      });
    }
  };

  new Chart(chart.getContext('2d'), dataObj);
}, system.args[1], system.args[2], system.args[3], system.args[4]);
