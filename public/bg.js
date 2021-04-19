/* eslint-disable no-undef, no-unused-vars */

let uniformsShader;
let canvas;

function preload() {
    uniformsShader = loadShader('/uniform.vert', '/uniform.frag');
};

function setup() {
    canvas = createCanvas(windowWidth, windowHeight, WEBGL);
    noStroke();
};

function draw() {
    shader(uniformsShader);

    let mx = map(mouseX, 0, width, 0, 1);
    let my = map(mouseY, 0, height, 0, 1);

    uniformsShader.setUniform('mouse', [mx, my]);

    rect(0, 0, width, height);
};

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
};
