let selectedSlide = 0;
let slidesItem = document.querySelector(".slides");
let pointer = document.querySelector(".level-points");
let DEFAULT_ACTION = "next";
const timerSet = 3000;

const lastItem = slidesItem.children.length - 1;

function changeSlide(event, slideNumber = -1) {
  const buttonAction = !event
    ? DEFAULT_ACTION
    : event.target.getAttribute("data-action");

  slidesItem.children[selectedSlide].classList.remove("active");
  pointer.children[selectedSlide].classList.remove("active");

  if (event || slideNumber !== -1) {
    clearInterval(timer);
    timer = setInterval(changeSlide, timerSet);
  }

  if (slideNumber !== -1) {
    selectedSlide = slideNumber;
  } else {
    /* const lastItem = slidesItem.children.length - 1; */

    if (buttonAction === "prev") {
      selectedSlide = selectedSlide === 0 ? lastItem : selectedSlide - 1;
    } else {
      selectedSlide = selectedSlide === lastItem ? 0 : selectedSlide + 1;
    }
  }

  slidesItem.children[selectedSlide].classList.add("active");
  pointer.children[selectedSlide].classList.add("active");
}

let timer = setInterval(changeSlide, timerSet);

document.querySelector(".prev-btn").addEventListener("click", changeSlide);
document.querySelector(".next-btn").addEventListener("click", changeSlide);

pointer.addEventListener("click", (event) => {
  if (
    event.target.tagName === "DIV" &&
    event.target.classList.contains("point")
  ) {
    const getPointId = parseInt(event.target.getAttribute("data-id")) - 1;

    changeSlide(null, getPointId);
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") {
    changeSlide(null, selectedSlide === 0 ? lastItem : selectedSlide - 1);
  } else if (event.key === "ArrowRight") {
    changeSlide(null, selectedSlide === lastItem ? 0 : selectedSlide + 1);
  }
});
