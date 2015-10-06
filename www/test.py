__author__ = 'YiLIU'

import orm, asyncio, aiomysql, select
from models import User
import functools


def log(func):
    def wrapper(*args, **kw):
        print('call %s():' % func.__name__)
        return func(*args, **kw)
    return wrapper


@log
def test(loop):
    yield from www.orm.create_pool(loop=loop, port=3307, user='www-data',
                                   password='www-data',
                                  db='awesome')
    u = yield from User.findAll('email=?', ['glistenlau@gmail.com'])
    user = u[0]
    print(user.id)

loop = asyncio.get_event_loop()
loop.run_until_complete(test(loop))
loop.close()
