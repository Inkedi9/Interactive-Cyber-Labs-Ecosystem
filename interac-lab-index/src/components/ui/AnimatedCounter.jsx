import { useEffect, useState } from "react";

export default function AnimatedCounter({ value, duration = 900, suffix = "" }) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!value || value <= 0) {
            setCount(0);
            return;
        }

        let start = 0;
        const stepTime = Math.max(Math.floor(duration / value), 40);

        const timer = setInterval(() => {
            start += 1;
            if (start >= value) {
                setCount(value);
                clearInterval(timer);
            } else {
                setCount(start);
            }
        }, stepTime);

        return () => clearInterval(timer);
    }, [value, duration]);

    return <span>{count}{suffix}</span>;
}