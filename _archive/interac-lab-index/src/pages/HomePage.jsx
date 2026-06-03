import { useEffect, useMemo, useState } from "react";
import Layout from "../components/layout/Layout";
import HeroSection from "../components/sections/HeroSection";
import CommandCenterHeader from "../components/sections/CommandCenterHeader";
import FilterPanel from "../components/sections/FilterPanel";
import LabGrid from "../components/sections/LabGrid";
import StatsPanel from "../components/sections/StatsPanel";
import SearchPanel from "../components/sections/SearchPanel";
import RecommendedLabs from "../components/sections/RecommendedLabs";
import Footer from "../components/sections/Footer";
import LabPreviewDrawer from "../components/ui/LabPreviewDrawer";
import ScrollToTopButton from "../components/ui/ScrollToTopButton";
import { labs } from "../data/labs";
import {
    applyFilters,
    searchLabs,
    sortLabs,
    getRecommendedLabs,
} from "../utils/filters";
import CommandPalette from "../components/ui/CommandPalette";

const defaultFilters = {
    types: [],
    levels: [],
    statuses: [],
};

export default function HomePage() {
    const [filters, setFilters] = useState(defaultFilters);
    const [loading, setLoading] = useState(true);
    const [selectedLab, setSelectedLab] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState("featured");

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1100);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const handleEscape = (event) => {
            if (event.key === "Escape") setSelectedLab(null);
        };

        window.addEventListener("keydown", handleEscape);
        return () => window.removeEventListener("keydown", handleEscape);
    }, []);

    useEffect(() => {
        document.body.style.overflow = selectedLab ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [selectedLab]);

    const featuredLab = useMemo(
        () => labs.find((lab) => lab.featured) ?? labs[0],
        []
    );

    const recommendedLabs = useMemo(() => getRecommendedLabs(labs), []);

    const visibleLabs = useMemo(() => {
        const filtered = applyFilters(labs, filters);
        const searched = searchLabs(filtered, searchQuery);
        return sortLabs(searched, sortBy);
    }, [filters, searchQuery, sortBy]);

    return (
        <Layout>
            <HeroSection featuredLab={featuredLab} />
            <CommandCenterHeader labs={labs} />
            <StatsPanel labs={labs} />
            <RecommendedLabs labs={recommendedLabs} onOpenLab={setSelectedLab} />
            <SearchPanel
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                sortBy={sortBy}
                setSortBy={setSortBy}
                totalLabs={labs.length}
                visibleLabs={visibleLabs.length}
            />
            <FilterPanel filters={filters} setFilters={setFilters} />
            <LabGrid labs={visibleLabs} loading={loading} onOpenLab={setSelectedLab} />
            <Footer />

            <LabPreviewDrawer
                lab={selectedLab}
                labs={labs}
                isOpen={Boolean(selectedLab)}
                onClose={() => setSelectedLab(null)}
                onOpenRelated={setSelectedLab}
            />
            <CommandPalette labs={labs} onOpenLab={setSelectedLab} />
            <ScrollToTopButton />
        </Layout>
    );
}