import React from 'react';
import CompletedTask from '../tasks/completedtask';
import UncompletedTask from '../tasks/uncompletedtask';

function MiddleBar() {
    return (
        <div className="middle-bar w-full ">
            <div className="task-form-section">
                <h2>Uncompleted Tasks</h2>
                <form id="taskForm">
                    <button type="submit" id="addTask">Add Task</button>
                </form>
            </div>
            <ul id="uncompletedTaskList" className="task-list scrollable">
                <UncompletedTask task_name={"task 4"} />
                <UncompletedTask task_name={"task 5"} />
                <UncompletedTask task_name={"task 6"} />
                <UncompletedTask task_name={"task 7"} />
                <UncompletedTask task_name={"task 8"} />
                <UncompletedTask task_name={"task 8"} />
                <UncompletedTask task_name={"task 8"} />
                <UncompletedTask task_name={"task 8"} />
                <UncompletedTask task_name={"task 8"} />
                <UncompletedTask task_name={"task 8"} />
            </ul>
            <div className="task-section">
                <h2>Completed Tasks</h2>
                <ul id="completedTaskList" className="task-list scrollable">
                    <CompletedTask task_name={"task 1"} />
                    <CompletedTask task_name={"task 2"} />
                    <CompletedTask task_name={"task 3"} />
                    <CompletedTask task_name={"task 9"} />
                    <CompletedTask task_name={"task 10"} />
                </ul>
            </div>
        </div>
    );
}

export default MiddleBar;
