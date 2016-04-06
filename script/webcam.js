function webCam(opt)
{
	
	opt = opt || {};
	if(typeof opt.videoElement != 'undefined')
	{
		var videoElement = opt.videoElement;
	}
	else
	{
		var videoElement = 'videoElement';
	}
	if(typeof opt.videoContainer != 'undefined')
	{
		var videoContainer = document.getElementById(opt.videoContainer);
	}
	else
	{
		var videoContainer = document.getElementById('container');
	}
	if(typeof opt.wideoWidth != 'undefined')
	{
		var wideoWidth = opt.wideoWidth;
	}
	else
	{
		var wideoWidth = 400;
	}
	if(typeof opt.videoHeight != 'undefined')
	{
		var videoHeight = opt.videoHeight;
	}
	else
	{
		var videoHeight = 300;
	}
	videoContainer.innerHTML = '<video id="'+videoElement+'"></video><canvas id="canvas" style="position:absolute; display:none;"></canvas>';
	this.vidObj = document.getElementById(videoElement);
	this.vidObj.setAttribute('width', wideoWidth);
	this.vidObj.style.width = wideoWidth+'px';
	this.vidObj.setAttribute('height', videoHeight);
	this.vidObj.style.height = videoHeight+'px';
	this.localStream = null;
	
	this.errCallBack = function(error) {	
		// Video Error Handler 	
		console.log("Video error: ", error.code); 
	};
	this.cameraOn = function()
	{
		var obj = this;
		if(navigator.getUserMedia) 
		{ 
			// Standard
			navigator.getUserMedia({"video": true }, function(stream) {
				obj.localStream = stream;
				obj.vidObj.src = stream;
				obj.vidObj.play();
			}, obj.errCallBack);
		} 
		else if(navigator.webkitGetUserMedia)
		{ 
			// For  WebKit
			navigator.webkitGetUserMedia({"video": true }, function(stream){
				obj.localStream = stream;
				obj.vidObj.src = window.webkitURL.createObjectURL(stream);
				obj.vidObj.play();
			}, obj.errCallBack);
		}
		else if(navigator.mozGetUserMedia)
		{ 
			// For Firefox
			navigator.mozGetUserMedia({"video": true }, function(stream){
				obj.localStream = stream;
				obj.vidObj.src = window.URL.createObjectURL(stream);
				obj.vidObj.play();
			}, obj.errCallBack);
		}
	}
	this.captureImage = function(callback, width, height)
	{
		if(typeof width == 'undefined')
		{
			width = this.vidObj.style.width;
		}
		if(typeof height == 'undefined')
		{
			height = this.vidObj.style.height;
		}
		var thecanvas = document.getElementById('canvas');
		thecanvas.setAttribute('width', width);
		thecanvas.setAttribute('height', height);
		thecanvas.style.width = width+'px';
		thecanvas.style.height = height+'px';
		var context = thecanvas.getContext('2d');
		context.drawImage(this.vidObj, 0, 0, width, height);
		var dataURL = thecanvas.toDataURL();
		if(typeof callback == 'function')
		{
			callback(dataURL);
		}
	}
	this.cameraOff = function()
	{
		this.localStream.getVideoTracks().forEach(function (track) {
			track.stop();
		});
	}
}
