    var
        ID = '{{ id }}',
        action = '{{ action }}';
    function initVM(blog) {
        var vm = new Vue({
            el: '#vm',
            data: blog,
            method: {
                submit: function(event) {
                    event.preventDefault();
                    var $form = $('vm').find('form');
                    $form.postJSON(action, this.$data, function(err, r) {
                        if (err) {
                            $form.showFormError(err);
                        } else {
                            return location.assign('/api/blogs/' + r.id);
                        }
                    });
                }
            }
        });
        $('#vm').show();
    }
    $(function() {
        if(ID) {
            getJSON('/api/blogs/' + ID, function(err, blog) {
                if(err) {
                    return fatal(err)
                }
                $('#loading'.hide());
                initVM(blog);
            });
        } else {
            $('#loading').hide();
            initVM({
                name: '',
                summary: '',
                content: ''
            });
        }
    });