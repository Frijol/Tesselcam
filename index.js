// Require libraries
var tessel = require('tessel');
var camera = require('camera-vc0706').use(tessel.port['A']);
 
// Set up an LED to notify when we're taking a picture
var notificationLED = tessel.led[3];
 
// When the camera is ready, print a message in the console.
camera.on('ready', function () {
  console.log('Press the config button to take a picture!');
});
 
// When we press a button...
tessel.button.on('press', function() {
  notificationLED.high();
  // Take the picture
  camera.takePicture(function(err, image) {
    if (err) {
      console.log('error taking image', err);
    } else {
      notificationLED.low();
      // Name the image
      var name = 'picture-' + Math.floor(Date.now()*1000) + '.jpg';
      // Save the image
      console.log('Picture saving as', name, '...');
      process.sendfile(name, image);
      console.log('Picture saved.');
    }
  });
});
 
// If there is an error, report it.
camera.on('error', function(err) {
  console.error(err);
});