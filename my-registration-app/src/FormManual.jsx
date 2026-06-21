import { useState, useEffect, useRef } from 'react';

const FormManual = () => {
  // 1. Состояние для полей формы
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });

  // 2. Состояние для ошибок и валидности
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  // Ссылка на кнопку для управления фокусом
  const buttonRef = useRef(null);

  // Функция валидации
  const validate = (data) => {
    const newErrors = {};
    
    // Простая проверка Email через регулярное выражение
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email) {
      newErrors.email = 'Email обязателен';
    } else if (!emailRegex.test(data.email)) {
      newErrors.email = 'Некорректный Email';
    }

    // Проверка пароля
    if (!data.password) {
      newErrors.password = 'Пароль обязателен';
    } else if (data.password.length < 6) {
      newErrors.password = 'Минимум 6 символов';
    }

    // Проверка повтора пароля
    if (data.confirmPassword !== data.password) {
      newErrors.confirmPassword = 'Пароли не совпадают';
    }

    return newErrors;
  };

  // Эффект: запускается при каждом изменении данных формы
  useEffect(() => {
    const newErrors = validate(formData);
    setErrors(newErrors);
    
    // Форма валидна, если объект ошибок пуст И все поля заполнены
    const hasErrors = Object.keys(newErrors).length > 0;
    const isFilled = formData.email && formData.password && formData.confirmPassword;
    const formValid = !hasErrors && isFilled;
    
    setIsValid(formValid);

  }, [formData]);

  // Эффект: перенос фокуса на кнопку при полной валидности
  // Используем useRef, чтобы отследить момент, когда форма СТАЛА валидной
  const isFirstRun = useRef(true);
  
  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    // Если форма стала валидной, переводим фокус
    if (isValid && buttonRef.current) {
      buttonRef.current.focus();
    }
  }, [isValid]);


  // Обработчик ввода
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Обработчик отправки
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      console.log('Данные формы:', formData);
      alert('Данные отправлены в консоль!');
    }
  };

  return (
    <div className="container">
      <h2>Регистрация (Manual)</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <input 
            type="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
          />
          {errors.email && <div className="error">{errors.email}</div>}
        </div>

        <div className="form-group">
          <label>Пароль:</label>
          <input 
            type="password" 
            name="password" 
            value={formData.password} 
            onChange={handleChange} 
          />
          {errors.password && <div className="error">{errors.password}</div>}
        </div>

        <div className="form-group">
          <label>Повтор пароля:</label>
          <input 
            type="password" 
            name="confirmPassword" 
            value={formData.confirmPassword} 
            onChange={handleChange} 
          />
          {errors.confirmPassword && <div className="error">{errors.confirmPassword}</div>}
        </div>

        <button 
          type="submit" 
          disabled={!isValid} 
          ref={buttonRef}
        >
          Зарегистрироваться
        </button>
      </form>
    </div>
  );
};

export default FormManual;