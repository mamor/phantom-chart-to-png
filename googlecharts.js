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

page.includeJs('https://www.google.com/jsapi', function() {
  return page.evaluate(function(dest, width, height, type, data, opts) {
    var div;
    div = $('<div />').width(width).height(height).appendTo($('body'));
    return google.load('visualization', '1', {
      packages: [type === 'GeoChart' ? 'geochart' : 'corechart'],
      callback: function() {
        var chart, dataObj, optsObj;
        dataObj = google.visualization.arrayToDataTable($.parseJSON(data));
        optsObj = opts ? $.parseJSON(opts) : {};
        chart = new google.visualization[type](div[0]);
        google.visualization.events.addListener(chart, 'ready', function() {
          return window.callPhantom({
            clipRect: div[0].getBoundingClientRect(),
            dest: dest
          });
        });
        return chart.draw(dataObj, optsObj);
      }
    });
  }, system.args[1], system.args[2], system.args[3], system.args[4], system.args[5], system.args[6]);
});
