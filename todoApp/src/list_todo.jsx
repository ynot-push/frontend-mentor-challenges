import "./list_todo.css";
import check from "./assets/icon-check.svg";
import cross from './assets/icon-cross.svg';
import { useState } from "react";

const ACCENT_COLOR = "hsl(220, 98%, 61%)";
const MUTED_COLOR = "hsl(234, 11%, 52%)";

function List_todo({ tasks, onToggleTask, onDeleteTask, onClearCompleted, onReorderTasks, inputColor, textColor, borderColor, isDarkMode }) {
    const [filter, setFilter] = useState("all"); // "all" | "active" | "completed"
    const [hoveredFilter, setHoveredFilter] = useState(null);
    const [draggedId, setDraggedId] = useState(null);

    const visibleTasks = tasks.filter((t) => {
        if (filter === "active") return !t.completed;
        if (filter === "completed") return t.completed;
        return true;
    });

    const itemsLeft = tasks.filter((t) => !t.completed).length;

    const filterColor = (name) => {
        if (hoveredFilter === name) return isDarkMode ? "white" : "black";
        return filter === name ? ACCENT_COLOR : MUTED_COLOR;
    };

    // Reordering only while "All" is selected - dragging within a
    // filtered subset has no well-defined mapping back onto the full list.
    const canDrag = filter === "all";

    const handleDragStart = (id) => {
        if (!canDrag) return;
        setDraggedId(id);
    };

    const handleDragOver = (e) => {
        if (canDrag) e.preventDefault();
    };

    const handleDrop = (targetId) => {
        if (!canDrag || draggedId === null || draggedId === targetId) {
            setDraggedId(null);
            return;
        }
        const fromIndex = tasks.findIndex((t) => t.id === draggedId);
        const toIndex = tasks.findIndex((t) => t.id === targetId);
        if (fromIndex === -1 || toIndex === -1) {
            setDraggedId(null);
            return;
        }
        const reordered = [...tasks];
        const [moved] = reordered.splice(fromIndex, 1);
        reordered.splice(toIndex, 0, moved);
        onReorderTasks(reordered);
        setDraggedId(null);
    };

    const renderFilters = () => (
        <ul className="filtring">
            <li>
                <a
                    onClick={() => setFilter("all")}
                    onMouseEnter={() => setHoveredFilter("all")}
                    onMouseLeave={() => setHoveredFilter(null)}
                    style={{ color: filterColor("all") }}
                >
                    All
                </a>
            </li>
            <li>
                <a
                    onClick={() => setFilter("active")}
                    onMouseEnter={() => setHoveredFilter("active")}
                    onMouseLeave={() => setHoveredFilter(null)}
                    style={{ color: filterColor("active") }}
                >
                    Active
                </a>
            </li>
            <li>
                <a
                    onClick={() => setFilter("completed")}
                    onMouseEnter={() => setHoveredFilter("completed")}
                    onMouseLeave={() => setHoveredFilter(null)}
                    style={{ color: filterColor("completed") }}
                >
                    Completed
                </a>
            </li>
        </ul>
    );

    const emptyMessage =
        filter === "completed" ? "No completed tasks yet."
        : filter === "active" ? "Nothing left to do \u2014 nice work!"
        : "No tasks yet \u2014 add one above.";

    return (
        <>
            <div className="list" style={{ backgroundColor: inputColor }}>
                {visibleTasks.map((task) => (
                    <div
                        key={task.id}
                        className="task_cont"
                        draggable={canDrag}
                        onDragStart={() => handleDragStart(task.id)}
                        onDragOver={handleDragOver}
                        onDrop={() => handleDrop(task.id)}
                        style={{
                            backgroundColor: inputColor,
                            borderBottom: `1px solid ${borderColor}`,
                            opacity: draggedId === task.id ? 0.4 : 1,
                            cursor: canDrag ? "grab" : "default",
                        }}
                    >
                        <div
                            className="check"
                            onClick={() => onToggleTask(task.id)}
                            style={{
                                background: task.completed
                                    ? "linear-gradient(hsl(192, 100%, 67%), hsl(280, 87%, 65%))"
                                    : "",
                            }}
                        >
                            {task.completed && <img src={check} alt="" />}
                        </div>
                        <div className="task_text">
                            <p
                                onClick={() => onToggleTask(task.id)}
                                style={{
                                    textDecoration: task.completed ? "line-through" : "none",
                                    color: task.completed ? MUTED_COLOR : textColor
                                }}
                            >
                                {task.text}
                            </p>
                        </div>
                        <div className="croos_btn">
                            <button
                                className="cross"
                                onClick={() => onDeleteTask(task.id)}
                                aria-label="Delete task"
                            >
                                <img src={cross} alt="" />
                            </button>
                        </div>
                    </div>
                ))}
                {visibleTasks.length === 0 && (
                    <div className="empty_state" style={{ color: MUTED_COLOR }}>
                        {emptyMessage}
                    </div>
                )}
                <div className="footeer" style={{ backgroundColor: inputColor }}>
                    <div className="items_nb">
                        <p><span>{itemsLeft}</span> items left</p>
                    </div>
                    <div className="main_div">
                        {renderFilters()}
                    </div>
                    <div className="clear_tasks">
                        <a
                            onClick={onClearCompleted}
                            onMouseEnter={() => setHoveredFilter("clear")}
                            onMouseLeave={() => setHoveredFilter(null)}
                            style={{ color: hoveredFilter === "clear" ? (isDarkMode ? "white" : "black") : MUTED_COLOR }}
                        >
                            Clear Completed
                        </a>
                    </div>
                </div>
            </div>
            {/* Same filter list, shown instead of the one above at mobile
                widths via CSS (see list_todo.css) - no DOM reparenting. */}
            <div className="mobile_div" style={{ backgroundColor: inputColor }}>
                {renderFilters()}
            </div>
        </>
    );
}

export default List_todo;
