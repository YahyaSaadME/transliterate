import React, { useContext, useEffect, useRef, useState } from 'react'
import '../App.css'
import 'regenerator-runtime/runtime';

// import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import io from 'socket.io-client';
const socket = io('http://localhost:5000');


export default function Home() {

    const languagesFromEng = [
        { 'as': 'Assamese' },
        { 'bn': 'Bengali' },
        { 'gu': 'Gujarati' },
        { 'hi': 'Hindi' },
        { 'kn': 'Kannada' },
        { 'ml': 'Malayalam' },
        { 'mr': 'Marathi' },
        { 'ne': 'Nepali' },
        { 'or': 'Oriya' },
        { 'pa': 'Punjabi' },
        { 'sa': 'Sanskrit' },
        { 'si': 'Sinhala' },
        { 'ta': 'Tamil' },
        { 'te': 'Telugu' },
        { 'be': 'Belarusian' },
        { 'bg': 'Bulgarian' },
        { 'ru': 'Russian' },
        { 'sr': 'Serbian' },
        { 'uk': 'Ukranian' },
        { 'ar': 'Arabic' },
        { 'fa': 'Persian' },
        { 'ur': 'Urdu' },
        { 'am': 'Amharic' },
        { 'el': 'Greek' },
        { 'he': 'Hebrew' },
        { 'ja': 'Japanese' },
        { 'th': 'Thai' },
        { 'ti': 'Tigrinya' },
        { 'zh': 'Simplified Chinese' },
        { 'zh-hant': 'Traditional Chinese' },
        { 'yue-hant': 'Yue' }
    ];
    const languagesFromX = [
        { "outInd": false, 'eng': 'Engish' },
        { "outInd": false, 'hin': 'Hindi' },
        { "outInd": false, 'ben': 'Bengali' },
        { "outInd": false, 'guj': 'Gujarati' },
        { "outInd": false, 'pan': 'Punjabi' },
        { "outInd": false, 'mal': 'Malayalam' },
        { "outInd": false, 'kan': 'Kannada' },
        { "outInd": false, 'tam': 'Tamil' },
        { "outInd": false, 'tel': 'Telugu' },
        { "outInd": false, 'ori': 'Oriya' },
        { "outInd": false, 'mar': 'Marathi' },
        { "outInd": false, 'asm': 'Assamese' },
        { "outInd": false, 'kok': 'Konkani' },
        { "outInd": false, 'bod': 'Bodo' },
        { "outInd": false, 'nep': 'Nepali' },
        { "outInd": false, 'urd': 'Urdu' },
        // Extra
        { 'outInd': true, 'bg': 'Bulgarian' },
        { 'outInd': true, 'el': 'Greek' },
        { 'outInd': true, 'hy': 'Armenian' },
        { 'outInd': true, 'ka': 'Georgian' },
        { 'outInd': true, 'mk': 'Macedonian' },
        { 'outInd': true, 'mn': 'Mongolian' },
        { 'outInd': true, 'ru': 'Russian' },
        { 'outInd': true, 'sr': 'Serbian' },
        { 'outInd': true, 'uk': 'Ukrainian' }
    ];
    const Traslatelanguages = [
        { 'af': 'afrikaans' },
        { 'sq': 'albanian' },
        { 'am': 'amharic' },
        { 'ar': 'arabic' },
        { 'hy': 'armenian' },
        { 'az': 'azerbaijani' },
        { 'eu': 'basque' },
        { 'be': 'belarusian' },
        { 'bn': 'bengali' },
        { 'bs': 'bosnian' },
        { 'bg': 'bulgarian' },
        { 'ca': 'catalan' },
        { 'ceb': 'cebuano' },
        { 'ny': 'chichewa' },
        { 'zh-cn': 'chinese (simplified)' },
        { 'zh-tw': 'chinese (traditional)' },
        { 'co': 'corsican' },
        { 'hr': 'croatian' },
        { 'cs': 'czech' },
        { 'da': 'danish' },
        { 'nl': 'dutch' },
        { 'en': 'english' },
        { 'eo': 'esperanto' },
        { 'et': 'estonian' },
        { 'tl': 'filipino' },
        { 'fi': 'finnish' },
        { 'fr': 'french' },
        { 'fy': 'frisian' },
        { 'gl': 'galician' },
        { 'ka': 'georgian' },
        { 'de': 'german' },
        { 'el': 'greek' },
        { 'gu': 'gujarati' },
        { 'ht': 'haitian creole' },
        { 'ha': 'hausa' },
        { 'haw': 'hawaiian' },
        { 'iw': 'hebrew' },
        { 'he': 'hebrew' },
        { 'hi': 'hindi' },
        { 'hmn': 'hmong' },
        { 'hu': 'hungarian' },
        { 'is': 'icelandic' },
        { 'ig': 'igbo' },
        { 'id': 'indonesian' },
        { 'ga': 'irish' },
        { 'it': 'italian' },
        { 'ja': 'japanese' },
        { 'jw': 'javanese' },
        { 'kn': 'kannada' },
        { 'kk': 'kazakh' },
        { 'km': 'khmer' },
        { 'ko': 'korean' },
        { 'ku': 'kurdish (kurmanji)' },
        { 'ky': 'kyrgyz' },
        { 'lo': 'lao' },
        { 'la': 'latin' },
        { 'lv': 'latvian' },
        { 'lt': 'lithuanian' },
        { 'lb': 'luxembourgish' },
        { 'mk': 'macedonian' },
        { 'mg': 'malagasy' },
        { 'ms': 'malay' },
        { 'ml': 'malayalam' },
        { 'mt': 'maltese' },
        { 'mi': 'maori' },
        { 'mr': 'marathi' },
        { 'mn': 'mongolian' },
        { 'my': 'myanmar (burmese)' },
        { 'ne': 'nepali' },
        { 'no': 'norwegian' },
        { 'or': 'odia' },
        { 'ps': 'pashto' },
        { 'fa': 'persian' },
        { 'pl': 'polish' },
        { 'pt': 'portuguese' },
        { 'pa': 'punjabi' },
        { 'ro': 'romanian' },
        { 'ru': 'russian' },
        { 'sm': 'samoan' },
        { 'gd': 'scots gaelic' },
        { 'sr': 'serbian' },
        { 'st': 'sesotho' },
        { 'sn': 'shona' },
        { 'sd': 'sindhi' },
        { 'si': 'sinhala' },
        { 'sk': 'slovak' },
        { 'sl': 'slovenian' },
        { 'so': 'somali' },
        { 'es': 'spanish' },
        { 'su': 'sundanese' },
        { 'sw': 'swahili' },
        { 'sv': 'swedish' },
        { 'tg': 'tajik' },
        { 'ta': 'tamil' },
        { 'te': 'telugu' },
        { 'th': 'thai' },
        { 'tr': 'turkish' },
        { 'uk': 'ukrainian' },
        { 'ur': 'urdu' },
        { 'ug': 'uyghur' },
        { 'uz': 'uzbek' },
        { 'vi': 'vietnamese' },
        { 'cy': 'welsh' },
        { 'xh': 'xhosa' },
        { 'yi': 'yiddish' },
        { 'yo': 'yoruba' },
        { 'zu': 'zulu' }
    ];



    const [inputLanguage, setInputLanguage] = useState('en');
    const [OutputLanguage, setOutputLanguage] = useState("en")
    const [mainOptions, setmainOptions] = useState("transliterate")
    const [showSideMenu, setshowSideMenu] = useState(false)
    const [msg, setmsg] = useState("")
    const [AllData, setAllData] = useState([])
    const [Alert, setAlert] = useState([false, ""])
    const [transcript, setTranscript] = useState('');
    const [language, setLanguage] = useState('');
    const inputLangRef = useRef(null);
    const recognition = new window.webkitSpeechRecognition(); // Initialize speech recognition


    // recognition.onend = () => {
    //     if(isListening){
    //         recognition.start();
    //     }
    // };

    recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
    };
    recognition.lang = language || navigator.language; // Set language

    
    useEffect(() => {
        const changeInWidth = () => {
            if (window.innerWidth < 1025) {
                setshowSideMenu(true)
            } else {
                setshowSideMenu(false)
            }
        }
        changeInWidth()
        window.addEventListener("resize", e => changeInWidth())
        setmsg(transcript)
    }, [transcript])


    const speakText = (data, lang) => {
        console.log(data);
        if (data !== "") {
            const speech = new SpeechSynthesisUtterance(data);
            speech.lang = lang;
            speech.rate = 1
            window.speechSynthesis.speak(speech);
        }
    };

    const sendTrasliterate = async (data) => {
        console.log(OutputLanguage);
        console.log(inputLanguage);
        if (OutputLanguage != "") {
            if (OutputLanguage != inputLanguage ) {
                if (inputLangRef == "en" || inputLangRef == "eng") {
                    socket.emit('transliterate-from-english', { msg: data ? data : msg, lang: OutputLanguage });
                }
                else {
                    socket.emit('transliterate-from-x', { msg, inlang: inputLanguage});
                }
                setAllData(bef => [...bef, { msg: msg, lang: inputLanguage, from: "UR" }])
            }
            else {
                setAlert([true, "Please select a output langauage."])
            }
        }
        else {
            setAlert([true, "You have selected same Languages or it has not selected"])
        }
    }

    const sendTraslate = async () => {
        if (OutputLanguage != "") {
            if (OutputLanguage != inputLanguage && OutputLanguage != "not") {
                socket.emit('translate', { msg, outlang: OutputLanguage, inlang: inputLanguage });
                setAllData(bef => [...bef, { msg: msg, lang: inputLanguage, from: "UR" }])
            }
            else {
                setAlert([true, "Please select a output langauage."])
            }
        }
        else {
            setAlert([true, "You have selected same Languages or it has not selected"])
        }
    }

    const detectLanguage = () => {
        socket.emit("detect_lang", msg)
    }
    useEffect(() => {
        detectLanguage()

    }, [msg])


    recognition.onresult = (event) => {
        const currentTranscript = event.results[0][0].transcript;
        console.log(currentTranscript);
        setTranscript(currentTranscript);
        sendTrasliterate(currentTranscript)
    };

    useEffect(() => {
        socket.on('transliterate-response', ({ msg, lang }) => {
            setAllData(bef => [...bef, { msg: msg, lang: lang, from: "CR" }])
        });
        socket.on('translation-response', ({ msg, lang }) => {
            setAllData(bef => [...bef, { msg: msg, lang: lang, from: "CR" }])
        });
        socket.on("detect-lang-response", (data) => {
            console.log(data.result);
            inputLangRef.current.value = data.result
            setInputLanguage(data.result)
        })
    }, [socket])


    return (
        <div>
            <div className='main' style={{ paddingLeft: "10px", paddingBottom: "100px" }}>
                <div className='main-nav'>
                    <select name="input" ref={inputLangRef} onChange={e => setInputLanguage(e.target.value)} value={inputLanguage} className='main-nav-select'>

                        <option value="en">English</option>
                        <option value="hi">Hindi</option>
                        <option value="ta">Tamil</option>
                        <option value="te">Telugu</option>

                    </select>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="balck" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8" />
                    </svg>
                    <select name="output" className='main-nav-select' onChange={e => setOutputLanguage(e.target.value)} value={OutputLanguage}>
                        <option value="eng">English</option>
                        <option value="hin">Hindi</option>
                        <option value="tam">Tamil</option>
                        <option value="tle">Telugu</option>
                    </select>
                    <select name="opt" onChange={e => setmainOptions(e.target.value)} value={mainOptions} className='main-nav-select'>
                        <option value="transliterate">transliterate</option>
                        <option value="translate">translate</option>
                        <option value="transribe">transribe</option>
                    </select>
                </div>

                {
                    <ul className='chat-ul'>{
                        AllData.map((e, i) => {
                            if (i % 2 != 0) {
                                if (e.from == "CR") {
                                    // console.log(e.lang + "-IN");

                                    return (
                                        <li className='chat-li-CR' key={i}>
                                            <div onClick={ele => { speakText(e.msg, e.lang) }}>
                                                <div className='chat-div'>{e.msg}</div>
                                                <div className='chat-div-subs'>
                                                    <svg className='chat-div-sub-svg' xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black" viewBox="0 0 16 16">
                                                        <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1z" />
                                                        <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0z" />
                                                    </svg>
                                                    <svg style={{ cursor: "pointer" }} className='chat-div-sub-svg' xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black" viewBox="0 0 16 16">
                                                        <path d="M13 2.5a1.5 1.5 0 0 1 3 0v11a1.5 1.5 0 0 1-3 0v-.214c-2.162-1.241-4.49-1.843-6.912-2.083l.405 2.712A1 1 0 0 1 5.51 15.1h-.548a1 1 0 0 1-.916-.599l-1.85-3.49-.202-.003A2.014 2.014 0 0 1 0 9V7a2.02 2.02 0 0 1 1.992-2.013 75 75 0 0 0 2.483-.075c3.043-.154 6.148-.849 8.525-2.199zm1 0v11a.5.5 0 0 0 1 0v-11a.5.5 0 0 0-1 0m-1 1.35c-2.344 1.205-5.209 1.842-8 2.033v4.233q.27.015.537.036c2.568.189 5.093.744 7.463 1.993zm-9 6.215v-4.13a95 95 0 0 1-1.992.052A1.02 1.02 0 0 0 1 7v2c0 .55.448 1.002 1.006 1.009A61 61 0 0 1 4 10.065m-.657.975 1.609 3.037.01.024h.548l-.002-.014-.443-2.966a68 68 0 0 0-1.722-.082z" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </li>
                                    )
                                }
                            }
                            if (e.from == "UR") {
                                return (
                                    <li className='chat-li-UR' key={i}>
                                        <div onClick={ele => { speakText(e.msg, e.lang) }}>
                                            <div className='chat-div'>{e.msg}</div>
                                            <div className='chat-div-subs'>
                                                <svg className='chat-div-sub-svg' xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black" viewBox="0 0 16 16">
                                                    <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1z" />
                                                    <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0z" />
                                                </svg>
                                                <svg style={{ cursor: "pointer" }} className='chat-div-sub-svg' xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black" viewBox="0 0 16 16">
                                                    <path d="M13 2.5a1.5 1.5 0 0 1 3 0v11a1.5 1.5 0 0 1-3 0v-.214c-2.162-1.241-4.49-1.843-6.912-2.083l.405 2.712A1 1 0 0 1 5.51 15.1h-.548a1 1 0 0 1-.916-.599l-1.85-3.49-.202-.003A2.014 2.014 0 0 1 0 9V7a2.02 2.02 0 0 1 1.992-2.013 75 75 0 0 0 2.483-.075c3.043-.154 6.148-.849 8.525-2.199zm1 0v11a.5.5 0 0 0 1 0v-11a.5.5 0 0 0-1 0m-1 1.35c-2.344 1.205-5.209 1.842-8 2.033v4.233q.27.015.537.036c2.568.189 5.093.744 7.463 1.993zm-9 6.215v-4.13a95 95 0 0 1-1.992.052A1.02 1.02 0 0 0 1 7v2c0 .55.448 1.002 1.006 1.009A61 61 0 0 1 4 10.065m-.657.975 1.609 3.037.01.024h.548l-.002-.014-.443-2.966a68 68 0 0 0-1.722-.082z" />
                                                </svg>
                                            </div>
                                        </div>
                                    </li>
                                )
                            }

                        })
                    }</ul>
                    // : <p style={{ marginTop: "5%", textAlign: "center" }}>No Data found</p>

                }


            </div>

            <div className='alert' style={{ display: Alert[0] ? null : "none" }} onClick={e => setAlert([false, ""])}>
                <div className='alert-in'>
                    {Alert[1]}
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" className="bi bi-x-circle-fill" viewBox="0 0 16 16">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z" />
                    </svg>
                </div>
            </div>

            <div className='footer'>
                <div className='footer-in'>
                    <div className='footer-in-mic' onClick={e => recognition.start()}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="balck" className="bi bi-mic" viewBox="0 0 16 16">
                            <path d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5" />
                            <path d="M10 8a2 2 0 1 1-4 0V3a2 2 0 1 1 4 0zM8 0a3 3 0 0 0-3 3v5a3 3 0 0 0 6 0V3a3 3 0 0 0-3-3" />
                        </svg>
                    </div>
                    <input onChange={e => setmsg(e.target.value)} value={msg} type="text" className='footer-send-inpt' placeholder='enter here...' />
                    <div className='footer-send-btn' onClick={e => msg !== "" ? mainOptions === "transliterate" ? sendTrasliterate() : mainOptions === "translate" ? sendTraslate() : null : null}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black" viewBox="0 0 16 16">
                            <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    )
}
