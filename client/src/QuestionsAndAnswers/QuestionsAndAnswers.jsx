import React, { useState, useEffect } from 'react';
import QASearch from './QASearch.jsx';
import QAList from './QAList.jsx';
import './qa-styles.css';

const axios = require('axios');

const chosenId = 40355;

function QuestionsAndAnswers() {
  const [qaData, setQAData] = useState([]);
  const [qs, setQs] = useState([]);
  const [displayQs, setDisplayQs] = useState([]);
  const [qsLeft, setQsLeft] = useState(0);
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    if (keyword.length >= 3) {
      const results = qaData.filter((q) => q.question_body.toLowerCase().includes(keyword.toLowerCase()));
      setQs(results);
      setDisplayQs(results.slice(0, 2));
    } else {
      setQs(qaData);
      setDisplayQs(qaData.slice(0, 2));
    }
  }, [keyword]);


  function handleLoad() {
    setDisplayQs([...displayQs, ...qs.slice(displayQs.length, displayQs.length + 2)]);
  }

  useEffect(() => {
    axios.get('/qa/questions', { params: { product_id: chosenId, count: 100 } })
      .then((res) => {
        setQAData(res.data.results);
        setQs(res.data.results);
        setDisplayQs(res.data.results.slice(0, 2));
      })
      .catch((err) => { alert(err); });
  }, []);

  useEffect(() => {
    setQsLeft(qs.length - displayQs.length);
  }, [displayQs, qs.length]);

  return (
    <section className="section-qanda">
      <h2 className="heading heading-secondary">QUESTIONS & ANSWERS</h2>
      <QASearch keyword={keyword} setKeyword={setKeyword} />
      <QAList qs={displayQs} qsLeft={qsLeft} onHandleLoad={handleLoad} />
    </section>
  );
}

export default QuestionsAndAnswers;
