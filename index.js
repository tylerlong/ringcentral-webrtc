// here you determine whether the call has video and audio
const options = {
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
const simple = new window.SIP.Web.Simple(options)

const startButton = document.getElementById('startCall')
startButton.addEventListener('click', function () {
  simple.call('welcome@onsip.com')
  window.alert('Call Started')
}, false)

const endButton = document.getElementById('endCall')
endButton.addEventListener('click', function () {
  simple.hangup()
  window.alert('Call Ended')
}, false)
