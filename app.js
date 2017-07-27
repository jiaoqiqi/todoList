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

    deleteHandel: function (index) {
        return function () {
            let todos = this.state.todoList.todos,
                todolist = {
                    todolist: {
                        name: "todos",
                        todos: []
                    }
                };
            todos.splice(index, 1), todolist.todolist.todos = todos;

            this.setState(todolist)
        }.bind(this)
    },

    switchToCompleted: function (index) {

        return function () {
            this.setState(function () {
                let todolist = this.state.todoList;

                todolist['todos'][index]['completed'] = !todolist['todos'][index]['completed'];

                return todolist;
            });
        }.bind(this);
    },

    switchType: function () {
        return function (hash, e) {
            let type = '';

            switch (hash) {
                case "active":
                    type = 'active';
                    break;
                case 'completed':
                    type = 'completed';
                    break;
                default:
                    type = 'all';
                    break;
            }
            this.setState({type: type})
        }.bind(this);
    },

    render: function () {
        const todolist = this.state.todoList;

        const lefted = todolist.todos.reduce(function (account, todo) {
            return todo.completed ? account : account + 1;
        }, 0);

        let footer = todolist.todos.length ?
            <Footer lefted={lefted}
                    type={this.state.type}
                    switchType={this.switchType()}
            /> : '';

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
                <TodoList todos={todolist.todos} type={this.state.type}
                          delTask={this.deleteHandel}
                          comTask={this.switchToCompleted}/>
                {footer}

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
                                         delTask={this.props.delTask(i)}
                                         comTask={this.props.comTask(i)}
                        />
                    case 'active':
                        if (!todo.completed) {
                            return <TodoItem data={todo} key={i}
                                             delTask={this.props.delTask(i)}
                                             comTask={this.props.comTask(i)}
                            />
                        }
                        break;
                    case 'completed' :
                        if (todo.completed) {
                            return <TodoItem data={todo} key={i}
                                             delTask={this.props.delTask(i)}
                                             comTask={this.props.comTask(i)}
                            />
                        }
                        break;
                    default :
                        break;
                }
            })}

        </ol>
    }
});

const Footer = React.createClass({
    render: function () {
        let type = ['', '', ''];
        switch (this.props.type) {
            case 'active' :
                type[1] = 'selected';
                break;
            case 'completed' :
                type[2] = 'selected';
                break;
            default :
                type[0] = 'selected';
                break;
        }

        return <footer className="footer">
            <span className="todo-count">
                {this.props.lefted}
                <span> items </span>
                <span> left </span>
            </span>

            <ol>
                <li>
                    <a href="#" className={type[0]}
                       onClick={this.props.switchType.bind(null, 'all')}>
                        All</a>
                </li>

                <li>
                    <a href="#active" className={type[1]}
                       onClick={this.props.switchType.bind(null, 'active')}>
                        Active</a>
                </li>

                <li>
                    <a href="#completed" className={type[2]}
                       onClick={this.props.switchType.bind(null, 'completed')}>
                        Completed</a>
                </li>
            </ol>
        </footer>
    }
})


ReactDOM.render(
    <App/>,
    document.getElementById('example')
);