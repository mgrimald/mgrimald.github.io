import React from 'react';

class Cat extends React.Component {
  render() {
    const mouse = this.props.mouse;
    return (
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/2/2b/Black_Cat_Vector.svg"
        style={{ position: 'absolute', left: mouse.x - 50, top: mouse.y - 50}}
        alt="cat icon"
      />
      );
  }
}

class Mouse extends React.Component {
  constructor(props) {
    super(props);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.state = { x: 0, y: 0 };
  }

  handleMouseMove(event) {
    this.setState({
      x: event.clientX,
      y: event.clientY
    });
  }

  render() {
    const style = { height: '100%', border: "1px solid blue"};
    return (
      <div style={style} onMouseMove={this.handleMouseMove}>

        {/*
          Instead of providing a static representation of what <Mouse> renders,
          use the `render` prop to dynamically determine what to render.
        */}
        {this.props.render(this.state)}
      </div>
    );
  }
}

class MouseTracker extends React.Component {
  render() {
    return (
      <div>
        <h1>Move the mouse around!</h1>
        <Mouse render={
          (mouse) => (
            <Cat mouse={mouse} />
          )
        }/>
      </div>
    );
  }
}

export const RenderProps = MouseTracker;