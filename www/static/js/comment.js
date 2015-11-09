var Comment = React.createClass({
    rawMarkup: function() {
        var rawMarkup = marked(this.props.children.content.toString(), {sanitize: true});
        return { __html: rawMarkup };
    },

    render: function() {
        return (
            <div className="container comment-box">
                <div className="col-xs-1 col-md-1 smpadding">
                    <img src={this.props.children.user_image} className="user-image" width="60px" height="60px" />
                </div>
                <div className="col-xs-11 col-md-11 smpadding">
                    <div className="comment-user">
                        <span className="comment-user-name"><b>{this.props.children.user_name}</b></span>
                        <span className="comment-created-time">    •    {this.props.children.created_at.toDateTime()}</span>
                    </div>
                    <p className="comment-content">
                        {this.props.children.content.toString()}
                    </p>
                </div>
                <div className="clearfix"></div>
            </div>
        );
    }
});

var CommentList = React.createClass({
    render: function() {
        var commentNodes = this.props.data.map(function(comment, index) {
            return (
                <Comment>
                    {comment}
                </Comment>
            );
        });

        return (
            <div className="row">
                {commentNodes}
            </div>
        );
    }
});

var CommentForm = React.createClass({
    handleSubmit: function(e) {
        e.preventDefault();
        var text = this.refs.text.value.trim();

        if (!text) {
            document.getElementsByClassName("commentForm").nodeType;
        }
        this.props.onCommentSubmit({content: text});
        this.refs.text.value = '';
    },

    render: function() {
        if (this.props.currentUser === null) {
            return (
                <div className="btn-comment-signin">
                    <a href="/signin" className="btn btn-default" onclick="/signin">Please sign in to post a comment</a>
                </div>
            );
        } else {
            return (
                <div className="container">
                    <form className="commentForm" onSubmit={this.handleSubmit}>
                        <div className="row form-group">
                            <div className="col-xs-1 col-md-1 form-group smpadding">
                                <img src={this.props.currentUser.image} className="user-image" width="60px" height="60px"/>
                            </div>
                            <div className="col-xs-11 col-md-11 form-group smpadding">
                                <div class="form-control">
                                    <span className="comment-user-name"><b>{this.props.currentUser.name}</b></span>
                                </div>
                            </div>
                            <div className="clearfix visible-xs-block"></div>
                            <div className="col-xs-1 col-md-1"></div>
                            <div className="col-xs-11 col-md-11 form-group smpadding">
                                <textarea className="form-control comment-box" rows="3" placeholder="Say something..." ref="text"/>
                            </div>
                            <div className="smpadding">
                                <button type="submit" className="btn btn-primary button-right">Post comment</button>
                            </div>
                        </div>
                    </form>
                </div>
            );
        }
    }
});


var CommentBox = React.createClass({
    loadCommentsFromServer: function() {
        var url = "/api/blogs/" + this.state.blog_id + "/comments";
        $.get(url, function(result) {
                this.setState({
                    data: result.slice(1),
                    currentUser: result[0]
                });
                $('#comment').show();
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
            currentUser: null,
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
                <h3><b>Comments</b></h3>
                <CommentForm currentUser={this.state.currentUser}
                             onCommentSubmit={this.handleCommentSubmit} />
                <CommentList data={this.state.data} />
            </div>
        );
    }

});

ReactDOM.render(
    <CommentBox />,
    document.getElementById('comment')
);
