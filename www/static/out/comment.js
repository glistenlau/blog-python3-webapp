"use strict";

var Comment = React.createClass({
    displayName: "Comment",

    rawMarkup: function rawMarkup() {
        var rawMarkup = marked(this.props.children.content.toString(), { sanitize: true });
        return { __html: rawMarkup };
    },

    render: function render() {
        return React.createElement(
            "div",
            { className: "container comment-box", __source: {
                    fileName: "../../../Dropbox/blog-python3-webapp/www/static/js/comment.jsx",
                    lineNumber: 9
                }
            },
            React.createElement(
                "div",
                { className: "col-xs-1 col-md-1 smpadding", __source: {
                        fileName: "../../../Dropbox/blog-python3-webapp/www/static/js/comment.jsx",
                        lineNumber: 10
                    }
                },
                React.createElement("img", { src: this.props.children.user_image, className: "user-image", width: "60px", height: "60px", __source: {
                        fileName: "../../../Dropbox/blog-python3-webapp/www/static/js/comment.jsx",
                        lineNumber: 11
                    }
                })
            ),
            React.createElement(
                "div",
                { className: "col-xs-11 col-md-11 smpadding", __source: {
                        fileName: "../../../Dropbox/blog-python3-webapp/www/static/js/comment.jsx",
                        lineNumber: 13
                    }
                },
                React.createElement(
                    "div",
                    { className: "comment-user", __source: {
                            fileName: "../../../Dropbox/blog-python3-webapp/www/static/js/comment.jsx",
                            lineNumber: 14
                        }
                    },
                    React.createElement(
                        "span",
                        { className: "comment-user-name", __source: {
                                fileName: "../../../Dropbox/blog-python3-webapp/www/static/js/comment.jsx",
                                lineNumber: 15
                            }
                        },
                        React.createElement(
                            "b",
                            {
                                __source: {
                                    fileName: "../../../Dropbox/blog-python3-webapp/www/static/js/comment.jsx",
                                    lineNumber: 15
                                }
                            },
                            this.props.children.user_name
                        )
                    ),
                    React.createElement(
                        "span",
                        { className: "comment-created-time", __source: {
                                fileName: "../../../Dropbox/blog-python3-webapp/www/static/js/comment.jsx",
                                lineNumber: 16
                            }
                        },
                        "    •    ",
                        this.props.children.created_at.toDateTime()
                    )
                ),
                React.createElement("div", { style: { padding: '5px 0' },
                    className: "comment-content",
                    dangerouslySetInnerHTML: this.rawMarkup(), __source: {
                        fileName: "../../../Dropbox/blog-python3-webapp/www/static/js/comment.jsx",
                        lineNumber: 18
                    }
                })
            ),
            React.createElement("div", { className: "clearfix", __source: {
                    fileName: "../../../Dropbox/blog-python3-webapp/www/static/js/comment.jsx",
                    lineNumber: 22
                }
            })
        );
    }
});

var CommentList = React.createClass({
    displayName: "CommentList",

    render: function render() {
        var commentNodes = this.props.data.map(function (comment, index) {
            return React.createElement(
                Comment,
                { key: index, __source: {
                        fileName: "../../../Dropbox/blog-python3-webapp/www/static/js/comment.jsx",
                        lineNumber: 35
                    }
                },
                comment
            );
        });

        return React.createElement(
            "div",
            { className: "row", __source: {
                    fileName: "../../../Dropbox/blog-python3-webapp/www/static/js/comment.jsx",
                    lineNumber: 42
                }
            },
            commentNodes
        );
    }
});

