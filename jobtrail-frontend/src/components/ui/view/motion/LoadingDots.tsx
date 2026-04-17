"use client"

import { Variants, motion, stagger } from "motion/react"

export function LoadingDots() {

    const dotVariants: Variants = {
        pulse: {
            scale: [1, 1.3, 1],
            transition: {
                duration: 1.5,
                repeat: Infinity,
                ease: "easeOut"
            }
        }
    }

    const dotStyles = "bg-stone-700 p-2 rounded-full"

    return (
        <motion.div
            animate="pulse"
            transition={{ delayChildren: stagger(-0.4, { from: "first" }) }}
            className="flex flex-row gap-3">

            <motion.div variants={dotVariants} className={dotStyles}/>
            <motion.div variants={dotVariants} className={dotStyles}/>
            <motion.div variants={dotVariants} className={dotStyles}/>
        </motion.div>
    )
}