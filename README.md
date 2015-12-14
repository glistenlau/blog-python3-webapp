# Blog Web App with Python
This is a personal blog web application using Python. 

In this project, an asynchrounous ORM and web framework based on Python3 coroutine are built on the sever side.

On the front side, React, jQuery and Bootstrap are applied to render pages and handle HTML DOM manipulation.

This web application is deployed on AWS EC2: http://glistenlau.com/

## ORM
Three tables are stored in MySQL database for this blog, they are `users`, `blogs` and `comments`. The corresponding models are defined on the models.py file:

```python
class User(Model):
    __table__ = 'users'
    id = StringField(primary_key=True, default=next_id, ddl='varchar(50)')
    email = StringField(ddl='varchar(50)')
    passwd = StringField(ddl='varchar(50)')
    admin = BooleanField();
    name = StringField(ddl='varchar(50)')
    image = StringField(ddl='varchar(500)')
    created_at = FloatField(default=time.time)


class Blog(Model):
    __table__ = 'blogs'
    id = StringField(primary_key=True, default=next_id, ddl='varchar(50)')
    user_id = StringField(ddl='varchar(50)')
    user_name = StringField(ddl='varchar(50)')
    user_image = StringField(ddl='varchar(500)')
    name = StringField(ddl='varchar(50)')
    summary = StringField(ddl='varchar(200)')
    content = TextField()
    created_at = FloatField(default=time.time)


class Comment(Model):
    __table__ = 'comments'
    id = StringField(primary_key=True, default=next_id, ddl='varchar(50)')
    blog_id = StringField(ddl='varchar(50)')
    user_id = StringField(ddl='varchar(50)')
    user_name = StringField(ddl='varchar(50)')
    user_image = StringField(ddl='varchar(500)')
    content = TextField()
    created_at = FloatField(default=time.time)
```
The `__table__` is mapped to the table name in the database. And all the attributes within the class is the corresponding fields.

So with the ORM we can store a user to database like this:

```python
user = User(id='123', name='Glisten')
yield from user.save()
```
And we can query a user like this:

```python
user = yield from User.find('123')
```

##Web Framework
The web framework applied on this project support the `GET` and `POST` methods.

To add a request handler, a method should be added to the file `handler.py`, like this:

```python
@get('/')
def index(*, page='1'):
    page_index = get_page_index(page)
    num = yield from Blog.findNumber('count(id)')
    page = Page(num, page_index)
    if num == 0:
        blogs = []
    else:
        blogs = yield from Blog.findAll(orderBy='created_at desc', limit=(
            page.offset, page.limit))
    return {
        '__template__': 'blogs.html',
        'page': page,
        'blogs': blogs
    }
```

The above method is used to handle the `GET` request, which path is `/`, it will query the blogs for the first page and return the template page `blogs.html`, page information and blogs array to the middleware to generate response.

##Render Pages
Like I said above, for the `GET /` request, the server will response a HTML template to the client, this template is powered by the template engine 
**Jinja2**:

```html
<!-- blogs.html -->
{% extends '__base__.html' %}

{% block title %}日志{% endblock %}

{% block beforehead %}
{% endblock %}

{% block content %}
<script>
  var page = {{ page|safe }};
  var blogs = {{ blogs|safe }};
</script>

<div id="blogs" style="margin: 0 auto; max-width: 700px"></div>
<script src="/static/js/blogs.js"></script>
{% endblock %}
```
But this tempalte will just contains the basic data and template for renderring a page, other work is finished by **React** on the front end.

```javascript

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
```



