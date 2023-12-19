import { ReactNode, useEffect, useState } from 'react';
import ClientService from '@/utils/service/client.service';
import { useDispatch, useSelector } from 'react-redux';
import { Spin } from 'antd';

type Props = {
	children: ReactNode;
};

const ClientProvider = (props: Props) => {
	const [loading, setLoading] = useState(false);
	const { GetClient } = ClientService();
	const dispatch = useDispatch();

	useEffect(() => {
		GetClient({ dispatch, setLoading });
	}, []);

	return <Spin spinning={loading}>{props.children}</Spin>;
};

export default ClientProvider;
