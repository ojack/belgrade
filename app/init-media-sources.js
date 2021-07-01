const Viewer = require('./lib/mediasoup-viewer.js')
// const hydraStartup = require('./hydra-startup')
const html = require('nanohtml')


module.exports = ({ emitter } = {}) => {

  //let hasStarted = false
//  document.body.innerHTML = 'this an example viewer for the media soup broadcaster. click to start!'

  //const server = `wss://livelab.app:3499`
  // const server = `wss://192.168.178.37:8000`
  //const server = `wss://localhost:8000/${window.location.search}`

  //const server = `wss://${window.location.hostname}:8000/${window.location.search}`

  // const server = `wss://${window.location.hostname}:8000/${window.location.search}`



  const server = "wss://mediasoup.tentacles.live:8000"   // /?stream=flujos"

  window.hydra.s.forEach((source) => {
    source.initServerStream = (key = "test") =>  {
            const video = document.createElement('video')
          //  video.srcObject = stream
            video.addEventListener('loadedmetadata', () => {
              video.play().then(() => {
                source.src = video
                source.tex = source.regl.texture(source.src)
              })
            })

            document.body.appendChild(video)
      source.mediasoupViewer = new Viewer({ videoEl: video, server:  server, streamKey: key})
    }

  })
  //window.onclick = () => {
  //  if(!hasStarted) {
      const video = createVideo({}, () => {
        setTimeout(() => {
          s0.init({ src: video })
          // osc(3, 0.2, 1.2).diff(s0).out()
          video.play()
          emitter.emit('stream:loaded', 0, video)
        }, 200)
      })

      const video2 = createVideo({}, () => {  setTimeout(() => {
        s1.init({ src: video2 })
         video.play()
         emitter.emit('stream:loaded', 1, video2)
       }, 200) })
      // const audioEl = html`<audio></audio>`
      // audioEl.autoplay = true
      const videoHolder = html`<div class="absolute right-0 top-0 fr">${video}${video2}</div>`
    //  document.body.appendChild(videoHolder)


      // turn the video element into a viewer for server location `wss://localhost:8000`
      const viewer1 = new Viewer({ videoEl: video, server:  server, streamKey: "flujos"})

      // const audio = new Viewer({ videoEl: audioEl, server:  server, streamKey: "flujos-audio"})

      // // turn the video element into a viewer for server location `wss://localhost:8000`
      const viewer2 = new Viewer({ videoEl: video2, server:  server, streamKey: "flujos2"})
      hasStarted = true
  //  }
    return [video, video2]
  //}
}

function initServerStream (key) {
  const video = createVideo({}, () => {
    setTimeout(() => {
      s0.init({ src: video })
      // osc(3, 0.2, 1.2).diff(s0).out()
      video.play()
      emitter.emit('stream:loaded', 0, video)
    }, 200)
  })
}



function createVideo({ width=300, height=200} = {}, onload = () => {}) {
  const vid = html`<video style="width:${width};height:${height};clip-path:circle(${height/2}px at ${width/2}px ${height/2}px)"></video>`
  vid.autoplay = true
  // vid.muted = true
  vid.addEventListener('loadeddata', onload)
  return vid
}
