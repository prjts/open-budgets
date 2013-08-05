from openbudget.settings.base import *


######################################################################
##                                                                  ##
## RENAME THIS FILE TO local.py to provide your own local overrides ##
##                                                                  ##
######################################################################

#EMAIL_HOST_USER = ''

#EMAIL_HOST_PASSWORD = ''

#ADMINS = (
#    ('', ''),
#)

# Uncomment MIDDLEWARE_CLASSES, INSTALLED_APPS, INTERNAL_IPS, and
# DEBUG_TOOLBAR_CONFIG for debugging tools.
#
#MIDDLEWARE_CLASSES += (
#    'debug_toolbar.middleware.DebugToolbarMiddleware',
#    'django_pdb.middleware.PdbMiddleware',
#)
#
#INSTALLED_APPS += (
#    'debug_toolbar',
#    'django_pdb',
#)
#
#INTERNAL_IPS = ('127.0.0.1',)
#
#DEBUG_TOOLBAR_CONFIG = {
#    'INTERCEPT_REDIRECTS': False,
#}

# Uncomment to use Postgresql in development.
# You'll also need some extra dependencies:
# pip install -r requirements/deploy.txt
#DATABASES = {
#    'default': {
#        'ENGINE': 'django.db.backends.postgresql_psycopg2',
#        'NAME': '',
#        'USER': '',
#        'PASSWORD': '',
#        'HOST': '',
#        'PORT': '',
#    }
#}

# Uncomment to enable caching during development
#CACHES = {
#    'default': {
#        'BACKEND': 'redis_cache.RedisCache',
#        'LOCATION': REDIS['HOST'] + ':' + str(REDIS['PORT']),
#        'OPTIONS': {
#            'DB': REDIS['DB'],
#            'PARSER_CLASS': 'redis.connection.HiredisParser'
#        },
#    },
#}