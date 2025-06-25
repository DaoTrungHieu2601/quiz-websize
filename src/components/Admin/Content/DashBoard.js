import './DashBoard.scss'
import { BarChart, CartesianGrid, XAxis, YAxis, Legend, Bar, Tooltip, ResponsiveContainer } from 'recharts';
import { getOverView } from '../../../services/apiService';
import { useEffect, useState } from 'react';

const Dashboard = ({ }) => {
    const [dataOverView, setDataOverView] = useState([])
    const [dataChart, setDataChart] = useState([])
    useEffect(() => {
        fetchDataOverView();
    }, [])

    const fetchDataOverView = async () => {
        let res = await getOverView();
        console.log('hieu toki chek res: ', res)
        if (res && res.EC === 0) {
            setDataOverView(res.DT)
            //process chart data
            let Qz = 0, Qs = 0, As = 0;
            Qz = res.DT.others.countQuiz;
            Qs = res.DT.others.countQuestions;
            As = res.DT.others.countAnswers;
            const data = [
                {
                    "name": "Quizzes",
                    "Q": Qz,
                },
                {
                    "name": "Questions",
                    "Qs": Qs,
                },
                {
                    "name": "Answers",
                    "As": As,
                },
            ]
            setDataChart(data)
        }
    }


    return (
        <div className="dashboard-container">
            <div className='title'>
                Analytics Dashboard
            </div>
            <div className='content'>
                <div className='c-left'>
                    <div className='child'>
                        <span className='text-1'>Total users</span>
                        <span className='text-2'>
                            {dataOverView && dataOverView.users && dataOverView.users.total ?
                                <>{dataOverView.users.total}</>
                                :
                                <>0</>
                            }
                        </span>
                    </div>
                    <div className='child'>
                        <span className='text-1'>Total quizzes</span>
                        <span className='text-2'>
                            {dataOverView && dataOverView.others && dataOverView.others.countQuiz ?
                                <>{dataOverView.others.countQuiz}</>
                                :
                                <>0</>
                            }
                        </span>
                    </div>
                    <div className='child'>
                        <span className='text-1'>Total Question</span>
                        <span className='text-2'>
                            {dataOverView && dataOverView.others && dataOverView.others.countQuestions ?
                                <>{dataOverView.others.countQuestions}</>
                                :
                                <>0</>
                            }
                        </span>
                    </div>
                    <div className='child'>
                        <span className='text-1'>Total Answers</span>
                        <span className='text-2'>
                            {dataOverView && dataOverView.others && dataOverView.others.countAnswers ?
                                <>{dataOverView.others.countAnswers}</>
                                :
                                <>0</>
                            }
                        </span>
                    </div>
                </div>
                <dic className="c-right">
                    <ResponsiveContainer width="95%" height={"100%"}>
                        <BarChart width={400} height={300} data={dataChart}>
                            {/* <CartesianGrid strokeDasharray="3 3" /> */}
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="Q" fill="#8884d8" />
                            <Bar dataKey="Qs" fill="#82ca9d" />
                            <Bar dataKey="As" fill="#fcb12a" />
                        </BarChart>
                    </ResponsiveContainer>
                </dic>
            </div>
        </div>
    )
}

export default Dashboard;