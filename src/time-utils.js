import Tock from 'tocktimer';

export default {
  _timer: new Tock(),
  msToTime(ms) {
    return this._timer.msToTime(ms);
  }
}