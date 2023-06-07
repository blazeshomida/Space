"use client";

import React, { useState, useRef, useEffect, useContext } from "react";
import PageTitle from "@/components/PageTitle";
import Image from "next/image";
import data from "../../public/data.json";
import Styles from "./page.module.css";
import "../globals.css";
import { motion, AnimatePresence } from "framer-motion";
import { CurrentPageContext } from '../../components/CurrentPageContext'


const Technology = () => {
	const technologies = data.technology;
	const { setCurrentPage } = useContext(CurrentPageContext);


	const [activeSlideIndex, setActiveSlideIndex] = useState(0);
	const autoSlide = useRef(true);
	const intervalRef = useRef(null);
	const [animating, setAnimating] = useState(false);

	const activeName = technologies[activeSlideIndex].name;
	const activeImagePortrait = technologies[activeSlideIndex].images.portrait;
	const activeImageLandscape = technologies[activeSlideIndex].images.landscape;
	const activeDescription = technologies[activeSlideIndex].description;

	const handleClick = (index) => {
		if (animating) return;
		autoSlide.current = false; // Set autoSlide.current to false right before setting currentIndex
		setActiveSlideIndex(index);
	};

	useEffect(() => {
		setCurrentPage('/technology')
		intervalRef.current = setInterval(() => {
			autoSlide.current = true;

			setActiveSlideIndex((activeSlideIndex) => {
				const nextIndex = (activeSlideIndex + 1) % technologies.length;

				// Clear the interval and reset it right after updating activeSlideIndex
				clearInterval(intervalRef.current);
				intervalRef.current = setInterval(() => {
					autoSlide.current = true;
					setActiveSlideIndex(
						(activeSlideIndex) => (activeSlideIndex + 1) % technologies.length
					);
				}, 7000);

				return nextIndex;
			});
		}, 7000);

		return () => {
			clearInterval(intervalRef.current);
		};
	}, [technologies]);

	const sliderAnimation = {
		intial: { opacity: 0, scale: 1.5 },
		animate: { opacity: 1, scale: 1 },
		exit: { opacity: 0, scale: 0.8 },
		transition: {
			type: "ease-in-out",
			duration: autoSlide ? 0.3 : 0.15, // Change duration based on whether it was an auto slide or not
			onStart: () => setAnimating(true), // Set animating to true at the start of the animation
			onComplete: () => setAnimating(false), // Set animating to false at the end of the animation
		},
	};

	const desktopMedia = window.matchMedia(
		"(min-width: 1024px) and (orientation:landscape)"
	).matches;

	return (
		<div className={`grid ${Styles.layout} overflow-y-hidden`}>
			<PageTitle
				className={`${Styles.title}`}
				title="SPACE LAUNCH 101"
				number="03"
			/>
					<Image
						priority={true}
						className={`${Styles.image}`}
						width={1000}
						height={1000}
						src={desktopMedia ? activeImagePortrait : activeImageLandscape}
						alt={activeDescription}
					/>

			<div className={`flex gap-4 justify-center ${Styles.pagination}`}>
				{technologies.map((tech, index) => (
					<button
					key={index}
						className={`${Styles.button} heading_4 ${
							index === activeSlideIndex && `bg-white text-[#0B0D17]`
						}`}
						onClick={() => {
							handleClick(index);
						}}
					>
						{index + 1}
					</button>
				))}
			</div>
			<AnimatePresence mode="wait">
				<motion.div
			key={activeSlideIndex}
			initial={sliderAnimation.initial}
			animate={sliderAnimation.animate}
			exit={sliderAnimation.exit}
			transition={sliderAnimation.transition}
			className={`grid ${Styles.content}`}>
				<p className="uppercase nav_text">The Terminology...</p>
				<h1 className={`heading_3 text_color_primary`}>{activeName}</h1>
				<p>{activeDescription}</p>
			</motion.div>
			</AnimatePresence>
			
		</div>
	);
};

export default Technology;
