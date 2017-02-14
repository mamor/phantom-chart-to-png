# Save chart image as a PNG

Chart via
* Chart.js http://www.chartjs.org/
* Google Charts https://developers.google.com/chart/

## Usage

    $ sudo npm install -g phantomjs
    $ git clone https://github.com/mamor/phantom-chart-to-png.git
    $ cd phantom-chart-to-png
    $ npm install

    # Chart.js
    $ phantomjs chartjs.js {dest} {width} {height} {data}

    # Google Charts
    $ phantomjs googlecharts.js {dest} {width} {height} {type} {data} {opts}

## Args

### dest
Output png file name

### width
Output png file width

### height
Output png file height

### type
Chart type

#### Google Charts
* AreaChart
* BarChart
* BubbleChart
* CandlestickChart
* ColumnChart
* ComboChart
* and more https://google-developers.appspot.com/chart/interactive/docs/gallery

### data and opts
Chart data and options
* Chart.js http://www.chartjs.org/docs/
* Google Charts https://google-developers.appspot.com/chart/interactive/docs/gallery

### example

#### Chart.js

    $ phantomjs chartjs.js chartjs.png 600 400 '{Chart.js options}'

#### Google Charts

    $ phantomjs googlecharts.js googlecharts.png 600 400 ComboChart '[["Month","Bolivia","Ecuador","Madagascar","Papua New Guinea","Rwanda","Average"],["2004\/05",165,938,522,998,450,614.6],["2005\/06",135,1120,599,1268,288,682],["2006\/07",157,1167,587,807,397,623],["2007\/08",139,1110,615,968,215,609.4],["2008\/09",136,691,629,1026,366,569.6]]' '{"title":"Monthly Coffee Production by Country","vAxis":{"title":"Cups"},"hAxis":{"title":"Month"},"seriesType":"bars","series":{"5":{"type":"line"}}}'

## License
Copyright 2014, Mamoru Otsuka. Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php
