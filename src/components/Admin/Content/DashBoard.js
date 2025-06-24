import './DashBoard.scss'

const Dashboard = ({ }) => {
    return (
        <div className="dashboard-container">
            <div className='title'>
                Analytics Dashboard
            </div>
            <div className='content'>
                <div className='c-left'>
                    <div className='child'>Total users</div>
                    <div className='child'>Total quiz</div>
                    <div className='child'>Total Question</div>
                    <div className='child'>Total Answers</div>
                </div>
                <dic className="c-right">
                    Thiếu phần này #110
                </dic>
            </div>
        </div>
    )
}

export default Dashboard;