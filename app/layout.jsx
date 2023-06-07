import "./globals.css";
import NavBar from "@/components/NavBar"
import { CurrentPageProvider } from '../components/CurrentPageContext';

export const metadata = {
	title: "SPACE",
	description: "SO, YOU WANT TO TRAVEL TO SPACE?",
};

export default function RootLayout({ children }) {
	return (
		<CurrentPageProvider>
			<html lang="en">
			<body>
			<header>
				<NavBar />
			</header>
				<main className="text-center lg:text-left">{children}</main>
			</body>
		</html>
		</CurrentPageProvider>
		
	);
}
