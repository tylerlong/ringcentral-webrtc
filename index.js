import SIP from 'sip.js'

const options = {
  media: {
    local: {
      audio: document.getElementById('localVideo')
    },
    remote: {
      audio: document.getElementById('remoteVideo')
    }
  },
  ua: {}
}
const simple = new SIP.Web.Simple(options)

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
