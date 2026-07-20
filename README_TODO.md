# To-Do List Application

A modern, feature-rich to-do list application with local storage functionality. Your tasks are automatically saved to your browser's local storage and persist between sessions.

## Features

✅ **Add Tasks** - Easily add new tasks to your to-do list
✅ **Mark Complete** - Check off completed tasks with a single click
✅ **Delete Tasks** - Remove individual tasks or clear all completed ones
✅ **Filter Tasks** - View all, active, or completed tasks
✅ **Local Storage** - Tasks persist automatically between browser sessions
✅ **Task Counter** - See how many active tasks you have
✅ **Responsive Design** - Works perfectly on desktop and mobile devices
✅ **Beautiful UI** - Modern gradient design with smooth animations

## How to Use

1. **Open the Application**
   - Open `index.html` in your web browser

2. **Add a Task**
   - Type your task in the input field
   - Click "Add Task" or press Enter

3. **Complete a Task**
   - Click the checkbox next to a task to mark it as complete
   - Completed tasks will appear with a strikethrough

4. **Delete a Task**
   - Click the "Delete" button on any task to remove it

5. **Filter Tasks**
   - Click "All" to see all tasks
   - Click "Active" to see only incomplete tasks
   - Click "Completed" to see only completed tasks

6. **Clear Completed Tasks**
   - Click "Clear Completed" to remove all completed tasks at once

## Technical Details

### Local Storage
- All tasks are automatically saved to browser local storage
- Data is stored under the key `todos_data`
- Tasks persist even after closing the browser

### Data Structure
Each task object contains:
```javascript
{
    id: timestamp,           // Unique identifier
    text: "task text",      // Task description
    completed: false,       // Completion status
    createdAt: "ISO date"   // Creation timestamp
}
```

### Files
- `index.html` - HTML structure and layout
- `styles.css` - Styling and responsive design
- `script.js` - Application logic and local storage management

## Browser Support
- Chrome/Edge (Latest)
- Firefox (Latest)
- Safari (Latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Security
- HTML content is escaped to prevent XSS attacks
- All user input is sanitized before storage and display

## Future Enhancements
- Task categories/tags
- Due dates and reminders
- Dark mode theme
- Task priority levels
- Drag and drop to reorder
- Cloud sync across devices
- Recurring tasks
