import { constant, not, isNil, safe } from 'crocks'

const INC = state => state + 1
const DEC = state => state - 1
const INC_BY = (state, { payload }) => state + payload

const handlers = { INC, DEC, INC_BY }

const CounterReducer = (state = 0, action) =>
  safe(not(isNil), handlers[action.type])
    .either(constant(state), f => f(state, action))

CounterReducer(4, { type: INC }) // => 5
CounterReducer(null, { type: INC }) // => 1
CounterReducer(4, { type: DEC }) // => 3
CounterReducer(null, { type: DEC }) // => -1
CounterReducer(4, { type: INC_BY, payload: 3 }) // => 7
