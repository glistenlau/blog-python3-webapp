var Comment = React.createClass({
    rawMarkup: function() {
        var rawMarkup = marked(this.props.children.toString(), {sanitize: true});
        return { __html: rawMarkup };
    },

    render: function() {
        return (
            <div className="comment">
                <h2 className="commentAuthor">
                    {this.props.author}
                </h2>
                <span dangerouslySetInnerHTML={this.rawMarkup()} />
            </div>
        );
    }
});

var CommentList = React.createClass({
    render: function() {
        var commentNodes = this.props.data.map(function(comment, index) {
            return (
                <Comment author={comment.user_name} key={index}>
                    {comment.content}
                </Comment>
            );
        });

        return (
            <div className="commentList">
                {commentNodes}
            </div>
        );
    }
});

var CommentForm = React.createClass({
    handleSubmit: function(e) {
        e.preventDefault();
        var author = this.refs.author.value.trim();
        var text = this.refs.text.value.trim();

        if (!text || !author) {
            document.getElementsByClassName("commentForm").nodeType;
        }
        this.props.onCommentSubmit({content: text});
        this.refs.author.value = '';
        this.refs.text.value = '';
    },

    render: function() {
        return (
            <form className="commentForm" onSubmit={this.handleSubmit}>
                <input type="text" placeholder="Your name" ref="author" />
                <input type="text" placeholder="Say something..." ref="text" />
                <input type="submit" value="Post" />
            </form>
        );
    }
});


var CommentBox = React.createClass({
    loadCommentsFromServer: function() {
        var url = "/api/blogs/" + this.state.blog_id + "/comments";
        $.get(url, function(result) {
                this.setState({data: result});
            }.bind(this)
        );
    },

    handleCommentSubmit: function(comment) {
        //var comments = this.state.data;
        //var newComment = comments.concat([comment]);
        //this.setState({data: newComment});
        var url = "/api/blogs/" + this.state.blog_id + "/comments";
        $.post(url, comment, function(res) {
            this.setState({data: [res].concat(this.state.data)});
        }.bind(this));
    },

    getInitialState: function() {
        return {
            data: [],
            blog_id: window.location.pathname.split('/')[2]
        };
    },

    componentDidMount: function() {
        this.loadCommentsFromServer();
    },

    render: function() {
        return (
            <div className="commentBox">
                <h1>Comments</h1>
                <CommentForm onCommentSubmit={this.handleCommentSubmit} />
                <CommentList data={this.state.data} />
            </div>
        );
    }

});

ReactDOM.render(
    <CommentBox />,
    document.getElementById('comment')
);
