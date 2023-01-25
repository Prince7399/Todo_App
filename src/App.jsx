import React, { useEffect, useState } from 'react'
import List from './List'
import "./style.css"
import Modal from './Modal'
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import $ from "jquery";
import * as bootstrap from 'bootstrap';
// window.bootstrap = bootstrap;



const App = () => {

    const [data, setData] = useState({
        task: "",
        status: "Incomplete",
        time: "",
        id: "",
        complete: false
    });

    const [item, setItem] = useState(JSON.parse(localStorage.getItem("taskData")) || []);
    const [update, setUpdate] = useState(false);
    const [edited, editedData] = useState(null);
    const [showData, setshowData] = useState("All");
    const [printData, setprintData] = useState([]);

    useEffect(() => {
        localStorage.setItem("taskData", JSON.stringify(item));
    }, [item]);

    useEffect(() => {
        setprintData(item.filter((val) => {
            if (showData == "All") return val;
            else return val.status == showData;
        }))
    }, [showData, item]);

    const changeHandle = (e) => {
        let name = e.target.name;
        let val = e.target.value;
        setData({ ...data, [name]: val });
    }

    const addSuccess = () => toast.success('Task Added Successfully !', {
        position: toast.POSITION.BOTTOM_RIGHT
    });
    const editSuccess = () => toast.success('Task Update Successfully !', {
        position: toast.POSITION.BOTTOM_RIGHT
    });
    const deleteSuccess = () => toast.success('Task Delete Successfully !', {
        position: toast.POSITION.BOTTOM_RIGHT
    });
    const addFail = () => toast.error('Please enter a Title', {
        position: toast.POSITION.BOTTOM_RIGHT
    });

    const addTask = () => {
        if (data.task == "" || data.status == "") {
            addFail();
        }
        else if (update == true) {
            setItem(
                item.map((val) => {
                    if (val.id == edited.id) {
                        data.complete = (data.status == "Incomplete") ? false : true;
                        return data;
                    }
                    return val;
                })
            );
            setUpdate(false);
            editedData(null);
            setData({
                task: "",
                status: "Incomplete",
                time: "",
                id: "",
                complete: false
            });
            editSuccess();

        }
        else {

            let taskTime = new Date();
            let fulltime = taskTime.toLocaleTimeString();
            let fullDate = taskTime.toLocaleDateString();
            let TaskTotTime = `${fulltime}, ${fullDate}`;

            data.time = TaskTotTime;

            data.id = new Date().getTime();
            data.complete = (data.status == "Incomplete") ? false : true;
            setItem([...item, data]);
            setData({
                task: "",
                status: "Incomplete",
                time: "",
                id: "",
                complete: false
            });
            addSuccess();
        }

    }

    const deleteItem = (id) => {
        let notdel = item.filter((val) => val.id != id);
        setItem(notdel);
        deleteSuccess();
    }

    const updateItem = (id, data) => {
        let upData = item.find((val) => val.id == id);

        setUpdate(true);
        editedData(upData);
        setData({
            task: upData.task,
            status: upData.status,
            time: data.time,
            id: data.id,
            complete: (upData.status == "Incomplete") ? false : true
        });
    }

    const chachboxHandle = (checked, id) => {
        let check = checked;
        let checkitem = item.find((val) => {
            return val.id == id;
        });
        checkitem.complete = check;
        checkitem.status = (check == true) ? "Complete" : "Incomplete";
        setItem(
            item.map((val) => {
                if (val.id == checkitem.id) {
                    return checkitem;
                }
                return val;

            })
        );
    }

    return (
        <>
            <ToastContainer
                position="bottom-right"
                autoClose={1000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable={false}
                pauseOnHover={false}
                theme="light"
            />
            <div className='container'>
                <h1 className='text-center mt-3 todo-title'>TODO LIST</h1>
                <div className="row mt-4">
                    <div className="col-8 mx-auto">
                        <div className="d-flex justify-content-between">
                            <button type="button" className="btn btn-add px-4" data-bs-toggle="modal" data-bs-target="#myModal">
                                Add Task
                            </button>

                            <select name="cars" id="filter" className='px-3 py-2' onChange={({ target: { value } }) => setshowData(value)}>
                                <option value="All">All</option>
                                <option value="Incomplete">Incomplete</option>
                                <option value="Complete">Complete</option>
                            </select>

                        </div>
                    </div>
                    <div className="col-8 mx-auto">
                        <div className="row mt-3 task-outer pb-3">

                            {printData && printData.length > 0 ?
                                printData.map((data, index) => {
                                    return (
                                        <>
                                            <div className="col-12 px-3 pt-3" key={index}>
                                                <div className="d-flex flex-row bg-light px-3 py-2 task-border">
                                                    <div className="col-6 align-self-center">
                                                        <div className="d-flex align-items-center">
                                                            <div>
                                                                <input type="checkbox" id="check" name="task" onChange={({ target: { checked } }) => chachboxHandle(checked, data.id)} checked={data.complete} />
                                                            </div>
                                                            <div className="d-flex flex-column">
                                                                <p className={(data.status == "Complete") ? "mb-0 ms-3 list-complete" : "mb-0 ms-3"}>{data.task}</p>
                                                                <p className='mb-0 ms-3'>{data.time}</p>


                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-6 align-self-center">
                                                        <div className="d-flex">
                                                            <button type="button" className="btn ms-auto" onClick={() => deleteItem(data.id)} data-bs-dismiss="modal"><i className="fa-solid fa-trash edit-icon"></i></button>
                                                            <button type="button" className="btn" data-bs-toggle="modal" data-bs-target="#myModal" onClick={() => updateItem(data.id, data)}>
                                                                <i className="fa-solid fa-pen edit-icon"></i>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    )
                                }) : <div className='text-center my-auto'>"No Data Found"</div>

                            }

                        </div>
                    </div>
                </div>
            </div>

            {/* <Modal /> */}
            <div className="modal fade" id="myModal" tabIndex="-1" aria-labelledby="task-detailModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered position-relative">
                    <div className="modal-content modal-bg">
                        <div className="modal-header border-0">
                            <h5 className="modal-title" id="task-detailModalLabel">Add TODO</h5>
                            <button type="button" className="btn-close position-absolute" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label modal-data">Title</label>
                                    <input type="text" className="form-control modal-data border-0" id="title" aria-describedby="titleHelp" name="task" value={data.task} onChange={changeHandle} />

                                    <label htmlFor="title" className="form-label modal-data mt-4">Status</label>
                                    <select name="status" id="" className='col-12 modal-data border-0 modal-select' onChange={changeHandle} defaultChecked={data.status} value={data.status}>
                                        <option value="Incomplete">Incomplete</option>
                                        <option value="Complete">Complete</option>
                                    </select>

                                </div>
                            </form>
                        </div>
                        <div className="modal-footer border-0 me-auto">
                            <button type="button" className="btn btn-add px-3" id="task-added" data-bs-dismiss={(data.task == "") ? "" : "modal"} onClick={addTask}>Add Task</button>
                            <button type="button" className="btn btn-cancel px-3 ms-2" data-bs-dismiss="modal">Cancel</button>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

export default App