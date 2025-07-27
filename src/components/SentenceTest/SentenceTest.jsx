import React, { useState } from 'react';
import './SentenceTest.css';

/**
 * Props:
 * {
 *   fullSentence: string,
 *   wordsToOmit: string[],
 *   wordsToHint: string[],
 *   fixedPrefixWidth,
 *   values,
 *   correctness,
 *   onInputChange
 * }
 */
export default function SentenceTest({ fullSentence, wordsToOmit = [], wordsToHint = [], fixedPrefixWidth, values, correctness, onInputChange }) {
  const words = fullSentence.split(' ');
  const [inputs, setInputs] = useState(Array(wordsToOmit.length).fill(''));
  const useControlled = values && onInputChange;
  const inputValues = useControlled ? values : inputs;

  let omitIndex = 0;
  const sentenceDisplay = words.map((word, idx) => {
    if (wordsToOmit.includes(word)) {
      const inputIdx = omitIndex;
      omitIndex++;
      let correctnessClass = '';
      if (correctness && correctness[inputIdx]) {
        correctnessClass = correctness[inputIdx];
      }
      return (
        <input
          key={idx}
          type="text"
          value={inputValues[inputIdx]}
          onChange={e => {
            if (useControlled) {
              onInputChange(inputIdx, e.target.value);
            } else {
              const newInputs = [...inputs];
              newInputs[inputIdx] = e.target.value;
              setInputs(newInputs);
            }
          }}
          className={`sentence-test-input${correctnessClass ? ' ' + correctnessClass : ''}`}
          style={{ width: Math.max(4, word.length + 2) + 'ch' }}
        />
      );
    }
    if (idx === 0 && fixedPrefixWidth) {
      return (
        <span key={idx} className="sentence-test-word sentence-test-prefix" style={{ minWidth: fixedPrefixWidth }}>{word}</span>
      );
    }
    return <span key={idx} className="sentence-test-word">{word}</span>;
  });

  return (
    <div className="sentence-test-container">
      <div className="sentence-test-sentence">
        {sentenceDisplay}
      </div>
      {wordsToHint.length > 0 && (
        <div className="sentence-test-hints">
          Hints: [
          {wordsToHint.join(', ')}
          ]
        </div>
      )}
    </div>
  );
}
