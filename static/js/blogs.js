"use strict";

var Blog = React.createClass({
    displayName: "Blog",

    rawMarkup: function rawMarkup() {
        var rawMarkup = marked(this.props.blog.summary);
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
            React.createElement("div", { className: "content", dangerouslySetInnerHTML: this.rawMarkup(), __source: {
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

var Pagination = React.createClass({
    displayName: "Pagination",

    render: function render() {
        var noPrev = this.props.page.has_previous ? '' : ' disabled';
        var noNext = this.props.page.has_next ? '' : ' disabled';

        return React.createElement(
            "div",
            {
                __source: {
                    fileName: "../../../Dropbox/blog-python3-webapp/static/js/blogs.jsx",
                    lineNumber: 27
                }
            },
            React.createElement(
                "ul",
                { className: "pager", __source: {
                        fileName: "../../../Dropbox/blog-python3-webapp/static/js/blogs.jsx",
                        lineNumber: 28
                    }
                },
                React.createElement(
                    "li",
                    { className: "previous" + noPrev, __source: {
                            fileName: "../../../Dropbox/blog-python3-webapp/static/js/blogs.jsx",
                            lineNumber: 29
                        }
                    },
                    React.createElement(
                        "a",
                        { href: "?page=" + (this.props.page.page_index - 1), __source: {
                                fileName: "../../../Dropbox/blog-python3-webapp/static/js/blogs.jsx",
                                lineNumber: 30
                            }
                        },
                        "← Previous"
                    )
                ),
                React.createElement(
                    "li",
                    { className: "next" + noNext, __source: {
                            fileName: "../../../Dropbox/blog-python3-webapp/static/js/blogs.jsx",
                            lineNumber: 32
                        }
                    },
                    React.createElement(
                        "a",
                        { href: "?page=" + (this.props.page.page_index + 1), __source: {
                                fileName: "../../../Dropbox/blog-python3-webapp/static/js/blogs.jsx",
                                lineNumber: 33
                            }
                        },
                        "Next →"
                    )
                )
            )
        );
    }
});

var Blogs = React.createClass({
    displayName: "Blogs",

    getInitialState: function getInitialState() {
        return {
            page: this.props.page,
            blogs: this.props.blogs
        };
    },

    render: function render() {
        var blogNodes = this.state.blogs.map(function (blog) {
            return React.createElement(Blog, { blog: blog, key: blog.id, __source: {
                    fileName: "../../../Dropbox/blog-python3-webapp/static/js/blogs.jsx",
                    lineNumber: 53
                }
            });
        });

        return React.createElement(
            "div",
            {
                __source: {
                    fileName: "../../../Dropbox/blog-python3-webapp/static/js/blogs.jsx",
                    lineNumber: 58
                }
            },
            blogNodes,
            React.createElement(Pagination, { page: this.state.page, __source: {
                    fileName: "../../../Dropbox/blog-python3-webapp/static/js/blogs.jsx",
                    lineNumber: 60
                }
            })
        );
    }
});

ReactDOM.render(React.createElement(Blogs, { page: window.page, blogs: window.blogs, __source: {
        fileName: "../../../Dropbox/blog-python3-webapp/static/js/blogs.jsx",
        lineNumber: 67
    }
}), document.getElementById('blogs'));