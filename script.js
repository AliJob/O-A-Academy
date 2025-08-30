// Плавная прокрутка к якорям
document.querySelectorAll('nav a, .btn[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();

    const targetId = this.getAttribute('href');
    if (targetId === '#') return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      const headerHeight = document.querySelector('header').offsetHeight;
      const targetPosition = targetElement.offsetTop - headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });

      // Закрываем мобильное меню, если оно открыто
      if (document.querySelector('nav ul').classList.contains('active')) {
        document.querySelector('nav ul').classList.remove('active');
      }
    }
  });
});

// Функция показа уведомлений (оставлена на случай, если понадобится в будущем)
function showNotification(message, type = 'success') {
  // Создаем элемент уведомления
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.textContent = message;
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 5px;
        color: white;
        font-weight: 500;
        z-index: 1000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;

  if (type === 'success') {
    notification.style.background = '#4cd964';
  } else {
    notification.style.background = '#ff3b30';
  }

  document.body.appendChild(notification);

  // Показываем уведомление
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 100);

  // Убираем уведомление через 5 секунд
  setTimeout(() => {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 5000);
}

// Изменение прозрачности хедера при скролле
window.addEventListener('scroll', function() {
  const header = document.querySelector('header');
  if (window.scrollY > 100) {
    header.style.background = 'rgba(0, 0, 0, 0.8)';
  } else {
    header.style.background = 'rgba(0, 0, 0, 0.5)';
  }
});

// Анимация элементов при скролле
const animateOnScroll = function() {
  const elements = document.querySelectorAll('.step, .partner, .section-title');

  elements.forEach(element => {
    const elementPosition = element.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.3;

    if (elementPosition < screenPosition) {
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
    }
  });
};

// Установка начальных стилей для анимации
document.querySelectorAll('.step, .partner, .section-title').forEach(element => {
  element.style.opacity = '0';
  element.style.transform = 'translateY(20px)';
  element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
});

// Запуск анимации при загрузке и скролле
window.addEventListener('load', animateOnScroll);
window.addEventListener('scroll', animateOnScroll);

// Добавление кнопки мобильного меню
function addMobileMenuButton() {
  if (window.innerWidth <= 768) {
    // Проверяем, не добавлена ли уже кнопка
    if (!document.querySelector('.mobile-menu-btn')) {
      const menuButton = document.createElement('button');
      menuButton.className = 'mobile-menu-btn';
      menuButton.innerHTML = '☰';
      menuButton.style.cssText = `
                background: none;
                border: none;
                color: white;
                font-size: 24px;
                cursor: pointer;
                padding: 5px 10px;
            `;

      menuButton.addEventListener('click', function() {
        document.querySelector('nav ul').classList.toggle('active');
      });

      document.querySelector('.header-content').appendChild(menuButton);

      // Стили для активного мобильного меню
      const style = document.createElement('style');
      style.textContent = `
                @media (max-width: 768px) {
                    nav ul {
                        display: none;
                        position: absolute;
                        top: 100%;
                        left: 0;
                        width: 100%;
                        background: rgba(0, 0, 0, 0.9);
                        flex-direction: column;
                        padding: 20px 0;
                    }
                    
                    nav ul.active {
                        display: flex;
                    }
                    
                    nav ul li {
                        margin: 10px 0;
                        text-align: center;
                    }
                    
                    .mobile-menu-btn {
                        display: block;
                    }
                }
            `;
      document.head.appendChild(style);
    }
  } else {
    // Удаляем кнопку на больших экранах
    const menuButton = document.querySelector('.mobile-menu-btn');
    if (menuButton) {
      menuButton.remove();
    }

    // Убираем стили мобильного меню
    const mobileStyle = document.querySelector('style');
    if (mobileStyle) {
      mobileStyle.remove();
    }

    // Убеждаемся, что меню отображается
    document.querySelector('nav ul').style.display = 'flex';
  }
}

// Инициализация мобильного меню
window.addEventListener('load', addMobileMenuButton);
window.addEventListener('resize', addMobileMenuButton);
