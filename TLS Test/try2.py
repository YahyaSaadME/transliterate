from flask import Flask, request
from flask_socketio import SocketIO, join_room, send, emit
from indictrans import Transliterator
from googletrans import Translator
import json
import unicodedata

SECRET_KEY = 'skjdhasjkjlasljksaakba ihfyt6y&RTJcdytstry fvjc34657t'
USERS_FILE = 'data.json'
translator = Translator()

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="http://localhost:5173")

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


langs = {'hi':'hin','ta':'tam','en':'eng'}
def is_english_string(s):
    s_without_numbers = ''.join(char for char in s if not char.isdigit())
    for char in s_without_numbers:
        if not ('LATIN' in unicodedata.name(char, '').upper() or char.isspace()):
            return False
    return True


def both(data):
    trn1 = Transliterator(source='eng', target='tam', build_lookup=True)
    trn2 = Transliterator(source='eng', target='hin', build_lookup=True)
    converted_text1 = trn1.transform(data['text'])
    converted_text2 = trn2.transform(data['text'])
    socketio.emit('transliterate-response',
                  {'msg': converted_text1 + " / " + converted_text2, 'lang': data['lang'], "which": data['which']},
                  room=request.sid)


@socketio.on('transliterate')
def transliterate_Eng(data):
    print("me:",data)
    try:
        print(data['lang'])
        if(data['both'] != True):
            mylang = langs[data['lang']]
            if(is_english_string(data['text'])):
                if(mylang != "eng"):
                    trn = Transliterator(source='eng', target=mylang, build_lookup=True)
                else:
                    both(data)
            else:
                trn = Transliterator(source=mylang, target='eng', build_lookup=True)

            converted_text = trn.transform(data['text'])
            socketio.emit('transliterate-response', {'msg':converted_text,'lang':data['lang'],"which":data['which']}, room=request.sid)
        else:
            both(data)

    except Exception as e:
        print("ele:",e)



@socketio.on('detect_lang')
def detect_lang(data):
    try:
        if data['text'] != "":
            result = translator.detect(data['text'])
            print(result)
            if result.lang in langs and result.lang != 'en':
                socketio.emit('detect-lang-response', {"result":result.lang,"which":data['which'],"text":data['text']}, room=request.sid)
            else:
                socketio.emit('detect-lang-response',
                              {"result":'both',"which":data['which'],"text":data['text']}, room=request.sid)
    except Exception as e:
        print("e:",e)

@socketio.on('save')
def save(data):
    try:
        with open('transliterate.json') as file:
            d = json.load(file)
            d.append(data)
            print(d)
            with open("transliterate.json", 'w') as f:
                json.dump(d, f, indent=2)
    except Exception as e:
        print(e)


if __name__ == '__main__':
    socketio.run(app, port=5000)
