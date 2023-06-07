"use client";

import React, { useState, useRef, useEffect, useContext } from "react";
import PageTitle from "@/components/PageTitle";
import "../globals.css";
import Styles from "./page.module.css";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { CurrentPageContext } from '../../components/CurrentPageContext'


import data from "../../public/data.json";


const Destination = () => {
	const destinations = data.destinations;
	const [currentClicked, setCurrentClicked] = useState(0);
	const autoSlide = useRef(true);
	const intervalRef = useRef(null);
	const [animating, setAnimating] = useState(false);
	const { setCurrentPage } = useContext(CurrentPageContext);


	const activeName = destinations[currentClicked].name;
	const activeImage = destinations[currentClicked].images.webp;
	const activeDescription = destinations[currentClicked].description;
	const activeDistance = destinations[currentClicked].distance;
	const activeTravel = destinations[currentClicked].travel;

	const clickPlanet = (index) => {
		clearInterval(intervalRef.current);
		if (animating) return;
		autoSlide.current = false; // Set autoSlide.current to false right before setting currentIndex
		setCurrentClicked(index);
	};

	const handleDrag = (offset) => {
		clearInterval(intervalRef.current);

		if (offset > 100 && currentClicked !== 0) {
			setCurrentClicked((currentClicked) => currentClicked - 1);
		} else if (offset < -100 && currentClicked !== destinations.length - 1) {
			setCurrentClicked((currentClicked) => currentClicked + 1);
		} else if (offset > 100 && currentClicked === 0) {
			setCurrentClicked(3);
		} else if (offset < 100 && currentClicked === 3) {
			setCurrentClicked(0);
		}
	};

	useEffect(() => {
		setCurrentPage('/destination')

		intervalRef.current = setInterval(() => {
			autoSlide.current = true;

			setCurrentClicked((currentClicked) => {
				const nextIndex = (currentClicked + 1) % destinations.length;

				// Clear the interval and reset it right after updating currentClicked
				clearInterval(intervalRef.current);
				intervalRef.current = setInterval(() => {
					autoSlide.current = true;
					setCurrentClicked(
						(currentClicked) => (currentClicked + 1) % destinations.length
					);
				}, 5000);

				return nextIndex;
			});
		}, 5000);

		return () => {
			clearInterval(intervalRef.current);
		};
	}, [destinations]);

	const sliderAnimation = {
		intial: { opacity: 0, scale: 0.8 },
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
		<div className={`p-2 gap-8 ${Styles.layout}`}>
			<PageTitle
				className={`${Styles.title}`}
				title={"Pick your destination"}
				number={"01"}
			/>
			<AnimatePresence mode="wait">
				<motion.div
					className={`grid align-center ${Styles.planet}`}
					key={currentClicked}
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
						priority={true}
						className={` cursor-pointer`}
						width={1000}
						height={1000}
						src={activeImage}
						alt={activeDescription}
					/>
				</motion.div>
			</AnimatePresence>

			<div className={`grid grid-flow-col z-10 nav_text ${Styles.tabs} `}>
				{destinations.map((destination, index) => (
					<button
						key={destination.name}
						type="button"
						onClick={() => clickPlanet(index)}
						className={`${
							destination.name === activeName
								? Styles.activeTab
								: Styles.inactiveTab
						} uppercase`}
					>
						{destination.name}
					</button>
				))}
			</div>
			<AnimatePresence mode="wait">
				<motion.div
					className={`grid ${Styles.info}`}
					key={currentClicked}
					initial={sliderAnimation.initial}
					animate={sliderAnimation.animate}
					exit={sliderAnimation.exit}
					transition={sliderAnimation.transition}
				>
					<h1 className="heading_2 text_color_primary">{activeName}</h1>
					<p>{activeDescription}</p>
				</motion.div>
			</AnimatePresence>
			<AnimatePresence mode="wait">
				<motion.div
					className={Styles.details}
					key={currentClicked}
					initial={sliderAnimation.initial}
					animate={sliderAnimation.animate}
					exit={sliderAnimation.exit}
					transition={sliderAnimation.transition}
				>
					<p className={`sub_heading_2 ${Styles.distLabel}`}>AVG. DISTANCE</p>
					<p
						className={`sub_heading_1 ${Styles.distDetail} text_color_primary`}
					>
						{activeDistance}
					</p>
					<p className={`sub_heading_2 ${Styles.timeLabel}`}>
						Est. travel time
					</p>
					<p
						className={`sub_heading_1 ${Styles.timeDetail} text_color_primary`}
					>
						{activeTravel}
					</p>
				</motion.div>
			</AnimatePresence>
		</div>
	);
};

export default Destination;
