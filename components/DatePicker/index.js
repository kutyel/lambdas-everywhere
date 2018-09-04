import datePickerFactory from 'react-toolbox-core/lib/components/DatePicker/DatePicker'
import styled from 'styled-components'

import Month from './Month'
import { NextNode, PrevNode } from './Navigation'
import { RangePicker, SinglePicker } from './Pickers'

const PickerWrapper = styled.div`
  --webkit-touch-callout: none;
  border: 1px solid #ddd;
  overflow: hidden;
  padding: 8px 5px;
  position: relative;
  user-select: none;
`

const passthrough = ({ numberOfMonths }, name, { state: { viewDate } }) =>
  ['Month', 'RangePicker', 'SinglePicker'].includes(name)
    ? { numberOfMonths, viewDate }
    : {}

export default datePickerFactory({
  passthrough,
  Month,
  NextNode,
  PickerWrapper,
  PrevNode,
  RangePicker,
  SinglePicker
})
