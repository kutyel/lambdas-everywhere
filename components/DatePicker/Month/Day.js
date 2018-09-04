import styled, { css } from 'styled-components'
import dayFactory from 'react-toolbox-core/lib/components/DatePicker/Day'

const selectedDay = ({ selected }) =>
  selected &&
  css`
    background: #00a699;
    border: 1px double #00a699;
    color: #fff;
  `

const highlightedDay = ({ highlighted, inRange }) =>
  (highlighted || inRange) &&
  css`
    background: #66e2da;
    border: 1px double #33dacd;
    color: #fff;
  `

const disabledDay = ({ disabled }) =>
  disabled &&
  css`
    background: #fff;
    border: 1px solid #e4e7e7;
    color: #cacccd;
    cursor: normal;
    pointer-events: none;
  `

const hoveredDay = ({ selected, highlighted, inRange }) =>
  !selected &&
  !highlighted &&
  !inRange &&
  css`
    &:hover {
      background: #e4e7e7;
      border: 1px double #d4d9d9;
      color: inherit;
    }
  `

const outOfMonth = ({ outOfMonth }) =>
  outOfMonth &&
  css`
    border: 0;
    visibility: hidden;
  `

export default dayFactory({
  DayNode: styled.span`
    border: 1px solid #e4e7e7;
    color: #565a5c;
    cursor: pointer;
    height: 39px;
    padding: 0;
    ${highlightedDay} ${selectedDay} ${disabledDay} ${hoveredDay} ${outOfMonth};
  `
})
