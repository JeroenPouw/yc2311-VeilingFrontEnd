import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Root from "./routes/root";
import ErrorPage from "./Error";
import App from "./routes/App";
import Profiel from "./routes/Profiel";
import Items from "./routes/Items";
import Veilingen from "./routes/Veilingen";
import AdminPortal from "./routes/AdminPortal";
import PersoonlijkeHomepage from "./routes/PersoonlijkeHomepage";
import Registreren from "./routes/Registreren";
import Inloggen from "./routes/Inloggen";
import Accounts from "./routes/Accounts";
import DefaultAdminPage from "./routes/DefaultAdminPage";
import ItemDetails from "./components/ItemDetails";

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
				path: "/admin",
				element: <AdminPortal children={undefined} />,
				children: [
					{
						index: true,
						element: <DefaultAdminPage />,
					},
					{
						path: "/admin/veilingen",
						element: <Veilingen />,
					},
					{
						path: "/admin/accounts",
						element: <Accounts />,
					},
					{
						path: "/admin/items",
						element: <Items />,
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
