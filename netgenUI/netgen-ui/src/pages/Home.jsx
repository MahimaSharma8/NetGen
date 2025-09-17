import React from 'react';
import SideBar from '../components/Sidebar';
import Dashboard from './Dashboard';
function Home() {
    return (
        <div className='w-screen h-screen flex items-center justify-center bg-blue-950 text-white'>
            <SideBar/>
            <main className="flex-1 bg-blue-950 flex items-center justify-center">
                <Dashboard />
            </main>
        </div>
    );
}

export default Home;