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


var CommentBox = React.createClass({
    loadCommentsFromServer: function() {
        var url = "http://" + window.location.host + "/api" + window.location.pathname + "/comments";
        $.get(url, function(result) {
            this.setState({data: result});
        }.bind(this)
        );
    },


    getInitialState: function() {
        return {data: []};
    },

    componentDidMount: function() {
        this.loadCommentsFromServer();
    },

    render: function() {
        return (
            <div className="commentBox">
                <h1>Comments</h1>
                <CommentList data={this.state.data} />
            </div>
        );
    }

});

ReactDOM.render(
    <CommentBox />,
    document.getElementById('comment')
);
