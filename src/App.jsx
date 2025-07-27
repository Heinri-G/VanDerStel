import { useState } from 'react'
import SentenceTestSection from './components/SentenceTestSection/SentenceTestSection'
import { presentTenseExamples } from './resources/present_tense_examples'
import { perfectumExamples } from './resources/perfectum_examples'
import { impefectumExamples } from './resources/imperfectum_examples'
import './App.css'

function getRandomExamples(examples, n) {
  return [...examples].sort(() => Math.random() - 0.5).slice(0, n);
}

function getNewExamples(examples, n, current) {
  // Exclude current examples by fullSentence property
  const currentSentences = new Set(current.map(e => e.fullSentence));
  const filtered = examples.filter(e => !currentSentences.has(e.fullSentence));
  if (filtered.length >= n) {
    return [...filtered].sort(() => Math.random() - 0.5).slice(0, n);
  } else {
    // Not enough unique, just shuffle all
    return getRandomExamples(examples, n);
  }
}

function App() {
  const [presentExamples, setPresentExamples] = useState(getRandomExamples(presentTenseExamples, 5));
  const [perfectumExamplesState, setPerfectumExamples] = useState(getRandomExamples(perfectumExamples, 5));
  const [imperfectumExamplesState, setImperfectumExamples] = useState(getRandomExamples(impefectumExamples, 5));

  return (
    <>
      {/* Removed Vite and React logos */}
      <h2>Dutch Language Learning App</h2>
      {/* Removed counter and card */}


      <div className="section-block">
        <h3>To Be (zijn)</h3>
        <SentenceTestSection
          tests={[
            { fullSentence: "Ik ben", wordsToOmit: ["ben"], correctAnswers: ["ben"], wordsToHint: [], fixedPrefixWidth: "80px" },
            { fullSentence: "Jij/u bent", wordsToOmit: ["bent"], correctAnswers: ["bent"], wordsToHint: [], fixedPrefixWidth: "80px" },
            { fullSentence: "Hij/zij is", wordsToOmit: ["is"], correctAnswers: ["is"], wordsToHint: [], fixedPrefixWidth: "80px" },
            { fullSentence: "Wij zijn", wordsToOmit: ["zijn"], correctAnswers: ["zijn"], wordsToHint: [], fixedPrefixWidth: "80px" },
            { fullSentence: "Jullie zijn", wordsToOmit: ["zijn"], correctAnswers: ["zijn"], wordsToHint: [], fixedPrefixWidth: "80px" },
            { fullSentence: "Zij zijn", wordsToOmit: ["zijn"], correctAnswers: ["zijn"], wordsToHint: [], fixedPrefixWidth: "80px" },
          ]}
        />
      </div>

      <hr className="section-separator" />
      <div className="section-block">
        <h3>To Have (hebben)</h3>
        <SentenceTestSection
          tests={[
            { fullSentence: "Ik heb", wordsToOmit: ["heb"], correctAnswers: ["heb"], wordsToHint: [], fixedPrefixWidth: "80px" },
            { fullSentence: "Jij/u hebt", wordsToOmit: ["hebt"], correctAnswers: ["hebt"], wordsToHint: [], fixedPrefixWidth: "80px" },
            { fullSentence: "Hij/zij heeft", wordsToOmit: ["heeft"], correctAnswers: ["heeft"], wordsToHint: [], fixedPrefixWidth: "80px" },
            { fullSentence: "Wij hebben", wordsToOmit: ["hebben"], correctAnswers: ["hebben"], wordsToHint: [], fixedPrefixWidth: "80px" },
            { fullSentence: "Jullie hebben", wordsToOmit: ["hebben"], correctAnswers: ["hebben"], wordsToHint: [], fixedPrefixWidth: "80px" },
            { fullSentence: "Zij hebben", wordsToOmit: ["hebben"], correctAnswers: ["hebben"], wordsToHint: [], fixedPrefixWidth: "80px" },
          ]}
        />
      </div>

      <hr className="section-separator" />
      <div className="section-block">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
          <h3 style={{ margin: 0 }}>Present tense</h3>
          <button className="refresh-btn" title="Refresh examples" style={{ marginLeft: 8 }} onClick={() => setPresentExamples(getNewExamples(presentTenseExamples, 5, presentExamples))}>🔄</button>
        </div>
        <SentenceTestSection tests={presentExamples} />
      </div>
      
      <hr className="section-separator" />
      <div className="section-block">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px'}}>
          <h3 style={{ margin: 0 }}>Perfectum</h3>
          <button className="refresh-btn" title="Refresh examples" style={{ marginLeft: 8 }} onClick={() => setPerfectumExamples(getNewExamples(perfectumExamples, 5, perfectumExamplesState))}>🔄</button>
        </div>
        <SentenceTestSection tests={perfectumExamplesState} />
      </div>

      <hr className="section-separator" />
      <div className="section-block">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
          <h3 style={{ margin: 0 }}>Imperfectum</h3>
          <button className="refresh-btn" title="Refresh examples" style={{ marginLeft: 8 }} onClick={() => setImperfectumExamples(getNewExamples(impefectumExamples, 5, imperfectumExamplesState))}>🔄</button>
        </div>
        <SentenceTestSection tests={imperfectumExamplesState} />
      </div>

    </>
  )
}

export default App
