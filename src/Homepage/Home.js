import React, { useEffect, useState } from 'react';
import './Home.css';
import lightImg from '../images/bg-desktop-light.jpg';
import darkImg from '../images/bg-desktop-dark.jpg';
import mobdarkImg from '../images/bg-mobile-dark.jpg';
import moblightImg from '../images/bg-mobile-light.jpg';
import { ReactComponent as Moon } from '../images/icon-moon.svg';
import { ReactComponent as Sun } from '../images/icon-sun.svg';
import Input from '../components/Input/Input';
import Todolist from '../components/TodoList/Todolist';

function Home() {
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

    useEffect(() => {
        updateTheme();
        handleMediaQuery(); 
        window.addEventListener('resize', handleMediaQuery);
        return () => {
            window.removeEventListener('resize', handleMediaQuery);
        };
    }, [theme]);

    const updateTheme = () => {
        const body = document.querySelector('body');
        let main_theme = document.querySelector('.main-container');
        if (theme === 'dark') {
            body.style.backgroundColor = 'hsl(235, 21%, 11%)';
            main_theme.classList.add('dark');
        } else {
            body.style.backgroundColor = 'hsl(0, 0%, 98%)';
            main_theme.classList.remove('dark');
        }
    };

    const handleIcon = () => {
        setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
        localStorage.setItem('theme', theme === 'dark' ? 'light' : 'dark');
    };

    const handleMediaQuery = () => {
        const isMobile = window.matchMedia('(max-width: 450px)').matches;
        const lightImage = isMobile ? moblightImg : lightImg;
        const darkImage = isMobile ? mobdarkImg : darkImg;
        const lightBg = document.getElementById('light-bg');
        const darkBg = document.getElementById('dark-bg');
        lightBg.src = lightImage;
        darkBg.src = darkImage;
    };

    return (
        <section className={`home-page-container ${theme === 'dark' ? 'dark' : ''}`}>
            <img
                className={`back-image ${theme === 'light' ? '' : 'hidden'}`}
                id="light-bg"
                src={lightImg}
                alt="home page light image"
            />
            <img
                className={`back-image ${theme === 'dark' ? '' : 'hidden'}`}
                id="dark-bg"
                src={darkImg}
                alt="home page dark image"
            />

            <div className="todo-container">
                <div className="todo-wrapper">
                    <h1 className="title">Todo</h1>
                    <div className="theme-icon">
                        {theme === 'light' ? <Moon id="moon" onClick={handleIcon} /> : <Sun id="sun" onClick={handleIcon} />}
                    </div>
                </div>
                <Input />
                <Todolist />
            </div>
        </section>
    );
}

export default Home;
