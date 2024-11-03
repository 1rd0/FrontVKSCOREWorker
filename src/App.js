import React, { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import RadarChart from './RadarChart';

const App = () => {
  const [idInput, setIdInput] = useState('');
  const [score, setScore] = useState(0);
  const [conclusion, setConclusion] = useState('');
  const [positiveCount, setPositiveCount] = useState(0);
  const [negativeCount, setNegativeCount] = useState(0);
  const [positiveQuality, setPositiveQuality] = useState('');
  const [negativeQuality, setNegativeQuality] = useState('');
  const [selfSummary, setSelfSummary] = useState('');
  const [expandedSections, setExpandedSections] = useState({
    leadership: false,
    communication: false,
    problemSolving: false,
    teamwork: false,
    adaptability: false,
  });

  const [leadership, setLeadership] = useState(0);
  const [communication, setCommunication] = useState(0);
  const [problemSolving, setProblemSolving] = useState(0);
  const [teamwork, setTeamwork] = useState(0);
  const [adaptability, setAdaptability] = useState(0);
  const [positiveReviewPercentage, setPositiveReviewPercentage] = useState(0);

  const handleSearch = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/get/summary?id=${idInput}`);
      if (!response.ok) throw new Error('Failed to fetch data');
      const data = await response.json();

      setScore(data.score);
      setConclusion(data.summary);
      setPositiveCount(data.positiveReviewCount);
      setNegativeCount(data.AllReviewCount - data.positiveReviewCount);
      setPositiveReviewPercentage((data.positiveReviewCount / data.AllReviewCount) * 100);

      setLeadership(data.scoreCriteria.Leadership.score);
      setCommunication(data.scoreCriteria.CommunicationSkills.score);
      setProblemSolving(data.scoreCriteria.ProblemSolving.score);
      setTeamwork(data.scoreCriteria.Teamwork.score);
      setAdaptability(data.scoreCriteria.Adaptability.score);

      setPositiveQuality(data.positiveQuality || 'Позитивные качества не указаны');
      setNegativeQuality(data.negativeQuality || 'Негативные качества не указаны');
      setSelfSummary(data.selfSummary || 'Self-review not provided');
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const getEvaluationText = (section) => {
    const evaluations = {
      leadership: leadership,
      communication: communication,
      problemSolving: problemSolving,
      teamwork: teamwork,
      adaptability: adaptability,
    };
    return evaluations[section];
  };

  return (
    <div className="container">
      <div className="header-section">
        <h1>Score Evaluation</h1>
        <div className="input-section">
          <label htmlFor="idInput">ID:</label>
          <input
            type="number"
            id="idInput"
            value={idInput}
            onChange={(e) => setIdInput(e.target.value)}
            className="form-control id-input"
          />
          <button type="button" className="btn btn-outline-light" onClick={handleSearch}>Search</button>
        </div>
      </div>

      <div className="progress-section">
        <div className="progress" style={{ backgroundColor: 'red' }}>
          <div
            className="progress-bar bg-success"
            role="progressbar"
            style={{ width: `${positiveReviewPercentage}%` }}
            aria-valuenow={positiveReviewPercentage}
            aria-valuemin="0"
            aria-valuemax="100"
          >
            {positiveReviewPercentage.toFixed(1)}% Positive
          </div>
        </div>
        <p>{positiveCount} positive reviews, {negativeCount} negative reviews</p>
      </div>

      {/* Container for Radar Chart, Score, and Conclusions */}
      <div className="chart-score-container">
      <div className="chart-score-container">
  <div className="score-conclusion-container">
    <div className="score-display">
      <h3 className="score-title">Score</h3>
      <h2 className="score-value">{score}/5</h2>
    </div>
    <div className="conclusions">
      <h3>Conclusions:</h3>
      <p className="conclusion">{conclusion}</p>
    </div>
  </div>
  <div className="radar-chart-wrapper">
    <RadarChart data={[leadership, communication, problemSolving, teamwork, adaptability]} />
  </div>
</div>

      </div>

      <div className="evaluation-sections">
        {['leadership', 'communication', 'problemSolving', 'teamwork', 'adaptability'].map(section => (
          <div key={section} className="evaluation-section">
            <div className="section-header">
              <h3>{section.charAt(0).toUpperCase() + section.slice(1)} Evaluation</h3>
              <button className="toggle-button" onClick={() => toggleSection(section)}>
                {expandedSections[section] ? 'Hide' : 'Show'} Details
              </button>
            </div>
            {expandedSections[section] && (
              <div className="evaluation-content">
                <p>{getEvaluationText(section)}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="columns-container">
        <div className="column positive-column">
          <h3>Позитивные качества</h3>
          <ul>
            <li>{positiveQuality}</li>
          </ul>
        </div>
        <div className="column negative-column">
          <h3>Негативные качества</h3>
          <ul>
            <li>{negativeQuality}</li>
          </ul>
        </div>
      </div>

      <div className="selfreview">
        <h3>Self-review:</h3>
        <p>{selfSummary}</p>
      </div>
    </div>
  );
};

export default App;
