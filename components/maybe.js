import Maybe from 'folktale/maybe'

const INC = 'INC'
const DEC = 'DEC'
const INC_BY = 'INC_BY'

const IncFn = state => state + 1
const DecFn = state => state - 1
const IncByFn = (state, { payload }) => state + payload

const handlers = {
  [INC]: IncFn,
  [DEC]: DecFn,
  [INC_BY]: IncByFn
}

const CounterReducer = (state = 0, action) =>
  Maybe.fromNullable(handlers[action.type]).matchWith({
    Just: ({ value }) => value(state, action),
    Nothing: () => state
  })

CounterReducer(4, { type: INC }) // => 5
CounterReducer(null, { type: INC }) // => 1
CounterReducer(4, { type: DEC }) // => 3
CounterReducer(null, { type: DEC }) // => -1
CounterReducer(4, { type: INC_BY, payload: 3 }) // => 7
