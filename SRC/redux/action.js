import {PROBLEM3} from './types';

export function problem3Wrong(payload) {
  return {
    type: PROBLEM3.Wrong,
    payload,
  };
}
export function problem3Wait(payload) {
  return {
    type: PROBLEM3.Wait,
    payload,
  };
}
export function problem3Ready(payload) {
  return {
    type: PROBLEM3.Ready,
    payload,
  };
}
