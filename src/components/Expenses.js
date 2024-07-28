import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { getExpenses, addExpenses, currentDateExpense } from '../state/action/action'
import {userData} from './Token'

const Expenses = ({ setProgress, getExpenses, getexpenses, addExpenses, showAlert, currentdateexpense, currentDateExpense }) => {

    //////////////////////// Get Data //////////////////////////////////////////////////////
    const formattedDate = new Date().toISOString().split('T')[0];
    let userId = userData ? userData.user.id : null;
    useEffect(() => {
        setProgress(40)
        setTimeout(() => {
            getExpenses(userId) /// Route 2
            currentDateExpense(formattedDate) //Route 4
            setProgress(100)
        }, 1000)

        // eslint-disable-next-line
    }, [])

    //////////////////////  END  ///////////////////////////////////////////////////////////

    ////////////////////////// Credentials ////////////////////////////////////////////
    const [credentials, setCredentials] = useState({
        description: '',
        amount: '',
        date: new Date().toISOString().substr(0, 10)
    })

    const { description, amount, date } = credentials

    const onchangeEvent = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    ///////////////////////////   END    /////////////////////////////////////////////


    /////////////// Add Expenses /////////////////////////////////////////////////
    const handleClick = async () => {
        try {
            const result = await addExpenses(description, amount, date); //Route 3
            const { success, error } = result;
            if (success) {
                showAlert('success', error)
                setCredentials({
                    description: '',
                    amount: '',
                    date: new Date().toISOString().substr(0, 10)
                })

                getExpenses(userId); // Route 2
                currentDateExpense(formattedDate) //Route 4
            }
            else {
                showAlert('error', error)
            }
        } catch (error) {
            throw error.message;
        }
    }

    //////////////////////   END /////////////////////////


    return (
        <>
            <div className="container p-2" >
                <div className="row">

                    <div className="col border border-secondary-subtle p-2 bg-white">
                        <div className='text-center'>
                            <h3>Expense Tracker</h3>
                        </div>

                            {!getexpenses || getexpenses.length === 0 ? (<p>Expenses: </p>):
                                getexpenses.map((item, index) => {
                                    return (
                                        <div key={index} className='d-flex justify-content-between'>
                                            <div>
                                                <p>Expenses: <strong><img alt="None" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAACAUlEQVR4nO3azYuNURwH8M94mYQyRcrLKJIiNhQ2lMnCaiZRFlaUcmsWrMaOrFiJhbwUG1aytvIHeFkQi5nyMgsaGpTknaGnzq3TpLuY0Z177+986uyeOvd87z3P8/ud+1AURVEURVEU09GNGoaaNGppzpZxBH+aPKo5W8ZmjDdx8eNpzrYyF8uxC2fxOlvQbwwKZh6O40sWxEkBbcRoFsJeAa3FWArgPVYIaDcmUgjnBXU7BfAJPQLakd0LDguoC29TAFe0mU1pH093PEgBDDe4ppqrpQzMQCncr4UMRA+gXtD8zy0w0uCaaq6O9SYFcF1A27OfeNXzh3MzLf4blghmZ2qLqwBuCGYZXmRl8CqBrMSTbO8PRip7D+BdtvgLAix6XfqWH08qbM5hlja1BvfwvMF4hR//qOiq5mefNnd0CqXsy3TGv0AHWISH2eIm0qPscjYu4XQKa4MOtBB3sxDuY7Fg5uNOFsLT9IwPpRu3shCqg41ewczGtSyE0XT0HUpXerbXQxhrxaOsZjiVhfAB2wQ0lIVQNTt9Aqpl7e5n7BHQQfxMIXzHfgH142sK4RcOCagv3QvqZfMxQf8H/Bj95Ygtk94tOiOg9emsoB7CxXY+GJmq1XiWhVC10nME05sap3oIVwW0FI9SANUxWkg9OIGtM/1BiqIoiqIoCh3sLzO3JnYd5xVeAAAAAElFTkSuQmCC" height="20" width="20" />
                                                    {item.currentDateExpense}</strong></p>
                                            </div>

                                            <div>
                                                <p> Total Expenses:<strong><img alt="None" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAACAUlEQVR4nO3azYuNURwH8M94mYQyRcrLKJIiNhQ2lMnCaiZRFlaUcmsWrMaOrFiJhbwUG1aytvIHeFkQi5nyMgsaGpTknaGnzq3TpLuY0Z177+986uyeOvd87z3P8/ud+1AURVEURVEU09GNGoaaNGppzpZxBH+aPKo5W8ZmjDdx8eNpzrYyF8uxC2fxOlvQbwwKZh6O40sWxEkBbcRoFsJeAa3FWArgPVYIaDcmUgjnBXU7BfAJPQLakd0LDguoC29TAFe0mU1pH093PEgBDDe4ppqrpQzMQCncr4UMRA+gXtD8zy0w0uCaaq6O9SYFcF1A27OfeNXzh3MzLf4blghmZ2qLqwBuCGYZXmRl8CqBrMSTbO8PRip7D+BdtvgLAix6XfqWH08qbM5hlja1BvfwvMF4hR//qOiq5mefNnd0CqXsy3TGv0AHWISH2eIm0qPscjYu4XQKa4MOtBB3sxDuY7Fg5uNOFsLT9IwPpRu3shCqg41ewczGtSyE0XT0HUpXerbXQxhrxaOsZjiVhfAB2wQ0lIVQNTt9Aqpl7e5n7BHQQfxMIXzHfgH142sK4RcOCagv3QvqZfMxQf8H/Bj95Ygtk94tOiOg9emsoB7CxXY+GJmq1XiWhVC10nME05sap3oIVwW0FI9SANUxWkg9OIGtM/1BiqIoiqIoCh3sLzO3JnYd5xVeAAAAAElFTkSuQmCC" height="20" width="20" />
                                                    {item.totalExpense}</strong> </p>
                                            </div>
                                        </div>
                                        


                                    )
                                })

                            }                        

                        <div className='my-2'>
                            <div className='border border-secondary-subtle p-3'>
                                <div className="mb-3">
                                    <input type="text" className="form-control" id="description" name="description" placeholder="Enter Description" onChange={onchangeEvent} value={description} />
                                </div>
                                <div className="mb-3">
                                    <input type="text" className="form-control" id="amount" name="amount" placeholder="Enter Amount" onChange={onchangeEvent} value={amount} />
                                </div>
                                <div className="mb-3">
                                    <input type="date" className="form-control" id="date" name="date" placeholder="Enter Date" onChange={onchangeEvent} value={date} />
                                </div>
                                <button type="button" className="btn btn-outline-secondary" onClick={handleClick}>Add</button>
                            </div>
                        </div>

                        <div className='my-5'>
                            <h3 >Details</h3>
                            {!currentdateexpense || currentdateexpense.length === 0 ? (<p> No Data </p>) :
                                <table className="table table-striped table-bordered border-primary">
                                    <thead>
                                        <tr className="table-secondary sticky-top">
                                            <th scope="col">Date</th>
                                            <th scope="col">Description</th>
                                            <th scope="col">Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentdateexpense.map((item, index) => {
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
            </div>
        </>
    )
}
const mapStateToProps = (state) => {
    return {
        getexpenses: state.getexpenses,
        currentdateexpense: state.currentdateexpense,
        error: state.error
    }
}

const mapDispatchToProps = {
    getExpenses,
    addExpenses,
    currentDateExpense
};


export default connect(mapStateToProps, mapDispatchToProps)(Expenses)
