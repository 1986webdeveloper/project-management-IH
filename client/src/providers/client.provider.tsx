import { ReactNode, useEffect, useState } from 'react';
import ClientService from '@/utils/service/client.service';
import { useDispatch, useSelector } from 'react-redux';
import { Spin } from 'antd';

type Props = {
	children: ReactNode;
};

const ClientProvider = (props: Props) => {
	const [loading, setLoading] = useState(false);
	const dispatch = useDispatch();
	const { GetClient } = ClientService({ dispatch, setLoading });

	useEffect(() => {
		GetClient();
	}, []);

	return <Spin spinning={loading}>{props.children}</Spin>;
};

export default ClientProvider;
