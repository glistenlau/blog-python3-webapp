/**
 * Created by YiLIU on 11/10/15.
 */
'use strict';

var Blog = React.createClass({
    handleDelete: function() {
        if (confirm('Sure to delete "' + this.props.children.name +'"?')) {
            $.post('/api/blogs/' + this.props.children.id + '/delete')
                .done(refresh())
            .fail(function(err) {
                if (err) {
                    return alert(err.message || err.erroe || err);
                }
            });
        }
    },

    render: function() {

        return (
            <tr>
                <td><a href={'/blog/' + this.props.children.id}>
                    {this.props.children.name}</a></td>
                <td><a href={'/user/' + this.props.children.user_id}>
                    {this.props.children.user_name}</a></td>
                <td>{this.props.children.created_at.toDateTime()}</td>
                <td>
                    <a href={'/manage/blogs/edit?id=' + this.props.children.id}
                       className="btn btn-primary btn-xs">Edit</a>
                    <button
                        onClick={this.handleDelete}
                        className="btn btn-default btn-xs">Delete</button>
                </td>
            </tr>
        );
    }
});

// map all the blogs
var BlogList = React.createClass({
    render: function() {
        var blogNodes = this.props.blogs.map(function(blog, index) {
            return (
                <Blog key={index}>
                    {blog}
                </Blog>
            )
        });

        return (
            <table className="table">
                <thead>
                <tr>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Created Time</th>
                    <th>Operation</th>
                </tr>
                </thead>
                <tbody>
                {blogNodes}
                </tbody>
            </table>
        );
    }
});

// BlogBox layout
var BlogsBox = React.createClass({
    loadBlogsFromServer() {
        let url = '/api/blogs?page=' + this.state.page;
        $.get(url, function(result) {
            this.setState({
                blogs: result.blogs
            })
        }.bind(this));
    },

    getInitialState() {
        return {
            page: page,
            blogs: []
        };
    },

    componentDidMount() {
        this.loadBlogsFromServer();
    },

    render() {
        return (
            <BlogList blogs={this.state.blogs} />
        )
    }
});

ReactDOM.render(
    <BlogsBox />,
    document.getElementById('blogs')
);