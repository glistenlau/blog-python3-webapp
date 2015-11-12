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
            { className: "comment-box", __source: {
                    fileName: "../../../Dropbox/blog-python3-webapp/static/js/comment.jsx",
                    lineNumber: 9
                }
            },
            React.createElement(
                "div",
                { className: "col-xs-1 col-md-1 smpadding", __source: {
                        fileName: "../../../Dropbox/blog-python3-webapp/static/js/comment.jsx",
                        lineNumber: 10
                    }
                },
                React.createElement("img", { src: this.props.children.user_image, className: "user-image", width: "60px", height: "60px", __source: {
                        fileName: "../../../Dropbox/blog-python3-webapp/static/js/comment.jsx",
                        lineNumber: 11
                    }
                })
            ),
            React.createElement(
                "div",
                { className: "col-xs-11 col-md-11 smpadding", __source: {
                        fileName: "../../../Dropbox/blog-python3-webapp/static/js/comment.jsx",
                        lineNumber: 13
                    }
                },
                React.createElement(
                    "div",
                    { className: "comment-user", __source: {
                            fileName: "../../../Dropbox/blog-python3-webapp/static/js/comment.jsx",
                            lineNumber: 14
                        }
                    },
                    React.createElement(
                        "span",
                        { className: "comment-user-name", __source: {
                                fileName: "../../../Dropbox/blog-python3-webapp/static/js/comment.jsx",
                                lineNumber: 15
                            }
                        },
                        React.createElement(
                            "b",
                            {
                                __source: {
                                    fileName: "../../../Dropbox/blog-python3-webapp/static/js/comment.jsx",
                                    lineNumber: 15
                                }
                            },
                            this.props.children.user_name
                        )
                    ),
                    React.createElement(
                        "span",
                        { className: "comment-created-time", __source: {
                                fileName: "../../../Dropbox/blog-python3-webapp/static/js/comment.jsx",
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
                        fileName: "../../../Dropbox/blog-python3-webapp/static/js/comment.jsx",
                        lineNumber: 18
                    }
                })
            ),
            React.createElement("div", { className: "clearfix", __source: {
                    fileName: "../../../Dropbox/blog-python3-webapp/static/js/comment.jsx",
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
                        fileName: "../../../Dropbox/blog-python3-webapp/static/js/comment.jsx",
                        lineNumber: 32
                    }
                },
                comment
            );
        });

        return React.createElement(
            "div",
            {
                __source: {
                    fileName: "../../../Dropbox/blog-python3-webapp/static/js/comment.jsx",
                    lineNumber: 39
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
                        fileName: "../../../Dropbox/blog-python3-webapp/static/js/comment.jsx",
                        lineNumber: 74
                    }
                },
                React.createElement(
                    "a",
                    { href: "/signin", className: "btn btn-default", onclick: "/signin", __source: {
                            fileName: "../../../Dropbox/blog-python3-webapp/static/js/comment.jsx",
                            lineNumber: 75
                        }
                    },
                    "Please sign in to post a comment"
                )
            );
        } else {
            return React.createElement(
                "form",
                { className: "commentForm", onSubmit: this.handleSubmit, __source: {
                        fileName: "../../../Dropbox/blog-python3-webapp/static/js/comment.jsx",
                        lineNumber: 80
                    }
                },
                React.createElement(
                    "div",
                    { className: "col-xs-1 col-md-1 form-group smpadding", __source: {
                            fileName: "../../../Dropbox/blog-python3-webapp/static/js/comment.jsx",
                            lineNumber: 81
                        }
                    },
                    React.createElement("img", { src: this.props.currentUser.image, className: "user-image", width: "60px", height: "60px", __source: {
                            fileName: "../../../Dropbox/blog-python3-webapp/static/js/comment.jsx",
                            lineNumber: 82
                        }
                    })
                ),
                React.createElement(
                    "div",
                    { className: "col-xs-11 col-md-11 form-group smpadding", __source: {
                            fileName: "../../../Dropbox/blog-python3-webapp/static/js/comment.jsx",
                            lineNumber: 84
                        }
                    },
                    React.createElement(
                        "span",
                        { className: "comment-user-name", __source: {
                                fileName: "../../../Dropbox/blog-python3-webapp/static/js/comment.jsx",
                                lineNumber: 85
                            }
                        },
                        React.createElement(
                            "b",
                            {
                                __source: {
                                    fileName: "../../../Dropbox/blog-python3-webapp/static/js/comment.jsx",
                                    lineNumber: 85
                                }
                            },
                            this.props.currentUser.name
                        )
                    )
                ),
                React.createElement(
                    "div",
                    { className: "col-xs-12 col-md-11 form-group smpadding comment-box", __source: {
                            fileName: "../../../Dropbox/blog-python3-webapp/static/js/comment.jsx",
                            lineNumber: 87
                        }
                    },
                    React.createElement("textarea", {
                        className: "form-control", rows: "3",
                        placeholder: "Type your comment here(**markdown** supported)...",
                        onChange: this.handleChange,
                        ref: "text",
                        __source: {
                            fileName: "../../../Dropbox/blog-python3-webapp/static/js/comment.jsx",
                            lineNumber: 88
                        }
                    })
                ),
                React.createElement(
                    "div",
                    { className: "col-xs-12 col-md-11 col-md-push-1 form-group smpadding", __source: {
                            fileName: "../../../Dropbox/blog-python3-webapp/static/js/comment.jsx",
                            lineNumber: 95
                        }
                    },
                    React.createElement("div", {
                        className: "comment-content well",
                        rows: "3",
                        dangerouslySetInnerHTML: this.rawMarkup(), __source: {
                            fileName: "../../../Dropbox/blog-python3-webapp/static/js/comment.jsx",
                            lineNumber: 96
                        }
                    })
                ),
                React.createElement(
                    "div",
                    { className: "smpadding", __source: {
                            fileName: "../../../Dropbox/blog-python3-webapp/static/js/comment.jsx",
                            lineNumber: 102
                        }
                    },
                    React.createElement(
                        "button",
                        { type: "submit", className: "btn btn-primary button-right", __source: {
                                fileName: "../../../Dropbox/blog-python3-webapp/static/js/comment.jsx",
                                lineNumber: 103
                            }
                        },
                        "Post comment"
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
            currentUser: this.props.user ? this.props.user : null,
            data: this.props.comments,
            blog_id: window.location.pathname.split('/')[2]
        };
    },

    render: function render() {
        return React.createElement(
            "div",
            { className: "commentBox", __source: {
                    fileName: "../../../Dropbox/blog-python3-webapp/static/js/comment.jsx",
                    lineNumber: 131
                }
            },
            React.createElement(
                "h3",
                {
                    __source: {
                        fileName: "../../../Dropbox/blog-python3-webapp/static/js/comment.jsx",
                        lineNumber: 132
                    }
                },
                React.createElement(
                    "b",
                    {
                        __source: {
                            fileName: "../../../Dropbox/blog-python3-webapp/static/js/comment.jsx",
                            lineNumber: 132
                        }
                    },
                    "Comments"
                )
            ),
            React.createElement(CommentForm, { currentUser: this.state.currentUser,
                onCommentSubmit: this.handleCommentSubmit, __source: {
                    fileName: "../../../Dropbox/blog-python3-webapp/static/js/comment.jsx",
                    lineNumber: 133
                }
            }),
            React.createElement("div", { className: "clearfix", __source: {
                    fileName: "../../../Dropbox/blog-python3-webapp/static/js/comment.jsx",
                    lineNumber: 135
                }
            }),
            React.createElement(CommentList, { data: this.state.data, __source: {
                    fileName: "../../../Dropbox/blog-python3-webapp/static/js/comment.jsx",
                    lineNumber: 136
                }
            })
        );
    }

});

ReactDOM.render(React.createElement(CommentBox, {
    comments: window.comments,
    blog: window.blog,
    user: window.user, __source: {
        fileName: "../../../Dropbox/blog-python3-webapp/static/js/comment.jsx",
        lineNumber: 144
    }
}), document.getElementById('comment'));