import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import AnswerEntry from './AnswerEntry.jsx';

const AnswersList = ({ question_id }) => {

  const [answersList, setAnswersList] = useState([]);
  const [showLoadMore, setShowLoadMore] = useState(false);

  // console.log('passed down answersObj', answersObj);

  useEffect(() => {
    axios.get(`/qa/questions/${question_id}/answers`)
      .then(results => setAnswersList(results.data.results))
      .catch(err => console.log('Error getting answers list', err))
  }, []);

  // console.log(answersList);

  useEffect(() => {
    setShowLoadMore(!showLoadMore);
  }, []);

  // const answersArr = [];
  // for (let key in answersObj) {
  //   answersArr.push(answersObj[key]);
  // }
  // answersArr.sort((a, b) => {
  //   return b.helpfulness - a.helpfulness;
  // });

  const handleLoadMoreAs = (e) => {
    e.preventDefault();
    setShowLoadMore(!showLoadMore);
  }

  return (
    <AnswersContainer>
      {showLoadMore && answersList
        ? answersList.map((answer, index) => {
          if (index < 2) {
            return <AnswerEntry entry={answer} key={index} />
          }
        })
        : answersList.map((answer, index) => {
          return <AnswerEntry entry={answer} key={index} />
        })}
      {showLoadMore
        ? <LoadMoreAnswers href="" onClick={handleLoadMoreAs}>LOAD MORE ANSWERS</LoadMoreAnswers>
        : <LoadMoreAnswers href="" onClick={handleLoadMoreAs}>COLLAPSE LIST</LoadMoreAnswers>}
    </AnswersContainer>
  )
}

export default AnswersList;

const AnswersContainer = styled.div`
  margin: 10px;
  display: flex;
  flex-direction: column;
`;

const LoadMoreAnswers = styled.a`
  display: block;
  margin: 10px;
  font-size: 1rem;
`;