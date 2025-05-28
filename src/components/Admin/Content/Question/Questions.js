import { useState } from 'react';
import Select from 'react-select';
import './Questions.scss'
import { BsFillPatchPlusFill } from "react-icons/bs";
import { BsFillPatchMinusFill } from "react-icons/bs";
import { FiMinusCircle } from "react-icons/fi";
import { FiPlusCircle } from "react-icons/fi";
import { RiImageAddFill } from "react-icons/ri"
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';
import Lightbox from "react-awesome-lightbox";

const Questions = () => {
    const [dataImagePreview, setDataImagePreview] = useState();
    const [isPreviewImage, setIsPreviewImage] = useState(false);
    const [selectedQuiz, setSelectedQuiz] = useState({
        title: '',
        url: ''
    });
    const [questions, setQuestions] = useState(
        [
            {
                id: uuidv4(),
                description: '',
                imageFile: '',
                imageName: '',
                answers: [
                    {
                        id: uuidv4(),
                        description: '',
                        isCorrect: false
                    },
                ]
            },
        ]
    );

    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' },
    ];

    const handleAddRemoveQuestion = (type, id) => {
        if (type === 'ADD') {
            const newQuestion = {
                id: uuidv4(),
                description: '',
                imageFile: '',
                imageName: '',
                answers: [
                    { id: uuidv4(), description: '', isCorrect: false }
                ]
            }
            setQuestions([...questions, newQuestion]);
        }

        if (type === 'REMOVE') {
            let questionClone = _.cloneDeep(questions);
            questionClone = questionClone.filter(item => item.id !== id);
            setQuestions(questionClone);
        }
        console.log(">>> check: ", type, id)
    }

    const handleAddRemoveAnswers = (type, questionId, answerId) => {
        let questionsClone = _.cloneDeep(questions)
        if (type === 'ADD') {
            const newAnswers = {
                id: uuidv4(),
                description: '',
                isCorrect: false
            }
            let index = questionsClone.findIndex(item => item.id === questionId);
            questionsClone[index].answers.push(newAnswers)
            setQuestions(questionsClone);
        }

        if (type === 'REMOVE') {
            let index = questionsClone.findIndex(item => item.id === questionId);
            questionsClone[index].answers = questionsClone[index].answers.filter(item => item.id !== answerId)
            setQuestions(questionsClone);
        }
    }

    const handleOnchange = (type, questionId, value) => {
        if (type === 'QUESTION') {
            let questionsClone = _.cloneDeep(questions)
            let index = questionsClone.findIndex(item => item.id === questionId);
            if (index > -1) {
                questionsClone[index].description = value
                setQuestions(questionsClone);
            }
        }
    }

    const handleOnchangeFileQuestion = (questionId, event) => {
        let questionsClone = _.cloneDeep(questions)
        let index = questionsClone.findIndex(item => item.id === questionId);
        if (index > -1 && event.target && event.target.files && event.target.files[0]) {
            questionsClone[index].imageFile = event.target.files[0];
            questionsClone[index].imageName = event.target.files[0].name;
            setQuestions(questionsClone);
        }
    }

    const handleAnswersQuestion = (type, answerId, questionId, value) => {
        let questionsClone = _.cloneDeep(questions)
        let index = questionsClone.findIndex(item => item.id === questionId);
        if (index > -1) {
            questionsClone[index].answers = questionsClone[index].answers.map(answers => {
                if (answers.id === answerId) {
                    if (type === 'CHECKBOX') {
                        answers.isCorrect = value;
                    }
                    if (type === 'INPUT') {
                        answers.description = value;
                    }
                }
                return answers;
            })
            setQuestions(questionsClone);
        }
    }

    const handleSubmitQuestionForQuiz = () => {
        alert('me')
    }

    const handlePreviewImage = (questionId) => {
        let questionsClone = _.cloneDeep(questions)
        let index = questionsClone.findIndex(item => item.id === questionId);
        if (index > -1) {
            setDataImagePreview({
                url: URL.createObjectURL(questionsClone[index].imageFile),
                title: questionsClone[index].imageName
            })
            setIsPreviewImage(true)
        }
    }

    return (
        <div className="questions-container">
            <div className="title">
                Manage Question
            </div>
            <hr />
            <div className="add-new-question">
                <div className='col-6 form -group'>
                    <label className='mb-2'>Select Quiz</label>
                    <Select
                        value={selectedQuiz}
                        onChange={setSelectedQuiz}
                        options={options}
                    />
                </div>
                <div className='mt-3 mb-2'>
                    Add question:
                </div>
                {questions && questions.length > 0 &&
                    questions.map((question, index) => {
                        return (
                            <div key={question.id} className='qmain mb-4'>
                                <div className='question-content'>
                                    <div className="form-floating description">
                                        <input
                                            value={question.description}
                                            type="text"
                                            className="form-control"
                                            placeholder="name@example.com"
                                            onChange={(event) => handleOnchange('QUESTION', question.id, event.target.value)}
                                        />
                                        <label>Question {index + 1} 's Description</label>
                                    </div>
                                    <div className='group-upload'>
                                        <label htmlFor={`${question.id}`}>
                                            <RiImageAddFill className='label-up' />
                                        </label>
                                        <input
                                            id={`${question.id}`}
                                            onChange={(event) => handleOnchangeFileQuestion(question.id, event)}
                                            type='file'
                                            hidden />
                                        <span>
                                            {question.imageName ?
                                                <span style={{ cursor: 'pointer' }} onClick={() => handlePreviewImage(question.id)}>
                                                    {question.imageName}
                                                </span>
                                                : '0 file is uploaded'}
                                        </span>
                                    </div>
                                    <div className='btn-add'>
                                        <span onClick={() => handleAddRemoveQuestion('ADD', '')}>
                                            <BsFillPatchPlusFill className='icon-add' />
                                        </span>
                                        {questions.length > 1 &&
                                            <span onClick={() => handleAddRemoveQuestion('REMOVE', question.id)}>
                                                <BsFillPatchMinusFill className='icon-remove' />
                                            </span>
                                        }
                                    </div>
                                </div>

                                {question.answers && question.answers.length > 0 &&
                                    question.answers.map((answers, index) => {
                                        return (
                                            <div key={answers.id} className='answers-content'>
                                                <input
                                                    className="form-check-input iscorrect"
                                                    type="checkbox"
                                                    checked={answers.isCorrect}
                                                    onChange={(event) => handleAnswersQuestion('CHECKBOX', answers.id, question.id, event.target.checked)}
                                                />
                                                <div className="form-floating anwser-name">
                                                    <input
                                                        value={answers.description}
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="name@example.com"
                                                        onChange={(event) => handleAnswersQuestion('INPUT', answers.id, question.id, event.target.value)}
                                                    />
                                                    <label>Ansers {index + 1}</label>
                                                </div>
                                                <div className='btn-group'>
                                                    <span onClick={() => handleAddRemoveAnswers('ADD', question.id)}>
                                                        <FiPlusCircle className='icon-add' />
                                                    </span>
                                                    {question.answers.length > 1 &&
                                                        <span onClick={() => handleAddRemoveAnswers('REMOVE', question.id, answers.id)}>
                                                            <FiMinusCircle className='icon-remove' />
                                                        </span>
                                                    }
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        )
                    })
                }
                {
                    questions && questions.length > 0 &&
                    <div>
                        <button onClick={() => handleSubmitQuestionForQuiz()} className='btn btn-warning'>Save Question</button>
                    </div>
                }

                {isPreviewImage === true &&
                    <Lightbox
                        onClose={() => setIsPreviewImage(false)}
                        image={dataImagePreview.url} // preview image
                        title={dataImagePreview.title}
                    >
                    </Lightbox>
                }
            </div>

        </div>
    )
}

export default Questions;