import { UserOutlined } from '@ant-design/icons';
import { Avatar, Badge, Button, Popover, Tabs } from 'antd';
import { ROUTES, RouteMenu } from '@/constants/routes.constants';
import { useNavigate } from 'react-router-dom';
import AuthServices from '@/utils/service/auth.service';
import { useDispatch } from 'react-redux';

const CustomHeader = () => {
	const navigate = useNavigate();
	const { LogoutService } = AuthServices();
	const dispatch = useDispatch();
	const onTabChange = (key: string) => {
		const index = Number(key) - 1;
		navigate(RouteMenu[index].route);
	};

	const AvatarPopTemplate = () => {
		return (
			<Button danger type="primary" onClick={() => LogoutService({ dispatch })}>
				Logout
			</Button>
		);
	};
	return (
		<div className="flex p-4 items-center justify-between w-full shadow-xl">
			<div className="flex gap-12">
				<div
					className="border-solid border-2 p-2 border-slate-950 cursor-pointer"
					onClick={() => navigate(ROUTES.HOME)}
				>
					Logo
				</div>
				<div>
					<Tabs
						defaultActiveKey="1"
						centered
						onChange={key => {
							onTabChange(key);
						}}
						items={RouteMenu.map((_, i) => {
							const id = String(i + 1);
							return {
								label: _.label,
								key: id,
								active: _.key === Number(id) ? true : false,
							};
						})}
					/>
				</div>
			</div>
			<div>
				<Popover content={AvatarPopTemplate}>
					<Badge count={1}>
						<Avatar shape="circle" icon={<UserOutlined />} />
					</Badge>
					{}
				</Popover>
			</div>
		</div>
	);
};

export default CustomHeader;
