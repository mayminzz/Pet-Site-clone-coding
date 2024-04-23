//header bottom
const header = document.querySelector("header");
const headerTop = document.querySelector(".header_top");
const headerBottom = document.querySelector(".header_bottom");
let scrollNum = 0;

window.addEventListener("scroll", () => {
  scrollNum = window.scrollY;

  if (scrollNum > 0) {
    headerBottom.classList.add("scrollEffect");
    header.style.borderBottom = "1px solid #f6f6f6";
  } else {
    headerBottom.classList.remove("scrollEffect");
    header.style.borderBottom = "";
  }
});

//banner slide

const URL = "./pet.json";
const bannerContents = document.querySelector(".banner_contents");

fetch(URL)
  .then((response) => response.json())
  .then((json) => {
    let bannerOutput = "";
    json.bannerImg.forEach((item) => {
      bannerOutput += `
      <li class="banner_content" data-idx="${item.index}">
        <img src="${item.img}" data-img="${item.mobileImg}"alt="${item.alt}" />
      </li>
      `;
      bannerContents.innerHTML = bannerOutput;
    });

    const bannerImg = document.querySelectorAll(".banner_content > img");
    if (window.innerWidth < 768) {
      bannerImg.forEach((img) => {
        img.setAttribute("src", img.getAttribute("data-img"));
      });
      // bannerImg.setAttribute("src", bannerImg.getAttribute("data-img"));
    }
    const bannerImgList = document.querySelectorAll(".banner_content > img");

    //banner slide
    const bannerSliderContainer = document.querySelector(".banner_contents");
    const bannerSlides = document.querySelectorAll(".banner_content");
    let bannerSlideCount = bannerSlides.length;
    const bannerPager = document.querySelector(".pager");
    let bannerCurrentIdx = 0;

    const bannerPrevBtn = document.querySelector(
      ".banner_buttons > .fa-chevron-left"
    );
    const bannerNextBtn = document.querySelector("#next_btn");

    const bannerPagerBtn = document.querySelectorAll(".pager > span");

    const bannerSlide = (i) => {
      bannerSliderContainer.style.left = `${i * -100}%`;
      bannerSliderContainer.classList.add("animated");
      bannerCurrentIdx = i;

      for (let i = 0; i < bannerPagerBtn.length; i++) {
        bannerPagerBtn[i].classList.remove("active");
      }
      bannerPagerBtn[i].classList.add("active");
    };

    for (let i = 0; i < bannerPagerBtn.length; i++) {
      bannerPagerBtn[i].addEventListener("click", (e) => {
        console.log(e.target);
        let pagerNum = e.target.getAttribute("data-idx");
        bannerSlide(pagerNum);
      });
    }

    bannerPrevBtn.addEventListener("click", (e) => {
      e.preventDefault();
      if (currentIdx > 0) {
        bannerSlide(bannerCurrentIdx - 1);
      } else {
        bannerSlide(bannerSlideCount - 1);
      }
    });

    bannerNextBtn.addEventListener("click", (e) => {
      e.preventDefault();
      if (bannerCurrentIdx < bannerSlideCount - 1) {
        bannerSlide(bannerCurrentIdx + 1);
      } else {
        bannerSlide(0);
      }
    });
    let timer = undefined;
    const autoSlide = () => {
      timer = setInterval(() => {
        let nextIdx = (bannerCurrentIdx + 1) % bannerSlideCount;
        bannerSlide(nextIdx);
      }, 3000);
    };
    autoSlide();
    
    let rankingOutput = "";
    json.ranking.forEach((item) => {
      rankingOutput += `
    <div class="ranking_product" data-idx="${item.idx}">
      <div class="ranking_product_photo">
        <span class="ranking_num">${item.idx}</span>
        <img src="${item.img}" alt="${item.idx}" />
      </div>
      <div class="ranking_product_desc">
        <h3>${item.title}</h3>
        <span class="price">${item.discount} <span>${item.price}</span></span>
        <div class="review">
          <span>${item.review}</span>
        </div>
      </div>
    </div>
    `;
    });
    const productBox = document.querySelector(".ranking_product_box");
    productBox.innerHTML = rankingOutput;

    const slideContainer = document.querySelector(".ranking_product_boxes");
    const slides = document.querySelectorAll(".ranking_product");
    const slideCount = slides.length;
    let currentIdx = 0;

    const rankingPrevBtn = document.querySelector(
      ".ranking_slide_btn > .prev_btn"
    );
    const rankingNextBtn = document.querySelector(
      ".ranking_slide_btn > .next_btn"
    );

    const pagerBtn = document.querySelectorAll(
      ".ranking_slide_btn > .pager > span"
    );

    const goToSlide = (i) => {
      slideContainer.style.left = `${i * -100}%`;
      slideContainer.classList.add("animate");
      currentIdx = i;

      for (let i = 0; i < pagerBtn.length; i++) {
        pagerBtn[i].classList.remove("active");
      }
      pagerBtn[i].classList.add("active");
    };

    for (let i = 0; i < pagerBtn.length; i++) {
      pagerBtn[i].addEventListener("click", (e) => {
        let pagerNum = e.target.innerText;
        console.log(pagerNum);
        goToSlide(pagerNum);
      });
    }

    rankingPrevBtn.addEventListener("click", (e) => {
      e.preventDefault();
      //현재 슬라이드가 처음이 아니라면
      if (currentIdx > 0) {
        goToSlide(currentIdx - 1);
      } else {
        goToSlide(slideCount + 1);
      }
    });
    rankingNextBtn.addEventListener("click", (e) => {
      e.preventDefault();
      //현재 슬라이드가 마지막이 아니라면
      if (currentIdx < slideCount - 1) {
        goToSlide(currentIdx + 1);
      } else {
        goToSlide(0);
      }

      for (let i = 0; i < todayPager.length; i++) {
        todayPager[i].addEventListener("click", (e) => {
          let pagerNum = e.target.getAttribute("data-idx");
          goToSlide(pagerNum);
        });
      }
    });
  });

