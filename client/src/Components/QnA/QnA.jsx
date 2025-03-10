import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import styled from 'styled-components';

import SearchQnA from './SearchQnA.jsx';
import QuestionsList from './QuestionsList.jsx';
import QuestionModal from './QuestionModal.jsx';
import { TrackerContext } from '../../Tools/clickTracker';


const QnA = ({ product }) => {

  const [questions, setQuestions] = useState([]);
  const [showQModal, setShowQModal] = useState(false);
  const tracker = useContext(TrackerContext);

  useEffect(() => {
    if (product.id !== undefined) {
      axios.get(`/qa/questions?product_id=${product.id}`)
        .then(results => setQuestions(results.data.results))
        .catch(err => console.log('questions error', err));
    }
  }, [product]);

  return (
    <QFeatureContainer onClick={e => tracker(e.target, 'Questions & Answers')}>
      <Heading2>Questions & Answers</Heading2>
      <QuestionsList questionsList={questions} name={product.name} showQModal={showQModal} setShowQModal={setShowQModal} />
      {showQModal ? <QuestionModal productID={product.id} name={product.name} showQModal={showQModal} setShowQModal={setShowQModal} questions={questions} setQuestions={setQuestions}></QuestionModal> : null}
    </QFeatureContainer>
  );
};

export default QnA;

const Heading2 = styled.h2`
`;

const QFeatureContainer = styled.div`

`;