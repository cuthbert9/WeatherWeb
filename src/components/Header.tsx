import { Sun, Settings } from "lucide-react";

export function Header() {
    return (
        <header className="flex justify-between items-center w-full ">
            <div className="flex items-center gap-2">
                <Sun className="w-8 h-8 text-orange-400 fill-orange-400" />
                <span className="text-xl font-bold tracking-tight">Weather Now</span>
            </div>

            <button className="flex items-center gap-2 bg-white/10 hover:bg-white/20 transition-colors px-4 py-2 rounded-lg text-sm font-medium">
                <Settings className="w-4 h-4" />
                Units
            </button>
        </header>
    );
}
