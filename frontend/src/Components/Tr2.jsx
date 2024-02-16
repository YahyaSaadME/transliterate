import React, { useEffect, useState } from 'react'
import './Tr1.css'

export default function Tr2() {

    const [fname, setfname] = useState("")
    const [fnameL, setfnameL] = useState("")
    const [lname, setlname] = useState("")
    const [lnameL, setlnameL] = useState("")
    const [address, setaddress] = useState("")
    const [addressL, setaddressL] = useState("")
    const [mainArea, setmainArea] = useState("")
    const [mainAreaL, setmainAreaL] = useState("")

    const sendTrasliterate = async (lang, which, text, both) => {

        // socket.emit('transliterate', { lang, which, text, both });
    }

    const detectLanguage = async(text, which) => {
        if (text != "") {
            const req = await fetch("http://localhost:5000/a",{
                method:"GET",
                headers:{
                    'Content-Type':'application/json'
                },
                mode:"cors"
            })
            const res = await req.json()
            console.log(res);
            // socket.emit("detect_lang", { text, which })
        }
    }
    useEffect(() => {
        // socket.on("detect-lang-response", (data) => {
        //     if (data.result == "both") {
        //         sendTrasliterate('hi/ta', data.which, data.text, true)
        //     } else {
        //         sendTrasliterate(data.result, data.which, data.text, false)
        //     }
        // })
        // socket.on("transliterate-response", data => {
        //     if (data.which === "fname") {
        //         setfnameL(data)
        //     }
        //     else if (data.which == "lname") {
        //         setlnameL(data)
        //     }
        //     else if (data.which == "address") {
        //         setaddressL(data)
        //     }
        //     else if (data.which == "mainArea") {
        //         setmainAreaL(data)
        //     }
        // })
    }, [])
    // }, [socket])

    const save = (text, ctext) => {
        // socket.emit("save", { text, ctext })
    }


    return (
        <div>
            <center>
                <h1 style={{ marginTop: "8vh" }}>Bajaj Finserv Demo</h1>
            </center>
            <center style={{ marginTop: "1vh", width: "100%" }}>
                <div className='inpt-div'>
                    <input onKeyPress={e => e.key == "Enter" ? save(e.target.value, { outLang: fnameL.lang, out: fnameL.msg }) : null} onChange={e => { setfname(e.target.value); }} value={fname} type="text" className='inpt' placeholder='first name' />
                    <p>{fnameL.msg}</p>
                </div>
                <div className='inpt-div'>
                    <input onKeyPress={e => e.key == "Enter" ? save(e.target.value, { outLang: lnameL.lang, out: lnameL.msg }) : null} onChange={e => { setlname(e.target.value); }} value={lname} type="text" className='inpt' placeholder='last name' />
                    <p>{lnameL.msg}</p>
                </div>
                <div className='inpt-div'>
                    <input type="text" className='inpt' placeholder='PAN' />
                    <p></p>
                </div>
                <div className='inpt-div'>
                    <input type="date" className='inpt' placeholder='DD/MM/YYYY' />
                    <p></p>
                </div>
                <div className='inpt-div'>
                    <input type="number" className='inpt' placeholder='pin code' />
                    <p></p>
                </div>
                <div className='inpt-div' >
                    <input onKeyPress={e => e.key == "Enter" ? save(e.target.value, { outLang: addressL.lang, out: addressL.msg }) : null} onChange={e => { setaddress(e.target.value);}} value={address} type="text" className='inpt' placeholder='Enter city' />
                    <p>{addressL.msg}</p>
                </div>
                <div className='inpt-div' >
                    <textarea onKeyPress={e => e.key == "Enter" ? save(e.target.value, { outLang: mainArea.lang, out: mainArea.msg }) : null} onChange={e => { setmainArea(e.target.value);}} value={mainArea} type="text" className='inpt' placeholder='Enter your full address' ></textarea>
                    <p>{mainAreaL.msg}</p>
                </div>
                <div>
                </div>
            </center>

        </div>
    )
}
