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
                    <div style={{padding: '5px 0'}}
                         className="comment-content"
                         dangerouslySetInnerHTML={this.rawMarkup()} />
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
                <Comment key={index}>
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

    getInitialState: function() {
        return {value: 'Type your comment here(**markdown** supported)...'};
    },

    handleChange: function() {
        this.setState({value: (this.refs.text.value.length === 0)?
            'Type your comment here(**markdown** supported)...': this.refs.text.value});
    },

    rawMarkup: function() {
        return {__html: marked(this.state.value, {sanitize: true})};
    },

    handleSubmit: function(e) {
        e.preventDefault();
        var text = this.refs.text.value.trim();

        this.props.onCommentSubmit({content: text});
        this.refs.text.value = '';
        this.setState({value: 'Type your comment here(**markdown**' +
        ' supported)...'});
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
                                <span className="comment-user-name"><b>{this.props.currentUser.name}</b></span>
                            </div>
                            <div className="col-xs-12 col-md-11 form-group smpadding comment-box">
                                <textarea
                                    className="form-control" rows="3"
                                    placeholder="Type your comment here(**markdown** supported)..."
                                    onChange={this.handleChange}
                                    ref="text"
                                />
                            </div>
                            <div className="col-xs-12 col-md-11 col-md-push-1 form-group smpadding">
                                <div
                                    className="comment-content well"
                                    rows="3"
                                    dangerouslySetInnerHTML={this.rawMarkup()}>
                                </div>
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

    handleCommentSubmit: function(comment) {
        var url = "/api/blogs/" + this.state.blog_id + "/comments";
        $.post(url, comment, function(res) {
            this.setState({data: [res].concat(this.state.data)});
        }.bind(this));
    },

    getInitialState: function() {
        return {
            currentUser: this.props.user? this.props.user: null,
            data: this.props.comments,
            blog_id: window.location.pathname.split('/')[2]
        };
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
    <CommentBox
    comments={window.comments}
    blog={window.blog}
    user={window.user} />,
    document.getElementById('comment')
);
