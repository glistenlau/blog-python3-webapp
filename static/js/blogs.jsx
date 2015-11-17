var Blog = React.createClass({
    rawMarkup: function() {
        var rawMarkup = marked(this.props.blog.summary);
        return {__html: rawMarkup}
    },

    render: function() {
        return (
            <article>
                <h2><a href={"/blog/" + this.props.blog.id}>{this.props.blog.name}</a></h2>
                <p className="blog-post-meta">{this.props.blog.created_at.toDateTime()}</p>
                <div className="content" dangerouslySetInnerHTML={this.rawMarkup()} />
                <p><a href={"/blog/" + this.props.blog.id}>Continue...</a></p>
                <hr />
            </article>
        );

    }
});

var Pagination = React.createClass({
    render: function() {
        var noPrev = this.props.page.has_previous? '': ' disabled';
        var noNext = this.props.page.has_next? '': ' disabled';

        return (
            <div>
                <ul className="pager">
                    <li className={"previous" + noPrev}>
                        <a href={"?page=" + (this.props.page.page_index - 1)}>&larr; Previous</a>
                    </li>
                    <li className={"next" + noNext}>
                        <a href={"?page=" + (this.props.page.page_index + 1)}>Next &rarr;</a>
                    </li>

                </ul>
            </div>
        )
    }
});

var Blogs = React.createClass({
    getInitialState: function() {
        return {
            page: this.props.page,
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
                <Pagination page={this.state.page} />
            </div>
        );
    }
});

ReactDOM.render(
    <Blogs page={window.page} blogs={window.blogs} />,
    document.getElementById('blogs')
);