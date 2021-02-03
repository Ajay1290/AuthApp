import os
from flask import Flask
from celery import Celery
from flask_login import current_user, login_required
from manager.models import Users
from manager.ext import csrf, db, login_manager, mail


CELERY_TASK_LIST = [
    'manager.apps.users.tasks'
]

os.environ.setdefault('FORKED_BY_MULTIPROCESSING', '1')


def create_celery_app(app=None):
    app = app or create_app()

    celery = Celery(app.import_name, 
                    backend=app.config['CELERY_RESULT_BACKEND'],
                    broker=app.config['CELERY_BROKER_URL'], 
                    include=CELERY_TASK_LIST)
    celery.conf.update(app.config)        


    class ContextTask(celery.Task):

        def __call__(self, *args, **kwargs):
            with app.app_context():
                return self.run(*args, **kwargs)


    celery.Task = ContextTask
    return celery



def create_app(config=None):

    app = Flask(__name__, instance_relative_config=True)

    app.config.from_object('config.DevConfig')

    if config:
        app.config.update(config)

    with app.app_context():
        extensions(app)
        register_apps(app)
        authentication(app, Users)

    return app

def extensions(app):    
    csrf.init_app(app)
    db.init_app(app)
    mail.init_app(app)
    login_manager.init_app(app)

    return None

def register_apps(app):
    from manager.apps import users
    app.register_blueprint(users)
    

    return None

def authentication(app, user_model):
    login_manager.login_view = 'users.login'

    @login_manager.user_loader
    def load_user(uid):
        return user_model.query.get(uid)