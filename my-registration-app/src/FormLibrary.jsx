import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

// 1. Создаем схему валидации с помощью Yup
const schema = yup.object({
  email: yup.string()
    .required('Email обязателен')
    .email('Некорректный Email'),
  password: yup.string()
    .required('Пароль обязателен')
    .min(6, 'Минимум 6 символов'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password')], 'Пароли не совпадают')
    .required('Подтверждение обязательно'),
}).required();

const FormLibrary = () => {
  // 2. Инициализируем хук формы
  // mode: 'onChange' важен, чтобы валидация работала в реальном времени для блокировки кнопки
  const { 
    register, 
    handleSubmit, 
    formState: { errors, isValid },
    watch 
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema)
  });

  const buttonRef = useRef(null);
  
  // Следим за полями, чтобы убедиться, что они не пустые (для UX фокуса)
  // isValid в react-hook-form может быть false при инициализации
  const allFields = watch();

  // Логика фокуса
  const isFirstRun = useRef(true);

  useEffect(() => {
    if (isFirstRun.current) {
        isFirstRun.current = false;
        return;
    }

    // Если форма валидна, переводим фокус
    if (isValid && buttonRef.current) {
      buttonRef.current.focus();
    }
  }, [isValid]);

  const onSubmit = (data) => {
    console.log('Данные формы (RHF):', data);
    alert('Данные отправлены в консоль!');
  };

  return (
    <div className="container">
      <h2>Регистрация (Libs)</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label>Email:</label>
          <input {...register("email")} />
          {errors.email && <div className="error">{errors.email.message}</div>}
        </div>

        <div className="form-group">
          <label>Пароль:</label>
          <input type="password" {...register("password")} />
          {errors.password && <div className="error">{errors.password.message}</div>}
        </div>

        <div className="form-group">
          <label>Повтор пароля:</label>
          <input type="password" {...register("confirmPassword")} />
          {errors.confirmPassword && <div className="error">{errors.confirmPassword.message}</div>}
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

export default FormLibrary;