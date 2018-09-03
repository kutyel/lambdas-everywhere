import React from 'react'
import fmt from 'date-fns/format'
import { compose, withState } from 'recompose'

import Input from './Input'
import DatePicker from './DatePicker'

const END_DATE = 'END_DATE'
const START_DATE = 'START_DATE'

const format = d => (d ? fmt(d, 'DD/MM/YYYY') : '')

const enhance = compose(
  withState('focused', 'onFocus', null),
  withState('highlighted', 'onHighlight', { from: null, to: null }),
  withState('value', 'onChange', { from: null, to: null })
)

export default enhance(
  ({ focused, highlighted, onChange, onFocus, onHighlight, value }) => (
    <div>
      <Input
        value={format(value.from)}
        onFocus={() => onFocus(START_DATE)}
        active={focused === START_DATE}
        readOnly
      />
      <Input
        value={format(value.to)}
        onFocus={() => onFocus(END_DATE)}
        active={focused === END_DATE}
        readOnly
      />
      <DatePicker
        focusedInput={focused}
        highlighted={highlighted}
        onChange={onChange}
        onFocusedInputChange={onFocus}
        onHighlightedChange={onHighlight}
        selected={value}
        viewDate={new Date()}
      />
    </div>
  )
)
