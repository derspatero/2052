/* CANVAS 2D PIE CHART
 * Args:
 * [1] chartId: 'yourCanvasElementId'
 * [2] colours: ['#f00', '#0f0', '#00f'] 
 *     permissible colour specs:
 *     - red
 *     - #ff0000
 *     - #f00
 *     - rgb(255,0,0)
 *     - rgba(255,0,0,0.5) (alpha range: 0.0-1.0)
 * [3] angles: [60, 90, 210] (360 deg overall) 
 * Note: colours and angles arrays must have identical length.
 */

function piechart(chartId, colours, angles) {

	var canvas  = document.getElementById(chartId);
	var context = canvas.getContext("2d");
	var x = Math.floor(canvas.width  / 2);
	var y = Math.floor(canvas.height / 2);
	var startAngle = 0.0;

	for (var i = 0; i < colours.length; i++) {
		drawSegment(colours[i], angles[i]);
	}

	function drawSegment(colour, angle) {
		var endAngle = startAngle + parseFloat(angle) * Math.PI / 180;
		context.beginPath();
		context.moveTo(x, y);
		context.arc(x, y, (x > y ? y : x), startAngle, endAngle, false);
		context.fillStyle = colour;
		context.fill();
		context.closePath();
		startAngle = endAngle;
	}

}