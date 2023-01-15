//import  {formatInput}  from "./formatInput";
import Result from "./resultA.T.js";

const physicalActivityRatio = new Map([
  ["min", 1.2],
  ["low", 1.375],
  ["medium", 1.55],
  ["high", 1.725],
  ["max", 1.9],
]);

// const CaloriesFormulaFactor = new Map ([
//     ['AGE', 5],
//     ['WEIGHT', 10],
//     ['HEIGHT', 6.25],
// ]);

const CaloriesFormulaConstant = new Map([
  ["male", 5],
  ["female", -161],
]);

// const CaloriesMinMaxRatio = {
//     MIN: 0.85,
//     MAX: 1.15
// };

export default class Counter {
  constructor(element) {
    this.root = element;
    this.form = this.root.querySelector(".counter__form");
    this.elements = this.form.elements;
    this.parameters = [...this.elements.parameters.elements];
    this.genderInputs = this.form.elements.gender;
    this.activityInputs = this.form.elements.activity;
    this.ageInput = this.form.elements.age;
    this.heightInput = this.form.elements.height;
    this.weightInput = this.form.elements.weight;
    this.calculateButton = this.form.elements["submit"];
    this.resetButton = this.form.elements["reset"];

    this.result = new Result(this.root);

    this._onFormInput = this._onFormInput.bind(this);
    this._onFormSubmit = this._onFormSubmit.bind(this);
    this._onFormReset = this._onFormReset.bind(this);
    // перечисление параметров, необходимых для работы: gender, age, weight, height, activity и т.д.
  }

  _onFormInput(evt) {
    const target = evt.target;
    const LEAD_ZERO = /^0+/;
    const NOT_NUMBERS = /[^\d]/g;
    const formatInput = (input) =>
        input.value.replace(NOT_NUMBERS, "").replace(LEAD_ZERO, "");

    if (target.closest('[name="parameters"]')) {
      
      target.value = formatInput(target);
    }
    // Валидация реалтзована через удаление 

    this.calculateButton.disabled = !this.form.checkValidity();
    this.resetButton.disabled = !this.parameters.some((input) => input.value);
    // получение данных от пользователя
    // также можно добавить небольшую валидацию
  }

  _onFormReset() {
    this.calculateButton.disabled = true;
    this.resetButton.disabled = true;
    this.result.hide();
    // задизабленность при обновлении страницы кнопок, скрытие блока с результатом
  }

  _onFormSubmit(evt) {
    evt.preventDefault();

    const caloriesNorm = this.getCaloriesNorm();

    const calories = {
      norm: caloriesNorm,
      minimal: this.getCaloriesMin(caloriesNorm),
      maximal: this.getCaloriesMax(caloriesNorm),
    };

    this.result.show(calories);
    // вызов методов расчета калорий
    // getCaloriesNorm(), getCaloriesMin(), getCaloriesMax()
    // показ блока с результатами калорий
  }
  addEventListeners() {
    this.form.addEventListener("input", this._onFormInput);
    this.form.addEventListener("submit", this._onFormSubmit);
    this.form.addEventListener("reset", this._onFormReset);
  }

  init() {
    this.addEventListeners();
    // инициализация обработчиков событий
    // _onFormInput, _onFormReset, _onFormSubmit
  }

  deinit() {
    const activity = this.activityInputs.value;
    return physicalActivityRatio.get(activity);
    // удаление обработчиков событий
    // _onFormInput, _onFormReset, _onFormSubmit
  }

  getCaloriesNorm() {
    const weight = Number(this.weightInput.value);
    const height = Number(this.heightInput.value);
    const age = Number(this.ageInput.value);
    const gender = this.genderInputs.value;
    const caloriesNorm =
      10 * weight +
      6.25 * height -
      5 * age +
      CaloriesFormulaConstant.get(gender);
    const activityRatio = this.deinit();

    return Math.round(caloriesNorm * activityRatio);
    // перечисление констант age, weight, height, gender, activity
    // применение формулы расчета
  }

  getCaloriesMin(caloriesNorm) {
    return Math.round(caloriesNorm * 0.85);
  }

  getCaloriesMax(caloriesNorm) {
    return Math.round(caloriesNorm * 1.15);
  }
}
