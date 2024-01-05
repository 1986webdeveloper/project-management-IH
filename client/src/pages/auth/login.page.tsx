/* eslint-disable @typescript-eslint/no-explicit-any */
import AntInput from '@/components/elements/Input/Input.element';
import { ROUTES } from '@/constants/routes.constants';
import { UserLogInDTO } from '@/types/auth.types';
import { validationHelper } from '@/utils/helper/validation.helper';
import AuthServices from '@/utils/service/auth.service';
import { Button } from 'antd';
import { ChangeEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';

export default function Login() {
	const [userLogin, setUserLogin] = useState({} as UserLogInDTO);
	const [loading, setLoading] = useState(false);
	const dispatch = useDispatch();
	const { LoginServices } = AuthServices({ dispatch, setLoading });

	const [error, setError] = useState({
		email: '',
		password: '',
	});

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setUserLogin({ ...userLogin, [name]: value });
		setError({ email: '', password: '' });
	};

	const onSubmit = (e: any) => {
		e.preventDefault();
		const isValid = validationHelper(userLogin, setError);

		if (isValid) {
			LoginServices({
				payload: userLogin,
			});
		}
	};

	return (
		<>
			<div className="font-bold mb-6 font-mono text-blue-950 tracking-widest text-3xl">LOGIN</div>

			<form onSubmit={onSubmit} className="flex flex-col gap-9  text-blue-950 items-center justify-center w-[100%]">
				<AntInput
					name="email"
					value={userLogin.email}
					label="Email"
					placeHolder={'Enter Your Email'}
					error={error.email}
					onChange={handleChange}
					disabled={loading ? true : false}
				></AntInput>
				<AntInput
					name="password"
					type="password"
					value={userLogin.password}
					label={'Password'}
					placeHolder={'Enter Your Password'}
					error={error.password}
					isPassword
					onChange={handleChange}
					disabled={loading ? true : false}
				></AntInput>
				<Button htmlType="submit" type="primary" onClick={onSubmit} loading={loading} className="bg-blue-950 w-full">
					Login
				</Button>
			</form>

			<div className="flex justify-between">
				<p className="mt-6 text-xs text-blue-600 text-center">
					<NavLink to="/register" className="border-b border-gray-500 border-dotted">
						Don't have an account ? Register here.
					</NavLink>
				</p>
				<NavLink
					to={ROUTES.FORGOT_PASSWORD}
					state={{ title: 'forgot' }}
					className=" mt-6 text-xs text-blue-600 text-center border-b border-gray-500 border-dotted"
				>
					Forgot Password
				</NavLink>
			</div>
		</>
	);
}
