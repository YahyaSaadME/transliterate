from flask import Flask, request
from flask_socketio import SocketIO, join_room, send, emit
from google.transliteration import transliterate_text
from indictrans import Transliterator
from transliterate import translit
from googletrans import Translator
import json
import jwt


SECRET_KEY = 'skjdhasjkjlasljksaakba ihfyt6y&RTJcdytstry fvjc34657t'
USERS_FILE = 'data.json'
translator = Translator()

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="http://10.5.250.128:5173")

@socketio.on('connect')
def handle_connect():
    print(f"User connected: {request.sid}")

@socketio.on('message')
def message(data):
    print(data)

@socketio.on('join')
def handle_join(data):
    room = data.get('room')
    join_room(room)

@socketio.on('login')
def login(data):
    try:
        print(data)
        with open(USERS_FILE, 'r') as f:
            for loaded in json.load(f):
                if str(loaded['phone']) == str(data['phone']):
                    if loaded['password'] == data['password']:
                        token = jwt.encode(loaded, SECRET_KEY, algorithm='HS256')
                        socketio.emit("login-res", {"msg":"User logged in!","c":"rgb(111, 221, 56)","data":token},room=request.sid)
                    else:
                        socketio.emit("login-res", {"msg":"Phone No or Password is wrong!","c":"rgb(254, 92, 92)"},room=request.sid)
                else:
                    socketio.emit("login-res",{"msg":"User not found!","c":"rgb(254, 92, 92)"},room=request.sid)

    except Exception as e:
        print(e)

@socketio.on('singup')
def singup(data):
    try:
        print(data)
        with open(USERS_FILE, 'r') as f:
            for loaded in json.load(f):
                if str(loaded['phone']) != str(data['phone']):
                    with open(USERS_FILE, 'r') as file:
                        d = json.load(file)
                        d.append(data)
                        print(data)
                        with open(USERS_FILE, 'w') as file:
                            json.dump(d, file, indent=2)
                        token = jwt.encode(loaded, SECRET_KEY, algorithm='HS256')
                        socketio.emit("signup-res", {"msg":"User signed in!","c":"rgb(111, 221, 56)","data":token},room=request.sid)
                else:
                    socketio.emit("signup-res",{"msg":"User already found!","c":"rgb(254, 92, 92)"},room=request.sid)

    except Exception as e:
        print(e)

@socketio.on('check')
def check(data):
    try:
        decoded_data = jwt.decode(data, SECRET_KEY, algorithms=['HS256'])
        print(decoded_data)
        socketio.emit("check-res", {"data":decoded_data}, room=request.sid)

    except Exception as e:
        print(e)


@socketio.on('transliterate-from-english')
def transliterate_Eng(data):
    try:
        print(data['lang'])
        converted_text = transliterate_text(data['msg'], lang_code=data['lang'] )
        socketio.emit('transliterate-response', {'msg':converted_text,'lang':data['lang']}, room=request.sid)

    except Exception as e:
        print("e:",e)


@socketio.on('transliterate-from-x')
def transliterate_X(data):
    print(data)
    try:
        if data['outIn'] != True:
            trn = Transliterator(source=data['inlang'], target='eng')
            converted_text = trn.transform(data['msg'])
            socketio.emit('transliterate-response', {'msg':converted_text}, room=request.sid)
        else:
            converted_text = translit(data['msg'], data['inlang'], reversed=True)
            print("Transliterated to Russian:", converted_text)
            socketio.emit('transliterate-response', {'msg':converted_text}, room=request.sid)

    except Exception as e:
        print("e:",e)

@socketio.on('translate')
def translate(data):
    try:
        translation = translator.translate(str(data['msg']), src=data['inlang'], dest=data['outlang'])
        socketio.emit('translation-response', {'msg': translation.text}, room=request.sid)
    except Exception as e:
        print("e:",e)

@socketio.on("make-call")
def makeCall(data):
    try:
        print("d:",data)
        join_room(data['result'])
        socketio.emit('join-call', {"joined": True, "data": data})

    except Exception as e:
        print("e:",e)

@socketio.on("make-call-join")
def makeCallJoin(data):
    try:
        # print(data)
        join_room(data['result'])
        socketio.emit('joined-call', {"joined":True,"data":data},to=data['result'])

    except Exception as e:
        print("e:",e)

@socketio.on("convert")
def convert(data):
    # print(set(data))
    print(data)
    print(type(data))
    # socketio.emit("converted",set(data),room=request.sid)

if __name__ == '__main__':
    socketio.run(app, port=5000,host="10.5.250.128")
