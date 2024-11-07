function CompletedTask({ task_name }) {
    return (
        <li className="task-item">
            <input type="checkbox" defaultChecked/>
            <label htmlFor={task_name}>{task_name}</label>
        </li>
    );
}

export default CompletedTask;