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

var Page = React.createClass({
    displayName: "Page",

    render: function render() {
        React.createElement(
            "li",
            { className: this.props.active ? 'active' : '', __source: {
                    fileName: "../../../Dropbox/blog-python3-webapp/static/js/blogs.jsx",
                    lineNumber: 23
                }
            },
            React.createElement(
                "a",
                { href: "#", __source: {
                        fileName: "../../../Dropbox/blog-python3-webapp/static/js/blogs.jsx",
                        lineNumber: 24
                    }
                },
                this.props.num
            )
        );
    }
});

var Pagination = React.createClass({
    displayName: "Pagination",

    render: function render() {
        var getPageRange = function getPageRange() {
            var left = 0,
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
                left = left >= 4 - right ? 4 - right : left;
                return [this.props.page.page_index - left, this.props.page.page_index + right];
            } else if (right >= 2) {
                right = right >= 4 - left ? 4 - left : right;
                return [this.props.page.page_index - left, this.props.page.page_index + right];
            } else {
                return [this.props.page.page_index - left, this.props.page.page_index + right];
            }
        };

        var paginationNodes = function paginationNodes() {
            var pageRange = getPageRange();
            for (var p = pageRange[0]; p <= pageRange[1]; p++) {
                React.createElement(Page, { num: p, active: p === this.props.page.page_index, __source: {
                        fileName: "../../../Dropbox/blog-python3-webapp/static/js/blogs.jsx",
                        lineNumber: 58
                    }
                });
            }
        };

        var noPrev = this.props.page.has_previous ? '' : ' disabled';
        var noNext = this.props.page.has_next ? '' : ' disabled';

        return React.createElement(
            "div",
            {
                __source: {
                    fileName: "../../../Dropbox/blog-python3-webapp/static/js/blogs.jsx",
                    lineNumber: 66
                }
            },
            React.createElement(
                "ul",
                { className: "pager", __source: {
                        fileName: "../../../Dropbox/blog-python3-webapp/static/js/blogs.jsx",
                        lineNumber: 67
                    }
                },
                React.createElement(
                    "li",
                    { className: "previous" + noPrev, __source: {
                            fileName: "../../../Dropbox/blog-python3-webapp/static/js/blogs.jsx",
                            lineNumber: 68
                        }
                    },
                    React.createElement(
                        "a",
                        { href: "#", __source: {
                                fileName: "../../../Dropbox/blog-python3-webapp/static/js/blogs.jsx",
                                lineNumber: 69
                            }
                        },
                        "← Previous"
                    )
                ),
                React.createElement(
                    "li",
                    {
                        __source: {
                            fileName: "../../../Dropbox/blog-python3-webapp/static/js/blogs.jsx",
                            lineNumber: 71
                        }
                    },
                    React.createElement(
                        "ul",
                        { className: "pagination", __source: {
                                fileName: "../../../Dropbox/blog-python3-webapp/static/js/blogs.jsx",
                                lineNumber: 72
                            }
                        },
                        paginationNodes
                    )
                ),
                React.createElement(
                    "li",
                    { className: "next" + noNext, __source: {
                            fileName: "../../../Dropbox/blog-python3-webapp/static/js/blogs.jsx",
                            lineNumber: 76
                        }
                    },
                    React.createElement(
                        "a",
                        { href: "#", __source: {
                                fileName: "../../../Dropbox/blog-python3-webapp/static/js/blogs.jsx",
                                lineNumber: 77
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
                    lineNumber: 97
                }
            });
        });

        return React.createElement(
            "div",
            {
                __source: {
                    fileName: "../../../Dropbox/blog-python3-webapp/static/js/blogs.jsx",
                    lineNumber: 102
                }
            },
            blogNodes,
            React.createElement(Pagination, { page: this.state.page, __source: {
                    fileName: "../../../Dropbox/blog-python3-webapp/static/js/blogs.jsx",
                    lineNumber: 104
                }
            })
        );
    }
});

ReactDOM.render(React.createElement(Blogs, { page: window.page, blogs: window.blogs, __source: {
        fileName: "../../../Dropbox/blog-python3-webapp/static/js/blogs.jsx",
        lineNumber: 111
    }
}), document.getElementById('blogs'));