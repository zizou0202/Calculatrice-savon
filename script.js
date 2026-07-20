// To-Do List Application with Local Storage

class TodoApp {
    constructor() {
        this.todos = [];
        this.currentFilter = 'all';
        this.storageKey = 'todos_data';
        
        this.elements = {
            todoInput: document.getElementById('todoInput'),
            addBtn: document.getElementById('addBtn'),
            todoList: document.getElementById('todoList'),
            clearBtn: document.getElementById('clearBtn'),
            taskCount: document.getElementById('taskCount'),
            filterBtns: document.querySelectorAll('.filter-btn')
        };
        
        this.init();
    }
    
    init() {
        // Load todos from local storage
        this.loadTodos();
        
        // Set up event listeners
        this.elements.addBtn.addEventListener('click', () => this.addTodo());
        this.elements.todoInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addTodo();
        });
        
        this.elements.clearBtn.addEventListener('click', () => this.clearCompleted());
        
        this.elements.filterBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.setFilter(e.target.dataset.filter);
            });
        });
        
        // Initial render
        this.render();
    }
    
    // Load todos from local storage
    loadTodos() {
        const stored = localStorage.getItem(this.storageKey);
        this.todos = stored ? JSON.parse(stored) : [];
    }
    
    // Save todos to local storage
    saveTodos() {
        localStorage.setItem(this.storageKey, JSON.stringify(this.todos));
    }
    
    // Add a new todo
    addTodo() {
        const text = this.elements.todoInput.value.trim();
        
        if (text === '') {
            alert('Please enter a task!');
            return;
        }
        
        const newTodo = {
            id: Date.now(),
            text: text,
            completed: false,
            createdAt: new Date().toISOString()
        };
        
        this.todos.push(newTodo);
        this.saveTodos();
        this.elements.todoInput.value = '';
        this.render();
    }
    
    // Toggle todo completion status
    toggleTodo(id) {
        const todo = this.todos.find(t => t.id === id);
        if (todo) {
            todo.completed = !todo.completed;
            this.saveTodos();
            this.render();
        }
    }
    
    // Delete a todo
    deleteTodo(id) {
        this.todos = this.todos.filter(t => t.id !== id);
        this.saveTodos();
        this.render();
    }
    
    // Clear all completed todos
    clearCompleted() {
        const completedCount = this.todos.filter(t => t.completed).length;
        
        if (completedCount === 0) {
            alert('No completed tasks to clear!');
            return;
        }
        
        if (confirm(`Delete ${completedCount} completed task(s)?`)) {
            this.todos = this.todos.filter(t => !t.completed);
            this.saveTodos();
            this.render();
        }
    }
    
    // Set filter
    setFilter(filter) {
        this.currentFilter = filter;
        
        // Update active button
        this.elements.filterBtns.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.filter === filter) {
                btn.classList.add('active');
            }
        });
        
        this.render();
    }
    
    // Get filtered todos
    getFilteredTodos() {
        switch (this.currentFilter) {
            case 'active':
                return this.todos.filter(t => !t.completed);
            case 'completed':
                return this.todos.filter(t => t.completed);
            case 'all':
            default:
                return this.todos;
        }
    }
    
    // Update task count
    updateTaskCount() {
        const activeTodos = this.todos.filter(t => !t.completed).length;
        this.elements.taskCount.textContent = `${activeTodos} ${activeTodos === 1 ? 'task' : 'tasks'}`;
    }
    
    // Render the todo list
    render() {
        const filteredTodos = this.getFilteredTodos();
        
        // Clear the list
        this.elements.todoList.innerHTML = '';
        
        if (filteredTodos.length === 0) {
            this.elements.todoList.innerHTML = `
                <div class="empty-state">
                    <p>${this.currentFilter === 'all' ? 'No tasks yet. Add one to get started!' : `No ${this.currentFilter} tasks.`}</p>
                </div>
            `;
        } else {
            filteredTodos.forEach(todo => {
                const li = document.createElement('li');
                li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
                
                li.innerHTML = `
                    <input 
                        type="checkbox" 
                        class="todo-checkbox" 
                        ${todo.completed ? 'checked' : ''}
                        data-id="${todo.id}"
                    >
                    <span class="todo-text">${this.escapeHtml(todo.text)}</span>
                    <button class="todo-delete" data-id="${todo.id}">Delete</button>
                `;
                
                // Add event listeners
                li.querySelector('.todo-checkbox').addEventListener('change', () => {
                    this.toggleTodo(todo.id);
                });
                
                li.querySelector('.todo-delete').addEventListener('click', () => {
                    this.deleteTodo(todo.id);
                });
                
                this.elements.todoList.appendChild(li);
            });
        }
        
        this.updateTaskCount();
    }
    
    // Escape HTML special characters to prevent XSS
    escapeHtml(text) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return text.replace(/[&<>"']/g, m => map[m]);
    }
}

// Initialize the app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new TodoApp();
});
