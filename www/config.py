#!/usr/bin/env python3
# -*- coding: utf-8 -*-

'''
Configuration
'''

__author__ = 'YiLIU'

import www.config_default


class Dict(dict):
    '''
    Simple dict but support access as x.y style.
    '''

    def __init__(self, names=(), values=(), **kw):
        super(Dict, self).__init__(**kw)
        for k, v in zip(names, values):
            self[k] = v

    def __getattr__(self, key):
        try:
            return self[key]
        except KeyError:
            raise AttributeError(r"'Dict' object has no attribute '%s'" % key)

    def __setattr__(self, key, value):
        self[key] = value

    def merge(self, defaults, override):
        r = {}
        for k, v in defaults.items():
            if k in override:
                if isinstance(v, dict):
                    r[k] = self.merge(v, override[k])
                else:
                    r[k] = override[k]
            else:
                r[k] = v
        return r

    def toDict(self, d):
        D = Dict()
        for k, v in d.items():
            D[k] = self.toDict(v) if isinstance(v, dict) else v
        return D


configs = Dict().toDict(www.config_default.configs)


# try:
#     import www.config_override
#     configs = Dict.merge(configs, www.config_override.configs)
# except ImportError:
#     pass

# configs = self.toDict(configs)
