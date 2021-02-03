from flask import jsonify, make_response

def responsify(data):
    response = make_response( jsonify(data), 401,)
    response.headers["Content-Type"] = "application/json"
    return response
