'use strict';

var EditBox = React.createClass({
    displayName: 'EditBox',

    getInitialState: function getInitialState() {
        return {
            name: '',
            summary: '',
            content: ''
        };
    },

    rawMarkup: function rawMarkup(content) {
        return { __html: marked(content, { sanitize: true }) };
    },

    handleChange: function handleChange() {
        this.setState({
            name: this.refs.articleName.value,
            summary: this.refs.articleSummary.value,
            content: this.refs.articleContent.value
        });
    },

    componentDidMount: function componentDidMount() {
        this.loadArticle();
    },

    handleSubmit: function handleSubmit(event) {
        event.preventDefault();
        $.post(this.props.action, $('#edit-form').serializeArray()).done((function (res) {
            location.assign('/blog/' + res.id);
        }).bind(this));
    },

    loadArticle: function loadArticle() {
        if (this.props.ID) {
            $.get('/api/blogs/' + this.props.ID).done((function (blog) {
                this.refs.articleName.value = blog.name;
                this.refs.articleSummary.value = blog.summary;
                this.refs.summaryPreview.innerHTML = marked(blog.summary, { sanitize: true });
                this.refs.articleContent.value = blog.content;
                this.refs.contentPreview.innerHTML = marked(blog.content, { sanitize: true });
            }).bind(this));
        }
    },

    render: function render() {
        return React.createElement(
            'div',
            { className: 'container', __source: {
                    fileName: '../../../Dropbox/blog-python3-webapp/static/js/manage_blog_edit.jsx',
                    lineNumber: 49
                }
            },
            React.createElement(
                'form',
                { id: 'edit-form', onSubmit: this.handleSubmit, __source: {
                        fileName: '../../../Dropbox/blog-python3-webapp/static/js/manage_blog_edit.jsx',
                        lineNumber: 50
                    }
                },
                React.createElement(
                    'div',
                    { className: 'form-group', __source: {
                            fileName: '../../../Dropbox/blog-python3-webapp/static/js/manage_blog_edit.jsx',
                            lineNumber: 51
                        }
                    },
                    React.createElement(
                        'label',
                        {
                            __source: {
                                fileName: '../../../Dropbox/blog-python3-webapp/static/js/manage_blog_edit.jsx',
                                lineNumber: 52
                            }
                        },
                        'Title'
                    ),
                    React.createElement('textarea', {
                        name: 'name',
                        className: 'form-control',
                        onChange: this.handleChange,
                        placeholder: 'Please Enter the title',
                        value: this.state.name,
                        ref: 'articleName', __source: {
                            fileName: '../../../Dropbox/blog-python3-webapp/static/js/manage_blog_edit.jsx',
                            lineNumber: 53
                        }
                    })
                ),
                React.createElement(
                    'div',
                    { className: 'form-group', __source: {
                            fileName: '../../../Dropbox/blog-python3-webapp/static/js/manage_blog_edit.jsx',
                            lineNumber: 61
                        }
                    },
                    React.createElement(
                        'label',
                        {
                            __source: {
                                fileName: '../../../Dropbox/blog-python3-webapp/static/js/manage_blog_edit.jsx',
                                lineNumber: 62
                            }
                        },
                        'Summary'
                    ),
                    React.createElement('textarea', {
                        name: 'summary',
                        className: 'form-control',
                        onChange: this.handleChange,
                        placeholder: 'Please Enter the summary',
                        value: this.state.summary,
                        rows: '3',
                        ref: 'articleSummary', __source: {
                            fileName: '../../../Dropbox/blog-python3-webapp/static/js/manage_blog_edit.jsx',
                            lineNumber: 63
                        }
                    }),
                    React.createElement('div', { className: 'content form-group well',
                        rows: '3',
                        ref: 'summaryPreview',
                        dangerouslySetInnerHTML: this.rawMarkup(this.state.summary), __source: {
                            fileName: '../../../Dropbox/blog-python3-webapp/static/js/manage_blog_edit.jsx',
                            lineNumber: 71
                        }
                    })
                ),
                React.createElement(
                    'div',
                    { className: 'form-group', __source: {
                            fileName: '../../../Dropbox/blog-python3-webapp/static/js/manage_blog_edit.jsx',
                            lineNumber: 76
                        }
                    },
                    React.createElement(
                        'label',
                        {
                            __source: {
                                fileName: '../../../Dropbox/blog-python3-webapp/static/js/manage_blog_edit.jsx',
                                lineNumber: 77
                            }
                        },
                        'Content'
                    ),
                    React.createElement('textarea', {
                        name: 'content',
                        className: 'form-control',
                        onChange: this.handleChange,
                        placeholder: 'Please Enter the content',
                        value: this.state.content,
                        rows: '10',
                        ref: 'articleContent', __source: {
                            fileName: '../../../Dropbox/blog-python3-webapp/static/js/manage_blog_edit.jsx',
                            lineNumber: 78
                        }
                    }),
                    React.createElement('div', { className: 'content form-group well',
                        rows: '3',
                        ref: 'contentPreview',
                        dangerouslySetInnerHTML: this.rawMarkup(this.state.content), __source: {
                            fileName: '../../../Dropbox/blog-python3-webapp/static/js/manage_blog_edit.jsx',
                            lineNumber: 86
                        }
                    })
                ),
                React.createElement(
                    'button',
                    { type: 'submit', className: 'btn btn-primary', __source: {
                            fileName: '../../../Dropbox/blog-python3-webapp/static/js/manage_blog_edit.jsx',
                            lineNumber: 91
                        }
                    },
                    'Submit'
                )
            )
        );
    }
});

ReactDOM.render(React.createElement(EditBox, { ID: window.ID, action: window.action, __source: {
        fileName: '../../../Dropbox/blog-python3-webapp/static/js/manage_blog_edit.jsx',
        lineNumber: 99
    }
}), document.getElementById("blog_edit"));