import React, { useEffect, useRef, useState } from 'react'


const getName = () => {
    let edit = localStorage.getItem("prevfname");
    if (edit == "undefined") {
        return [];
    }
    let prevfname = JSON.parse(localStorage.getItem("prevfname"))
    if (prevfname) {
        return prevfname
    } else {
        return []
    }
}
const getEdit3 = () => {
    let edit2 = localStorage.getItem("prevlname");
    if (edit2 == "undefined") {
        return [];
    }
    if (edit2) {
        return (edit2 = JSON.parse(localStorage.getItem("prevlname")))
    } else {
        return [];
    }
}
const History = () => {
    const prevData = useRef(null);
    const prevData1 = useRef(null);
    const [historyid, setHistoryid] = useState(false);
    const [editfname, setEditFname] = useState(getName());
    const [editlname, setEditLname] = useState(getEdit3());
    const [hisid, setHisid] = useState([]);
    const [hisid1, setHisid1] = useState([]);
    useEffect(() => {
        prevData.current = hisid;
        prevData1.current = hisid1;
    }, [hisid, hisid1])
  return (
    <div>


{historyid && (

<div className='history1' style={{ display: "flex", opacity: "1", zIndex: "1", pointerevents: "auto" }}>

    {/* {prevData1.current} */}
    <div>
        <div className='his1 mx-2'>new Fvalue:{editfname.map((val) =><div> {val} </div>)}</div>
        <div className='his3'>new Lvalue:{editlname.map((val) => <div>{val}</div>)}</div>
        <div className='his4'>pastFvalue:{prevData.current}</div>
        <div className='his4'>pastLvalue:{prevData1.current}</div>
    </div>

</div>
)}
    </div>
  )
}

export default History