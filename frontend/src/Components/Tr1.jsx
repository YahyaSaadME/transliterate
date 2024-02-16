// import React, { useEffect, useState } from 'react'
// import './Tr1.css'
// import 'regenerator-runtime/runtime';
// import io from 'socket.io-client';
// const socket = io('http://localhost:5000');
// import VanillaTilt from 'vanilla-tilt';


// export default function Tr1() {

//     const [fname, setfname] = useState("")
//     const [fnameL, setfnameL] = useState("")
//     const [lname, setlname] = useState("")
//     const [lnameL, setlnameL] = useState("")
//     const [address, setaddress] = useState("")
//     const [addressL, setaddressL] = useState("")
//     const [mainArea, setmainArea] = useState("")
//     const [mainAreaL, setmainAreaL] = useState("")
//     const [openAlert, setopenAlert] = useState(true)
//     const sendTrasliterate = async (lang, which, text, both, save) => {
//         socket.emit('transliterate', { lang, which, text, both, save });
//     }

//     const detectLanguage = (text, which, save) => {
//         if (text != "") {
//             socket.emit("detect_lang", { text, which, save })
//         }
//     }

//     useEffect(() => {
//         socket.on("detect-lang-response", (data) => {
//             if (data.result == "both") {
//                 sendTrasliterate('hi/ta', data.which, data.text, true, data.save)
//             } else {
//                 sendTrasliterate(data.result, data.which, data.text, false, data.save)
//             }
//         })
//         socket.on("transliterate-response", data => {
//             if (data.which === "fname") {
//                 setfnameL(data)
//             }
//             else if (data.which == "lname") {
//                 setlnameL(data)
//             }
//             else if (data.which == "address") {
//                 setaddressL(data)
//             }
//             else if (data.which == "mainArea") {
//                 setmainAreaL(data)
//             }

//         })
//     }, [socket])

//     const save = (text, which) => {
//         detectLanguage(text, which, true)
//     }

//     useEffect(() => {
//         VanillaTilt.init(document.querySelectorAll('.alert-card'), {
//             max: 25,
//             speed: 400,
//             glare: true,
//             "max-glare": 1,
//         });
//     }, []);




