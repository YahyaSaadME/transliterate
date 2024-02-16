from ai4bharat.transliteration import XlitEngine
ta = XlitEngine("ta")
hi = XlitEngine("hi")
while True:
    s = input("choose ta | hi :")
    text = input("enter text to convert:")
    if s == "ta":
        out = ta.translit_word(text, topk=5)
        print(out)
    elif s == "hi":
        out = hi.translit_word(text, topk=5)
        print(out)