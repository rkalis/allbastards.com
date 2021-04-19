import React from 'react';
import Sketch from 'react-p5';
type P5 = import('p5');

let uniformsShader: any;

function Background() {
  const preload = (p5: P5) => {
    uniformsShader = p5.loadShader('/uniform.vert', '/uniform.frag');
  };

  function setup(p5: P5, canvasParentRef: Element) {
    p5.createCanvas(p5.windowWidth, p5.windowHeight, p5.WEBGL).parent(canvasParentRef);
    p5.noStroke();
  };

  function draw(p5: P5) {
    p5.shader(uniformsShader);

    let mx = p5.map(p5.mouseX, 0, p5.width, 0, 1);
    let my = p5.map(p5.mouseY, 0, p5.height, 0, 1);

    uniformsShader.setUniform('mouse', [mx, my]);

    p5.rect(0, 0, p5.width, p5.height);
  };

  function windowResized(p5: P5) {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
  };

  return (
    <Sketch
      preload={preload} setup={setup} draw={draw} windowResized={windowResized}
      style={{ zIndex: -10, position: 'fixed', top: '0px' }}
    />
  )
}

export default Background;
