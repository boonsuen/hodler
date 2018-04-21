const pcElem = document.getElementsByClassName("pc");

for (let elem of pcElem) {
  let price = Number(elem.textContent);
  if (price > 0) {
    elem.style.color = "#57f273";
  } else if (price < 0) {
    elem.style.color = "#ff8282";
  }
}
