export default class Counter {
  constructor(elementId) {
      this.count = 0;
      this.counterDisplay = document.getElementById(elementId);

      this.incrementBtn = document.getElementById(`${elementId}-incrementBtn`);
      this.decrementBtn = document.getElementById(`${elementId}-decrementBtn`);
      this.resetBtn = document.getElementById(`${elementId}-resetBtn`);

      this.incrementBtn.addEventListener("click", () => this.increment());
      this.decrementBtn.addEventListener("click", () => this.decrement());
      this.resetBtn.addEventListener("click", () => this.reset());

      this.updateDisplay();
  }

  updateDisplay() {
      this.counterDisplay.textContent = this.count;
  }

  increment() {
      this.count++;
      this.updateDisplay();
  }

  decrement() {
      if (this.count > 0) {
          this.count--;
          this.updateDisplay();
      }
  }

  reset() {
      this.count = 0;
      this.updateDisplay();
  }
}