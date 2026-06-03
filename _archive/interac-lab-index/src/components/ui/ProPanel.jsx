import { cn } from "../../utils/cn";

const variants = {
    default: "panel-pro",
    card: "card-pro",
    inner: "inner-pro",
};

export default function ProPanel({
    children,
    variant = "default",
    className = "",
}) {
    return (
        <div className={cn(variants[variant], className)}>
            {children}
        </div>
    );
}