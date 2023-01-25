import React from 'react'

const List = ({ data }) => {


    return (
        <>

            <div className="col-12 p-3 task-outer">
                <div className="d-flex flex-row bg-light px-3 py-2 task-border">
                    <div className="col-6 align-self-center">
                        <div className="d-flex align-items-center">
                            <div>
                                <input type="checkbox" id="check" name="task" />
                            </div>
                            <div className="d-flex flex-column">
                                <p className='mb-0 ms-3'>{data.task}</p>
                                <p className='mb-0 ms-3'>10:00 AM, 01/24/2023</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-6 align-self-center">
                        <div className="d-flex">
                            <button type="button" className="btn ms-auto"><i className="fa-solid fa-trash edit-icon"></i></button>
                            <button type="button" className="btn" data-bs-toggle="modal" data-bs-target="#update-task-detail">
                                <i className="fa-solid fa-pen edit-icon"></i>
                            </button>
                        </div>

                    </div>
                </div>
            </div>


        </>
    )
}

export default List
