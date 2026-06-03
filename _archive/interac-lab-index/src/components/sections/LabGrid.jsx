import SectionHeader from "../ui/SectionHeader";
import LabCard from "../ui/LabCard";
import LoadingLabs from "../ui/LoadingLabs";
import Badge from "../ui/Badge";

export default function LabGrid({ labs, loading, onOpenLab }) {
    return (
        <section id="labs" className="space-y-6">
            <SectionHeader
                eyebrow="Core Platform"
                title="Interactive Cyber Labs"
                description="All simulations & projects in one place, presented like a deployable cyber product ecosystem."
                right={
                    <Badge variant={labs.length > 0 ? "emerald" : "default"}>
                        {labs.length} labs visible
                    </Badge>
                }
            />

            {loading ? (
                <LoadingLabs />
            ) : labs.length === 0 ? (
                <div className="panel-pro p-10 text-center">
                    <p className="text-lg font-medium text-white">
                        No labs match your current search.
                    </p>
                    <p className="mt-2 text-sm text-slate-400">
                        Try changing the query, filters or sorting mode.
                    </p>
                </div>
            ) : (
                <>
                    <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-400">
                        <span>Discovery result set</span>
                        <span>Click a lab to open interactive preview</span>
                    </div>

                    <div className="grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
                        {labs.map((lab, index) => (
                            <LabCard key={lab.id} lab={lab} index={index} onOpen={onOpenLab} />
                        ))}
                    </div>
                </>
            )}
        </section>
    );
}