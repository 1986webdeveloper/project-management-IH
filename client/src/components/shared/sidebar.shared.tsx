import { Menu, MenuProps } from 'antd';
import Sider from 'antd/es/layout/Sider';
import styles from './sidebar.module.scss';
import { useNavigate } from 'react-router-dom';
import { ReactNode, Key } from 'react';
import { RouteMenu } from '@/constants/routes.constants';

type MenuItem = Required<MenuProps>['items'][number];

interface sidebarProps {
	setCollapsed: (e: boolean) => void;
}
const SidebarComponent = ({ setCollapsed }: sidebarProps) => {
	const navigate = useNavigate();

	const getItem = (label: ReactNode, key: Key, icon?: ReactNode, onClick?: any): MenuItem => {
		return {
			key,
			icon,
			label,
			onClick,
		} as MenuItem;
	};

	const sidebarItems: MenuItem[] = RouteMenu.map(item => {
		return getItem(item.label, item.key, item.icon, () => {
			navigate(item.route);
		});
	});

	return (
		<Sider
			breakpoint="lg"
			collapsedWidth="0"
			onCollapse={collapsed => {
				setCollapsed(collapsed);
			}}
			className={styles.sidebar}
		>
			{/* <span className={styles.logo}>{logoText}</span> */}
			<Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} items={sidebarItems} />
		</Sider>
	);
};

export default SidebarComponent;
