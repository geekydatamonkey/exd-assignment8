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

  s.preload = function() {

  };

  s.setup = function() {
    let canvas = s.createCanvas(640, 480);
    canvas.parent(canvasWrap);

    video = s.createVideo(['assets/rubiks.ogg']);
    video.hide();
    video.loop();
    video.loadPixels();

  };

  s.draw = function() {

    video.loadPixels();

    for (let i = 0, l = video.pixels.length; i + 4 < l; i += 4) {
      video.pixels[i] = (video.pixels[i] + 100) % 255;
    }

    video.updatePixels();
    s.image(video, 0, 0);

  };

}

function init() {
  return new p5(sketch);
}

export default { init };