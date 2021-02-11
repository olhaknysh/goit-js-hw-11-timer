class CountdownTimer {
  constructor({ selector, targetDate }) {
    this._selector = selector;
    this._targetDate = targetDate;
    this._intervalId = null;

    this._refs = this._getRefs(selector);

    this._start();
  }

  _getRefs(root) {
    const refs = {};

    refs.days = document.querySelector(`${root} [data-value=days]`);
    refs.hours = document.querySelector(`${root} [data-value=hours]`);
    refs.mins = document.querySelector(`${root} [data-value=mins]`);
    refs.secs = document.querySelector(`${root} [data-value=secs] `);

    return refs;
  }

  _start() {
    if (this._intervalId !== null) {
      return;
    }
    const endTime = this._targetDate.getTime();

    this._intervalId = setInterval(() => {
      const startTime = Date.now();
      const delta = endTime - startTime;

      if (delta === 0) {
        stop();
      }

      this._countTime(delta);
    }, 1000);
  }

  _stop() {
    clearInterval(this._intervalId);
    this._refs.days.textContent = 0;
    this._refs.hours.textContent = 0;
    this._refs.mins.textContent = 0;
    this._refs.secs.textContent = 0;
  }

  _countTime(time) {
    const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
    const hours = this.pad(
      Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    );
    const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));

    this._refs.days.textContent = `${days}`;
    this._refs.hours.textContent = `${hours}`;
    this._refs.mins.textContent = `${mins}`;
    this._refs.secs.textContent = `${secs}`;
  }

  pad(value) {
    return String(value).padStart('2', 0);
  }
}

const timer = new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('Jul 17, 2021'),
});
