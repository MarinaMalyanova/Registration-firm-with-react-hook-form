import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import styles from './App.module.css';
import { useRef, useState } from 'react';

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
			/^[\w.]*$/,
			'Неверный пароль. Должны использоваться только буквы и цифры.',
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
	} = useForm({
		defaultValues: {
			email: '',
			password: '',
			repeatPassword: '',
		},
		resolver: yupResolver(fieldSchema),
	});

	const buttonFocusRef = useRef(null);

	const emailError = errors.email?.message;
	const passwordError = errors.password?.message;
	const repeatPasswordError = errors.repeatPassword?.message;

	const onSubmit = (formData) => {
		console.log(formData);
	};
	const [newPassword, setNewPassword] = useState('');
	const [confirmNewPassword, setConfirmNewPassword] = useState('');
	const onChange = ({ target }) => {
		if (target.name === 'password') {
			setNewPassword(target.value);
		}
		// console.log('newPassword', newPassword);
		if (target.name === 'repeatPassword') {
			setConfirmNewPassword(target.value);
			if (target.value === newPassword) {
				buttonFocusRef.current.focus();
			}
		}
		// console.log('confirmNewPassword', confirmNewPassword);
	};
	console.log(!!passwordError, 'passwordError');
	console.log(!!emailError, 'emailError');

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
					onChange={onChange}
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
					onChange={onChange}
				/>
				<div className={styles.errorMessage}>{repeatPasswordError}</div>
				<button
					ref={buttonFocusRef}
					type="submit"
					// disabled={!!passwordError || !!emailError}
					className={styles.registrationButton}
				>
					Зарегистрироваться
				</button>
			</form>
		</div>
	);
};
export default App;
