import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function QuizScreen({ category, close }) {
  const token = useSelector((state) => state.token.value);
  const questionAPI = `https://opentdb.com/api.php?amount=1&category=${category}&token=${token}`;
  const [questions, setQuestions] = useState([]);
  const [options, setOptions] = useState([]);
  const getQuestion = () => {
    fetch(questionAPI, {
      method: "GET",
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setQuestions(data.results);
        setOptions(
          [
            ...data.results[0].incorrect_answers,
            data.results[0].correct_answer,
          ].sort(() => Math.random() - 0.5)
        );
      });
  };
  useEffect(() => {
    const getQuestion = () => {
      fetch(questionAPI, {
        method: "GET",
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setQuestions(data.results);
          setOptions(
            [
              ...data.results[0].incorrect_answers,
              data.results[0].correct_answer,
            ].sort(() => Math.random() - 0.5)
          );
        });
    };
    getQuestion();
  }, []);

  const optionClick = (option) => {
    if (option === questions[0].correct_answer) {
      getQuestion();
    }
  };

  return (
    <div>
      <div onClick={close}>Go Back</div>
      <div>
        <div>{questions[0]?.question}</div>
      </div>
      {options.map((option) => {
        return (
          <div onClick={() => optionClick(option)} key={option}>
            <div>{option}</div>
          </div>
        );
      })}

      <div onClick={getQuestion}>Next</div>
    </div>
  );
}
