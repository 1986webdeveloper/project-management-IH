import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements, Navigate } from 'react-router-dom';
import './App.css';
import AuthLayout from './layouts/authLayout/auth.layout';
import Login from './pages/auth/login.page';
import Register from './pages/auth/register.page';
import { Home } from './pages/home.page';
import DefaultLayout from './layouts/defaultLayout/default.layout';
import { ROUTES } from './constants/routes.constants';
// import { useSelector } from "react-redux";
// import { RootState } from "./store/store";
import ForgotPassword from './pages/auth/forgotPassword.page';
import ResetPassword from './pages/auth/resetPassword.page';
import Project from './pages/project.page';
import Client from './pages/client.page';

function App() {
	const isLoggedIn = true;
	// const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

	const routes = (
		<Route path={ROUTES.HOME} element={isLoggedIn ? <DefaultLayout /> : <AuthLayout />}>
			{isLoggedIn ? (
				<>
					<Route index element={<Home />} />
					<Route path={ROUTES.PROJECT} element={<Project />} />
					<Route path={ROUTES.CLIENT} element={<Client />} />
					{/* <Route path={""} element={""} /> */}
				</>
			) : (
				<>
					<Route index element={<Login />} />
					<Route path={ROUTES.LOGIN} element={<Login />} />
					<Route path={ROUTES.REGISTER} element={<Register />} />
					<Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPassword />} />
					<Route path={ROUTES.RESET_PASSWORD} element={<ResetPassword />} />
				</>
			)}
		</Route>
	);

	const router = createBrowserRouter(
		createRoutesFromElements(
			<>
				{routes}
				<Route path="*" element={<Navigate to={ROUTES.HOME} />} />
			</>,
		),
	);

	return <RouterProvider router={router} />;
}

export default App;
