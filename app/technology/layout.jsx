import NavBar from "@/components/NavBar";
import Styles from './page.module.css'
import "../globals.css";

export const metadata = {
	title: "Technology",
	description: "Technologies in Space Launch 101",
};

export default function TechnologyLayout({ children }) {
	return (
		<>
			<section className={`${Styles.section}`}>{children}</section>
		</>
	);
}
