import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';
import styles from './default.module.scss';

import CustomFooter from '@/components/shared/footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CustomHeader from '@/components/shared/header';
import ProjectProvider from '@/providers/project .provider';
import ClientProvider from '@/providers/client.provider';
import TaskProvider from '@/providers/task.provider';
import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import AuthServices from '@/utils/service/auth.service';
import UserProvider from '@/providers/user.provider';

const { Content } = Layout;

export default function DefaultLayout() {
	const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
	const dispatch = useDispatch();
	const { LogoutService } = AuthServices();

	useEffect(() => {
		if (!isLoggedIn) {
			LogoutService({ dispatch });
		}
	}, []);

	return (
		<Layout className={styles.spaceStyle}>
			<CustomHeader />
			<ToastContainer />
			<Content className={styles.contentStyle}>
				<UserProvider>
					<ClientProvider>
						<ProjectProvider>
							<TaskProvider>
								<Outlet />
							</TaskProvider>
						</ProjectProvider>
					</ClientProvider>
				</UserProvider>
			</Content>
			<CustomFooter />
		</Layout>
	);
}
