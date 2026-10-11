import "./header.css";
import { useState } from "react";

function Header({ addTask ,darkmodechanger,bgImg,img,inputColor,textColor}) {
    const [task, setTask] = useState('');
   
    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            handleAddTaskClick();
        }
    };
    const handleAddTaskClick = () => {
        addTask(task);
        setTask('');
    };

    return (
        <>
            <div className="header" style={{ backgroundImage: "url(" + bgImg + ")" , backgroundRepeat: "no-repeat"
                , backgroundSize: "cover"
            }}>
                <div className="title">
                    <h1>TODO</h1>
                    <button onClick={darkmodechanger}><img src={img} alt="" /></button>
                </div>
                <div className="input">
                    <input 
                        type="text" 
                        placeholder="Create a new todo"
                        value={task}
                        onChange={(e) => setTask(e.target.value)}
                        onKeyDown={handleKeyDown}
                        style={{backgroundColor:inputColor, color:textColor}}
                    />
                    <button onClick={handleAddTaskClick} className="addtaks_btn">Add</button>
                </div>
            </div>
        </>
    );
}

export default Header;
