class TodoApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: [],
            newTodo: ''
        };
        
    }

    handleInputChange = (e) => {
        this.setState({ newTodo: e.target.value });
    };

    addTodo = () => {
        if (this.state.newTodo.trim() !== '') {
            this.setState((prevState) => ({
                todos: [...prevState.todos, { text: prevState.newTodo, completed: false }],
                newTodo: ''
            }));
        }
    };

    deleteTodo = (index) => {
        this.setState((prevState) => ({
            todos: prevState.todos.filter((_, i) => i !== index)
        }));
    };


    render() {
        return (
            <div>
                <h1>Todo List</h1>
                <div>
                    <input
                        type="text"
                        value={this.state.newTodo}
                        onChange={this.handleInputChange}
                    />
                    <button onClick={this.addTodo}>Add Todo</button>
                </div>
                <ul>
                    {this.state.todos.map((todo, index) => (
                        <li
                            key={index}
                            className={`todo-item ${todo.completed ? 'completed' : ''}`}
                            onClick={() => this.toggleTodo(index)} 
                        >
                            {todo.text}
                            <button onClick={() => this.deleteTodo(index)} className="deletBtn">Supprimer</button>
                            
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

ReactDOM.render(<TodoApp />, document.getElementById('root'));
