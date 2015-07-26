/* jshint newcap: false */

'use strict';

import p5 from 'p5';
import 'p5/lib/addons/p5.dom.js';

/**
* instance of p5 sketch
*/
function sketch(s) {

  let canvasWrap = document.querySelector('.canvas-wrapper');
  let video;
  let t = 0;

  s.setup = function() {
    // turn off hidpi for now to make pixel math easier
    s.devicePixelScaling(false);
    let canvas = s.createCanvas(canvasWrap.offsetWidth, canvasWrap.offsetHeight);
    canvas.parent(canvasWrap);

    video = s.createVideo(['assets/rubiks.ogg']);
    video.hide();
    video.loop();
    video.loadPixels();

    s.translate(s.width/2, s.height/2);
    s.scale(1,-1);

  };

  s.draw = function() {

    video.loadPixels();

    // grab middle strip of pixels
    let vh = video.height;
    let vw = video.width;
    let sh = s.height;

    for (let y = 0; y < vh && y < sh/2; y += 1) {

      // grab colors
      let [r, g, b, a] = video.get(vw/2, y);

      // mutate
      r = Math.floor(r + s.mouseY) % 255;
      g = Math.floor(g + s.mouseX) % 255;

      // draw on screen radially
      let color = [r,g,b,a];
      s.stroke(color);
      s.fill(color);
      s.rect((y+50) * Math.cos(t), (y+50) * Math.sin(t), 10, 10);
    }

    // update time
    t = t + 1/90 * Math.PI;

  };

}

function init() {
  return new p5(sketch);
}

export default { init };