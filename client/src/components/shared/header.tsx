import { UserOutlined } from '@ant-design/icons';
import { Avatar, Badge, Popover, Tabs } from 'antd';
import { ROUTES, RouteMenu } from '@/constants/routes.constants';
import { useNavigate } from 'react-router-dom';

const CustomHeader = () => {
	const navigate = useNavigate();
	const onTabChange = (key: string) => {
		const index = Number(key) - 1;
		navigate(RouteMenu[index].route);
	};

	const AvtarPoptemplate = () => {
		return <div>hello logout</div>;
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
				<Popover content={AvtarPoptemplate} title="Title">
					<Badge count={3}>
						<Avatar shape="circle" icon={<UserOutlined />} />
					</Badge>
					{}
				</Popover>
			</div>
		</div>
	);
};

export default CustomHeader;
