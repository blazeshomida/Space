'use client'

import NavBar from "@/components/NavBar";
import Styles from "./page.module.css";
import Link from "next/link";
import { useContext } from "react";
import { CurrentPageContext } from '../components/CurrentPageContext'


export default function page() {
	const {setCurrentPage } = useContext(CurrentPageContext)

	return (
		<section className={Styles.section}>
			<div
				className={`grid gap-6  justify-items-center lg:align-start ${Styles.section} p-3 md:p-4 lg:p-8`}
			>
				<div>
					<h1 className="heading_1 font-regular">
						<span className="heading_5 block">SO, YOU WANT TO TRAVEL TO</span>
						SPACE
					</h1>
					<p className="pb-20">
						Let’s face it; if you want to go to space, you might as well genuinely
						go to outer space and not hover kind of on the edge of it. Well sit
						back, and relax because we’ll give you a truly out of this world
						experience!
					</p>
				</div>
				<Link
				href={'/destination'}
				 className={`border-none bg-white text-black heading_4 relative self-center ${Styles.exploreButton}`}
				 onClick={() => setCurrentPage('/destination')}>
					Explore
				</Link>
			</div>
		</section>
	);
}