//today_discount
const clock = document.querySelector(".clock");

function updateClock() {
  const today = new Date();
  const hour = today.getHours();
  const minute = today.getMinutes();
  const second = today.getSeconds();

  const updateHour = hour < 10 ? `0${hour}` : hour;
  const updateMinute = minute < 10 ? `0${minute}` : minute;
  const updateSecond = second < 10 ? `0${second}` : second;

  clock.innerText = `${updateHour} : ${updateMinute} : ${updateSecond}`;
}

setInterval(updateClock, 1000);

// today_discount slide
const todayContainer = document.querySelector(".today_discount_contents");
const todaySlides = document.querySelectorAll(".today_discount_content");
let currentIndex = 0;
const contentWidth = 1164;
let slideCount = todaySlides.length;

const today_prevBtn = document.querySelector(".today_control_btn > .prev_btn");
const today_nextBtn = document.querySelector(".today_control_btn > .next_btn");
const todayPager = document.querySelectorAll(
  ".today_control_btn > .pager > span"
);

const TodaySlide = (i) => {
  todayContainer.style.left = `${i * -100}%`;
  todayContainer.classList.add("animated");
  currentIndex = i;

  for (let i = 0; i < todayPager.length; i++) {
    todayPager[i].classList.remove("active");
  }
  todayPager[i].classList.add("active");
};

today_prevBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (currentIndex > 0) {
    TodaySlide(currentIndex - 1);
  } else {
    TodaySlide(slideCount - 1);
  }
});
today_nextBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (currentIndex < slideCount - 1) {
    TodaySlide(currentIndex + 1);
  } else {
    TodaySlide(0);
  }
});

for (let i = 0; i < todayPager.length; i++) {
  todayPager[i].addEventListener("click", (e) => {
    console.log(e.target);
    let pagerNum = e.target.getAttribute("data-idx");
    TodaySlide(pagerNum);
  });
}

//footer
const logoBtn = document.querySelector(".footer_logo");
const footerInfo = document.querySelector(".brand_info");

logoBtn.addEventListener("click", () => {
  footerInfo.classList.toggle("visible");
});
