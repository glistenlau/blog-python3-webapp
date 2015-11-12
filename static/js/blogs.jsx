var Blog = React.createClass({
    rawMarkup: function() {
        var rawMarkup = marked(this.props.blog.summary, {sanitize: true});
        return {__html: rawMarkup}
    },

    render: function() {
        return (
            <article>
                <h2><a href={"/blog/" + this.props.blog.id}>{this.props.blog.name}</a></h2>
                <p className="blog-post-meta">{this.props.blog.created_at.toDateTime()}</p>
                <div dangerouslySetInnerHTML={this.rawMarkup()} />
                <p><a href={"/blog/" + this.props.blog.id}>Continue...</a></p>
                <hr />
            </article>
        );

    }
});

var Blogs = React.createClass({
    getInitialState: function() {
        return {
            pageIndex: this.props.pageIndex,
            blogs: this.props.blogs
        };
    },

    render: function() {
        var blogNodes = this.state.blogs.map(function(blog) {
            return (
                <Blog blog={blog} key={blog.id}/>
            );
        });

        return (
            <div>
                {blogNodes}
            </div>
        );
    }
});

ReactDOM.render(
    <Blogs page={window.page} blogs={window.blogs} />,
    document.getElementById('blogs')
);