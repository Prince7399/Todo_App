import React from 'react'

const Modal = () => {
    return (
        <>
            <div className="modal fade" id="task-detail" tabindex="-1" aria-labelledby="task-detailModalLabel" aria-hidden="true">
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
                                    <input type="text" className="form-control modal-data border-0" id="title" aria-describedby="titleHelp" />

                                    <label htmlFor="title" className="form-label modal-data mt-4">Status</label>
                                    <select name="status" id="" className='col-12 modal-data border-0 modal-select'>
                                        <option value="Incomplete">Incomplete</option>
                                        <option value="Complete">Complete</option>
                                    </select>

                                </div>
                            </form>
                        </div>
                        <div className="modal-footer border-0 me-auto">
                            <button type="button" className="btn btn-add px-3">Add Task</button>
                            <button type="button" className="btn btn-cancel px-3 ms-2" data-bs-dismiss="modal">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Modal
