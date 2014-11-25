var Xstart="";
var Ystart="";
var Zstart="";

var topPos = 0;
var leftPos = 0;

var refreshSpeed = 50;
var multiplier = 2;

var screenWidth = $("body").innerWidth() - 100;
var screenHeight = $("body").innerHeight() - 100;




// The watch id references the current `watchAcceleration`
var watchID = null;

// Wait for device API libraries to load
//
document.addEventListener("deviceready", onDeviceReady, false);

// device APIs are available
//
function onDeviceReady() {
    startWatch();
}

// Start watching the acceleration
//
function startWatch() {

    // Update acceleration every .25 seconds
    var options = { frequency: refreshSpeed };

    watchID = navigator.accelerometer.watchAcceleration(onSuccess, onError, options);
}

// Stop watching the acceleration
//
function stopWatch() {
    if (watchID) {
        navigator.accelerometer.clearWatch(watchID);
        watchID = null;
    }
}

// onSuccess: Get a snapshot of the current acceleration
//
function onSuccess(acceleration) {
    var element = document.getElementById('accelerometer');
    var Xdirection = "";
    var Ydirection = "";

    if (Xstart == "") {
    	Xstart = acceleration.x.toFixed();
    	Ystart = acceleration.y.toFixed();
    	Zstart = acceleration.z.toFixed();

    }  
    else {
    	Xdirection = acceleration.x.toFixed() - Xstart;
    	Ydirection = acceleration.y.toFixed() - Ystart;

    } 

    element.innerHTML = 'Acceleration X: ' + acceleration.x.toFixed()         + '<br />' +
                        'Acceleration Y: ' + acceleration.y.toFixed()         + '<br />' +
                        'Acceleration Z: ' + acceleration.z.toFixed()        + '<br />' +
                        'Timestamp: '      + acceleration.timestamp + '<br />' +
                        'Xstart:' + Xstart + '<br />' + 
                        'Ystart:' + Ystart + '<br />' + 
                        'Zstart:' + Zstart + '<br />' +
                        'Ydirection:' + Ydirection + '<br />' +
                        'Xdirection:' + Xdirection + '<br />';


    topPos += Ydirection * multiplier;       
    leftPos -= Xdirection * multiplier;           

    if (topPos < 0)  {
        topPos = 0;
    }                    
    if (topPos > screenHeight){
        topPos = screenHeight;
    }
    if (leftPos < 0)  {
        leftPos = 0;
    }                    
    if (leftPos > screenWidth){
        leftPos = screenWidth;
    }

    $("#direction").html("top: " + topPos + "<br />");
    $("#direction").append("left: " + leftPos);

    $('#ball').animate({
        'left' : leftPos + "px",
        'top' : topPos + "px"  
        },
        refreshSpeed);




		// $('#ball').animate({
  //       	'left' : "-=" + Xdirection * multiplier + "px",
  //           'top' : "+=" + Ydirection * multiplier + "px"  
  //           },
  //           refreshSpeed);




}

// onError: Failed to get the acceleration
//
function onError() {
    alert('onError!');
} 





function drawball(ballid, colour) {
    var startAngle = 0.0;	
    var endAngle = startAngle + parseFloat(360) * Math.PI / 180;
    var canvas  = document.getElementById(ballid);
    var context = canvas.getContext("2d");
    var x = Math.floor(canvas.width  / 2);
    var y = Math.floor(canvas.height / 2);

    context.beginPath();
    context.moveTo(x, y);
    context.arc(x, y, (x > y ? y : x), startAngle, endAngle, false);
    context.fillStyle = colour;
    context.fill();
    context.closePath();
    startAngle = endAngle;
}