//     return (
//         <div>
//             <center>
//                 <h1 style={{ marginTop: "8vh" }}>Bajaj Finserv Demo</h1>
//             </center>
//             <center style={{ marginTop: "1vh", width: "100%" }}>
//                 <div className='inpt-div'>
//                     <input onKeyPress={e => { e.key == "Enter" ? save(e.target.value, "fname") : null }} onChange={e => { setfname(e.target.value); e.target.value.length % 4 == 0 ? detectLanguage(e.target.value, "fname", false) : null }} value={fname} type="text" className='inpt' placeholder='first name' />
//                     <p>{fnameL.msg}</p>
//                 </div>
//                 <div className='inpt-div'>
//                     <input onKeyPress={e => e.key == "Enter" ? save(e.target.value, "lname"): null} onChange={e => { setlname(e.target.value); e.target.value.length % 4 == 0 ? detectLanguage(e.target.value, "lname", false) : null }} value={lname} type="text" className='inpt' placeholder='last name' />
//                     <p>{lnameL.msg}</p>
//                 </div>
//                 <div className='inpt-div'>
//                     <input type="text" className='inpt' placeholder='PAN' />
//                     <p></p>
//                 </div>
//                 <div className='inpt-div'>
//                     <input type="date" className='inpt' placeholder='DD/MM/YYYY' />
//                     <p></p>
//                 </div>
//                 <div className='inpt-div'>
//                     <input type="number" className='inpt' placeholder='pin code' />
//                     <p></p>
//                 </div>
//                 <div className='inpt-div' >
//                     <input onKeyPress={e => e.key == "Enter" ? save(e.target.value, "address"): null} onChange={e => { setaddress(e.target.value); e.target.value.length % 3 == 0 ? detectLanguage(e.target.value, "address", false) : null }} value={address} type="text" className='inpt' placeholder='Enter city' />
//                     <p>{addressL.msg}</p>
//                 </div>
//                 <div className='inpt-div' >
//                     <textarea onKeyPress={e => e.key == "Enter" ? save(e.target.value, "mainArea") : null} onChange={e => { setmainArea(e.target.value); e.target.value.length % 3 == 0 ? detectLanguage(e.target.value, "mainArea", false) : null }} value={mainArea} type="text" className='inpt' placeholder='Enter your full address' ></textarea>
//                     <p>{mainAreaL.msg}</p>
//                 </div>
//                 <div>
//                 </div>
//             </center>
//             <div className='alert-main' style={{ display: openAlert ? null : "none" }}>
//                 <div className="alert-container">
//                     <div className="alert-card" onClick={e => setopenAlert(!openAlert)}>
//                         <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="alert-bi"
//                             viewBox="0 0 16 20">
//                             <path
//                                 d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
//                         </svg>
//                         <div className="alert-content">
//                             <h2>Info</h2>
//                             <h3 style={{ marginTop: -20 }}>Virtual Keyboard</h3>
//                             <p>
//                                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-microsoft" viewBox="0 0 16 16">
//                                     <path d="M7.462 0H0v7.19h7.462zM16 0H8.538v7.19H16zM7.462 8.211H0V16h7.462zm8.538 0H8.538V16H16z" />
//                                 </svg> + ctrl + o in windows
//                                 <br />
//                                 <span style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", margin: 5 }}>
//                                     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-globe" viewBox="0 0 16 16">
//                                         <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m7.5-6.923c-.67.204-1.335.82-1.887 1.855A8 8 0 0 0 5.145 4H7.5zM4.09 4a9.3 9.3 0 0 1 .64-1.539 7 7 0 0 1 .597-.933A7.03 7.03 0 0 0 2.255 4zm-.582 3.5c.03-.877.138-1.718.312-2.5H1.674a7 7 0 0 0-.656 2.5zM4.847 5a12.5 12.5 0 0 0-.338 2.5H7.5V5zM8.5 5v2.5h2.99a12.5 12.5 0 0 0-.337-2.5zM4.51 8.5a12.5 12.5 0 0 0 .337 2.5H7.5V8.5zm3.99 0V11h2.653c.187-.765.306-1.608.338-2.5zM5.145 12q.208.58.468 1.068c.552 1.035 1.218 1.65 1.887 1.855V12zm.182 2.472a7 7 0 0 1-.597-.933A9.3 9.3 0 0 1 4.09 12H2.255a7 7 0 0 0 3.072 2.472M3.82 11a13.7 13.7 0 0 1-.312-2.5h-2.49c.062.89.291 1.733.656 2.5zm6.853 3.472A7 7 0 0 0 13.745 12H11.91a9.3 9.3 0 0 1-.64 1.539 7 7 0 0 1-.597.933M8.5 12v2.923c.67-.204 1.335-.82 1.887-1.855q.26-.487.468-1.068zm3.68-1h2.146c.365-.767.594-1.61.656-2.5h-2.49a13.7 13.7 0 0 1-.312 2.5m2.802-3.5a7 7 0 0 0-.656-2.5H12.18c.174.782.282 1.623.312 2.5zM11.27 2.461c.247.464.462.98.64 1.539h1.835a7 7 0 0 0-3.072-2.472c.218.284.418.598.597.933M10.855 4a8 8 0 0 0-.468-1.068C9.835 1.897 9.17 1.282 8.5 1.077V4z" />
//                                     </svg>
//                                     <svg style={{ marginTop: 5 }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-down" viewBox="0 0 16 16">
//                                         <path fillRule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1" />
//                                     </svg>
//                                 </span>
//                                 select langauge <br /> (or) settings and add keyboard in android
//                             </p>

//                             {/* <a href="#">Read More</a> */}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }


import React, { useEffect, useState } from 'react'
import './Tr1.css'
import 'regenerator-runtime/runtime';
import io from 'socket.io-client';
const socket = io('http://localhost:5000');
import VanillaTilt from 'vanilla-tilt';


