import React from 'react';
import PropTypes from 'prop-types';

class HRDiagram extends React.Component {
  constructor(props) {
    super(props);

    this.gradient = React.createRef();
    this.handleClick = this.handleClick.bind(this);
    this.getCanvasPosition = this.getCanvasPosition.bind(this);
    this.getClickPosition = this.getClickPosition.bind(this);
  }

  rgbToHex(r, g, b) {
    if (r > 255 || g > 255 || b > 255) {
      return undefined;
    }
    return ((r << 16) | (g << 8) | b).toString(16);
  }


  getCanvasPosition() {
    const canvas = this.gradient.current;
    let left = canvas.offsetLeft;
    let top = canvas.offsetTop;

    if (canvas.offsetParent) {
      let parent = canvas.offsetParent;
      while (parent) {
        left += parent.offsetLeft;
        top += parent.offsetTop;
        parent = parent.offsetParent;
      }
      return { x: left, y: top };
    }

    return undefined;
  }

  getClickPosition(event) {
    const { x, y } = this.getCanvasPosition();
    const posX = event.pageX - x;
    const posY = event.pageY - y;

    return { x: posX, y: posY };
  }

  componentDidMount() {
    const canvas = this.gradient.current;
    const context = canvas.getContext('2d');
    const background = context.createLinearGradient(0, 0, 260, 0);
    const parentWidth = canvas.parentElement.clientWidth;
    const parentHeight = canvas.parentElement.clientHeight;

    background.addColorStop(0, '#61c9fc');
    background.addColorStop(.35, 'white');
    background.addColorStop(.7, '#fffea1');
    background.addColorStop(.9, '#fe9b02');
    background.addColorStop(1, '#fc0c00');
    context.fillStyle = background;
    context.fillRect(0, 0, parentWidth, parentHeight);
  }

  // componentDidUpdate() {
  //   const canvas = this.gradient.current;
  //   const context = canvas.getContext('2d');
  //   const background = context.createLinearGradient(0, 0, 260, 0);


  //   background.addColorStop(0, '#61c9fc');
  //   background.addColorStop(.35, 'white');
  //   background.addColorStop(.7, '#fffea1');
  //   background.addColorStop(.9, '#fe9b02');
  //   background.addColorStop(1, '#fc0c00');
  //   context.fillStyle = background;
  //   context.fillRect(0, 0, 400, 200);
  // }

  handleClick(event) {
    const location = this.getClickPosition(event);
    const context = this.gradient.current.getContext('2d');
    const colorData = context.getImageData(location.x, location.y, 1, 1).data;
    const [r, g, b] = colorData;
    const color = this.rgbToHex(r, g, b);
    const result = { color, location };
    this.props.onDiagramClick(result);
  }

  render() {
    return (
      <div className="hr-diagram">
        <canvas
          className="hr-gradient"
          ref={this.gradient}
          onMouseMove={this.handleClick}
        ></canvas>
      </div>
    );
  }
}

HRDiagram.propTypes = {
  onDiagramClick: PropTypes.func.isRequired,
};

export default HRDiagram;
