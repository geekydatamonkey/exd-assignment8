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
    s.loadPixels();

    // grab middle strip of pixels
    for (let y = 0, h = video.height; y < h; y += 1) {
      let pixel = video.get(video.width/2, y);
      s.set(t,y, pixel);
    }

    s.updatePixels();

    t = (t + 1) % s.width;


    // for (let i = 0, l = video.pixels.length; i + 4 < l; i += 4) {
    //   video.pixels[i] = (video.pixels[i] + 100) % 255;
    // }

    // video.updatePixels();
    // s.image(video, 0, 0);

  };

}

function init() {
  return new p5(sketch);
}

export default { init };