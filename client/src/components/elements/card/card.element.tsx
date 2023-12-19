import { Card } from 'antd';
import { ReactNode } from 'react';

type Props = {
	children: ReactNode;
	coverImage?: ReactNode;
	cardDivStye?: string;
	cardTitle?: ReactNode;
	createButton?: ReactNode;
};

const AntCard = ({ children, coverImage, cardDivStye, cardTitle }: Props) => {
	return (
		<Card
			className="flex flex-col border-none shadow-2xl shadow-slate-90"
			cover={coverImage ? coverImage : null}
			title={cardTitle ? <span className="flex items-start text-blue-950">{cardTitle}</span> : null}
		>
			<div className={`flex flex-col gap-10 + ${cardDivStye}`}>{children}</div>
		</Card>
	);
};

export default AntCard;
