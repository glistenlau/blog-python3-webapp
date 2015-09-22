__author__ = 'YiLIU'

import www.orm, asyncio, aiomysql
from www.models import User


def test(loop):
    yield from www.orm.create_pool(loop=loop, user='www-data',
                                   password='www-data',
                                  db='awesome')
    u = User(name='Test', email='test@example.com', passwd='1234567890',
             image='about:blank')

    yield from u.save()

loop = asyncio.get_event_loop()
loop.run_until_complete(test(loop))
loop.close()
