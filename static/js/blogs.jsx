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

var Page = React.createClass({
    render: function() {
        <li className={this.props.active? 'active': ''}>
            <a href="#">{this.props.num}</a>
        </li>
    }
});

var Pagination = React.createClass({
    render: function() {
        var getPageRange = function() {
            var
                left = 0,
                right = 0;
            while (this.props.page.page_index - left > 1) {
                left++;
            }
            while (this.props.page.page_index + right < this.props.page.page_count) {
                right++;
            }

            if (left >= 2 && right >= 2) {
                return [this.props.page.page_index - 2, this.props.page.page_index + 2];
            } else if (left >= 2) {
                left = left >= 4 - right? 4 - right: left;
                return [this.props.page.page_index - left, this.props.page.page_index + right];
            } else if (right >= 2) {
                right = right >= 4 - left? 4 - left: right;
                return [this.props.page.page_index - left, this.props.page.page_index + right];
            } else {
                return [this.props.page.page_index - left, this.props.page.page_index + right];
            }
        };

        var paginationNodes = function() {
            var pageRange = getPageRange();
            for (var p = pageRange[0]; p <= pageRange[1]; p++) {
                <Page num={p} active={p === this.props.page.page_index}/>
            }
        };

        var noPrev = this.props.page.has_previous? '': ' disabled';
        var noNext = this.props.page.has_next? '': ' disabled'

        return (
            <div>
                <ul className="pager">
                    <li className={"previous" + noPrev}>
                        <a href="#">&larr; Previous</a>
                    </li>
                    <li>
                        <ul className="pagination">
                            {paginationNodes}
                        </ul>
                    </li>
                    <li className={"next" + noNext}>
                        <a href="#">Next &rarr;</a>
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