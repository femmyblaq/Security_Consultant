const prev = document.querySelector(".prev");
const next = document.querySelector(".next");
const track = document.querySelector(".sponsors_track");

let carouselWidth = document.querySelector(".sponsors_container").clientWidth;
console.log(carouselWidth);
let index = 0;
next.addEventListener("click", () => {
  index++;
  prev.classList.add("show");
  track.style.transform = `translateX(-${index * carouselWidth - 700}px)`;
  // console.log(track.offsetWidth - index * carouselWidth < carouselWidth);
  if (track.offsetWidth - index * carouselWidth < carouselWidth) {
    next.classList.add("hide");
  }
});
prev.addEventListener("click", () => {
  index--;
  next.classList.remove("hide");
  track.style.transform = `translateX(-${index * carouselWidth}px)`;
  if (index === 0) {
    prev.classList.remove("show");
  }
});

// const mobileScreen = window.innerWidth;

// if (mobileScreen < 750 + "px") {
const cardContainer = document.querySelector(".sponsors_track");

let moving = false;
let mouseLastPosi = 0;
let transform = 0;
let lastPage = 0;
let newTransformPosi = 0;
const gestureStart = (e) => {
  moving = true;
  mouseLastPosi = e.pageX;
  transform =
    window.getComputedStyle(cardContainer).getPropertyValue("transform") !==
    "none"
      ? window
          .getComputedStyle(cardContainer)
          .getPropertyValue("transform")
          .split(",")[4]
          .trim()
      : 0;
  console.log("Transform matrix ", transform);
  console.log("epage ", mouseLastPosi);
  console.log("lastPage ", lastPage);
};
const gestureMove = (e) => {
  if (moving) {
    const diffX = e.pageX - mouseLastPosi;
    const minusVal = e.pageX - lastPage;
    console.log("Minus val of epage and lastpage", minusVal);
    // console.log("diffX val", diffX);
    // console.log("e.pageX - lastPage > 0", e.pageX - lastPage > 0);
    // console.log("newTransformPosi > 0", newTransformPosi > 0);
    if (e.pageX - lastPage > 0) {
      if (newTransformPosi > 0) {
        return;
      }
    } else {
      if (Math.abs(newTransformPosi) > cardContainer.offsetWidth - 320) {
        return;
      }
    }
    newTransformPosi = parseInt(transform) + diffX;

    cardContainer.style.transform = `translateX(${newTransformPosi}px)`;
    console.log(diffX);
  }
  lastPage = e.pageX;
  // console.log("lastPage position", lastPage);
};
const gestureEnd = () => {
  moving = false;
};

if (window.PointerEvent) {
  window.addEventListener("pointerdown", gestureStart);
  window.addEventListener("pointermove", gestureMove);
  window.addEventListener("pointerup", gestureEnd);
} else {
  window.addEventListener("touchdown", gestureStart);
  window.addEventListener("touchmove", gestureMove);
  window.addEventListener("touchup", gestureEnd);
  window.addEventListener("mousedown", gestureStart);
  window.addEventListener("mousemove", gestureMove);
  window.addEventListener("mouseup", gestureEnd);
}

var prevScrollpos = window.pageYOffset;
window.onscroll = function () {
  var currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    document.getElementById("header").style.top = "0";
  } else {
    document.getElementById("header").style.top = "-100px";
  }
  prevScrollpos = currentScrollPos;
};
