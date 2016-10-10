var Segment = require("./segment")
var Render = require("./render")

var canvas = document.getElementById('canvas')
var context = canvas.getContext('2d');

var render = new Render(canvas, context)
render.drawSegment(new Segment(50, 50))
