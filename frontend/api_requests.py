from datetime import timedelta, date
import requests
import urllib
import json
import time

local_url="http://localhost:8080/api/v1/"

def authorization(form_data):
    url = '{}login'.format(local_url)
    # print(url)
    response = requests.post(url, form_data)
    # print(response.text)
    data = json.loads(response.text)
    return data

def invoice(form_data={}):
    try:
        params = urllib.parse.urlencode(form_data)
        url = '{}invoice?{}'.format(local_url, params)
        response = requests.get(url)
        data = json.loads(response.text)
        return data
    except:
        return {}
    
def file_path(form_data):
    url = '{}file_path'.format(local_url)
    # print(url)
    response = requests.post(url, form_data)
    # print(response.text)
    data = json.loads(response.text)
    return data


def details(form_data={}):
    try:
        params = urllib.parse.urlencode(form_data)
        url = '{}details?{}'.format(local_url, params)
        # print(url)
        response = requests.get(url)
        data = json.loads(response.text)
        return data
    except:
        return {}
    
def client(form_data):
    try:
        params = urllib.parse.urlencode(form_data)
        url = '{}client?{}'.format(local_url, params)
        print("aniket",url)
        response = requests.get(url)
        data = json.loads(response.text)
        return data
    except:
        return {}

def credit(form_data={}):
    try:
        params = urllib.parse.urlencode(form_data)
        url = '{}credit?{}'.format(local_url, params)
        print("aniket111111",url)
        response = requests.get(url)
        data = json.loads(response.text)
        return data
    except:
        return {}
    
def userdata(headers={}, form_data={}):
    try:
        params = urllib.parse.urlencode(form_data)
        url = '{}userdata?{}'.format(local_url, params)
        print("aniket111111",url)
        response = requests.get(url, headers=headers)
        data = json.loads(response.text)
        return data
    except:
        return {}


def user_data(form_data={}):
    try:
        params = urllib.parse.urlencode(form_data)
        url = '{}invoice_no?{}'.format(local_url, params)
        response = requests.get(url)
        data = json.loads(response.text)
        return data
    except:
        return {}
    
# def get_invoice(form_data={}):
#     try:
#         params = urllib.parse.urlencode(form_data)
#         url = '{}get_invoice?{}'.format(local_url, params)
#         response = requests.get(url)
#         data = json.loads(response.text)
#         print("data",data)
#         return data
#     except:
#         return {}