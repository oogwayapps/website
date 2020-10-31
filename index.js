const quotes = {
  list: suffleArr([
    "Yesterday is history, tomorrow is a mystery, and today is a gift. That’s why they call it the present.",
    "There is always something more to learn. Even for a master.",
    "Your mind is like this water, my friend. When it is agitated, it becomes difficult to see. But if you allow it to settle, the answer becomes clear",
    "There are no accidents",
    "My time has come. You must continue your journey, without me.",
    "You are too concerned about what was and what will be",
    "There is just news. There is no good or bad",
    "If you only do what you can do, you will never be more than you are now",
  ]),
  _lastServedIndex: -1,
  next() {
    this._lastServedIndex = (this._lastServedIndex + 1) % this.list.length;
    return this.list[this._lastServedIndex];
  },
};



document.addEventListener("DOMContentLoaded", boot);

function boot() {
  schedule(updateQuote).runEvery(3000);
}

function updateQuote() {
  const quoteTextArea = document.getElementById("quote-text");
  const quoteComponent = document.getElementById("quote-component");
  if (!quoteTextArea) return;

  if (!quoteTextArea.innerText) {
    quoteTextArea.innerText = quotes.next();
    return;
  }

  setTimeout(function exit() {
    quoteComponent.classList.add("exit");
    setTimeout(function entry() {
      quoteComponent.classList.remove("exit");
      quoteComponent.classList.add("entry");
      quoteTextArea.innerText = quotes.next();
      setTimeout(function stable() {
        quoteComponent.classList.remove("entry");
      }, 300);
    }, 300);
  }, 300);
}


function updateImage() {

}

function schedule(fn) {
  let lastScheduleUpdate = null;

  function loop(interval) {
    if (lastScheduleUpdate === null) {
      fn();
    }

    lastScheduleUpdate = setTimeout(() => {
      fn();
      loop(interval);
    }, interval);
  }

  return { runEvery: loop };
}

/**
 * @template T
 * @param {T[]} arr
 */
function suffleArr(arr) {
  return arr.sort(() => (Math.random() > 0.5 ? 1 : -1));
}
