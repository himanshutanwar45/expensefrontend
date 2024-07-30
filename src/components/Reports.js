import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { getDateGeneration, getExpenses } from '../state/action/action'

const Reports = ({ setProgress, dategeneration, getDateGeneration, getExpenses, getexpenses }) => {

    ////////////////// Default Date /////////////////////////////////////////////////////

    function getFirstDayOfMonth() {
        const now = new Date(); // Current date
        return new Date(now.getFullYear(), now.getMonth(), 1);
    }

    function getLastDayOfMonth() {
        const now = new Date(); // Current date
        return new Date(now.getFullYear(), now.getMonth() + 1, 0);
    }

    function formatDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-based
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    const firstDayOfMonth = getFirstDayOfMonth()
    const lastDayOfMonth = getLastDayOfMonth()

    const DateFrom = formatDate(firstDayOfMonth)
    const DateTo = formatDate(lastDayOfMonth)

    const formattedDate = new Date().toISOString().split('T')[0];

    ////////////////// End /////////////////////////////////////////////////////////////

    useEffect(() => {
        setProgress(40)

        setTimeout(() => {
            setProgress(100)
            getDateGeneration(fromDate, toDate)
            getExpenses(formattedDate)
        }, 1000)

        // eslint-disable-next-line
    }, [])



    ///////////////// Add value in textbox ///////////////////////////////////////////////

    const [credentials, setCredentials] = useState({
        fromDate: DateFrom,
        toDate: DateTo
    });

    const { fromDate, toDate } = credentials;

    const onChangeMethod = async(e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    ////////////////// End ///////////////////////////////////////////////////////////////


    const handleClick = async () => {
        setProgress(40)
        try {
            await getDateGeneration(fromDate, toDate)
        } catch (error) {
            throw error.message;
        }
        setProgress(100)
    }

    return (
        <>
            <div className='row'>
                <div className='col-md-3'>
                    <div className="mb-3">
                        <label htmlFor="fromDate" className="form-label">From Date</label>
                        <input type="date" className="form-control" id="fromDate" name="fromDate" onChange={onChangeMethod} value={fromDate} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="toDate" className="form-label">To Date</label>
                        <input type="date" className="form-control" id="toDate" name="toDate" onChange={onChangeMethod} value={toDate} />
                    </div>
                    <button type="submit" className="btn btn-outline-secondary" onClick={handleClick}>Submit</button>

                    <div className='mb-3 my-2'>
                        <div className='border border-secondary-subtle p-5 bg-white shadow rounded-3'>
                            <h5 className='text-center'> Current Expense </h5>
                            {!getexpenses || getexpenses.length === "0" ? <p> No data avaliable</p> :
                                (
                                    <p className='text-center text-danger'><strong>{getexpenses.reduce((total, item) => Number(item.currentDateExpense), 0)}</strong></p>
                                )
                            }
                        </div>
                    </div>

                    <div className='mb-3 my-2'>
                        <div className='border border-secondary-subtle p-5 bg-white shadow rounded-3'>
                            <h5 className='text-center'> Total Expense </h5>
                            {!getexpenses || getexpenses.length === "0" ? <p> No data avaliable</p> :
                                (
                                    <p className='text-center text-danger'><strong>{getexpenses.reduce((total, item) => Number(item.totalExpense), 0)}</strong></p>
                                )
                            }
                        </div>
                    </div>
                </div>

                <div className='col-md-9'>
                    <div className='border border-secondary-subtle p-2 bg-white overflow-auto shadow rounded-3 table-responsive' id="dategeneration" style={{ height: "calc(100vh - 160px)" }}>
                        <h5 className='text-center'> Details </h5>
                        {!dategeneration || dategeneration.length === "0" ? <p>No data avaliable</p> :
                            <table className='table table-bordered border-primary table-striped'>
                                <thead>
                                    <tr className='sticky-top table-info'>
                                        <th>Date</th>
                                        <th>Description</th>
                                        <th>Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dategeneration.map((item, index) => {
                                        let date = new Date(item.date)

                                        const day = date.getDate().toString().padStart(2, '0');
                                        const month = (date.getMonth() + 1).toString().padStart(2, '0');
                                        const year = date.getFullYear();
                                        const formattedDate = `${day}/${month}/${year}`;
                                        return (
                                            <tr key={index}>
                                                <td>{formattedDate}</td>
                                                <td>{item.description}</td>
                                                <td>{item.amount}</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        }
                    </div>
                </div>
            </div>



        </>
    )
}

const mapStateToProps = (state) => {
    return {
        dategeneration: state.dategeneration,
        getexpenses: state.getexpenses,
        error: state.error
    }
}

const mapDispatchToProps = {
    getDateGeneration,
    getExpenses
};


export default connect(mapStateToProps, mapDispatchToProps)(Reports)
