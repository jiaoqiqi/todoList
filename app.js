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
        return <div>hello</div>
    }
})

ReactDOM.render(
    <App />,
    document.getElementById('example')
);