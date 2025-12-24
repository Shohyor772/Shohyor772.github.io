// Ожидаем полной загрузки DOM перед выполнением скрипта
document.addEventListener('DOMContentLoaded', function() {
    console.log('Скрипт загружен!');
    
    // Получаем элементы DOM
    const openFormBtn = document.getElementById('openFormBtn');
    const closeBtn = document.getElementById('closeBtn');
    const overlay = document.getElementById('overlay');
    const popup = document.getElementById('popup');
    const feedbackForm = document.getElementById('feedbackForm');
    const messageDiv = document.getElementById('message');
    const submitBtn = document.getElementById('submitBtn');
    
    // Ключ для хранения данных в localStorage
    const STORAGE_KEY = 'feedbackFormData';
    
    // Назначаем обработчики событий
    openFormBtn.addEventListener('click', openForm);
    closeBtn.addEventListener('click', closeForm);
    overlay.addEventListener('click', closeForm);
    
    // Обработчик для кнопки "Назад" в браузере
    window.addEventListener('popstate', function(event) {
        if (popup.style.display === 'block') {
            closeForm();
        }
    });
    
    /**
     * Загружает сохраненные данные формы из localStorage
     * и заполняет соответствующие поля формы
     */
    function loadFormData() {
        const savedData = localStorage.getItem(STORAGE_KEY);
        if (savedData) {
            const formData = JSON.parse(savedData);
            document.getElementById('fullName').value = formData.fullName || '';
            document.getElementById('email').value = formData.email || '';
            document.getElementById('phone').value = formData.phone || '';
            document.getElementById('organization').value = formData.organization || '';
            document.getElementById('messageText').value = formData.messageText || '';
            document.getElementById('consent').checked = formData.consent || false;
        }
    }
    
    /**
     * Сохраняет текущие данные формы в localStorage
     * в формате JSON
     */
    function saveFormData() {
        const formData = {
            fullName: document.getElementById('fullName').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            organization: document.getElementById('organization').value,
            messageText: document.getElementById('messageText').value,
            consent: document.getElementById('consent').checked
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
    }
    
    /**
     * Очищает сохраненные данные формы из localStorage
     */
    function clearFormData() {
        localStorage.removeItem(STORAGE_KEY);
    }
    
    /**
     * Открывает модальное окно с формой обратной связи
     * Добавляет запись в историю браузера и загружает сохраненные данные
     */
    function openForm() {
        // Добавляем состояние в историю браузера
        history.pushState({ formOpen: true }, '', '#feedback');
        // Показываем оверлей и попап
        overlay.style.display = 'block';
        popup.style.display = 'block';
        // Загружаем сохраненные данные
        loadFormData();
        // Добавляем слушатели для автосохранения
        feedbackForm.addEventListener('input', saveFormData);
        feedbackForm.addEventListener('change', saveFormData);
        // Устанавливаем фокус на первое поле
        document.getElementById('fullName').focus();
    }
    
    /**
     * Закрывает модальное окно с формой обратной связи
     * Удаляет слушатели событий и скрывает сообщения
     */
    function closeForm() {
        // Возвращаемся к предыдущему состоянию истории
        if (history.state && history.state.formOpen) {
            history.back();
        }
        // Скрываем оверлей и попап
        overlay.style.display = 'none';
        popup.style.display = 'none';
        // Удаляем слушатели автосохранения
        feedbackForm.removeEventListener('input', saveFormData);
        feedbackForm.removeEventListener('change', saveFormData);
        // Скрываем сообщения
        hideMessage();
    }
    
    /**
     * Показывает сообщение пользователю
     * @param {string} text - Текст сообщения
     * @param {boolean} isSuccess - Флаг успешности (true - успех, false - ошибка)
     */
    function showMessage(text, isSuccess) {
        messageDiv.textContent = text;
        messageDiv.className = isSuccess ? 'message success' : 'message error';
        messageDiv.style.display = 'block';
        // Автоматически скрываем сообщение через 5 секунд
        setTimeout(hideMessage, 5000);
    }
    
    /**
     * Скрывает сообщение пользователю
     */
    function hideMessage() {
        messageDiv.style.display = 'none';
    }
    
    /**
     * Обработчик отправки формы
     * Выполняет валидацию и отправку данных на сервер
     */
    feedbackForm.addEventListener('submit', function(e) {
        // Предотвращаем стандартную отправку формы
        e.preventDefault();
        
        // Проверяем согласие на обработку персональных данных
        if (!document.getElementById('consent').checked) {
            showMessage('Необходимо согласие с политикой обработки персональных данных', false);
            return;
        }
        
        // Блокируем кнопку отправки на время обработки
        submitBtn.disabled = true;
        submitBtn.textContent = 'Отправка...';
        
        // Создаем FormData объект из формы
        const formData = new FormData(feedbackForm);
        
        // Отправляем данные на сервер
        fetch(feedbackForm.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                // Успешная отправка
                showMessage('Сообщение успешно отправлено! Мы свяжемся с вами в ближайшее время.', true);
                feedbackForm.reset();
                clearFormData();
            } else {
                // Ошибка сервера
                showMessage('Произошла ошибка при отправке. Пожалуйста, попробуйте еще раз.', false);
            }
        })
        .catch(error => {
            // Ошибка сети или другая ошибка
            console.error('Ошибка:', error);
            showMessage('Произошла ошибка при отправке. Пожалуйста, попробуйте еще раз.', false);
        })
        .finally(() => {
            // Разблокируем кнопку отправки
            submitBtn.disabled = false;
            submitBtn.textContent = 'Отправить';
        });
    });
    
    /**
     * Обработчик нажатия клавиш
     * Закрывает форму при нажатии Escape
     */
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && popup.style.display === 'block') {
            closeForm();
        }
    });
});