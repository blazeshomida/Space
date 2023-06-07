"use client";

import React, { useState, useContext } from "react";
import Image from "next/image";
import "../app/globals.css";
import Link from "next/link";
import { CurrentPageContext } from './CurrentPageContext'



const NavBar = () => {
	const [menuToggle, setMenuToggle] = useState(true);
	const { currentPage, setCurrentPage } = useContext(CurrentPageContext);

	const handleMenuToggle = () => {
		setMenuToggle((prev) => !prev);
	};

	function navItem(number, name, href) {
		this.number = number;
		this.name = name;
		this.href = href;
	}


	const navItems = [
		new navItem("00", "Home", "/"),
		new navItem("01", "Destination", "/destination"),
		new navItem("02", "Crew", "/crew"),
		new navItem("03", "Technology", "/technology"),
	];

	return (
		<nav className={`p-6 md:p-4 lg:p-8 lg:pr-0 flex justify-between relative z-[1000] `}>
			<Link href={"/"}>
				<Image
					src="/assets/shared/logo.svg"
					width={48}
					height={48}
					alt="Company Logo"
				/>
			</Link>
			<ul
				className="hidden md:flex | gap-8 | items-center | px-12 | py-6 | m-[-16px] lg:m-0 | bg-[rgb(255,255,255,.04)] | top-0 | backdrop-blur-lg | ease-out | duration-200 | nav_text uppercase"
				role="list"
			>
				{navItems.map((item) => (
					<li key={item.number}>
						<Link href={item.href} className={`flex gap-2 text_color_primary ${currentPage === item.href ? `activeLink` : `inactiveLink`}  nav_text`}
						onClick={() => setCurrentPage(item.href)}>
							<span className="font-bold md:max-lg:hidden" aria-hidden="true">
								{item.number}
							</span>
							{item.name}
						</Link>
					</li>
				))}
			</ul>

			{/* Mobile Navigation */}
			<button onClick={handleMenuToggle} className="md:hidden">
				<Image
					src="/assets/shared/icon-hamburger.svg"
					width={24}
					height={21}
					alt="Menu Hamburger Icon"
				/>
			</button>
			<div
				className={`fixed ${
					menuToggle ? "right-[-100%]" : "right-0"
				} p-6 bg-[rgb(255,255,255,.04)] h-full top-0 backdrop-blur-lg w-[70%] ease-out duration-200 gap-8`}
			>
				<button onClick={handleMenuToggle} className="w-full flex justify-end">
					<Image
						src="/assets/shared/icon-close.svg"
						width={20}
						height={21}
						alt="Menu Close Icon"
					/>
				</button>
				<ul className="grid | gap-8 | mt-16 | nav_text" role="list">
					{navItems.map((item) => (
						<li key={item.number}>
							<Link
								onClick={handleMenuToggle}
								href={item.href}
								className="flex gap-2 uppercase"
							>
								<span className="font-bold md:max-lg:hidden text_color_primary" aria-hidden="true">
									{item.number}
								</span>
								{item.name}
							</Link>
						</li>
					))}
				</ul>
			</div>
		</nav>
	);
};

export default NavBar;
