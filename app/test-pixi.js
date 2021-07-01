// const PIXI = require('pixi.js')
// const { CanvasRenderer } = require('@pixi/canvas-renderer')

module.exports = () => {

var renderer = PIXI.CanvasRenderer(400, 400, {

  // create transparent canvas
  transparent: true,

  // smoothout the edges of our graphics
  antialias: true,

  // change background color to blue
  //backgroundColor: '0x86D0F2'

});

// 2. Append canvas element to the body
document.body.appendChild(renderer.view);

// 3. Create a container that will hold your scene
var stage = new PIXI.Container();

// 4a. Create a line
var line = new PIXI.Graphics();

// Define line style = stroke
// width, color, alpha
line.lineStyle(10, 0xD5402B, 1);

// Define line position - this aligns the top left corner of an element
line.position.x = renderer.width / 2;
line.position.y = renderer.height / 2;

// Define pivot to the center of the element = transformOrigin
line.pivot.set(0,140);
line.rotation = 0.785398; // in radiants - use google to convert degrees to radiants

// Draw line
line.moveTo(5,0);
line.lineTo(5, 280);

stage.addChild(line);

// 4b. Create a circle
var circle = new PIXI.Graphics();

// define outline = stroke
circle.lineStyle(20, 0x91CF46, 1);
//circle.beginFill(0x709FE9, 0.5);

// draw circle (x, y, radius)
circle.drawCircle(renderer.width / 2,renderer.height / 2,100);

stage.addChild(circle);

// 4c. Create 2 rectangles
var rect = new PIXI.Graphics();

// define fill and rectangle size
rect.beginFill(0x709FE9, 1);

// x, y, width, heigth
rect.drawRect(20,20,100, 100);
rect.endFill();

stage.addChild(rect);

var rect2 = new PIXI.Graphics();
rect2.lineStyle(5, 0xD82257, 1);
rect2.drawRect((renderer.width - 100),(renderer.height - 100),80,80);

stage.addChild(rect2);

// 4d. Create a triangle
var triangle = new PIXI.Graphics();

triangle.lineStyle(5, 0x4A5FB4, 1);
triangle.moveTo(20,300);
triangle.lineTo(100, 380);
triangle.lineTo(20, 380);
triangle.lineTo(20, 300);
stage.addChild(triangle);

// add stage to the canvas
render();
function render(){
    renderer.render(stage);
}
}
