import rangePickerFactory from 'react-toolbox-core/lib/components/DatePicker/RangePicker'
import singlePickerFactory from 'react-toolbox-core/lib/components/DatePicker/SinglePicker'

import MonthsWrapper from './MonthsWrapper'
import Month from '../Month'

const passthrough = ({ numberOfMonths, viewDate }, name) =>
  name === 'MonthsWrapper' ? { numberOfMonths, viewDate } : {}

export const RangePicker = rangePickerFactory({
  passthrough,
  MonthsWrapper,
  Month
})

export const SinglePicker = singlePickerFactory({
  passthrough,
  MonthsWrapper,
  Month
})
