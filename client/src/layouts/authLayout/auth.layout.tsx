import AntCard from '@/components/elements/card/card.element';
import { Outlet } from 'react-router-dom';
import styles from './auth.module.scss';
import authImage from '@/assets/authImage.jpg';

export default function AuthLayout() {
	return (
		<div className={styles.authWrapper}>
			<AntCard
				coverImage={
					<div className={styles.imageWrapper}>
						<img className={styles.image} alt="example" src={authImage} />
					</div>
				}
			>
				<Outlet />
			</AntCard>
		</div>
	);
}
