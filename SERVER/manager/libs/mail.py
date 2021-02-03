from flask_mail import Message
from manager.ext import mail
from flask import render_template

def send_email(to, subject, template, **kwargs):
    html = render_template(template, **kwargs)

    msg = Message(  subject,
                    recipients=to,
                    html=html,
                    sender= 'no-reply@finpeg.com')
    mail.send(msg)