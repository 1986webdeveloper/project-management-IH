import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';
import styles from './default.module.scss';

import CustomFooter from '@/pages/footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CustomHeader from '@/components/shared/header';
import ProjectProvider from '@/providers/project .provider';
import ClientProvider from '@/providers/client.provider';
import TaskProvider from '@/providers/task.provider';

const { Content } = Layout;

export default function DefaultLayout() {
	return (
		<Layout className={styles.spaceStyle}>
			<CustomHeader />
			<ToastContainer />
			<Content className={styles.contentStyle}>
				<ClientProvider>
					<ProjectProvider>
						<TaskProvider>
							<Outlet />
						</TaskProvider>
					</ProjectProvider>
				</ClientProvider>
			</Content>
			<CustomFooter />
		</Layout>
	);
}
