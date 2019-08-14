import React from 'react';
import PropTypes from 'prop-types';
import HRPointer from './HRPointer';

class HRDiagram extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      clickPosition: null,
      color: '#444444',
    };

    this.gradient = React.createRef();
    this.drawGradient = this.drawGradient.bind(this);
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
    this.setState({ clickPosition: { x: event.pageX - 10, y: event.pageY - 10 } });
    return { x: posX, y: posY };
  }

  fitToContainer(canvas) {
    canvas.style.width='100%';
    canvas.style.height='100%';
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    return { width: canvas.width, height: canvas.height };
  }

  drawGradient() {
    const canvas = this.gradient.current;
    const { width } = this.fitToContainer(canvas);
    const gradientStop = width / 1.1;
    const context = canvas.getContext('2d');
    const background = context.createLinearGradient(0, 0, gradientStop, 0);
    background.addColorStop(0, '#16348e');
    background.addColorStop(.4, '#61c9fc');
    background.addColorStop(.6, '#ffffff');
    background.addColorStop(.75, '#fae729');
    background.addColorStop(.9, '#fa6c0a');
    background.addColorStop(1.0, '#fc0c00');
    context.fillStyle = background;
    context.fillRect(0, 0, canvas.width, canvas.height);
  }

  componentDidMount() {
    this.drawGradient();
    window.addEventListener('resize', this.drawGradient);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.drawGradient);
  }

  handleClick(event) {
    const canvas = this.gradient.current;
    const location = this.getClickPosition(event);
    const { x, y } = location;
    const context = canvas.getContext('2d');
    const colorData = context.getImageData(x, y, 1, 1).data;
    const [r, g, b] = colorData;
    const color = `#${this.rgbToHex(r, g, b)}`;
    this.setState({ color });
    const result = { color, location, width: this.gradient.current.width };
    this.props.onDiagramClick(result);
  }

  render() {
    return (
      <div className="hr-diagram">
        <canvas
          className="hr-gradient"
          ref={this.gradient}
          onClick={this.handleClick}>
        </canvas>
        {this.state.clickPosition &&
        <HRPointer position={this.state.clickPosition} color={this.state.color}/>}
      </div>
    );
  }
}

HRDiagram.propTypes = {
  onDiagramClick: PropTypes.func.isRequired,
};

export default HRDiagram;
