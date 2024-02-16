from indictrans import Transliterator
import unicodedata


langs = {'hi':'hin','ta':'tam','en':'eng'}
def is_english_string(s):
    s_without_numbers = ''.join(char for char in s if not char.isdigit())
    for char in s_without_numbers:
        if not ('LATIN' in unicodedata.name(char, '').upper() or char.isspace()):
            return False
    return True

data = {'lang': input("enter language code tam / hin / both:"), 'text': input("enter message:")}
try:
    print(data['lang'])
    if (data['lang'] != "both"):
        if (is_english_string(data['text'])):
            if (data['lang'] != "eng"):
                trn = Transliterator(source='eng', target=data['lang'], build_lookup=True)
            else:
                trn = Transliterator(source='eng', target='hin', build_lookup=True)
        else:
            trn = Transliterator(source=data['lang'], target='eng', build_lookup=True)

        converted_text = trn.transform(data['text'])
        print(converted_text)
    else:

        trn1 = Transliterator(source='eng', target='tam', build_lookup=True)
        trn2 = Transliterator(source='eng', target='hin', build_lookup=True)
        converted_text1 = trn1.transform(data['text'])
        converted_text2 = trn2.transform(data['text'])
        print(converted_text1 + " / " + converted_text2)


except Exception as e:
    print("ele:", e)