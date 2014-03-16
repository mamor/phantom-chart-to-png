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
page.injectJs './vendor/Chart.js/Chart.min.js'

page.evaluate (dest, width, height, type, data, opts) ->
  canvas = $('<canvas />').attr(width: width, height: height).appendTo($('body'))

  dataObj = $.parseJSON(data)
  optsObj = if opts then $.parseJSON(opts) else {}

  optsObj.onAnimationComplete = () ->
    window.callPhantom(clipRect: canvas[0].getBoundingClientRect(), dest: dest)

  chart = new Chart(canvas[0].getContext('2d'))

  switch type
    when 'line' then chart.Line(dataObj, optsObj)
    when 'bar' then chart.Bar(dataObj, optsObj)
    when 'radar' then chart.Radar(dataObj, optsObj)
    when 'polar' then chart.PolarArea(dataObj, optsObj)
    when 'pie' then chart.Pie(dataObj, optsObj)
    when 'doughnut' then chart.Doughnut(dataObj, optsObj)
    else throw new Error('Invalid chart type.')
, system.args[1], system.args[2], system.args[3], system.args[4], system.args[5], system.args[6]
