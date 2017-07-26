const todoList = {
    name: "todos",
    todos: []
}

const App = React.createClass({
    getInitialState: function () {
        return {
            addTitle: '',
            todoList: todoList,
            type: 'all'
        }
    },

    onChange: function (e) {
        this.setState({value: e.target.value})
    },

    addHandle: function (e) {
        if (e.key != 'Enter') {
            return 0;
        }
        let task = this.refs.addTask;
        this.setState(function () {
            let todos = this.state.todoList.todos,
                todo = {
                    completed: false,
                    title: task.value
                }
            todos.push(todo);
            return todos;
        })
    },

    render: function () {
        var todolist = this.state.todoList;

        return <div>
            <section>
                <Header title={todoList.name}/>
                <div>
                    <input type="text" ref="addTask"
                           placeholder="What needs to be done?"
                           defaultValue={this.state.addTitle}
                           onChange={this.onChange}
                           onKeyPress={this.addHandle}/>
                </div>
                <TodoList todos={todolist.todos} type={this.state.type}/>

            </section>

        </div>
    }
})

const Header = React.createClass({
    render: function () {
        return <h1>{this.props.title}</h1>
    }
})

const TodoItem = React.createClass({
    render: function () {
        const todo = this.props.data;
        const className = todo.completed ? "completed" : "";

        return <li className={className}>
            <div className="view">
                <input type="checkbox"
                       onClick={this.props.comTask}
                       checked={this.completed}/>

                <label> {todo.title} </label>
                <button onClick={this.props.delTask}></button>

            </div>
            <input type="text" value={todo.title}/>
        </li>
    }
})

const TodoList = React.createClass({
    render: function () {
        return <ol>
            {this.props.todos.map((todo, i) => {
                switch (this.props.type) {
                    case 'all':
                        return <TodoItem data={todo} key={i}
                                         // delTask={this.props.delTask(i)}
                                         // comTask={this.props.comTask(i)}
                        />
                    case 'active':
                        if (!todo.completed) {
                            return <TodoItem data={todo} key={i}
                                             // delTask={this.props.delTask(i)}
                                             // comTask={this.props.comTask(i)}
                            />
                        }
                        break;
                    case 'completed' :
                        if (todo.completed) {
                            return <TodoItem data={todo} key={i}
                                             // delTask={this.props.delTask(i)}
                                             // comTask={this.props.comTask(i)}
                            />
                        }
                        break;
                    default :
                        break;
                }
            })}

        </ol>
    }
})


ReactDOM.render(
    <App/>,
    document.getElementById('example')
);