__author__ = 'YiLIU'

import www.orm, asyncio, aiomysql
from www.models import User
import functools


def log(func):
    def wrapper(*args, **kw):
        print('call %s():' % func.__name__)
        return func(*args, **kw)
    return wrapper


@log
def test(loop):
    yield from www.orm.create_pool(loop=loop, user='www-data',
                                   password='www-data',
                                  db='awesome')
    u = User(name='Test', email='test@example.com', passwd='1234567890',
             image='about:blank')

    yield from u.save()
print(test.__name__)

