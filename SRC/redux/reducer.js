import {PROBLEM3} from './types';

const initial = {
  error: null,
  wait: false,
  data: null,
  token: null,
};

export function problem3Reducer(state = initial, action) {
  switch (action.type) {
    case PROBLEM3.Wait:
      return {
        ...state,
        wait: true,
        error: null,
      };
    case PROBLEM3.Wrong:
      return {
        ...state,
        wait: false,
        error: action.error,
      };
    case PROBLEM3.Ready:
      return {
        ...state,
        data: action.payload.bookings,
        token: action.payload.token,
      };
    default:
      return {...state};
      break;
  }
}
