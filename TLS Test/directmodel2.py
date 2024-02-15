from ai4bharat.transliteration import XlitEngine
e = XlitEngine("hi", beam_width=10, rescore=True)
out = e.translit_word("namasthe", topk=5)
print(out)