import UpdatableSketch from './UpdatableSketch';

type P5 = import('p5');

let uniformsShader: any;

interface Props {
  x: number;
  y: number;
  width: number;
  height: number;
}

function HeaderBackground({ x, y, width, height }: Props) {
  const preload = (p5: P5) => {
    uniformsShader = p5.loadShader('/uniform.vert', '/uniform.frag');
  };

  const setup = (p5: P5, canvasParentRef: Element) => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight, p5.WEBGL).parent(canvasParentRef);
    p5.noStroke();
    p5.pixelDensity(1);
  };

  const draw = (p5: P5) => {
    p5.resizeCanvas(width, height, true);
    p5.shader(uniformsShader);

    const mx = p5.map(p5.winMouseX, 0, p5.windowWidth, 0, 1);
    const my = p5.map(p5.winMouseY, 0, p5.windowHeight, 0, 1);

    uniformsShader.setUniform('mouse', [mx, my]);

    p5.rect(0, 0, p5.width, p5.height);
  };

  return (
    <>
      <div className="fixed bg-white" style={{ zIndex: 10, top: y, left: x, width, height }} />
      <UpdatableSketch
        preload={preload} setup={setup} draw={draw}
        style={{ zIndex: 10, position: 'fixed', top: y, left: x }}
      />
    </>
  );
}

export default HeaderBackground;
