from flask import Flask, jsonify, request
import unicodedata
from googletrans import Translator
translator = Translator()
from google.transliteration import transliterate_text
app = Flask(__name__)
from ai4bharat.transliteration import XlitEngine

hi = XlitEngine("hi",)
ta = XlitEngine("ta")
def is_english_string(s):
    s_without_numbers = ''.join(char for char in s if not char.isdigit())
    for char in s_without_numbers:
        if not ('LATIN' in unicodedata.name(char, '').upper() or char.isspace()):
            return False
    return True

# @app.route("/",method)
@app.route('/transliterate_ai4b', methods=['POST'])
def transliterate_ai4b():
    data = request.get_json()
    print(data)
    try:
        if data['text'] != "":
            if (is_english_string(data['text'])):
                if data['outlang'] == "ta":
                    return jsonify({"msg":ta.translit_word(data['text'], topk=5),"outlang":"ta"})
                elif data['outlang'] == "hi":
                    return jsonify({"msg":hi.translit_word(data['text'], topk=5),"outlang":"hi"})
                else:
                    out1 = hi.translit_word(data['text'], topk=5)
                    out2 = ta.translit_word(data['text'], topk=5)
                    return jsonify({'msg': str(out1)+ " / "+ str(out2),"outlang":"hi/ta"})

            else:
                return jsonify({'msg':"reverse not available."})
    except Exception as e:
        print("e:", e)

@app.route('/transliterate_google', methods=['POST'])
def transliterate_google():
    data = request.get_json()
    try:
        if data['text'] != "":
            if (is_english_string(data['text'])):
                if data['outlang'] == "ta":
                    r = transliterate_text(data['text'], lang_code='ta')
                    print("r1:",r)
                    return jsonify({"msg":r,"outlang":"ta"})
                elif data['outlang'] == "hi":
                    r = transliterate_text(data['text'], lang_code='hi')
                    print("r2:",r)
                    return jsonify({"msg":r,"outlang":"hi"})
                else:
                    out1 = transliterate_text(data['text'], lang_code='hi')
                    out2 = transliterate_text(data['text'], lang_code='ta')
                    print("r3:")
                    return jsonify({'msg': str(out1)+ " / "+ str(out2),"outlang":"hi/ta"})

            else:
                return jsonify({'msg':"reverse not available."})
    except Exception as e:
        print("e:", e)

if __name__ == '__main__':
    app.run(port=5050)
