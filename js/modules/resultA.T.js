export default class Result {
  constructor(element) {
    this.counter = element;

    this.root = element.querySelector(`.counter__result`);
    this.caloriesNormOutput = this.root.querySelector(`#calories-norm`);
    this.caloriesMinOutput = this.root.querySelector(`#calories-minimal`);
    this.caloriesMaxOutput = this.root.querySelector(`#calories-maximal`);
  }

  show(calories) {
    this.caloriesNormOutput.textContent = calories.norm;
    this.caloriesMinOutput.textContent = calories.minimal;
    this.caloriesMaxOutput.textContent = calories.maximal;
    this.root.classList.remove("counter__result--hidden");
    // показ блока с результатом
  }

  hide() {
    this.root.classList.add("counter__result--hidden");

    this.caloriesNormElem.textContent = 0;
    this.caloriesMinElem.textContent = 0;
    this.caloriesMaxElem.textContent = 0;
    // скрытие блока, очистка значений
  }
}
