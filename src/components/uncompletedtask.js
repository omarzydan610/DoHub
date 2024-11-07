function UncompletedTask({ task_name }) {
    return (
        <li className="task-item">
            <input type="checkbox" />
            <label htmlFor={task_name}>{task_name}</label>
        </li>
    );
}

export default UncompletedTask;
