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

    render:function () {
        var todoList = this.state.todoList;
        return <div>
            <section>
                <Header title={todoList.name} />
            </section>

        </div>
    }
})

const Header = React.createClass({
    render:function () {
        return <h1>{this.props.title}</h1>
    }
})

ReactDOM.render(
    <App />,
    document.getElementById('example')
);