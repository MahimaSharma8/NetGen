import React from 'react';
import {useState } from 'react';
import profilePic from '../assets/profile.webp';
function Profile() {
    const [UserName, setUserName] = useState('George');
    const today = new Date();
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const dayName = days[today.getDay()];
    const monthName = months[today.getMonth()];
    // useEffect(() => {
    //     const fetchUserData = async () => {
    //         const userData = await getUserData();
    //         setUserName(userData.name);
    //         setUserEmail(userData.email);
    //         setDate(userData.date);
    //         setMonth(userData.month);
    //         setYear(userData.year);
    //     };
    //     fetchUserData();
    // }, []);

    return (
        <div className = 'flex flex-col justify-center items-center bg-gray-950 text-white text-2xl  w-64 rounded-2xl'>
            <figure className='mb-4'>
                <img 
                    src={profilePic} 
                    alt="User Profile" 
                    className="w-20 h-20 rounded-sm"
                />
            </figure>
            <p className='text-lg font-bold text-gray-400 p-1'>{dayName},{monthName} {today.getFullYear()}</p>
            <p className='text-2xl font-bold'>Welcome back, {UserName}!</p>
        </div>
    );
}
export default Profile;