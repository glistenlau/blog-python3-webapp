var EditBox = React.createClass({
    getInitialState: function() {
        return {
            name: '',
            summary: '',
            content: ''
        }
    },

    handleChange: function() {
        this.setState({
            name: this.refs.articleName.value,
            summary: this.refs.articleSummary.value,
            content: this.refs.articleContent.value
        });
    },

    componentDidMount: function() {
        this.loadArticle();
    },

    handleSubmit: function(event) {
        event.preventDefault();
        $.post(this.props.action, $('#edit-form').serializeArray())
            .done(function(res) {
                location.assign('/blog/' + res.id);
            }.bind(this));
    },

    loadArticle: function() {
        if (this.props.ID) {
            $.get('/api/blogs/' + this.props.ID)
                .done(function(blog) {
                    this.setState({
                        name: blog.name,
                        summary: blog.summary,
                        content: blog.content
                    })
                }.bind(this));
        }
    },

    render: function() {
        return (
            <div className="container">
                <form id="edit-form" onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label>Title</label>
                            <textarea
                                name="name"
                                className="form-control"
                                onChange={this.handleChange}
                                placeholder="Please Enter the title"
                                value={this.state.name}
                                ref="articleName" />
                    </div>
                    <div className="form-group">
                        <label>Summary</label>
                            <textarea
                                name="summary"
                                className="form-control"
                                onChange={this.handleChange}
                                placeholder="Please Enter the summary"
                                value={this.state.summary}
                                rows="3"
                                ref="articleSummary" />
                    </div>
                    <div className="form-group">
                        <label>Content</label>
                            <textarea
                                name="content"
                                className="form-control"
                                onChange={this.handleChange}
                                placeholder="Please Enter the content"
                                value={this.state.content}
                                rows="10"
                                ref="articleContent" />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        );
    }
});

ReactDOM.render(
    <EditBox ID={window.ID} action={window.action} />,
    document.getElementById("blog_edit")
);
