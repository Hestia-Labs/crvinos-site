"use client";
import React, { useEffect } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

interface RevealProps {
    children: React.ReactNode;
    width?: "fit-content" | "100%" | "auto" | string;
    initial?: boolean;
}

const Reveal: React.FC<RevealProps> = ({ children, width, initial = false }) => {
    const ref = React.useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true });
    const mainControls = useAnimation();

    useEffect(() => {
        if (isInView || initial) {
            mainControls.start("visible");
        }
    }, [isInView, mainControls, initial]);

    useEffect(() => {
        if (initial) {
            mainControls.set("visible");
        }
    }, [initial, mainControls]);

    return (
        <div ref={ref} style={{ position: "relative"  }}>
            <motion.div
                initial={initial ? "visible" : "hidden"}
                animate={mainControls}
                transition={{ delay: initial ? 0 : 0.25, duration: initial ? 0 : 0.5 }}
                variants={{
                    hidden: { opacity: 0, y: 75 },
                    visible: { opacity: 1, y: 0 },
                }}
            >
                {children}
            </motion.div>
        </div>
    );
};

export default Reveal;
