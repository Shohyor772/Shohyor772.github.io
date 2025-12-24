// Ждём полной загрузки DOM (структуры HTML) перед выполнением скрипта
document.addEventListener('DOMContentLoaded', function() {
  
  // Константа с URL API для отправки формы
  const FORM_ENDPOINT = "https://api.slapform.com/ypHAtTsSt";
  // Ключ для сохранения данных формы в localStorage
  const STORAGE_KEY = "drupalFormData:v1";
  
  // Логика выпадающих меню для мобильных устройств (ширина экрана ≤ 992px)
  if (window.innerWidth <= 992) {
    // Находим все пункты основного меню навигации
    const dropdownItems = document.querySelectorAll('.nav-menu > li');

    // Добавляем обработчик клика на каждый пункт меню
    dropdownItems.forEach(item => {
      item.addEventListener('click', function(e) {
        // Предотвращаем стандартное поведение ссылки и всплытие события
        e.preventDefault();
        e.stopPropagation();

        // Закрываем все другие открытые выпадающие меню
        dropdownItems.forEach(other => {
          if (other !== this) {
            other.classList.remove('active-dropdown');
          }
        });

        // Переключаем (открываем/закрываем) текущее меню
        this.classList.toggle('active-dropdown');
      });
    });

    // Закрываем все выпадающие меню при клике вне меню
    document.addEventListener('click', function(e) {
      // Проверяем, был ли клик внутри меню навигации
      if (!e.target.closest('.nav-menu')) {
        dropdownItems.forEach(item => {
          item.classList.remove('active-dropdown');
        });
      }
    });
  }
  

  // Элементы для мобильного меню
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle'); // Кнопка гамбургер
  const mobileNavMenu = document.querySelector('.mobile-nav-menu'); // Само мобильное меню
  const dropdownToggles = document.querySelectorAll('.dropdown-toggle'); // Кнопки подменю в мобильной версии

  // Обработчик для кнопки открытия/закрытия мобильного меню
  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', function() {
      // Переключаем класс 'active', который показывает/скрывает меню
      mobileNavMenu.classList.toggle('active');
    });
  }

  // Обработчики для кнопок подменю в мобильной версии
  dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', function() {
      // Находим следующее за кнопкой подменю
      const submenu = this.nextElementSibling;
      // Проверяем, активно ли уже это подменю
      const isActive = submenu.classList.contains('active');

      // Закрываем все остальные подменю
      document.querySelectorAll('.dropdown-submenu').forEach(sm => {
        sm.classList.remove('active');
      });

      // Если подменю не было активно - открываем его
      if (!isActive) {
        submenu.classList.add('active');
        this.classList.add('active'); // Добавляем класс активности к кнопке
      } else {
        this.classList.remove('active'); // Убираем класс активности с кнопки
      }
    });
  });

  // Закрытие мобильного меню при клике на ссылку
  const navLinks = document.querySelectorAll('.mobile-nav-menu a');
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      // Закрываем основное меню
      mobileNavMenu.classList.remove('active');
      // Закрываем все подменю
      document.querySelectorAll('.dropdown-submenu').forEach(sm => {
        sm.classList.remove('active');
      });
      // Убираем класс активности со всех кнопок подменю
      document.querySelectorAll('.dropdown-toggle').forEach(t => {
        t.classList.remove('active');
      });
    });
  });
  

  // Слайдер отзывов
  const reviewItems = document.querySelectorAll('.review-item'); // Все слайды с отзывами
  const prevBtn = document.querySelector('.review-prev'); // Кнопка "назад"
  const nextBtn = document.querySelector('.review-next'); // Кнопка "вперед"
  const counter = document.querySelector('.review-counter'); // Счетчик слайдов (например, "01/08")
  let currentIndex = 0; // Текущий активный слайд

  // Функция отображения конкретного слайда
  function showReview(index) {
    // Скрываем все слайды
    reviewItems.forEach((item, i) => {
      item.classList.remove('active');
      // Показываем только нужный слайд
      if (i === index) {
        item.classList.add('active');
      }
    });
    // Обновляем счетчик слайдов с форматированием (две цифры)
    if (counter) {
      counter.textContent = `${String(index + 1).padStart(2, '0')} / ${String(reviewItems.length).padStart(2, '0')}`;
    }
  }

  // Добавляем обработчики для кнопок навигации слайдера
  if (prevBtn && nextBtn) {
    // Кнопка "назад" - переходим к предыдущему слайду (с зацикливанием)
    prevBtn.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + reviewItems.length) % reviewItems.length;
      showReview(currentIndex);
    });

    // Кнопка "вперед" - переходим к следующему слайду (с зацикливанием)
    nextBtn.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % reviewItems.length;
      showReview(currentIndex);
    });
  }
  
  
  // Аккордеон для FAQ (часто задаваемых вопросов)
  document.querySelectorAll('.faq-question').forEach((question) => {
    question.addEventListener('click', () => {
      // Находим родительский элемент вопроса
      const item = question.closest('.faq-item');
      
      // Закрываем все другие открытые вопросы
      document.querySelectorAll('.faq-item').forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
        }
      });
      
      // Открываем/закрываем текущий вопрос
      item.classList.toggle('active');
    });
  });
  
  // Плавная прокрутка для всех якорных ссылок (начинающихся с #)
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault(); // Отменяем стандартное поведение ссылки
      
      // Находим целевой элемент по ID из href
      const target = document.querySelector(this.getAttribute('href'));
      
      if (target) {
        // Плавно прокручиваем к элементу
        target.scrollIntoView({
          behavior: 'smooth', // Плавная анимация
          block: 'start'      // Выравнивание по верхней части экрана
        });
        
        // Закрываем мобильное меню, если оно открыто
        if (mobileNavMenu && mobileNavMenu.classList.contains('active')) {
          mobileNavMenu.classList.remove('active');
        }
      }
    });
  });
  

  
  // Работа с формой обратной связи
  const contactForm = document.getElementById('contact-form');
  
  // Проверяем, существует ли форма на странице
  if (!contactForm) {
    console.warn('Форма #contact-form не найдена');
    return; // Прекращаем выполнение, если формы нет
  }
  
  // Получаем элементы формы
  const nameInput = document.getElementById('name');
  const phoneInput = document.getElementById('phone');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');
  const consentCheckbox = document.getElementById('consent');
  const submitBtn = document.getElementById('submit-btn');
  const statusEl = document.getElementById('form-status'); // Элемент для отображения статуса
  
  // Проверяем наличие элемента для отображения статуса
  if (!statusEl) {
    console.error('Элемент #form-status не найден в HTML!');
    return;
  }
  
  
  // Функция сохранения данных формы в localStorage
  function saveToStorage() {
    try {
      // Собираем данные формы в объект
      const formData = {
        name: nameInput?.value || '',
        phone: phoneInput?.value || '',
        email: emailInput?.value || '',
        message: messageInput?.value || '',
        consent: consentCheckbox?.checked || false
      };
      // Сохраняем в localStorage в формате JSON
      localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
    } catch (e) {
      console.warn('Не удалось сохранить в localStorage:', e);
    }
  }
  
  // Функция восстановления данных формы из localStorage
  function restoreFromStorage() {
    try {
      // Получаем сохраненные данные
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) return; // Если ничего не сохранено - выходим
      
      // Парсим JSON
      const data = JSON.parse(saved);
      
      // Заполняем поля формы
      if (nameInput) nameInput.value = data.name || '';
      if (phoneInput) phoneInput.value = data.phone || '';
      if (emailInput) emailInput.value = data.email || '';
      if (messageInput) messageInput.value = data.message || '';
      if (consentCheckbox) consentCheckbox.checked = data.consent || false;
      
      console.log('Данные восстановлены из localStorage');
    } catch (e) {
      console.warn('Не удалось восстановить из localStorage:', e);
    }
  }
  
  // Функция очистки формы и localStorage
  function clearFormAndStorage() {
    // Сбрасываем форму
    contactForm.reset();
    try {
      // Удаляем данные из localStorage
      localStorage.removeItem(STORAGE_KEY);
      console.log('localStorage очищен');
    } catch (e) {
      console.warn('Ошибка при очистке localStorage:', e);
    }
  }
  
  
  // Функция валидации формы
  function validateForm() {
    hideStatus(); // Скрываем предыдущие сообщения об ошибках
    
    // Проверка имени (обязательное поле)
    if (!nameInput || !nameInput.value.trim()) {
      showStatus('Пожалуйста, укажите ваше имя', 'error');
      nameInput?.focus(); // Устанавливаем фокус на поле с ошибкой
      return false;
    }
    
    // Проверка email (обязательное поле)
    if (!emailInput || !emailInput.value.trim()) {
      showStatus('Пожалуйста, укажите email', 'error');
      emailInput?.focus();
      return false;
    }
    
    // Проверка формата email с помощью регулярного выражения
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value)) {
      showStatus('Пожалуйста, укажите корректный email', 'error');
      emailInput.focus();
      return false;
    }
    
    // Проверка телефона (необязательное, но если заполнено - проверяем формат)
    if (phoneInput && phoneInput.value.trim()) {
      // Удаляем все нецифровые символы
      const phoneDigits = phoneInput.value.replace(/\D/g, '');
      // Проверяем минимальную длину номера
      if (phoneDigits.length < 6) {
        showStatus('Пожалуйста, укажите корректный номер телефона', 'error');
        phoneInput.focus();
        return false;
      }
    }
    
    // Проверка согласия на обработку данных (обязательное)
    if (!consentCheckbox || !consentCheckbox.checked) {
      showStatus('Необходимо согласие на обработку персональных данных', 'error');
      consentCheckbox?.focus();
      return false;
    }
    
    return true; // Все проверки пройдены
  }
  
  
  // Функция отображения статусных сообщений
  function showStatus(message, type) {
    statusEl.textContent = message; // Устанавливаем текст сообщения
    statusEl.className = `form-status ${type}`; // Добавляем класс для стилизации
    
    // Плавно прокручиваем к сообщению
    setTimeout(() => {
      statusEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
  }
  
  // Функция скрытия статусных сообщений
  function hideStatus() {
    statusEl.className = 'form-status'; // Сбрасываем классы
    statusEl.textContent = ''; // Очищаем текст
  }
  
  
  // Обработчик отправки формы
  contactForm.addEventListener('submit', async function(ev) {
    ev.preventDefault(); // Отменяем стандартную отправку формы
    
    // Проверяем валидность данных
    if (!validateForm()) {
      return; // Если невалидно - прекращаем отправку
    }
    
    // Сохраняем оригинальный текст кнопки и меняем на индикатор загрузки
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'ОТПРАВКА...';
    submitBtn.disabled = true; // Отключаем кнопку во время отправки
    showStatus('Отправка данных...', 'info'); // Показываем статус отправки
    
    // Подготавливаем данные для отправки
    const payload = {
      name: nameInput.value.trim(),
      email: emailInput.value.trim(),
      phone: phoneInput?.value.trim() || '',
      message: messageInput?.value.trim() || '',
      timestamp: new Date().toISOString(), // Добавляем метку времени
      source: window.location.href // Добавляем URL страницы
    };
    
    try {
      // Отправляем POST-запрос на сервер
      const response = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload) // Конвертируем объект в JSON
      });
      
      // Проверяем статус ответа
      if (!response.ok) {
        throw new Error(`Сервер вернул ошибку: ${response.status}`);
      }
      
      // Пытаемся распарсить ответ сервера
      let data;
      try {
        data = await response.json();
      } catch (e) {
        data = { success: true }; // Если ответ не JSON, считаем успешным
      }
      
      // Показываем сообщение об успешной отправке
      showStatus('Спасибо! Ваша заявка успешно отправлена. Мы свяжемся с вами в ближайшее время.', 'success');
      clearFormAndStorage(); // Очищаем форму и localStorage
      
      console.log('Форма успешно отправлена:', data);
      
    } catch (error) {
      // Обрабатываем ошибки при отправке
      console.error('Ошибка отправки формы:', error);
      showStatus(`Ошибка отправки: ${error.message || 'Попробуйте позже'}`, 'error');
    } finally {
      // Восстанавливаем кнопку в исходное состояние
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }
  });
  
  
  // Автосохранение данных формы при вводе
  if (nameInput) nameInput.addEventListener('input', saveToStorage);
  if (phoneInput) phoneInput.addEventListener('input', saveToStorage);
  if (emailInput) emailInput.addEventListener('input', saveToStorage);
  if (messageInput) messageInput.addEventListener('input', saveToStorage);
  if (consentCheckbox) consentCheckbox.addEventListener('change', saveToStorage);
  
  
  // Маска для телефона - оставляем только цифры и знак плюса
  if (phoneInput) {
    phoneInput.addEventListener('input', function(e) {
      let value = this.value;
      
      // Обрабатываем случай с плюсом (международный формат)
      if (value.includes('+')) {
        const parts = value.split('+');
        value = '+' + parts.join('').replace(/\D/g, '');
      } else {
        value = value.replace(/\D/g, ''); // Удаляем все нецифровые символы
      }
      
      this.value = value;
    });
  }
  
  // Восстанавливаем сохраненные данные при загрузке страницы
  restoreFromStorage();
  
  // Логи успешной инициализации
  console.log('✅ Форма настроена успешно');
  console.log('📍 Endpoint:', FORM_ENDPOINT);
  
});