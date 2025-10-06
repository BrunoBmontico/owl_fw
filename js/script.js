const { Component, mount, xml, useRef, onMounted, useState } = owl;

class Task extends Component {
    static template = xml`
    <div class="task" t-att-class="props.task.isCompleted ? 'done' : ''">
        <input type="checkbox" t-att-checked="props.task.isCompleted" t-on-click="toggleTask"/>
        <span><t t-esc="props.task.text"/></span>
        <span class="delete" t-on-click="deleteTask">🗑</span>
    </div>
    `;
    
    toggleTask() {
        this.props.task.isCompleted = !this.props.task.isCompleted
    }

    deleteTask() {
        this.props.onDelete(this.props.task)
    }

    static props = ["task", "onDelete"];
}

class Root extends Component {
    static template = xml`
    <div class="todo-app">
        <input placeholder="Enter a new task" t-on-keyup="addTask" t-ref="add-input"/>
        <div class="task-list">
            <t t-foreach="tasks" t-as="task" t-key="task.id">
                <Task task="task" onDelete.bind="deleteTask"/>
            </t>
        </div>
    </div>
    `;

    static components = { Task };

    nextId = 1;
    tasks = useState([]);
  
    addTask(ev) {
        if (ev.keyCode === 13) {
            const text = ev.target.value.trim();
            ev.target.value = "";
            
            if (text) {
                const newTask = {
                    id: this.nextId++,
                    text: text,
                    isCompleted: false,
                };
                this.tasks.push(newTask);
            }
        }
    }

    deleteTask(task) {
        const index = this.tasks.findIndex(t => t.id === task.id);
        this.tasks.splice(index, 1)
    }

    setup() {
        const inputRef = useRef("add-input");
        onMounted(() => inputRef.el.focus());
    }

}

mount(Root, document.body, {dev: true});