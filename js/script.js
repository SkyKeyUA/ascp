window.addEventListener('load', windowLoad);
window.addEventListener('resize', handleResize);

const html = document.documentElement;

function handleResize() {
  if (window.innerWidth >= 992) {
    html.classList.remove('menu-open');

    document.querySelectorAll('.menu__has-submenu').forEach((item) => {
      item.classList.remove('show');
    });

    document.querySelectorAll('.submenu').forEach((submenu) => {
      submenu.style.maxBlockSize = null;
    });
  }
}

function windowLoad() {
  document.addEventListener('click', documentActions);
  html.classList.add('loaded');
}
function documentActions(e) {
  const targetElement = e.target;
  if (992 > window.innerWidth) {
    if (targetElement.closest('.icon-menu')) {
      html.classList.add('menu-open');
    } else if (targetElement.closest('.close-menu') && html.classList.contains('menu-open')) {
      html.classList.remove('menu-open');
    }
    if (targetElement.closest('.menu__dropdown')) {
      const currentItem = targetElement.closest('.menu__has-submenu');
      const currentList = currentItem.querySelector('.submenu');
      const height = currentList.scrollHeight;
      const isOpen = currentItem.classList.contains('show');
      if (isOpen) return;

      document
        .querySelectorAll('.menu__has-submenu')
        .forEach((item) => item.classList.remove('show'));
      document.querySelectorAll('.submenu').forEach((item) => {
        if (item !== currentList) {
          setTimeout(() => (item.style.maxBlockSize = 0), 300);
        }
      });
      if (!isOpen) {
        currentItem.classList.add('show');
        currentList.style.maxBlockSize = `${height / 16}rem`;
      }
    }
  }
  if (targetElement.closest('.content-membership__line')) {
    const range = document.querySelector('.membership__body');

    const isMonthly = range.classList.contains('membership__body--monthly');

    range.classList.toggle('membership__body--monthly', !isMonthly);
    range.classList.toggle('membership__body--yearly', isMonthly);
  }
}
if (document.querySelector('.home-hero__list--carousel')) {
  (() => {
    const logoItems = document.querySelectorAll('.home-hero__list--carousel li');
    let index = 0;

    function showNextText() {
      const current = logoItems[index];
      current.classList.add('active');

      const delay = 1500;
      setTimeout(() => {
        current.classList.remove('active');
        current.classList.add('fade-out');

        setTimeout(() => {
          current.classList.remove('fade-out');

          index = (index + 1) % logoItems.length;

          showNextText();
        }, 750);
      }, delay);
    }

    if (logoItems.length > 0) {
      showNextText();
    }
  })();
}

if (document.querySelector('.community__swiper-community')) {
  (() => {
    const sliderListFiveItems = new Swiper('.community__swiper-community', {
      slidesPerView: 1,
      autoHeight: true,
      grabCursor: true,
      initialSlide: 0,
      spaceBetween: 40,
      loopedSlides: 1,
      loop: true,
      speed: 800,
      breakpoints: {
        768: {
          slidesPerView: 2,
        },
        1140: {
          slidesPerView: 3,
          autoHeight: false,
        },
        1250: {
          slidesPerView: 3,
          spaceBetween: 90,
          autoHeight: false,
        },
      },
      pagination: {
        el: '.swiper-community__pagination',
        clickable: true,
      },
    });
  })();
}