export default function Tr1() {

    const [fname, setfname] = useState("")
    const [fnameL, setfnameL] = useState("")
    const [lname, setlname] = useState("")
    const [lnameL, setlnameL] = useState("")
    const [address, setaddress] = useState("")
    const [addressL, setaddressL] = useState("")
    const [mainArea, setmainArea] = useState("")
    const [mainAreaL, setmainAreaL] = useState("")
    const [openAlert, setopenAlert] = useState(true)
    const sendTrasliterate = async (lang, which, text, both, save) => {
        socket.emit('transliterate', { lang, which, text, both, save });
    }

    const detectLanguage = (text, which, save) => {
        if (text != "") {
            socket.emit("detect_lang", { text, which, save })
        }
    }

    useEffect(() => {
        socket.on("detect-lang-response", (data) => {
            if (data.result == "both") {
                sendTrasliterate('hi/ta', data.which, data.text, true, data.save)
            } else {
                sendTrasliterate(data.result, data.which, data.text, false, data.save)
            }
        })
        socket.on("transliterate-response", data => {
            if (data.which === "fname") {
                setfnameL(data)
            }
            else if (data.which == "lname") {
                setlnameL(data)
            }
            else if (data.which == "address") {
                setaddressL(data)
            }
            else if (data.which == "mainArea") {
                setmainAreaL(data)
            }

        })
    }, [socket])

    const save = (text, which) => {
        detectLanguage(text, which, true)
    }

    useEffect(() => {
        VanillaTilt.init(document.querySelectorAll('.alert-card'), {
            max: 25,
            speed: 400,
            glare: true,
            "max-glare": 1,
        });
    }, []);




    return (
        <div>
            <center>
                <h1 style={{ marginTop: "8vh" }}>Bajaj Finserv Demo</h1>
            </center>
            <center style={{ marginTop: "1vh", width: "100%" }}>
                <div className='inpt-div'>
                    <input onKeyPress={e => { e.key == "Enter" ? save(e.target.value, "fname") : null }} onChange={e => { setfname(e.target.value); e.target.value.length % 4 == 0 ? detectLanguage(e.target.value, "fname", false) : null }} value={fname} type="text" className='inpt' placeholder='first name' />
                    <p>{fnameL.msg}</p>
                </div>
                <div className='inpt-div'>
                    <input onKeyPress={e => e.key == "Enter" ? save(e.target.value, "lname"): null} onChange={e => { setlname(e.target.value); e.target.value.length % 4 == 0 ? detectLanguage(e.target.value, "lname", false) : null }} value={lname} type="text" className='inpt' placeholder='last name' />
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
                    <input onKeyPress={e => e.key == "Enter" ? save(e.target.value, "address"): null} onChange={e => { setaddress(e.target.value); e.target.value.length % 3 == 0 ? detectLanguage(e.target.value, "address", false) : null }} value={address} type="text" className='inpt' placeholder='Enter city' />
                    <p>{addressL.msg}</p>
                </div>
                <div className='inpt-div' >
                    <textarea onKeyPress={e => e.key == "Enter" ? save(e.target.value, "mainArea") : null} onChange={e => { setmainArea(e.target.value); e.target.value.length % 3 == 0 ? detectLanguage(e.target.value, "mainArea", false) : null }} value={mainArea} type="text" className='inpt' placeholder='Enter your full address' ></textarea>
                    <p>{mainAreaL.msg}</p>
                </div>
                <div>
                </div>
            </center>
            <div className='alert-main' style={{ display: openAlert ? null : "none" }}>
                <div className="alert-container">
                    <div className="alert-card" onClick={e => setopenAlert(!openAlert)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="alert-bi"
                            viewBox="0 0 16 20">
                            <path
                                d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                        </svg>
                        <div className="alert-content">
                            <h2>Info</h2>
                            <h3 style={{ marginTop: -20 }}>Virtual Keyboard</h3>
                            <p>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-microsoft" viewBox="0 0 16 16">
                                    <path d="M7.462 0H0v7.19h7.462zM16 0H8.538v7.19H16zM7.462 8.211H0V16h7.462zm8.538 0H8.538V16H16z" />
                                </svg> + ctrl + o in windows
                                <br />
                                <span style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", margin: 5 }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-globe" viewBox="0 0 16 16">
                                        <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m7.5-6.923c-.67.204-1.335.82-1.887 1.855A8 8 0 0 0 5.145 4H7.5zM4.09 4a9.3 9.3 0 0 1 .64-1.539 7 7 0 0 1 .597-.933A7.03 7.03 0 0 0 2.255 4zm-.582 3.5c.03-.877.138-1.718.312-2.5H1.674a7 7 0 0 0-.656 2.5zM4.847 5a12.5 12.5 0 0 0-.338 2.5H7.5V5zM8.5 5v2.5h2.99a12.5 12.5 0 0 0-.337-2.5zM4.51 8.5a12.5 12.5 0 0 0 .337 2.5H7.5V8.5zm3.99 0V11h2.653c.187-.765.306-1.608.338-2.5zM5.145 12q.208.58.468 1.068c.552 1.035 1.218 1.65 1.887 1.855V12zm.182 2.472a7 7 0 0 1-.597-.933A9.3 9.3 0 0 1 4.09 12H2.255a7 7 0 0 0 3.072 2.472M3.82 11a13.7 13.7 0 0 1-.312-2.5h-2.49c.062.89.291 1.733.656 2.5zm6.853 3.472A7 7 0 0 0 13.745 12H11.91a9.3 9.3 0 0 1-.64 1.539 7 7 0 0 1-.597.933M8.5 12v2.923c.67-.204 1.335-.82 1.887-1.855q.26-.487.468-1.068zm3.68-1h2.146c.365-.767.594-1.61.656-2.5h-2.49a13.7 13.7 0 0 1-.312 2.5m2.802-3.5a7 7 0 0 0-.656-2.5H12.18c.174.782.282 1.623.312 2.5zM11.27 2.461c.247.464.462.98.64 1.539h1.835a7 7 0 0 0-3.072-2.472c.218.284.418.598.597.933M10.855 4a8 8 0 0 0-.468-1.068C9.835 1.897 9.17 1.282 8.5 1.077V4z" />
                                    </svg>
                                    <svg style={{ marginTop: 5 }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-down" viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1" />
                                    </svg>
                                </span>
                                select langauge <br /> (or) settings and add keyboard in android
                            </p>

                            {/* <a href="#">Read More</a> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
