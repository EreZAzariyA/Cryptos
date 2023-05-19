import { createReducer } from 'redux-promise-middleware-actions';
import { MainActions } from './actions';


const reducer = createReducer(null, (handleAction) => [
  handleAction(MainActions.setCoinsData, (state, { payload }) => {
    return { ...state, ...payload }
  }),

  handleAction(MainActions.getCoinsData.pending, (state) => {
    return { ...state, pending: true };
  }),
  handleAction(MainActions.getCoinsData.rejected, (state) => {
    return { ...state, pending: false };
  }),
  handleAction(MainActions.getCoinsData.fulfilled, (state, { coins }) => {
    return { ...state, ...coins, pending: false };
  }),
]);

export default reducer;