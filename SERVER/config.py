from datetime import timedelta
import json

class BaseConfig(object):
    DEBUG = False
    TESTING = False
    LOG_LEVEL = 'DEBUG'

    SQLALCHEMY_DATABASE_URI = 'mysql:///root:apku1290@localhost/db'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    
    MAIL_SERVER = 'smtp.gmail.com'
    MAIL_PORT = 465
    MAIL_USE_TLS = False
    MAIL_USE_SSL = True
    MAIL_USERNAME = 'ajay.patil.a01@gmail.com'
    MAIL_PASSWORD = 'apku1290'
    MAIL_DEFAULT_SENDER = MAIL_USERNAME


    SERVER_NAME = 'localhost:5000'
    SECRET_KEY = 'insecurekeyfordev'
    
    SEED_ADMIN_EMAIL = 'ajay.patil.a01@gmail.com'
    SEED_ADMIN_PASSWORD = 'apku1290'
    
    REMEMBER_COOKIE_DURATION = timedelta(days=90)

    # Celery.
    CELERY_BROKER_URL = 'redis://localhost:6379/0'
    CELERY_RESULT_BACKEND = CELERY_BROKER_URL
    CELERY_ACCEPT_CONTENT = ['json']
    CELERY_TASK_SERIALIZER = 'json'
    CELERY_RESULT_SERIALIZER = 'json'
    CELERY_REDIS_MAX_CONNECTIONS = 5

class DevConfig(BaseConfig):
    DEBUG = True
    TESTING = False
    SQLALCHEMY_DATABASE_URI = 'sqlite:///C:/Users/LENOVO/Desktop/Finpeg Server/site.db'

class ProdConfig(BaseConfig):
    DEBUG = False
    TESTING = True