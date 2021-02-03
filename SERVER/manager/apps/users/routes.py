from flask import request
from flask_login import login_required

from manager.models import Users
from manager.ext import csrf, db

from manager.apps.users.utils import responsify
from manager.apps.users import users

csrf.exempt(users)

@users.route("/users", methods=['GET'])
def all_users():
    users = Users.query.all()
    data = {
        'count': len(users),
        'users': []
    }
    for user in users:
        udata = {
            'status': True,
            'id': user.id,
            'info':{
                'username':user.username,
                'phone' : user.phone, 
                'email' : user.email,
            },
            'meta':{
                'phone_confirmed' : user.phone_confirmed, 
                'email_confirmed' : user.email_confirmed, 
                'active' : user.active,
                'otp': user.otp
            },
            'tracking':{
                'sign_in_count' : user.sign_in_count, 
                'current_sign_in_on' : user.current_sign_in_on, 
                'current_sign_in_ip' : user.current_sign_in_ip, 
                'last_sign_in_on' : user.last_sign_in_on, 
                'last_sign_in_ip' : user.last_sign_in_ip
            }
        }
        data['users'].append(udata)
    
    return responsify(data)




@users.route("/user/<user_id>", methods=['GET'])
def user(user_id):
    user = Users.query.get(user_id)
    if user:
        data = {
            'status': True,
            'id': user.id,
            'info':{
                'username':user.username,
                'phone' : user.phone, 
                'email' : user.email,
            },
            'meta':{
                'phone_confirmed' : user.phone_confirmed, 
                'email_confirmed' : user.email_confirmed, 
                'active' : user.active,
                'otp': user.otp
            },
            'tracking':{
                'sign_in_count' : user.sign_in_count, 
                'current_sign_in_on' : user.current_sign_in_on, 
                'current_sign_in_ip' : user.current_sign_in_ip, 
                'last_sign_in_on' : user.last_sign_in_on, 
                'last_sign_in_ip' : user.last_sign_in_ip
            }
        }
    else:
        data = {
            'status': False,
            'msg': "No user found"
        }
    
    return responsify(data)



@users.route("/login", methods=['POST'])
def login():
    if request.method == "POST":
        user = Users.find_by_identity(request.args.get('email'))
        if user:
            if user.authenticated(password=request.args.get('password')):
                user.update_activity_tracking(request.remote_addr)
                return responsify({ 'status': True, 'msg': "Login Successfull", 'user_id':user.id })
            else:
                return responsify({ 'status': False, 'msg':'Email or password is incorrect.'})
        else:
            return responsify({ 'status': False, 'msg':'No account found with this email address.'})

@users.route("/register", methods=['POST'])
def register():
    if request.method == 'POST':
        user = Users.find_by_identity(request.args.get('email'))
        if not user:
            try:
                user = Users(username=request.args.get('username'),
                            email=request.args.get('email'),
                            password=request.args.get('password'),
                            phone=request.args.get('phone'))
                db.session.add(user)
                db.session.commit()
                return responsify({ 'status': True, 'msg': "Registration Successfull!" })
            except Exception as e:
                return responsify({ 'status': False, 'msg': f"Registration Unsuccessfull!" })
        else:
            return responsify({ 'status': False, 'msg': "User already exist please try again with unique email." })


@users.route("/genrate-otp", methods=['GET'])
def genrate_otp():
    user = Users.find_by_identity(request.args.get('email'))
    if user:
        if user.otp:
            return responsify({ 'status': True, 'msg': "OTP is already genrated please check your email." })
        else:
            otp = user.genrate_otp(digit=4)
            if otp:
                user.otp = otp
                db.session.commit()
                db.session.refresh(user)

                from manager.apps.users.tasks import (send_otp_on_email, expire_old_otp)
                send_otp_on_email.delay(user.id, otp)
                expire_old_otp.apply_async((user.id,), countdown=120 )

                return responsify({ 'status': True, 'msg': "OTP genrated successfully" })
            else:
                return responsify({ 'status': False, 'msg': "OTP genration Unsuccessfull Please Try again!" })

    else:
        return responsify({ 'status': False, 'msg': "User not found." })


@users.route("/verify-otp", methods=['POST'])
def verify_otp():
    otp = request.args.get('otp')
    user = Users.find_by_identity(request.args.get('email'))
    if user:
        if user.verify_otp(otp):
            user.otp = None
            db.session.commit()
            return responsify({ 'status': True, 'msg': "Verification Successfull", 'user_id':user.id })
        else:
            return responsify({ 'status': False, 'msg': "Incorrect OTP" })
    else:
        return responsify({ 'status': False, 'msg': "No user found." })

