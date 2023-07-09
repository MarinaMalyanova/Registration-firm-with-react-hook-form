import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import styles from './App.module.css';
import { useEffect, useRef } from 'react';

const fieldSchema = yup.object().shape({
	email: yup
		.string()
		.required()
		.matches(
			/^[\w_@.]*$/,
			'Неверный email. Должны использоваться только буквы, цифры и нижнее подчеркивание.',
		)
		.max(20, 'Неверный email. Должно быть меньше 20 символов.'),
	password: yup
		.string()
		.required()
		.max(20, 'Неверный пароль. Должно быть меньше 20 символов.')
		.min(3, 'Неверный пароль. Должно быть больше 3 символов.')
		.matches(
			/^[\w_@.]*$/,
			'Неверный email. Должны использоваться только буквы, цифры и нижнее подчеркивание.',
		),
	repeatPassword: yup
		.string()
		.required()
		.oneOf([yup.ref('password'), null], 'Пароли должны совпадать'),
});

export const App = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		setFocus,
	} = useForm({
		defaultValues: {
			email: '',
			password: '',
			repeatPassword: '',
		},
		resolver: yupResolver(fieldSchema),
	});
	useEffect(() => {
		setFocus('button');
	});
	const buttonFocusRef = useRef(null);

	const emailError = errors.email?.message;
	const passwordError = errors.password?.message;
	const repeatPasswordError = errors.repeatPassword?.message;

	const onSubmit = (formData) => {
		console.log(formData);
	};

	return (
		<div className={styles.app}>
			Регистрация нового пользователя
			<form className={styles.emailForm} onSubmit={handleSubmit(onSubmit)}>
				<label>
					Почта<span className={styles.spanStar}>*</span>
				</label>
				<input
					className={emailError && styles.errorInput}
					type="email"
					name="email"
					{...register('email')}
					placeholder="Введите email"
				/>
				<div className={styles.errorMessage}>{emailError}</div>
				<label>
					Пароль<span className={styles.spanStar}>*</span>
				</label>
				<input
					className={passwordError && styles.errorInput}
					type="password"
					name="password"
					{...register('password')}
					placeholder="Введите пароль"
				/>
				<div className={styles.errorMessage}>{passwordError}</div>
				<label>
					Пароль еще раз<span className={styles.spanStar}>*</span>
				</label>
				<input
					className={passwordError && styles.errorInput}
					type="password"
					name="repeatPassword"
					{...register('repeatPassword')}
					placeholder="Повторите пароль"
				/>
				<div className={styles.errorMessage}>{repeatPasswordError}</div>
				<button
					ref={buttonFocusRef}
					type="submit"
					name="button"
					disabled={!!passwordError || !!emailError}
					className={styles.registrationButton}
				>
					Зарегистрироваться
				</button>
			</form>
		</div>
	);
};
export default App;
