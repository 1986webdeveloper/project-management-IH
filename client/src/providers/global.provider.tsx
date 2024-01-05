import GlobalService from '@/utils/service/global.service';
import { Spin } from 'antd';
import { ReactNode, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

type GlobalProviderProps = {
	children: ReactNode;
};

const GlobalProvider = (props: GlobalProviderProps) => {
	const [loading, setLoading] = useState(false);
	const dispatch = useDispatch();
	const { getAllData } = GlobalService();

	useEffect(() => {
		getAllData({ dispatch, setLoading });
	}, []);

	return <Spin spinning={loading}>{props.children}</Spin>;
};

export default GlobalProvider;
