import { useEffect, useState } from "react";

export default function CyberCursorGlow() {
    const [position, setPosition] = useState({ x: -200, y: -200 });
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const moveCursor = (e) => {
            setPosition({ x: e.clientX, y: e.clientY });
            setIsVisible(true);
        };

        const hideCursor = () => {
            setIsVisible(false);
        };

        window.addEventListener("mousemove", moveCursor);
        window.addEventListener("mouseout", hideCursor);

        return () => {
            window.removeEventListener("mousemove", moveCursor);
            window.removeEventListener("mouseout", hideCursor);
        };
    }, []);

    return (
        <div
            className={`pointer-events-none fixed z-[60] hidden h-40 w-40 rounded-full blur-3xl transition-opacity duration-300 md:block ${isVisible ? "opacity-100" : "opacity-0"
                }`}
            style={{
                left: position.x - 80,
                top: position.y - 80,
                background:
                    "radial-gradient(circle, rgba(168,85,247,0.16) 0%, rgba(59,130,246,0.10) 35%, rgba(168,85,247,0.08) 55%, transparent 75%)",
            }}
        />
    );
}