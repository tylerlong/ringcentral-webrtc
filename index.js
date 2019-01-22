import 'babel-polyfill'
import SIP from 'sip.js'
import RingCentral from 'ringcentral-js-concise'

const rc = new RingCentral(
  process.env.RINGCENTRAL_CLIENT_ID,
  process.env.RINGCENTRAL_CLIENT_SECRET,
  process.env.RINGCENTRAL_SERVER_URL
)

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
  console.log(r.data)
  const sipInfo = r.data.sipInfo[0]

  ua = new SIP.UA({
    uri: `sip:${sipInfo.username}@${sipInfo.domain}`,
    transportOptions: {
      wsServers: [`${sipInfo.transport.toLowerCase()}://${sipInfo.outboundProxy}`]
    },
    authorizationUser: sipInfo.authorizationId,
    password: sipInfo.password,
    media: {
      local: {
        audio: document.getElementById('localVideo')
      },
      remote: {
        audio: document.getElementById('remoteVideo')
      }
    }
  })
  ua.start()
  ua.register()
})()

let session
const startButton = document.getElementById('startCall')
startButton.addEventListener('click', function () {
  // ua.invite('sip:+16506417402@sip.devtest.ringcentral.com', {
  // ua.invite('sip:+16579991394@sip.devtest.ringcentral.com', {
  session = ua.invite('sip:+16504377931@sip.devtest.ringcentral.com', {
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
}, false)
