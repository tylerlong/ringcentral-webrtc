import 'babel-polyfill'
import SIP from 'sip.js'
import RingCentral from 'ringcentral-js-concise'

const rc = new RingCentral(process.env.RINGCENTRAL_CLIENT_ID, process.env.RINGCENTRAL_CLIENT_SECRET, process.env.RINGCENTRAL_SERVER_URL)

;(async () => {
  await rc.authorize({
    username: process.env.RINGCENTRAL_USERNAME,
    extension: process.env.RINGCENTRAL_EXTENSION,
    password: process.env.RINGCENTRAL_PASSWORD
  })
  const r = await rc.post('/restapi/v1.0/client-info/sip-provision', {
    sipInfo: [{ transport: 'WSS' }]
  })
  console.log(r.data)
})()

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
