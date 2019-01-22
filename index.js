import 'babel-polyfill'
import SIP from 'sip.js'
import RingCentral from 'ringcentral-js-concise'

const rc = new RingCentral(
  process.env.RINGCENTRAL_CLIENT_ID,
  process.env.RINGCENTRAL_CLIENT_SECRET,
  process.env.RINGCENTRAL_SERVER_URL
)

let sipInfo
let ua

;(async () => {
  await rc.authorize({
    username: process.env.RINGCENTRAL_USERNAME,
    extension: process.env.RINGCENTRAL_EXTENSION,
    password: process.env.RINGCENTRAL_PASSWORD
  })
  const r = await rc.post('/restapi/v1.0/client-info/sip-provision', {
    sipInfo: [{ transport: 'WSS' }]
  })
  sipInfo = r.data.sipInfo[0]

  ua = new SIP.UA({
    uri: `sip:${sipInfo.username}@${sipInfo.domain}`,
    authorizationUser: sipInfo.authorizationId,
    autostart: false,
    password: sipInfo.password,
    transportOptions: {
      wsServers: [`${sipInfo.transport.toLowerCase()}://${sipInfo.outboundProxy}`]
    }
    // media: {
    //   local: {
    //     audio: document.getElementById('localVideo')
    //   },
    //   remote: {
    //     audio: document.getElementById('remoteVideo')
    //   }
    // }
  })
  ua.start()
})()

let session
const startButton = document.getElementById('startCall')
startButton.addEventListener('click', function () {
  ua.start()
  session = ua.invite(`sip:${process.env.RINGCENTRAL_RECEIVER}@${sipInfo.domain}`, {
    sessionDescriptionHandlerOptions: {
      constraints: {
        audio: true,
        video: false
      }
    }
  })
}, false)

const endButton = document.getElementById('endCall')
endButton.addEventListener('click', function () {
  session.terminate()
  ua.stop()
}, false)
