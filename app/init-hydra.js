const html = require('nanohtml')

module.exports = ({ emitter }, state) => {
  const canvas = html`<canvas class="w-100 h-100 absolute top-0 left-0" style=""></canvas>`
  canvas.width = state.width
  canvas.height = state.height
  document.body.appendChild(canvas)
  const hydra = new Hydra({
  // detectAudio: false,
   canvas: canvas
  })

  window.hydra = hydra

  //speed = 0.5




// // unfoldings
// speed = 0.1
// osc(10, 0.03, 1.2).color(1.0, 0.3, 0.6)
//   .add(osc(15, -0.1).color(0.1, 0.9, 0.3))
//   .layer(s2)
//   .out()
//
//

// src(o1).layer(src(o0).mask(osc(10, -0.1).rotate(0, 0.1).modulate(osc(10).thresh(0.8, 0.4)).kaleid(2).thresh(0.9, 0)), 0).modulate(osc(20), -0.004, 1.02)
//   .modulate(src(o1).color(1, 0), 0.1)
//   .contrast(1.1)
//   .blend(o0, () => Math.sin(time*0.1)*0.5 + 0.5).out(o1)
//
// render(o1)
//



window.color = () => osc(3.5, 0.1, 1.2).color(0.4, 0.04, 1.2)
  .add(osc(1.4, -0.04, 1.3).color(1, -0.5, 0.8))

window.olivia = (scale = 0.9, x = 0, y= 0) => src(s1).contrast(1.4)
.mult(window.color())
.mask(shape(4, scale, 0))
.scale(0.7)
.scroll(x, y)

window.celeste = (scale = 0.9, x = 0, y= 0) => src(s0).contrast(1.05)
.mult(window.color())
.mask(shape(4, scale, 0))
.scale(0.7)
.scroll(x, y)


window.clear = () => solid(0, 0, 0, 0)

emitter.on('start', () => {
//  src(o0).scrollX([0, -0.001, 0, 0.001].ease('sin')).scrollY([-0.001, 0, 0.001, 0].ease('sin')).layer(s2).out(o0)

//  window.Mouse({ scale: 0.15 })

  window.clear().out(o2)

  setTimeout( () => {
    color().layer(o2).out()
    src(o2).blend(clear(), 0.025).layer(s2).out(o2)
  }, 200 )
})

src(o2).layer(src(s2)).out(o2)
//src(o2).out(o0)
window.color().add(o2, 0.5).out()
  render(o0)

window.addEventListener('resize', () => {
  window.width = window.innerWidth
  window.height = window.innerHeight
//  console.log('resizing')
//  setResolution(window.innerWidth, window.innerHeight)
})
}
