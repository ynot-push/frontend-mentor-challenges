import './App.css';
import { useState, useEffect } from "react";
import Header from './header';
import List_todo from './list_todo';
import moon_img from "./assets/icon-moon.svg";
import sun_img from "./assets/icon-sun.svg";
import white_mod_bg from "./assets/bg-desktop-light.jpg";
import dark_mod_bg from "./assets/bg-desktop-dark.jpg";
import mobile_img_dark from "./assets/bg-mobile-dark.jpg";
import mobile_img_light from "./assets/bg-mobile-light.jpg";

export const MOBILE_BREAKPOINT = 600;

let idCounter = 0;
const makeId = () =>
    (typeof crypto !== 'undefined' && crypto.randomUUID)
        ? crypto.randomUUID()
        : `task-${Date.now()}-${idCounter++}`;

function App() {
    const [isDarkMode, setIsDarkMode] = useState(true);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= MOBILE_BREAKPOINT);
    const [inputColor, setInputColor] = useState("hsl(235, 24%, 19%)");
    const [textColor, setTextColor] = useState("hsl(234, 39%, 85%)");
    const [bgColor, setBgColor] = useState("hsl(240, 20%, 12%)");
    const [borderColor, setBorderColor] = useState("hsl(233, 14%, 35%)");

    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
        };

        window.addEventListener("resize", handleResize);
        handleResize(); 

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const handleImgChange = () => {
        setIsDarkMode(prev => !prev);
        setInputColor((color) => (color === "hsl(235, 24%, 19%)" ? "hsl(0, 0%, 98%)" : "hsl(235, 24%, 19%)"));
        setTextColor((color) => (color === "hsl(234, 39%, 85%)" ? "black" : "hsl(234, 39%, 85%)"));
        setBgColor((color) => (color === "hsl(240, 20%, 12%)" ? "hsl(236, 33%, 92%)" : "hsl(240, 20%, 12%)"));
        setBorderColor((color) => (color === "hsl(233, 14%, 35%)" ? "hsl(240, 1%, 79%)" : "hsl(233, 14%, 35%)"));
    };

    const getBackgroundImage = () => {
        if (isMobile) {
            return isDarkMode ? mobile_img_dark : mobile_img_light;
        }
        return isDarkMode ? dark_mod_bg : white_mod_bg;
    };

    const handleAddTask = (text) => {
        const trimmed = text.trim();
        if (trimmed === '') {
            alert('Please enter a task.');
            return;
        }
        setTasks((prev) => [...prev, { id: makeId(), text: trimmed, completed: false }]);
    };

    const handleToggleTask = (id) => {
        setTasks((prev) =>
            prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
        );
    };


    const handleDeleteTask = (id) => {
        setTasks((prev) => prev.filter((t) => t.id !== id));
    };

    const handleClearCompletedTasks = () => {
        setTasks((prev) => prev.filter((t) => !t.completed));
    };

    const handleReorderTasks = (newTasks) => {
        setTasks(newTasks);
    };

    useEffect(() => {
        document.body.style.backgroundColor = bgColor;
    }, [bgColor]);

    return (
        <div className='containnner'>
            <Header
                addTask={handleAddTask}
                darkmodechanger={handleImgChange}
                img={isDarkMode ? moon_img : sun_img}
                inputColor={inputColor}
                textColor={textColor}
                bgImg={getBackgroundImage()}
            />
            <List_todo
                tasks={tasks}
                onToggleTask={handleToggleTask}
                onDeleteTask={handleDeleteTask}
                onClearCompleted={handleClearCompletedTasks}
                onReorderTasks={handleReorderTasks}
                inputColor={inputColor}
                textColor={textColor}
                borderColor={borderColor}
                isDarkMode={isDarkMode}
            />
            <footer>
                <p>Drag and drop to reorder list</p>
            </footer>
        </div>
    );
}

export default App;
