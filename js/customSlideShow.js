// ===========================
// Custom Slideshow JS
// ===========================

// CONFIG
const totalImages = 30;   // adjust if you add more later
const galleryPath = "images/gallery/";
let currentIndex = 0;

// DOM elements
const slidesContainer = document.querySelector(".slides");
const thumbsContainer = document.querySelector(".thumbs");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
const counter = document.getElementById("counter");

// Build slides + thumbs dynamically
for (let i = 1; i <= totalImages; i++) {
  const filename = `prenupimage${i}.jpg`;

  // Create slide
  const slide = document.createElement("div");
  slide.className = "slide";
  if (i === 1) slide.classList.add("active");

  const img = document.createElement("img");
  img.src = galleryPath + filename;
  img.alt = `Image ${i}`;
  slide.appendChild(img);
  slidesContainer.appendChild(slide);

  // Create thumbnail
  const thumb = document.createElement("div");
  thumb.className = "thumb";
  if (i === 1) thumb.classList.add("active");

  const thumbImg = document.createElement("img");
  thumbImg.src = galleryPath + filename;
  thumbImg.alt = `Thumb ${i}`;
  thumb.appendChild(thumbImg);
  thumbsContainer.appendChild(thumb);

  // Thumbnail click
  thumb.addEventListener("click", () => {
    showSlide(i - 1);
  });
}

// Utility: show a specific slide by index
function showSlide(index) {
  const slides = document.querySelectorAll(".slide");
  const thumbs = document.querySelectorAll(".thumb");

  if (index < 0) index = totalImages - 1;
  if (index >= totalImages) index = 0;

  slides.forEach((s, idx) => {
    s.classList.toggle("active", idx === index);
  });
  thumbs.forEach((t, idx) => {
    t.classList.toggle("active", idx === index);
  });

  currentIndex = index;

  // Update counter
  if (counter) {
    counter.textContent = `${currentIndex + 1} / ${totalImages}`;
  }

  // Ensure active thumb is visible in scroll area
  const activeThumb = thumbs[index];
  if (activeThumb && activeThumb.scrollIntoView) {
    activeThumb.scrollIntoView({
      block: "nearest",
      inline: "nearest",
      behavior: "smooth"
    });
  }
}

// Prev/Next controls
if (prevBtn) {
  prevBtn.addEventListener("click", () => {
    showSlide(currentIndex - 1);
  });
}
if (nextBtn) {
  nextBtn.addEventListener("click", () => {
    showSlide(currentIndex + 1);
  });
}

// Init
showSlide(0);
