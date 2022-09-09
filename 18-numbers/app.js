const items = [...document.querySelectorAll('.number')];

const updateCount = (el) => {
  const value = parseInt(el.dataset.value); // parseInt 정수 부분만 반환
  const increment = Math.ceil(value / 1000); // Math.ceil -> 올림
  let initialValue = 0;

  const increaseCount = setInterval(() => {
    initialValue += increment;
    if (initialValue > value) {
      clearInterval(increaseCount); // 함수 호출 중단
      return;
    }
    el.textContent = `${initialValue}+`;
  }, 1);
};

items.forEach((item) => {
  updateCount(item);
});
