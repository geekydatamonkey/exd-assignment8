/* jshint newcap: false */

'use strict';

import p5 from 'p5';
import 'p5/lib/addons/p5.dom.js';

const pixelDensity = window.devicePixelRatio || 1;

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


    //   // set red pix to pix on right
    //   let rightIdx = (i + 4) % img.pixels.length;
    //   img.pixels[i] = img.pixels[rightIdx];

    //   // set green pixel to the pixel below this one
    //   // not entirely sure why I need to multiply by pixelDensity^2
    //   // rather than just pixelDensity
    //   let downIdx = (i + 1 + img.width * pixelDensity * pixelDensity) % img.pixels.length;
    //   img.pixels[i+1] = img.pixels[downIdx];
    }

    video.updatePixels();
    s.image(video, 0, 0);

    // // resize for drawing
    // // don't resize the real img so that we have fewer pixels
    // scaledImg.copy(img, 0,0,img.width, img.height, 0, 0, scaleFactor * img.width, scaleFactor * img.height);

    // s.image(scaledImg, 0, 0);

  };

}

function init() {
  return new p5(sketch);
}

export default { init };