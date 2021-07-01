const initStreamingMedia = require('./init-media-sources.js')
const initHydra = require('./init-hydra.js')
const html = require('nanohtml')
const { nanoid } = require('nanoid')

// const initPixi = require('./pixi.js')
// const agua = require('./agua.js')
const EventEmitter = require('events')


const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const edit = urlParams.get('edit')

const session = urlParams.get('session')
const sessionId = session ? session : nanoid()

urlParams.set('session', sessionId);


// const flokURL = "https://flok.clic.cf/s/NjUxMWM2MjUtOTFlZi00NzNiLWJhNTUtMzVhNWIwY2U0MmFm?layout=hydra,hydr&noHydra=1&bgOpacity=0"

console.log('joining', sessionId)

const flokURL = `https://flok.clic.cf/s/${sessionId}?layout=hydra&noHydra=1&bgOpacity=0`


const readOnly = edit == 1 ? false : true

const emitter = new EventEmitter()
//const mouse = require('./mouse-follower.js')(emitter)
const countdown = require('./lib/countdown.js')
const state = { width: window.innerWidth, height: window.innerHeight}


initHydra({ emitter: emitter }, state)
// initPixi({ emitter: emitter }, state)
// create ui elements
const intro = html`<div class="pa4 i f2">

    <div onclick=${start} class="mt5 ph4 bg-black white br-pill pointer dim dib pa2"> ${">>>"} enter ${"<<<<"} </div>


  </div>`

const uiContainer = html`<div class="w-100 h-100 absolute top-0 left-0 overflow-y-auto flex items-center justify-center">${intro}</div>`
const logEl = html`<div class="w-100 courier absolute bottom-0 left-0 red"></div>`
const iframe = html`<iframe src="${flokURL}${readOnly?'&readonly=1':''}" frameborder="0" class="w-100 h-100" style="margin-top:-40px;${readOnly?"pointer-events:none":''}"></iframe>`

const editor = html`<div class="absolute top-0 left-0 w-100 h-100 pa2" style="transition: opacity 1s;">
  ${iframe}
</div>`

if(readOnly) {
  setTimeout(() => editor.style.opacity = 1, 5000)
}

window.editor = iframe
let hasSynced = false
let timeout = null
// execute editor events on global context
window.addEventListener("message", function(event) {
  //console.log('received message', event)
  if(event.data) {
    if(event.data.cmd === "evaluateCode") {
      //  console.log('evaluate', event.data.args.body)
      editor.style.opacity = 1
      if(readOnly) setTimeout(() => editor.style.opacity = 1, 2000)
      // if (event.data.args.editorId == 1) {
      //   agua.run(event.data.args.body)
      // } else {
        try {
          eval(event.data.args.body)
          logEl.innerHTML = ''
        } catch (e) {
          logEl.innerHTML = e.message
          console.log('CAUGHT ERROR', e.message)
        }
    //  }

    } else if (event.data.cmd === "initialSync") {
      if(!hasSynced) {
        const editorText = event.data.args.editors
        if(editorText[0]) {
          try {
            eval(editorText[0])
            logEl.innerHTML = ''
          } catch (e) {
            logEl.innerHTML = e.message
            console.log('CAUGHT ERROR', e.message)
          }
        }
      //  if(editorText[1]) agua.run(editorText[1])
      }
    }
  }
})

function start() {
//  agua.load()

  uiContainer.innerHTML = ''
  uiContainer.appendChild(editor)
  uiContainer.appendChild(logEl)

  emitter.emit('start')
  initStreamingMedia({ emitter: emitter })
  window.history.replaceState(null,'', `?session=${sessionId}${edit===null? '': `&edit=${edit}`}`);

}
document.body.appendChild(uiContainer)
//  document.body.appendChild(editor)
//}
