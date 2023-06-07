"use client";
import React, { useState, useEffect, useRef, useContext } from "react";
import PageTitle from "@/components/PageTitle";
import data from "../../public/data.json";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Styles from "./page.module.css";
import { CurrentPageContext } from '../../components/CurrentPageContext'


const Crew = () => {
	const crew = data.crew;
	const [currentIndex, setCurrentIndex] = useState(0);
	const autoSlide = useRef(true);
	const intervalRef = useRef(null);
	const [animating, setAnimating] = useState(false);
	const { setCurrentPage } = useContext(CurrentPageContext);


	const currentCrewName = crew[currentIndex].name;
	const currentCrewImage = crew[currentIndex].images.webp;
	const currentCrewRole = crew[currentIndex].role;
	const currentCrewBio = crew[currentIndex].bio;

	const handleDrag = (offset) => {
		clearInterval(intervalRef.current);

		if (offset > 100 && currentIndex !== 0) {
			setCurrentIndex((currentIndex) => currentIndex - 1);
		} else if (offset < -100 && currentIndex !== crew.length - 1) {
			setCurrentIndex((currentIndex) => currentIndex + 1);
		} else if (offset > 100 && currentIndex === 0) {
			setCurrentIndex(3);
		} else if (offset < 100 && currentIndex === 3) {
			setCurrentIndex(0);
		}

	};

	useEffect(() => {
		setCurrentPage('/crew')

		intervalRef.current = setInterval(() => {
			autoSlide.current = true;

			setCurrentIndex((currentIndex) => {
				const nextIndex = (currentIndex + 1) % crew.length;

				// Clear the interval and reset it right after updating currentIndex
				clearInterval(intervalRef.current);
				intervalRef.current = setInterval(() => {
					autoSlide.current = true;
					setCurrentIndex((currentIndex) => (currentIndex + 1) % crew.length);
				}, 5000);

				return nextIndex;
			});
		}, 5000);

		return () => {
			clearInterval(intervalRef.current);
		};
	}, [crew]);

	const handleClick = (index) => {
		if (animating) return;
		autoSlide.current = false; // Set autoSlide.current to false right before setting currentIndex
		setCurrentIndex(index);
	};
	const sliderAnimation = {
		intial: { opacity: 0, scale: 1.5 },
		animate: { opacity: 1, scale: 1 },
		exit: { opacity: 0, scale: 0.8 },
		transition: {
			type: "ease-in-out",
			duration: autoSlide ? 0.5 : 0.3, // Change duration based on whether it was an auto slide or not
			onStart: () => setAnimating(true), // Set animating to true at the start of the animation
			onComplete: () => setAnimating(false), // Set animating to false at the end of the animation
		},
	};

	return (
		<div className={`grid ${Styles.layout} gap-2`}>
			<PageTitle
				title="Meet your crew"
				number="02"
				className={`${Styles.title}`}
			/>

			<AnimatePresence mode="wait">
				<motion.div
					className={`${Styles.image}`}
					key={currentCrewImage}
					initial={sliderAnimation.initial}
					animate={sliderAnimation.animate}
					exit={sliderAnimation.exit}
					transition={sliderAnimation.transition}
					drag="x"
					onDragEnd={(event, info) => {
						handleDrag(info.offset.x);
					}}
					dragSnapToOrigin={true}
					dragElastic={0.5}
					dragConstraints={{ left: -100, right: 100 }}
				>
					<Image
						className="aspect-[1/1] object-contain"
						src={currentCrewImage}
						width={1000}
						height={1000}
						alt={currentCrewBio}
					/>
				</motion.div>
			</AnimatePresence>

			<AnimatePresence className={``} mode="wait">
				<div className={`md:p-8 flex justify-center gap-3 ${Styles.pagination}`}>
					{crew.map((crewMember, crewIndex) => (
						<button
							key={crewIndex}
							className={`w-[.625rem] ${
								currentIndex === crewIndex
									? `bg-[#fff]`
									: `bg-[rgba(255,255,255,.17)]`
							} rounded-full aspect-square ${Styles.pagButton}`}
							onClick={() => handleClick(crewIndex)}
						></button>
					))}
				</div>
			</AnimatePresence>
			<AnimatePresence mode="wait">
				<motion.div
					className={`${Styles.bio} p-8`}
					key={currentCrewName}
					initial={sliderAnimation.initial}
					animate={sliderAnimation.animate}
					exit={sliderAnimation.exit}
					transition={sliderAnimation.transition}
				>
					<p className="heading_4 uppercase text_color_primary opacity-50">{currentCrewRole}</p>
					<h1 className="heading_3 uppercase text_color_primary">{currentCrewName}</h1>
					<h1>{currentCrewBio}</h1>
				</motion.div>
			</AnimatePresence>
		</div>
	);
};

export default Crew;
