/* -----------------------------------------
  Have focus outline only for keyboard users 
 ---------------------------------------- */

const handleFirstTab = (e) => {
  if(e.key === 'Tab') {
    document.body.classList.add('user-is-tabbing')

    window.removeEventListener('keydown', handleFirstTab)
    window.addEventListener('mousedown', handleMouseDownOnce)
  }

}

const handleMouseDownOnce = () => {
  document.body.classList.remove('user-is-tabbing')

  window.removeEventListener('mousedown', handleMouseDownOnce)
  window.addEventListener('keydown', handleFirstTab)
}

window.addEventListener('keydown', handleFirstTab)

const backToTopButton = document.querySelector(".back-to-top");
let isBackToTopRendered = false;

let alterStyles = (isBackToTopRendered) => {
  backToTopButton.style.visibility = isBackToTopRendered ? "visible" : "hidden";
  backToTopButton.style.opacity = isBackToTopRendered ? 1 : 0;
  backToTopButton.style.transform = isBackToTopRendered
    ? "scale(1)"
    : "scale(0)";
};

window.addEventListener("scroll", () => {
  if (window.scrollY > 700) {
    isBackToTopRendered = true;
    alterStyles(isBackToTopRendered);
  } else {
    isBackToTopRendered = false;
    alterStyles(isBackToTopRendered);
  }
});

/* -----------------------------------------
  Portfolio Filter Functionality 
 ---------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {
  const filterButtons = document.querySelectorAll('.work__filter');
  const workBoxes = document.querySelectorAll('.work__box');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      // Add active class to clicked button
      button.classList.add('active');

      const category = button.getAttribute('data-category');

      workBoxes.forEach(box => {
        const boxCategories = box.getAttribute('data-category');
        
        if (category === 'all' || boxCategories.includes(category)) {
          box.style.opacity = '1';
          box.style.transform = 'scale(1)';
          box.style.display = 'block';
          // Add a small delay for smooth animation
          setTimeout(() => {
            box.style.opacity = '1';
          }, 50);
        } else {
          box.style.opacity = '0';
          box.style.transform = 'scale(0.8)';
          setTimeout(() => {
            box.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  // Add smooth transition styles to work boxes
  workBoxes.forEach(box => {
    box.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
  });
});
