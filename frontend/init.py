import os
import subprocess
from subprocess import Popen, PIPE
from subprocess import check_output
from flask import Flask, render_template, request, session, url_for
from werkzeug.utils import redirect
from datetime import date
import requests
import api_requests
import hashlib
import base64
import json

import api_requests

app = Flask(__name__, template_folder='template')
app.config['SESSION_TYPE'] = 'filesystem1'
app.config['SECRET_KEY'] = '56565666565656665656566656'
app.config['KEY'] = 'Gj78jtgt&dashboardHnbhgd47'
app.config["SESSION_PERMANENT"] = True


@app.route('/',methods=['GET','POST'])

def index():
    if session.get("auth_data"):
        del session["auth_data"]
    error = ''
    auth_data = {}
    username = request.form.get('username')
    password = request.form.get('password')
    print(username)
    print(password)

    # ip = request.remote_addr
    if username and password:
        # print("hellpo")
        session["username"]=username

        # password = hashlib.md5(password.encode('utf-8')).hexdigest()
        response = api_requests.authorization({'username': username, 'password': password })
        print(response.get('response'))
        if response.get('response') in ['Login Unsuccesful', 'All inputs are required'] or 'forbidden' in response.get('response'):
            error = response.get('response')
        else:
            auth_data = response.get('response')
            print(response)
            session["auth_data"] = auth_data
            session["token"] = 'Bearer654566512 '
            session["username"]=username.capitalize()
            session['result']=response.get('result')  
            # session['bussiness_name']=response.get('bussiness_name')    

            return redirect(url_for("dashboard"))
    return render_template('login.html',error=error, auth_data= auth_data, session=session)

@app.route('/signup',methods=['GET','POST'])
def signup():   

    return render_template('signup.html')

@app.route('/forget')
def forget():
    return render_template('forget.html')


@app.route('/navSub')
def navSub():
    return render_template('navSub.html')

@app.route('/dashboard')
def dashboard():
    return render_template('dashboard.html')

@app.route('/invoice')
def invoice():
    rep_data=api_requests.invoice({'username':session.get('username')}).get('response')

    return render_template('invoice.html',rep_data=rep_data,session=session)

@app.route('/creditNote')
def creditNote():
    rep_data=api_requests.credit({'username':session.get('username')}).get('response')

    return render_template('credit_notes.html',rep_data=rep_data,session=session)

@app.route('/client')
def client():
    return render_template('client.html')

@app.route('/yourClient')
def yourClien():
    rep_data=api_requests.client({'username':session.get('username')}).get('response')
    return render_template('yourClient.html',rep_data=rep_data,session=session)

@app.route('/profileCreate')
def profileCreate():
    # rep_data=api_requests.image_path({'username':session.get('username')}).get('response')
    
    return render_template('profileCreate.html')

@app.route('/createInvoice')
def createInvoice():
    invoice_no = api_requests.user_data({'username':session.get('username')}).get('response')
    client=api_requests.client({'username':session.get('username')}).get('response')
    detail=api_requests.details({'username':session.get('username')}).get('response')
    # invoice_data=api_requests.details({'username':session.get('username')}).get('response')
    print("create_______invoice")
    return render_template('createInvoice.html' , invoice_no=invoice_no ,client=client,detail=detail, session=session)

@app.route('/credit')
def credit():
    invoice_no = api_requests.user_data({'username':session.get('username')}).get('response')
    client=api_requests.client({'username':session.get('username')}).get('response')
    detail=api_requests.details({'username':session.get('username')}).get('response')
    return render_template('credit.html', invoice_no=invoice_no ,client=client,detail=detail, session=session)

@app.route('/template')
def template():
    return render_template('./invoiceTemplate/template.html')

@app.route('/template1')
def template1():
    return render_template('./invoiceTemplate/template1.html')

@app.route('/template2')
def template2():
    return render_template('./invoiceTemplate/template2.html')

@app.route('/template3')
def template3():
    return render_template('./invoiceTemplate/template3.html')

@app.route('/creditTemplate')
def creditTemplate():
    return render_template('./creditTemplate/creditTemplate.html')
@app.route('/creditTemplate1')
def creditTemplate1():
    return render_template('./creditTemplate/creditTemplate1.html')
@app.route('/creditTemplate2')
def creditTemplate2():
    return render_template('./creditTemplate/creditTemplate2.html')
@app.route('/creditTemplate3')
def creditTemplate3():
    return render_template('./creditTemplate/creditTemplate3.html')


# @app.route('/sidebar')
# def sidebar():
#     return render_template('sidebar.html')


if __name__ == '__main__':
     # app.run(debug=True, host="0.0.0.0", port="80", threaded=True)
    app.run(debug=True, port="8080", threaded=True)