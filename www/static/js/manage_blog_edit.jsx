var EditBox = React.createClass({
    getInitialState: function() {
        return {
            name: '',
            summary: '',
            content: ''
        }
    },

    rawMarkup: function(content) {
        return {__html: marked(content, {sanitize: true})};
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
                    this.refs.articleName.value = blog.name;
                    this.refs.articleSummary.value = blog.summary;
                    this.refs.summaryPreview.innerHTML = blog.summary;
                    this.refs.articleContent.value = blog.content;
                    this.refs.contentPreview.innerHTML = blog.content;
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
                        <div className="form-group well"
                             rows="3"
                             ref="summaryPreview"
                             dangerouslySetInnerHTML={this.rawMarkup(this.state.summary)}/>
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
                        <div className="form-group well"
                             rows="3"
                             ref="contentPreview"
                             dangerouslySetInnerHTML={this.rawMarkup(this.state.content)}/>
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
