/* eslint-disable @typescript-eslint/no-explicit-any */
import { Table } from 'antd';
import Search from 'antd/es/input/Search';
import { ChangeEvent, useEffect, useState } from 'react';

type Props = {
	columns: any[];
	data: any[];
};

const AntTable = ({ columns, data }: Props) => {
	const [searchText, setSearchText] = useState('');
	const [filteredData, setFilteredData] = useState<any[]>();

	useEffect(() => {
		if (!searchText) {
			setFilteredData(data);
		}
	}, [searchText, data]);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;
		const searchText = value.toLowerCase();

		const filteredData = data.filter(obj => {
			return Object.values(obj).some(value => {
				if (Array.isArray(value)) {
					return value.some(item => {
						if (typeof item === 'number' || typeof item === 'string') {
							return String(item).toLowerCase().includes(searchText);
						}
						return String(item).toLowerCase().includes(searchText);
					});
				} else if (typeof value === 'string') {
					return value.toLowerCase().includes(searchText);
				} else if (typeof value === 'number') {
					return String(value).toLowerCase().includes(searchText);
				}
			});
		});
		setFilteredData(filteredData);
		setSearchText(value);
	};

	return (
		<div className="flex end flex-col items-end w-full gap-2 bg-slate-100 rounded-lg  p-4">
			<Search
				size="large"
				onChange={handleChange}
				value={searchText}
				placeholder="Search here"
				className="w-[300px]"
				allowClear
			/>

			<Table className="w-full" bordered columns={columns} dataSource={filteredData} />
		</div>
	);
};

export default AntTable;
