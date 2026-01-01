import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

export const HeroGrid = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [highlight, setHighlight] = useState<{ x: number; y: number; opacity: number }>({ x: 0, y: 0, opacity: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!containerRef.current) return;

            const rect = containerRef.current.getBoundingClientRect();

            // Check if mouse is within bounds
            if (
                e.clientX < rect.left ||
                e.clientX > rect.right ||
                e.clientY < rect.top ||
                e.clientY > rect.bottom
            ) {
                setHighlight((prev) => ({ ...prev, opacity: 0 }));
                return;
            }

            // Calculate Grid Position relative to the container
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Snap to 50px grid
            const cellX = Math.floor(x / 50) * 50;
            const cellY = Math.floor(y / 50) * 50;

            setHighlight({ x: cellX, y: cellY, opacity: 1 });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div ref={containerRef} className="absolute inset-0 z-0 pointer-events-none">
            {/* Grid Lines */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:50px_50px]"></div>

            {/* Active Highlight Cell */}
            <motion.div
                className="absolute bg-white/20 backdrop-blur-[1px]"
                animate={{
                    x: highlight.x,
                    y: highlight.y,
                    opacity: highlight.opacity,
                }}
                transition={{
                    type: "tween",
                    ease: "backOut",
                    duration: 0.15
                }}
                style={{
                    width: 50,
                    height: 50,
                }}
            />
        </div>
    );
};
