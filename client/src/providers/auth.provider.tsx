import { RootState } from '@/store/store';
import { getToken } from '@/utils/helper/localstorage.helper';
import AuthServices from '@/utils/service/auth.service';
import { Spin } from 'antd';
import { ReactNode, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type Props = {
	children: ReactNode;
};

const AuthProvider = (props: Props) => {
	const [loading, setLoading] = useState(false);
	const dispatch = useDispatch();
	const { getCurrentUserService, LogoutService } = AuthServices({ dispatch, setLoading });
	const stateProps = useSelector((state: RootState) => state);

	useEffect(() => {
		if (stateProps?.auth?.isLoggedIn) getCurrentUserService();

		// * this is used to listen to action of localStorage and logout the user.
		const handleStorageChange = () => {
			const token = getToken();
			if (!token) {
				LogoutService();
			}
		};
		window.addEventListener('storage', handleStorageChange);
		return () => {
			window.removeEventListener('storage', handleStorageChange);
		};
	}, []);

	return (
		<Spin spinning={loading}>
			<ToastContainer />
			{props.children}
		</Spin>
	);
};

export default AuthProvider;
