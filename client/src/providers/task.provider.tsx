import TaskService from '@/utils/service/task.service';
import { Spin } from 'antd';
import { ReactNode, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

type Props = {
	children: ReactNode;
};

const TaskProvider = (props: Props) => {
	const [loading, setLoading] = useState(false);
	const dispatch = useDispatch();
	const { getTaskList } = TaskService({ dispatch, setLoading });

	useEffect(() => {
		getTaskList();
	}, []);

	return <Spin spinning={loading}>{props.children}</Spin>;
};

export default TaskProvider;
