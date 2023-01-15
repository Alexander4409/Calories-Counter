import Counter from './modules/counterA.T.js';

const counterElements = document.querySelectorAll(`.counter`);

counterElements.forEach((element) => {
    const counter = new Counter(element);
    counter.init();
});