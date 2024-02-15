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

@app.route("/",methods=['GET'])
def Home():

    return '''
        <!DOCTYPE html>
<html lang='en'>

<head>
    <meta charset='UTF-8'>
    <meta name='viewport' content='width=device-width, initial-scale=1.0'>
    <title>Bajaj Finserv transliteration Auto</title>
</head>

<body>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Lexend:wght@100;200;300;400;500;600;700;800;900&display=swap');

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Lexend', sans-serif;

        }

        .main {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            height: 90vh;
        }

        .txt-li {
            background-color: white;
            color: black;
            font-size: 16px;
            padding: 4px 12px 4px 12px;
            border-radius: 5px;
            margin: 2px;
            list-style: none;
            cursor: pointer;
            box-shadow: 0px 0px 6px -2px black;
            border: .5px solid black;
        }

        .txt-ul {
            display: flex;
            justify-content: space-between;
            margin-top: 10px;
        }

        #txt {
            font-size: 16px;
            box-shadow: 0px 0px 6px -2px black;
            border-radius: 5px;
            padding: 10px;
            
        }
        @media (max-width:670px) {
            #txt {
            font-size: 16px;
            box-shadow: 0px 0px 6px -2px black;
            border-radius: 5px;
            padding: 10px;
            width: 70vw;
        }
        .txt-li {
            background-color: white;
            color: black;
            font-size: 14px;
            padding: 4px 12px 4px 12px;
            border-radius: 5px;
            margin: 2px;
            list-style: none;
            cursor: pointer;
            box-shadow: 0px 0px 6px -2px black;
            border: .5px solid black;
        }
        }
    </style>
    <div class='main'>
    <center>
    <h1 style="margin-bottom: 20px;">Bajaj Finserv transliteration Auto ✨</h1>
        </center>
        <textarea id='txt' cols='50' rows='10'></textarea>
                <p style="font-size: 14px; margin-top: 10px;color: gray;">suggestions</p>
        <ul class='txt-ul' id='main-ul'>
            
        </ul>
    </div>

</body>
<script>
function removeNonEnglishCharacters(inputString) {
    // Match any character that is not in the range of English letters
    var regex = /[^a-zA-Z0-9\s]/g;
    return inputString.replace(regex, "");
}

    document.getElementById('txt').addEventListener('input', async(e) => {
            const text = removeNonEnglishCharacters(document.getElementById('txt').value)
            console.log(text)
            const req = await fetch("/transliterate_ai4b",{
                method:"POST",
                headers:{
                'Content-Type':'application/json'
                },
                body:JSON.stringify({text})
            })
            const res = await req.json()
            console.log(res)
            console.log(res.msg)
            console.log(res.outlang)
            document.getElementById("main-ul").innerHTML = ""
            if(res.outlang == "ta"){
            res.msg.ta.map((e,i)=>{
                document.getElementById("main-ul").innerHTML += `<li onclick='addtxt("${e}","${res.intext}")' class='txt-li'>${e}</li>`
            })
            }
            if(res.outlang == "hi"){
            res.msg.hi.map((e,i)=>{
                document.getElementById("main-ul").innerHTML += `<li onclick='addtxt("${e}","${res.intext}")' class='txt-li'>${e}</li>`
            })
            }
             
      
    })
    function addtxt(e,intext) {
        console.log(e);
        document.getElementById('txt').value = document.getElementById('txt').value.replace(intext,e)
    }
</script>

</html>
    '''
@app.route('/transliterate_ai4b', methods=['POST'])
def transliterate_ai4b():
    data = request.json
    print("data:",data)
    try:
        if data['text'] != "":
            result = translator.detect(data['text'])
            print("lang:", result.lang)

            if result.lang in ['ta','hi']:
                if (is_english_string(data['text'])):
                    if result.lang == "ta":
                        return jsonify({"msg":ta.translit_word(data['text'], topk=5),"outlang":"ta","intext":data['text']})
                    elif result.lang == "hi":
                        return jsonify({"msg":hi.translit_word(data['text'], topk=5),"outlang":"hi","intext":data['text']})
                    else:
                        out1 = hi.translit_word(data['text'], topk=5)
                        out2 = ta.translit_word(data['text'], topk=5)
                        return jsonify({'msg': str(out1)+ " / "+ str(out2),"outlang":"hi/ta","intext":data['text']})

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
