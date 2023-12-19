import UserService from '@/utils/service/user.service';
import { Spin } from 'antd';
import { ReactNode, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

type Props = {
	children: ReactNode;
};

const UserProvider = (props: Props) => {
	const [loading, setLoading] = useState(false);
	const { getUserList } = UserService();
	const dispatch = useDispatch();

	useEffect(() => {
		getUserList({ dispatch, setLoading });
	}, []);

	return <Spin spinning={loading}>{props.children}</Spin>;
};

export default UserProvider;
