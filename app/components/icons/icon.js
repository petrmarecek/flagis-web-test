import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import velocity from 'velocity-animate'
import 'velocity-animate/velocity.ui'

export default class Icon extends PureComponent {

  static propTypes = {
    icon: PropTypes.object.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    scale: PropTypes.number,
    color: PropTypes.array,
    hoverColor: PropTypes.array,
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
    if (newProps.color !== this.props.color) {
      this.setState({ color: newProps.color })
    }

    if ((newProps.width !== this.props.width) || (newProps.height !== this.props.height)) {
      this.setState({
          width: Math.round(newProps.width / newProps.scale),
          height: Math.round(newProps.height / newProps.scale)
       })
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

  getFill = key => {
    if (!this.state.color) {
      return ''
    }

    return this.state.color.length === 1
      ? this.state.color[0]
      : this.state.color[key]
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
              fill={this.getFill(key)}
              d={d}/>
          ))}
        </g>
      </svg>
    )
  }
}
