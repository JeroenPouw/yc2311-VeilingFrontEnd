import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Root from "./routes/root";
import ErrorPage from "./Error";
import App from "./routes/App";
import Profiel from "./routes/Profiel";
import AdminItems from "./routes/AdminItems";
import AdminVeilingen from "./routes/AdminVeilingen";
import AdminPortal from "./routes/AdminPortal";
import PersoonlijkeHomepage from "./routes/PersoonlijkeHomepage";
import Registreren from "./routes/Registreren";
import Inloggen from "./routes/Inloggen";
import AdminAccounts from "./routes/AdminAccounts";
import DefaultAdminPage from "./routes/DefaultAdminPage";
import ItemDetails from "./components/ItemDetails";
import Veilingen from "routes/Veilingen";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Root />,
		errorElement: <ErrorPage />,
		children: [
			{
				path: "/",
				element: <App />,
			},
			{
				path: "/profiel",
				element: <Profiel />,
			},
			{
				path: "/veilingen",
				element: <Veilingen />,
			},
			{
				path: "/admin",
				element: <AdminPortal children={undefined} />,
				children: [
					{
						index: true,
						element: <DefaultAdminPage />,
					},
					{
						path: "/admin/veilingen",
						element: <AdminVeilingen />,
					},
					{
						path: "/admin/accounts",
						element: <AdminAccounts />,
					},
					{
						path: "/admin/items",
						element: <AdminItems />,
					},
				],
			},
			{
				path: "/registreren",
				element: <Registreren />,
			},
			{
				path: "/inloggen",
				element: <Inloggen />,
			},
			{
				path: "/persoonlijke-homepage",
				element: <PersoonlijkeHomepage />,
			},
			{
				path: "/veilingstuk/:id",
				element: <ItemDetails />,
			},
		],
	},
]);

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
