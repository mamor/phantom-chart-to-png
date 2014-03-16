system = require('system')
page = require('webpage').create()

page.onError = (message, trace) ->
  stack = ['PHANTOM ERROR: ' + message]
  if trace && trace.length
    stack.push('TRACE:')
    trace.forEach (t) ->
      stack.push(' -> ' + (t.file || t.sourceURL) + ': ' + t.line + (t.function ? ' (in function ' + t.function +')' : ''))
  console.error(stack.join('\n'))
  phantom.exit(1)

page.onCallback = (data) ->
  page.clipRect = data.clipRect
  page.render(data.dest)
  phantom.exit()

page.injectJs './vendor/jquery/jquery-2.1.0.min.js'
page.includeJs 'https://www.google.com/jsapi', () ->

  page.evaluate (dest, width, height, type, data, opts) ->
    div = $('<div />').width(width).height(height).appendTo($('body'))

    google.load 'visualization', '1',
      packages: [if type == 'GeoChart' then 'geochart' else 'corechart'],
      callback: () ->
        dataObj = google.visualization.arrayToDataTable($.parseJSON(data))
        optsObj = if opts then $.parseJSON(opts) else {}

        chart = new google.visualization[type](div[0])

        google.visualization.events.addListener chart, 'ready', () ->
          window.callPhantom(clipRect: div[0].getBoundingClientRect(), dest: dest)

        chart.draw(dataObj, optsObj)
  , system.args[1], system.args[2], system.args[3], system.args[4], system.args[5], system.args[6]
