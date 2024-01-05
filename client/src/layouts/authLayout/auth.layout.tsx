import AntCard from '@/components/elements/card/card.element';
import { Outlet } from 'react-router-dom';
import styles from './auth.module.scss';
import authImage from '@/assets/authImage.jpg';

import 'react-toastify/dist/ReactToastify.css';
import { ReactNode } from 'react';

interface AuthLayoutProps {
	children: ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
	return (
		<div className={styles.authWrapper}>
			<AntCard
				coverImage={
					<div className={styles.imageWrapper}>
						<img className={styles.image} alt="example" src={authImage} />
					</div>
				}
			>
				<div>
					<Outlet />
					{children}
				</div>
			</AntCard>
		</div>
	);
};
export default AuthLayout;
