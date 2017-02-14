#!/usr/bin/php
<?php

$dest = 'chartjs-example.php.png';
$width = 600;
$height = 400;

// @see http://www.chartjs.org/docs/#line-chart-scatter-line-charts
$data = <<<JSON
{
    "type": "line",
    "data": {
        "datasets": [{
            "label": "Scatter Dataset",
            "data": [{
                "x": -10,
                "y": 0
            }, {
                "x": 0,
                "y": 10
            }, {
                "x": 10,
                "y": 5
            }]
        }]
    },
    "options": {
        "scales": {
            "xAxes": [{
                "type": "linear",
                "position": "bottom"
            }]
        }
    }
}
JSON;

$format = "phantomjs ../chartjs.js %s %s %s '%s'";
$command = sprintf($format, $dest, $width, $height, $data);
system($command);
