import React, { useState, useEffect, useRef } from 'react';
// import Table from 'react-bootstrap/Table';
import './Todo.css';
import { FaTrash, FaEdit, FaHistory } from 'react-icons/fa'
import { useNavigate, useParams } from 'react-router-dom';

// import List from './List';
import Alert from "./Alert"
import { Table } from 'react-bootstrap';



const getLocalStorage = () => {
    let list = localStorage.getItem("list");
    if (list) {
        return (list = JSON.parse(localStorage.getItem("list")))
    } else {
        return [];
    }
};

const getLocalStorage1 = () => {
    let list1 = localStorage.getItem("delete");
    if (list1) {
        return (list1 = JSON.parse(localStorage.getItem("delete")))
    } else {
        return [];
    }
};
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

const Todos = () => {
    const navigate = useNavigate();
    const prevData = useRef(null);
    const prevData1 = useRef(null);
    let { id } = useParams();
    const [name, setName] = useState("");
    const [lastname, setLastName] = useState("");
    const [editfname, setEditFname] = useState(getName());
    const [editlname, setEditLname] = useState(getEdit3());
    const [list, setList] = useState(getLocalStorage());
    const [hisid, setHisid] = useState([]);
    const [hisid1, setHisid1] = useState([]);
    const [historyid, setHistoryid] = useState(false);
    const [del, setDel] = useState(getLocalStorage1());
    const [delid, setDelId] = useState(false);
    const [del1, setDel1] = useState([]);
    const [isediting, setIsediting] = useState(null);
    const [editId, setEditId] = useState(null);
    const [search, setSearch] = useState("");
    const [alert, setAlert] = useState({ show: false, msg: '', type: "" });

    // const [loginid, setLoginId] = useState(time);
    useEffect(() => {
        localStorage.setItem("list", JSON.stringify(list));
        localStorage.setItem("delete", JSON.stringify(del));
        localStorage.setItem("delete1", JSON.stringify(del1));
        localStorage.setItem("prevfname", JSON.stringify(editfname));
        localStorage.setItem("prevlname", JSON.stringify(editlname));

    }, [list, del, del1, editlname, editfname]);
    // useEffect(()=>{
    //   if(!localStorage.getItem("username")&& !localStorage.getItem("password")){
    //     navigate("/");
    // }});
    useEffect(() => {
        prevData.current = hisid;
        prevData1.current = hisid1;
    }, [hisid, hisid1])
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name) {
            showAlert(true, "danger", "please enter value")
        } else if (name && isediting) {
            setList(
                list.map((item) => {
                    if (item.id === editId) {
                        return { ...item, title: name, lastname: lastname, loginid: id };
                    }
                    return item;
                })
            )
            setName("");
            setLastName("");
            // setLoginId(time);
            setEditId(null);
            setEditFname([...editfname, name]);
            setEditLname([...editlname, lastname]);
            setIsediting(false);
            showAlert(true, "success", "valueChanges");
        }
        else {
            showAlert(true, "success", "item added to list items");
            const newItems = { id: new Date().getTime().toString(), title: name, lastname: lastname, loginid: id };
            setList([...list, newItems]);
            setName("");
            setLastName("");
        }
    };
    const showAlert = (show = false, type = "", msg = "") => {
        setAlert({ show, type, msg })
    }
    const removeItem = (id) => {
        showAlert(true, "danger", "item removed ");
        setList(list.filter((item) => item.id !== id));
        // console.log("first" , list)
        let list2 = list.filter((item) => item.id == id);
        setDel([...del, list2])

        console.log("del", list2)
    };
    const editItem = (id) => {
        const editItem = list.find((item) => item.id === id);
        setIsediting(true);
        setName(editItem.title);
        setLastName(editItem.lastname);
        setEditId(id);


    };
    const handleCheck = (id) => {
        const item = list.map(
            item => (item.id === id ? {
                ...item,
                value: !item.value
            } : item)
        )
        setList(item)

        let list3 = list.filter((item) => item.id == id);
        setDel1([...del1, list3])

    }

    const DeleteAll = () => {
        const item = list.filter(item => !item.value)
        setList(item)
        //  console.log(item ,"ddd")

    }

    const history = (id) => {
        setHistoryid(true);
        const editItem = list.find((item) => item.id === id);
        setHisid(editItem.title)
        setHisid1(editItem.lastname);
        localStorage.getItem("prevfname")
        localStorage.getItem("prevlname")

    }

    const deletehistory = () => {
        setDelId(true)


        //  console.log('dddddd', del.map((item)=> item[0].id))
    }
    const logout = () => {
        navigate("/")
        window.location.reload();
    }
    // console.log("first",id)
    return (
        <div>
            <section className="section-center">
                <input type="text" value={search} className="search" onChange={(e) => setSearch(e.target.value)} searchs={search} placeholder="SEARCH...." />
                <form onSubmit={handleSubmit}>
                    {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}
                    <h3 style={{ marginBottom: '1.5rem', textAlign: "center" }}> Todo List</h3>
                    <div className='mb-3 form'>
                        <input
                            type='text'
                            className="form-controller"
                            placeholder="Firstname..."
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            required
                        />
                        <input
                            type='text'
                            className="form-controller"
                            placeholder="Lastname.."
                            onChange={(e) => setLastName(e.target.value)}
                            value={lastname}
                            required
                        />
                        <button type='submit' className='submit1'>
                            {isediting ? "edit" : "submit"}

                        </button>
                    </div>
                </form>
                {list.length > 0 && (
                    <div className='.section-center' style={{ marginTop: "2rem" }}>

                        <div className='text-center'>
                            <button className='btn-btn-warning' onClick={DeleteAll}>
                                clear Items
                            </button>
            <button type="submit" className='btn1' onClick={() => logout()}>Logout</button>
                            <button className='deletehistory' onClick={() => deletehistory()}>
                                <FaTrash />
                            </button>

                        </div>
                    </div>
                )}


            </section>



                    {historyid && (
            <Table className='table1'>
                <thead>
                    <tr>
                    {/* <th>ID</th> */}
                        <th>new Fvalue</th>
                        <th>new Lvalue</th>
                        <th>pastFvalue</th>
                        <th>pastLvalue</th>
                    </tr>
                </thead>
                <tbody>
                        <>

                            <tr>
                                {/* {prevData1.current} */}


                                <td>
                                    {editfname.map((val) => <div>{val}</div>)}
                                </td>

                                <td>
                                    {editlname.map((val) => <div>{val}</div>)}
                                </td>



                                <td>
                                    {prevData.current}
                                </td>


                                <td>
                                    {prevData1.current}
                                </td>


                            </tr>

                        </>
                </tbody>
            </Table>
                    )}
                    {delid && (
            <Table className='table2'> 
                <thead>
                    <tr>
                        <th>Single-Delete</th>
                        <th>Delete All</th>
                       
                    </tr>
                </thead>
                <tbody>
                        
<>
                 <tr>
                 <td>
                            {del.map((item) => 
                            <div> {item[0].title}</div>
                            )}
                            </td>
               
               
                    <td>
                        {del1.map((val) =>
                          <div> {val[0].title}</div>
                        )}
                        </td>
                            </tr>
                        </>
                </tbody>
                </Table>
                    )}
                        
                  

                <Table>
                    <thead>
                        <tr>

                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>

                        {/* {list.filter((val) => {
                        return val.title.toLowerCase().includes(search.toLowerCase().trim()); */}
                        {list.map((val) => {
                            if (val.loginid === id) {
                                const { id, title, lastname } = val;
                                return (
                                    <>
                                        <tr>
                                            <td>
                                                {title}
                                            </td>
                                            <td>
                                                {lastname}
                                            </td>
                                            <td>

                                                <button className='edititem' onClick={() => editItem(id)}>
                                                    <FaEdit />
                                                </button>
                                                <button className='deleteitem' onClick={() => removeItem(id)}>
                                                    delete
                                                </button>
                                                <button className='history' onClick={() => history(id)} >
                                                    <FaHistory />
                                                </button>
                                                <input type="checkbox" className='checkbox' onChange={() => handleCheck(id)} value={id} checked={val.ischecked} />
                                            </td>
                                        </tr>
                                    </>
                                )
                            }
                        })}

                    </tbody>
                </Table>
        </div>

    )
}






export default Todos