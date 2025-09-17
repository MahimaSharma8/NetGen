import React from "react";
import Profile from "./Profile";
import { HiHome, HiChartBar, HiCog, HiDocument } from "react-icons/hi";
function SideBar() {
    return (
            <aside className="w-72 text-white p-4 h-full rounded-xl shadow-lg flex flex-col">
            <h2 className="text-2xl font-bold mb-8">NetGen</h2>
            <div className="mb-8 mt-16">
                <Profile />
            </div>
            <div className="flex-1 flex items-center bg-gray-900 rounded-3xl">
                <nav className="flex flex-col gap-6 w-full justify-center text-2xl">
                <a href="/dashboard" className="flex items-center gap-3 hover:text-blue-400 hover:bg-gray-800 p-4 rounded-xl">
                    <HiHome className="text-2xl" />
                    Dashboard
                    </a>
                    <a href="/reports" className="flex items-center gap-3 hover:text-blue-400 hover:bg-gray-800 p-4 rounded-xl">
                    <HiChartBar className="text-2xl" />
                    Reports
                    </a>
                    <a href="#" className="flex items-center gap-3 hover:text-blue-400 hover:bg-gray-800 p-4 rounded-xl">
                    <HiDocument className="text-2xl" />
                    Docs
                    </a>
                    <a href="#" className="flex items-center gap-3 hover:text-blue-400 hover:bg-gray-800 p-4 rounded-xl">
                    <HiCog className="text-2xl" />
                    Settings
                    </a>
                </nav>
            </div>
            <div>
                <p className="text-sm text-gray-500 mt-4">&copy; 2024 NetGen. All rights reserved.</p>
            </div>
        </aside>
    );
}
export default SideBar;


