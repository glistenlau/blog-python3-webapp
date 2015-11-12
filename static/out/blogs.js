"use strict";

var Blog = React.createClass({
    displayName: "Blog",

    rawMarkup: function rawMarkup() {
        var rawMarkup = marked(this.props.blog.summary, { sanitize: true });
        return { __html: rawMarkup };
    },

    render: function render() {
        return React.createElement(
            "article",
            {
                __source: {
                    fileName: "../../../Dropbox/blog-python3-webapp/static/js/blogs.jsx",
                    lineNumber: 9
                }
            },
            React.createElement(
                "h2",
                {
                    __source: {
                        fileName: "../../../Dropbox/blog-python3-webapp/static/js/blogs.jsx",
                        lineNumber: 10
                    }
                },
                React.createElement(
                    "a",
                    { href: "/blog/" + this.props.blog.id, __source: {
                            fileName: "../../../Dropbox/blog-python3-webapp/static/js/blogs.jsx",
                            lineNumber: 10
                        }
                    },
                    this.props.blog.name
                )
            ),
            React.createElement(
                "p",
                { className: "blog-post-meta", __source: {
                        fileName: "../../../Dropbox/blog-python3-webapp/static/js/blogs.jsx",
                        lineNumber: 11
                    }
                },
                this.props.blog.created_at.toDateTime()
            ),
            React.createElement("div", { dangerouslySetInnerHTML: this.rawMarkup(), __source: {
                    fileName: "../../../Dropbox/blog-python3-webapp/static/js/blogs.jsx",
                    lineNumber: 12
                }
            }),
            React.createElement(
                "p",
                {
                    __source: {
                        fileName: "../../../Dropbox/blog-python3-webapp/static/js/blogs.jsx",
                        lineNumber: 13
                    }
                },
                React.createElement(
                    "a",
                    { href: "/blog/" + this.props.blog.id, __source: {
                            fileName: "../../../Dropbox/blog-python3-webapp/static/js/blogs.jsx",
                            lineNumber: 13
                        }
                    },
                    "Continue..."
                )
            ),
            React.createElement("hr", {
                __source: {
                    fileName: "../../../Dropbox/blog-python3-webapp/static/js/blogs.jsx",
                    lineNumber: 14
                }
            })
        );
    }
});

var Blogs = React.createClass({
    displayName: "Blogs",

    getInitialState: function getInitialState() {
        return {
            pageIndex: this.props.pageIndex,
            blogs: this.props.blogs
        };
    },

    render: function render() {
        var blogNodes = this.state.blogs.map(function (blog) {
            return React.createElement(Blog, { blog: blog, key: blog.id, __source: {
                    fileName: "../../../Dropbox/blog-python3-webapp/static/js/blogs.jsx",
                    lineNumber: 32
                }
            });
        });

        return React.createElement(
            "div",
            {
                __source: {
                    fileName: "../../../Dropbox/blog-python3-webapp/static/js/blogs.jsx",
                    lineNumber: 37
                }
            },
            blogNodes
        );
    }
});

ReactDOM.render(React.createElement(Blogs, { pageIndex: window.pageIndex, blogs: window.blogs, __source: {
        fileName: "../../../Dropbox/blog-python3-webapp/static/js/blogs.jsx",
        lineNumber: 45
    }
}), document.getElementById('blogs'));