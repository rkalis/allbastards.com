import Sketch from 'react-p5';

export default class UpdatableSketch extends Sketch {
  shouldComponentUpdate() {
    return true;
  }
}
