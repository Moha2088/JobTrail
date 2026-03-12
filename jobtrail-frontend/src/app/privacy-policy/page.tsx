"use client"

import { motion } from "motion/react"

export default function Page() {

    return (
        <div
            className="mt-10 flex flex-col gap-10 "
        >
            <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex justify-center"
            >
                <h1 className="text-3xl font-bold mb-10">
                    Privacy Policy
                </h1>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="flex justify-center mr-93">
                <p className="font-bold">
                    Last updated: March 12, 2026
                </p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.25 }}
                className="flex flex-col gap-10 mb-20"
            >
                <div className="mr-auto ml-auto max-w-150">
                    We respect your privacy and are committed to protecting your personal information.
                </div>

                <div className="mr-auto ml-auto max-w-150 font-bold">
                    Information We Collect
                </div>

                <div className="mr-auto ml-auto max-w-150">
                    When you use our job application tracking app, we may collect:

                    Account information (such as your name and email)

                    Job application details you enter (companies, roles, notes, statuses)

                    Documents you upload (such as resumes or cover letters)

                    Basic usage and device information for analytics and security

                    How We Use Your Information

                    We use your information to:

                    Provide and improve the app

                    Help you track and manage job applications

                    Power AI features that analyze or generate content based on the information you provide

                    Maintain security and prevent misuse
                </div>

                <div className="mr-auto ml-auto max-w-150 font-bold">
                    AI Processing
                </div>

                <div className="mr-auto ml-auto max-w-150">
                    Some features may send the information you provide (such as resume content or prompts) to third-party AI services to generate responses. This data is used only to provide the requested feature.

                </div>

                <div className="mr-auto ml-auto max-w-150 font-bold">
                    Data Sharing
                </div>

                <div className="mr-auto ml-auto max-w-150">
                    We do not sell your personal information. We may share data with trusted service providers that help operate the app (such as hosting, analytics, or AI providers).
                </div>

                <div className="mr-auto ml-auto max-w-150 font-bold">
                    Data Retention
                </div>

                <div className="mr-auto ml-auto max-w-150">
                    We keep your data only as long as necessary to provide the service. You may request deletion of your data at any time.
                </div>

                <div className="mr-auto ml-auto max-w-150 font-bold">
                    Contact
                </div>

                <div className="mr-auto ml-auto max-w-150">
                    If you have questions about this Privacy Policy, contact us at: <p className="font-bold inline-block underline">info@jobtrail.com</p>
                </div>
            </motion.div>
        </div>
    )
}