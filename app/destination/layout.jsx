import NavBar from "@/components/NavBar";
import Styles from "./page.module.css";

export const metadata = {
	title: "Destination",
	description: "Pick your destination for space travel",
};


export default function DestinationLayout({ children }) {
    return (
        <section className={`${Styles.section}`}>
          {children}
        </section>
    )
  }
  