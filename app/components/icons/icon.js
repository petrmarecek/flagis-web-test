import React, { Component } from 'react'
import PropTypes from 'prop-types'
import velocity from 'velocity-animate'
import 'velocity-animate/velocity.ui'

export default class Icon extends Component {

  static propTypes = {
    icon: PropTypes.object.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    scale: PropTypes.number,
    color: PropTypes.string,
    hoverColor: PropTypes.string,
    className: PropTypes.string,
    onClick: PropTypes.func,
    title: PropTypes.string,
    animation: PropTypes.object,
  }

  static defaultProps = {
    width: 20,
    height: 20,
    scale: 1,
  }

  state = {
    color: this.props.color,
    width: Math.round(this.props.width / this.props.scale),
    height: Math.round(this.props.height / this.props.scale)
  }

  styles = {
    svg: {
      cursor: 'pointer',
    }
  }

  componentDidMount() {
    if (this.props.animation) {
      const animation = this.props.animation
      velocity(this.refs.elem, animation.action, { duration: animation.duration })
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps !== this.props.color) {
      this.setState({color: newProps.color})
    }
  }

  handleMouseOver = () => {
    if (!this.props.hoverColor) {
      return
    }

    this.setState({color: this.props.hoverColor})
  }

  handleMouseLeave = () => {
    if (!this.props.color) {
      return
    }

    this.setState({color: this.props.color})
  }

  render() {
    return (
      <svg
        ref="elem"
        style={this.styles.svg}
        className={this.props.className}
        width={`${this.props.width}px`}
        height={`${this.props.height}px`}
        viewBox={`0 0 ${this.state.width} ${this.state.height}`}
        onClick={this.props.onClick}
        onMouseOver={this.handleMouseOver}
        onMouseLeave={this.handleMouseLeave}>
        <g>
          <title>{this.props.title}</title>
          {this.props.icon.map((d,key) => (
            <path
              key={key}
              fill={this.state.color}
              d={d}/>
          ))}
        </g>
      </svg>
    )
  }
}