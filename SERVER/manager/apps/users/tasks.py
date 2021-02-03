from manager.libs.mail import send_email
from manager import create_celery_app
from manager.models import Users
from manager import db
import time

celery = create_celery_app()

@celery.task(base=celery.Task, max_retries=1)
def expire_old_otp(user_id):
	user = Users.query.get(user_id)
	if user:
		user.otp = None
		db.session.commit()
		return True

	return False


@celery.task(base=celery.Task, max_retries=3)
def send_otp_on_email(user_id, otp):
    user = Users.query.get(user_id)
    if user:
	    ctx = {'username': user.username, 'otp': otp}
	    send_email(subject='Authenticate Yourself with OTP (One-Time-Password)',
				   to=[user.email],
				   template='otp_for_auth.html', ctx=ctx)
	    return True

    return False


