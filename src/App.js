import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import RadarChart from './RadarChart';

const App = () => {
  const [idInput, setIdInput] = useState('');
  const [compareIdInput, setCompareIdInput] = useState('');
  const [score, setScore] = useState(0);
  const [conclusion, setConclusion] = useState('');
  const [positiveCount, setPositiveCount] = useState(0);
  const [negativeCount, setNegativeCount] = useState(0);
  const [positiveQuality, setPositiveQuality] = useState('');
  const [negativeQuality, setNegativeQuality] = useState('');
  const [selfSummary, setSelfSummary] = useState('');
  const [compatibility, setCompatibility] = useState(null);
  const [expandedSections, setExpandedSections] = useState({
    leadership: false,
    communication: false,
    problemSolving: false,
    teamwork: false,
    adaptability: false,
  });
  const [isDataLoaded, setIsDataLoaded] = useState(false); // State to check if data is loaded

  const [leadership, setLeadership] = useState(0);
  const [communication, setCommunication] = useState(0);
  const [problemSolving, setProblemSolving] = useState(0);
  const [teamwork, setTeamwork] = useState(0);
  const [adaptability, setAdaptability] = useState(0);
  const [positiveReviewPercentage, setPositiveReviewPercentage] = useState(0);

  const [leadershipDescription, setLeadershipDescription] = useState('');
  const [communicationDescription, setCommunicationDescription] = useState('');
  const [problemSolvingDescription, setProblemSolvingDescription] = useState('');
  const [teamworkDescription, setTeamworkDescription] = useState('');
  const [adaptabilityDescription, setAdaptabilityDescription] = useState('');

  const handleSearch = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/get/summary?id=${idInput}`);
      if (!response.ok) throw new Error('Failed to fetch data');
      const data = await response.json();

      setScore(data.score);
      setConclusion(data.summary);
      setPositiveCount(data.positiveReviewCount || 0);
      setNegativeCount((data.allReviewCount || 0) - (data.positiveReviewCount || 0));
      setPositiveReviewPercentage(
        data.allReviewCount ? ((data.positiveReviewCount / data.allReviewCount) * 100) : 0
      );

      data.scoreCriteria.forEach(criteria => {
        switch (criteria.type) {
          case 0:
            setLeadership(criteria.score);
            setLeadershipDescription(criteria.description);
            break;
          case 1:
            setCommunication(criteria.score);
            setCommunicationDescription(criteria.description);
            break;
          case 2:
            setProblemSolving(criteria.score);
            setProblemSolvingDescription(criteria.description);
            break;
          case 3:
            setTeamwork(criteria.score);
            setTeamworkDescription(criteria.description);
            break;
          case 4:
            setAdaptability(criteria.score);
            setAdaptabilityDescription(criteria.description);
            break;
          default:
            break;
        }
      });

      setPositiveQuality(data.positiveQuality || 'Позитивные качества не указаны');
      setNegativeQuality(data.negativeQuality || 'Негативные качества не указаны');
      setSelfSummary(data.selfSummary || 'Самооценка не предоставлена');
      
      setIsDataLoaded(true); // Set data loaded to true after successful fetch
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsDataLoaded(false); // Reset if fetch fails
    }
  };

  const handleCompare = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/get/compatibility?id1=${idInput}&id2=${compareIdInput}`);
      if (!response.ok) throw new Error('Failed to fetch compatibility data');
      const data = await response.json();
      setCompatibility(data.compatibility);
    } catch (error) {
      console.error("Error fetching compatibility data:", error);
      setCompatibility(null);
    }
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <div className="container">
      <div className="header-section">
        <h1>ScoreWorker</h1>
        <div className="input-section">
          <label htmlFor="idInput">ID:</label>
          <input
            type="number"
            id="idInput"
            value={idInput}
            onChange={(e) => setIdInput(e.target.value)}
            className="form-control id-input"
          />
          <button type="button" className="btn btn-outline-light" onClick={handleSearch}>Поиск</button>
        </div>
      </div>

      {/* Conditionally render progress bar and review counts only if data is loaded */}
      {isDataLoaded && (
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
              {positiveReviewPercentage.toFixed(1)}% Положительный
            </div>
          </div>
          <p>{positiveCount} положительных отзывов, {negativeCount} отрицательных отзывов</p>
        </div>
      )}

      {/* Conditionally render score and conclusion only if data is loaded */}
      {isDataLoaded && (
        <div className="chart-score-container">
          <div className="score-conclusion-container">
            <div className="score-display">
              <h3 className="score-title">Оценка</h3>
              <h2 className="score-value">{score}/5</h2>
            </div>
            <div className="conclusions">
              <h3>Общая характеристика:</h3>
              <p className="conclusion">{conclusion}</p>
            </div>
          </div>
          <div className="radar-chart-wrapper">
            <RadarChart data={[leadership, communication, problemSolving, teamwork, adaptability]} />
          </div>
        </div>
      )}

      {/* Additional sections go here */}

    </div>
  );
};

export default App;
