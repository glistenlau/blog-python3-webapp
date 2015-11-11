/**
 * Created by YiLIU on 11/10/15.
 */
'use strict';

var Blog = React.createClass({
    displayName: 'Blog',

    handleDelete: function handleDelete() {
        if (confirm('Sure to delete "' + this.props.children.name + '"?')) {
            $.post('/api/blogs/' + this.props.children.id + '/delete').done(refresh()).fail(function (err) {
                if (err) {
                    return alert(err.message || err.erroe || err);
                }
            });
        }
    },

    render: function render() {

        return React.createElement(
            'tr',
            {
                __source: {
                    fileName: '../../../Dropbox/blog-python3-webapp/static/js/manage_blogs.jsx',
                    lineNumber: 22
                }
            },
            React.createElement(
                'td',
                {
                    __source: {
                        fileName: '../../../Dropbox/blog-python3-webapp/static/js/manage_blogs.jsx',
                        lineNumber: 23
                    }
                },
                React.createElement(
                    'a',
                    { href: '/blog/' + this.props.children.id, __source: {
                            fileName: '../../../Dropbox/blog-python3-webapp/static/js/manage_blogs.jsx',
                            lineNumber: 23
                        }
                    },
                    this.props.children.name
                )
            ),
            React.createElement(
                'td',
                {
                    __source: {
                        fileName: '../../../Dropbox/blog-python3-webapp/static/js/manage_blogs.jsx',
                        lineNumber: 25
                    }
                },
                React.createElement(
                    'a',
                    { href: '/user/' + this.props.children.user_id, __source: {
                            fileName: '../../../Dropbox/blog-python3-webapp/static/js/manage_blogs.jsx',
                            lineNumber: 25
                        }
                    },
                    this.props.children.user_name
                )
            ),
            React.createElement(
                'td',
                {
                    __source: {
                        fileName: '../../../Dropbox/blog-python3-webapp/static/js/manage_blogs.jsx',
                        lineNumber: 27
                    }
                },
                this.props.children.created_at.toDateTime()
            ),
            React.createElement(
                'td',
                {
                    __source: {
                        fileName: '../../../Dropbox/blog-python3-webapp/static/js/manage_blogs.jsx',
                        lineNumber: 28
                    }
                },
                React.createElement(
                    'a',
                    { href: '/manage/blogs/edit?id=' + this.props.children.id,
                        className: 'btn btn-primary btn-xs', __source: {
                            fileName: '../../../Dropbox/blog-python3-webapp/static/js/manage_blogs.jsx',
                            lineNumber: 29
                        }
                    },
                    'Edit'
                ),
                React.createElement(
                    'button',
                    {
                        onClick: this.handleDelete,
                        className: 'btn btn-default btn-xs', __source: {
                            fileName: '../../../Dropbox/blog-python3-webapp/static/js/manage_blogs.jsx',
                            lineNumber: 31
                        }
                    },
                    'Delete'
                )
            )
        );
    }
});

// map all the blogs
var BlogList = React.createClass({
    displayName: 'BlogList',

    render: function render() {
        var blogNodes = this.props.blogs.map(function (blog, index) {
            return React.createElement(
                Blog,
                { key: index, __source: {
                        fileName: '../../../Dropbox/blog-python3-webapp/static/js/manage_blogs.jsx',
                        lineNumber: 45
                    }
                },
                blog
            );
        });

        return React.createElement(
            'table',
            { className: 'table', __source: {
                    fileName: '../../../Dropbox/blog-python3-webapp/static/js/manage_blogs.jsx',
                    lineNumber: 52
                }
            },
            React.createElement(
                'thead',
                {
                    __source: {
                        fileName: '../../../Dropbox/blog-python3-webapp/static/js/manage_blogs.jsx',
                        lineNumber: 53
                    }
                },
                React.createElement(
                    'tr',
                    {
                        __source: {
                            fileName: '../../../Dropbox/blog-python3-webapp/static/js/manage_blogs.jsx',
                            lineNumber: 54
                        }
                    },
                    React.createElement(
                        'th',
                        {
                            __source: {
                                fileName: '../../../Dropbox/blog-python3-webapp/static/js/manage_blogs.jsx',
                                lineNumber: 55
                            }
                        },
                        'Title'
                    ),
                    React.createElement(
                        'th',
                        {
                            __source: {
                                fileName: '../../../Dropbox/blog-python3-webapp/static/js/manage_blogs.jsx',
                                lineNumber: 56
                            }
                        },
                        'Author'
                    ),
                    React.createElement(
                        'th',
                        {
                            __source: {
                                fileName: '../../../Dropbox/blog-python3-webapp/static/js/manage_blogs.jsx',
                                lineNumber: 57
                            }
                        },
                        'Created Time'
                    ),
                    React.createElement(
                        'th',
                        {
                            __source: {
                                fileName: '../../../Dropbox/blog-python3-webapp/static/js/manage_blogs.jsx',
                                lineNumber: 58
                            }
                        },
                        'Operation'
                    )
                )
            ),
            React.createElement(
                'tbody',
                {
                    __source: {
                        fileName: '../../../Dropbox/blog-python3-webapp/static/js/manage_blogs.jsx',
                        lineNumber: 61
                    }
                },
                blogNodes
            )
        );
    }
});

// BlogBox layout
var BlogsBox = React.createClass({
    displayName: 'BlogsBox',
    loadBlogsFromServer: function loadBlogsFromServer() {
        var url = '/api/blogs?page=' + this.state.page;
        $.get(url, (function (result) {
            this.setState({
                blogs: result.blogs
            });
        }).bind(this));
    },
    getInitialState: function getInitialState() {
        return {
            page: page,
            blogs: []
        };
    },
    componentDidMount: function componentDidMount() {
        this.loadBlogsFromServer();
    },
    render: function render() {
        return React.createElement(BlogList, { blogs: this.state.blogs, __source: {
                fileName: '../../../Dropbox/blog-python3-webapp/static/js/manage_blogs.jsx',
                lineNumber: 93
            }
        });
    }
});

ReactDOM.render(React.createElement(BlogsBox, {
    __source: {
        fileName: '../../../Dropbox/blog-python3-webapp/static/js/manage_blogs.jsx',
        lineNumber: 99
    }
}), document.getElementById('blogs'));