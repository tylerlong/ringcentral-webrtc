/*
 * Check out the full guide at
 *   http://sipjs.com/guides/make-call/
 *
 * This sample uses
 *   http://sipjs.com/download/sip-0.9.0.min.js
 *
 * Login with your developer account to receive calls at
 *   http://sipjs.com/demo-phone
 */

// here you determine whether the call has video and audio
var options = {
  media: {
    local: {
      // video: document.getElementById('localVideo')
      audio: document.getElementById('remoteVideo')
    },
    remote: {
      // video: document.getElementById('remoteVideo'),
      // This is necessary to do an audio/video call as opposed to just a video call
      audio: document.getElementById('remoteVideo')
    }
  },
  ua: {}
}
var simple = new window.SIP.Web.Simple(options)

var endButton = document.getElementById('endCall')
endButton.addEventListener('click', function () {
  simple.hangup()
  window.alert('Call Ended')
}, false)

// makes the call
simple.call('welcome@onsip.com')
