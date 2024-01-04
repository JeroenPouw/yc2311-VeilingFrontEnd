import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [token, setToken] = useState(localStorage.getItem("userToken"));

	useEffect(() => {
		setIsLoggedIn(!!token);
	}, [token]);

	useEffect(() => {
		const handleStorageChange = () => {
			const newToken = localStorage.getItem("userToken");
			setToken(newToken);
		};

		window.addEventListener("storage", handleStorageChange);

		return () => {
			window.removeEventListener("storage", handleStorageChange);
		};
	}, []);

	return (
		<AuthContext.Provider
			value={{ isLoggedIn, setIsLoggedIn, token, setToken }}
		>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);
