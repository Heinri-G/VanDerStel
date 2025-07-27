import React, { useState } from 'react';
import SentenceTest from '../SentenceTest/SentenceTest';
import './SentenceTestSection.css';

/**
 * Props:
 * - tests: Array<{ fullSentence, wordsToOmit, correctAnswers, wordsToHint, fixedPrefixWidth }>
 */
export default function SentenceTestSection({ tests }) {
  const [answers, setAnswers] = useState(tests.map(test => Array(test.wordsToOmit.length).fill('')));
  const [correctness, setCorrectness] = useState(tests.map(test => Array(test.wordsToOmit.length).fill(null)));
  const [checked, setChecked] = useState(false);

  const handleInputChange = (testIdx, inputIdx, value) => {
    const newAnswers = answers.map(arr => [...arr]);
    newAnswers[testIdx][inputIdx] = value;
    setAnswers(newAnswers);
    if (checked) {
      const newCorrectness = correctness.map(arr => arr.map(() => null));
      setCorrectness(newCorrectness);
      setChecked(false);
    }
  };

  const handleCheck = () => {
    const newCorrectness = tests.map((test, testIdx) =>
      test.correctAnswers.map((correct, inputIdx) => {
        const val = answers[testIdx][inputIdx];
        if (!val) return 'empty';
        if (val.trim().toLowerCase() === correct.trim().toLowerCase()) return 'correct';
        return 'incorrect';
      })
    );
    setCorrectness(newCorrectness);
    setChecked(true);
  };

  const total = tests.reduce((sum, test) => sum + test.wordsToOmit.length, 0);
  const correctCount = correctness.flat().filter(c => c === 'correct').length;

  return (
    <div className="sentence-section-container">
      {tests.map((test, testIdx) => (
        <SentenceTest
          key={testIdx}
          fullSentence={test.fullSentence}
          wordsToOmit={test.wordsToOmit}
          wordsToHint={test.wordsToHint}
          fixedPrefixWidth={test.fixedPrefixWidth}
          values={answers[testIdx]}
          correctness={correctness[testIdx]}
          onInputChange={(inputIdx, value) => handleInputChange(testIdx, inputIdx, value)}
        />
      ))}
      <div className="sentence-section-actions">
        <button onClick={handleCheck}>Check</button>
        <span className="sentence-section-summary">{checked ? `${correctCount}/${total}` : ''}</span>
      </div>
    </div>
  );
}
