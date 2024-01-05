import { RootState } from '@/store/store';
import { UserDTO } from '@/types/auth.types';
import { useSelector } from 'react-redux';

const useList = () => {
	const userList = useSelector((state: RootState) => state.user.userList);

	const roleHelper = (role: string) => {
		const allUser: UserDTO[] = [...userList];
		const labelValuePair: any = [];
		const keyLabelValuePair: any = {};
		for (const key of allUser) {
			if (key.role === role) {
				const _obj = { label: key.name, value: key._id };
				labelValuePair.push(_obj);
				const id: any = key._id ?? '';
				keyLabelValuePair[id] = _obj;
			}
		}
		return { labelValuePair, keyLabelValuePair };
	};

	const ModuleList = (list: any[], label: string) => {
		const allProjects = [...list];
		const labelValuePair: any[] = [];
		const keyLabelValuePair: any = {};
		for (const key of allProjects) {
			const _obj = { label: key[label], value: key._id };
			labelValuePair.push(_obj);
			const id: any = key._id ?? '';
			keyLabelValuePair[id] = _obj;
		}
		return { labelValuePair, keyLabelValuePair };
	};

	return { roleHelper, ModuleList };
};

export default useList;
