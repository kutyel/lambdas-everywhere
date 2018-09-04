import React, { Children, Component } from 'react'
import { TransitionMotion, spring } from 'react-motion'
import { compose, lifecycle } from 'recompose'
import { differenceInCalendarMonths } from 'date-fns'
import styled from 'styled-components'

const LEFT = 'left'
const RIGHT = 'right'
const prop = name => obj => obj[name]
const customPreset = { stiffness: 170, damping: 26 }

const MonthsWrapperNode = styled.div`
  align-content: top;
  align-items: top;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  transition: height 120ms ease-in-out;
  width: 100%;
`

const MonthPositioner = styled.div`
  left: 0;
  top: 0;
  background: white;
  position: absolute;
  width: calc(100% / ${prop('numberOfMonths')});
`

const AnimateOptimizer = lifecycle({
  shouldComponentUpdate({ transform }) {
    return transform === this.props.transform
  }
})(
  compose(
    Children.only,
    prop('children')
  )
)

export default class extends Component {
  state = { wrapperHeight: 0 }
  childrenRefs = []
  direction = RIGHT

  componentDidMount() {
    this.getChildHeight(wrapperHeight => {
      this.setState({ wrapperHeight })
    })
  }

  componentWillReceiveProps({ viewDate: nextViewDate }) {
    const { viewDate } = this.props
    if (viewDate.getTime() !== nextViewDate.getTime()) {
      this.direction =
        viewDate.getTime() < nextViewDate.getTime() ? RIGHT : LEFT
    }
  }

  componentWillUpdate() {
    this.childrenRefs = []
  }

  componentDidUpdate(prevProps) {
    this.getChildHeight(wrapperHeight => {
      if (this.state.wrapperHeight !== wrapperHeight) {
        this.setState({ wrapperHeight })
      }
    })
  }

  handleRef = (node, idx) => (this.childrenRefs[idx] = node)

  getChildHeight = fn => {
    requestAnimationFrame(() => {
      const items = this.childrenRefs
        .map(child => child && child.getBoundingClientRect())
        .map(size => size && size.height)
        .filter(Boolean)

      const itemsSlice =
        this.direction === RIGHT
          ? items.slice(items.length - this.props.numberOfMonths)
          : items.slice(0, this.props.numberOfMonths)

      fn(
        itemsSlice.reduce(
          (result, item) => (item && item > result ? item : result),
          0
        )
      )
    })
  }

  willEnter = child => ({
    transform: this.direction === RIGHT ? this.props.numberOfMonths * 100 : -100
  })

  willLeave = config => ({
    transform: spring(
      differenceInCalendarMonths(
        config.data.child.props.viewDate,
        this.props.viewDate
      ) * 100,
      customPreset
    )
  })

  getChildStyles = (child, index) => ({
    key: child.key,
    data: { child },
    style: {
      transform: spring(
        differenceInCalendarMonths(child.props.viewDate, this.props.viewDate) *
          100
      )
    }
  })

  interpolateStyles = interpolatedStyles => (
    <MonthsWrapperNode style={{ height: this.state.wrapperHeight }}>
      {interpolatedStyles.map(this.renderChild)}
    </MonthsWrapperNode>
  )

  renderChild = (config, idx) => (
    <MonthPositioner
      key={config.key}
      innerRef={node => this.handleRef(node, idx)}
      numberOfMonths={this.props.numberOfMonths}
      style={{ transform: `translate3d(${config.style.transform}%, 0, 0)` }}
    >
      <AnimateOptimizer transform={config.style.transform}>
        {config.data.child}
      </AnimateOptimizer>
    </MonthPositioner>
  )

  render = () => (
    <TransitionMotion
      styles={Children.toArray(this.props.children).map(this.getChildStyles)}
      willEnter={this.willEnter}
      willLeave={this.willLeave}
    >
      {this.interpolateStyles}
    </TransitionMotion>
  )
}