var CommentForm = React.createClass({
    displayName: "CommentForm",

    getInitialState: function getInitialState() {
        return { value: 'Type your comment here(**markdown** supported)...' };
    },

    handleChange: function handleChange() {
        this.setState({ value: this.refs.text.value.length === 0 ? 'Type your comment here(**markdown** supported)...' : this.refs.text.value });
    },

    rawMarkup: function rawMarkup() {
        return { __html: marked(this.state.value, { sanitize: true }) };
    },

    handleSubmit: function handleSubmit(e) {
        e.preventDefault();
        var text = this.refs.text.value.trim();

        this.props.onCommentSubmit({ content: text });
        this.refs.text.value = '';
        this.setState({ value: 'Type your comment here(**markdown**' + ' supported)...' });
    },

    render: function render() {
        if (this.props.currentUser === null) {
            return React.createElement(
                "div",
                { className: "btn-comment-signin", __source: {
                        fileName: "../../../Dropbox/blog-python3-webapp/www/static/js/comment.jsx",
                        lineNumber: 77
                    }
                },
                React.createElement(
                    "a",
                    { href: "/signin", className: "btn btn-default", onclick: "/signin", __source: {
                            fileName: "../../../Dropbox/blog-python3-webapp/www/static/js/comment.jsx",
                            lineNumber: 78
                        }
                    },
                    "Please sign in to post a comment"
                )
            );
        } else {
            return React.createElement(
                "div",
                { className: "container", __source: {
                        fileName: "../../../Dropbox/blog-python3-webapp/www/static/js/comment.jsx",
                        lineNumber: 83
                    }
                },
                React.createElement(
                    "form",
                    { className: "commentForm", onSubmit: this.handleSubmit, __source: {
                            fileName: "../../../Dropbox/blog-python3-webapp/www/static/js/comment.jsx",
                            lineNumber: 84
                        }
                    },
                    React.createElement(
                        "div",
                        { className: "row form-group", __source: {
                                fileName: "../../../Dropbox/blog-python3-webapp/www/static/js/comment.jsx",
                                lineNumber: 85
                            }
                        },
                        React.createElement(
                            "div",
                            { className: "col-xs-1 col-md-1 form-group smpadding", __source: {
                                    fileName: "../../../Dropbox/blog-python3-webapp/www/static/js/comment.jsx",
                                    lineNumber: 86
                                }
                            },
                            React.createElement("img", { src: this.props.currentUser.image, className: "user-image", width: "60px", height: "60px", __source: {
                                    fileName: "../../../Dropbox/blog-python3-webapp/www/static/js/comment.jsx",
                                    lineNumber: 87
                                }
                            })
                        ),
                        React.createElement(
                            "div",
                            { className: "col-xs-11 col-md-11 form-group smpadding", __source: {
                                    fileName: "../../../Dropbox/blog-python3-webapp/www/static/js/comment.jsx",
                                    lineNumber: 89
                                }
                            },
                            React.createElement(
                                "span",
                                { className: "comment-user-name", __source: {
                                        fileName: "../../../Dropbox/blog-python3-webapp/www/static/js/comment.jsx",
                                        lineNumber: 90
                                    }
                                },
                                React.createElement(
                                    "b",
                                    {
                                        __source: {
                                            fileName: "../../../Dropbox/blog-python3-webapp/www/static/js/comment.jsx",
                                            lineNumber: 90
                                        }
                                    },
                                    this.props.currentUser.name
                                )
                            )
                        ),
                        React.createElement(
                            "div",
                            { className: "col-xs-12 col-md-11 form-group smpadding comment-box", __source: {
                                    fileName: "../../../Dropbox/blog-python3-webapp/www/static/js/comment.jsx",
                                    lineNumber: 92
                                }
                            },
                            React.createElement("textarea", {
                                className: "form-control", rows: "3",
                                placeholder: "Type your comment here(**markdown** supported)...",
                                onChange: this.handleChange,
                                ref: "text",
                                __source: {
                                    fileName: "../../../Dropbox/blog-python3-webapp/www/static/js/comment.jsx",
                                    lineNumber: 93
                                }
                            })
                        ),
                        React.createElement(
                            "div",
                            { className: "col-xs-12 col-md-11 col-md-push-1 form-group smpadding", __source: {
                                    fileName: "../../../Dropbox/blog-python3-webapp/www/static/js/comment.jsx",
                                    lineNumber: 100
                                }
                            },
                            React.createElement("div", {
                                className: "comment-content well",
                                rows: "3",
                                dangerouslySetInnerHTML: this.rawMarkup(), __source: {
                                    fileName: "../../../Dropbox/blog-python3-webapp/www/static/js/comment.jsx",
                                    lineNumber: 101
                                }
                            })
                        ),
                        React.createElement(
                            "div",
                            { className: "smpadding", __source: {
                                    fileName: "../../../Dropbox/blog-python3-webapp/www/static/js/comment.jsx",
                                    lineNumber: 107
                                }
                            },
                            React.createElement(
                                "button",
                                { type: "submit", className: "btn btn-primary button-right", __source: {
                                        fileName: "../../../Dropbox/blog-python3-webapp/www/static/js/comment.jsx",
                                        lineNumber: 108
                                    }
                                },
                                "Post comment"
                            )
                        )
                    )
                )
            );
        }
    }
});

var CommentBox = React.createClass({
    displayName: "CommentBox",

    handleCommentSubmit: function handleCommentSubmit(comment) {
        var url = "/api/blogs/" + this.state.blog_id + "/comments";
        $.post(url, comment, (function (res) {
            this.setState({ data: [res].concat(this.state.data) });
        }).bind(this));
    },

    getInitialState: function getInitialState() {
        return {
            currentUser: this.props.user,
            data: this.props.comments,
            blog_id: window.location.pathname.split('/')[2]
        };
    },

    render: function render() {
        return React.createElement(
            "div",
            { className: "commentBox", __source: {
                    fileName: "../../../Dropbox/blog-python3-webapp/www/static/js/comment.jsx",
                    lineNumber: 138
                }
            },
            React.createElement(
                "h3",
                {
                    __source: {
                        fileName: "../../../Dropbox/blog-python3-webapp/www/static/js/comment.jsx",
                        lineNumber: 139
                    }
                },
                React.createElement(
                    "b",
                    {
                        __source: {
                            fileName: "../../../Dropbox/blog-python3-webapp/www/static/js/comment.jsx",
                            lineNumber: 139
                        }
                    },
                    "Comments"
                )
            ),
            React.createElement(CommentForm, { currentUser: this.state.currentUser,
                onCommentSubmit: this.handleCommentSubmit, __source: {
                    fileName: "../../../Dropbox/blog-python3-webapp/www/static/js/comment.jsx",
                    lineNumber: 140
                }
            }),
            React.createElement(CommentList, { data: this.state.data, __source: {
                    fileName: "../../../Dropbox/blog-python3-webapp/www/static/js/comment.jsx",
                    lineNumber: 142
                }
            })
        );
    }

});

ReactDOM.render(React.createElement(CommentBox, {
    comments: window.comments,
    blog: window.blog,
    user: window.user, __source: {
        fileName: "../../../Dropbox/blog-python3-webapp/www/static/js/comment.jsx",
        lineNumber: 150
    }
}), document.getElementById('comment'));