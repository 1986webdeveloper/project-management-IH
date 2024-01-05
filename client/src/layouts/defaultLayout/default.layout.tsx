import { ReactNode, useEffect, useState } from 'react';
import { Layout, Menu } from 'antd';
import CustomHeader from '@/components/shared/header.shared';
import { Outlet, useNavigate } from 'react-router-dom';
import { AntRoute, ROUTES, RouteType } from '@/constants/routes.constants';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import styles from './default.module.scss';
import * as Icon from 'react-icons/fa';

const { Sider, Content } = Layout;

interface DefaultLayoutProps {
	children: ReactNode;
}

const DefaultLayout = ({ children }: DefaultLayoutProps) => {
	const [collapsed, setCollapsed] = useState(false);
	const navigate = useNavigate();
	const currentUser = useSelector((state: RootState) => state.auth.loggedUser);
	const [heading, setHeading] = useState('');
	const pathName = window.location.href;
	const filteredRoutes = AntRoute.filter((route: any) => {
		return route?.permission?.includes(currentUser?.role);
	});

	useEffect(() => {
		if (!heading && pathName !== ROUTES.HOME) {
			setHeading('Dashboard');
			navigate(ROUTES.HOME);
		}
	}, [heading, pathName]);

	return (
		<Layout>
			<Sider trigger={null} collapsible collapsed={collapsed}>
				<div className="flex items-center justify-center rounded-lg p-2 m-4 bg-slate-300">Logo</div>
				<Menu
					theme="dark"
					mode="inline"
					defaultSelectedKeys={['1']}
					onClick={({ key }) => {
						const index = Number(key) - 1;
						const menuItem = filteredRoutes[index];
						navigate(menuItem?.route);
						setHeading(menuItem.heading ?? 'Dashboard');
					}}
					items={filteredRoutes.map((item: RouteType, i: number) => {
						const id = String(i + 1);
						const ReactIcon = Icon[item?.icon];
						return {
							label: item.label,
							key: id,
							icon: <ReactIcon />,
						};
					})}
				/>
			</Sider>
			<Layout>
				<CustomHeader collapsed={collapsed} setCollapsed={setCollapsed} Heading={heading} />
				<Content className={styles.contentStyle}>
					<Outlet />
					{children}
				</Content>
			</Layout>
		</Layout>
	);
};

export default DefaultLayout;
