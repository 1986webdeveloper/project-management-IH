import { ReactNode, useEffect } from 'react';
import ClientService from '@/utils/service/client.service';
import { useDispatch } from 'react-redux';

type Props = {
	children: ReactNode;
};

const ClientProvider = (props: Props) => {
	const { GetClient } = ClientService();

	const dispatch = useDispatch();

	useEffect(() => {
		GetClient({ dispatch });
	}, []);

	return <>{props.children}</>;
};

export default ClientProvider;
