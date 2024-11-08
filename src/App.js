  import React, { useState, useEffect } from 'react';
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
    const [summaryByOwnReviews, setSummaryByOwnReviews] = useState(''); // Новый стейт для SummaryByOwnReviews
    const [compatibility, setCompatibility] = useState('');

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

    // New states for descriptions
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

        // Map `scoreCriteria` data to corresponding state variables
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
        setSelfSummary(data.selfSummary || 'Self-review not provided');
        setSummaryByOwnReviews(data.summaryByOwnReviews || 'No summary by own reviews provided'); // Устанавливаем SummaryByOwnReviews
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const handleCompare = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/get/opinion?currentId=${idInput}&researchId=${compareIdInput}`);
        if (!response.ok) throw new Error('Failed to fetch compatibility data');
        const data = await response.json();
        console.log(data); // Добавьте это для проверки данных
        setCompatibility(data);
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
            <button type="button"  style={{marginTop:"20px",fontSize:"20px"}} className="toggle-button" onClick={handleSearch}>Поиск</button>
          </div>
        </div>

        <div className="progress-section">
          <div className="progress" style={{ backgroundColor: '#EF798A',height:"30px" , marginTop:"20px"}}>
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
          <p style={{ marginTop: "20px", fontSize: "21px" }}>
    <span className="positive-text">{positiveCount} положительных</span>,{" "}
    {negativeCount}   отрицательных 
  </p>
        </div>

        <div className="chart-score-container">
          <div className="score-conclusion-container" style={{width:"800px" ,backgroundColor:"#F8F9FA" ,borderRadius:"20px"}}>
            <div className="score-display">
              <h3 className="score-title">Оценка</h3>
              <h2 className="score-value">{score}/5</h2>
            </div>
            <div className="conclusions">
              <h3>Общая характеристика</h3>
              <p className="conclusion" style={{textAlign:"justify"}}>{conclusion}</p>
            </div>
          </div>
          <div className="radar-chart-wrapper">
            <RadarChart data={[leadership, communication, problemSolving, teamwork, adaptability]} />
          </div>
        </div>

        <div className="evaluation-sections">
          {[
            { label: 'Лидерство', score: leadership, description: leadershipDescription, key: 'leadership' },
            { label: 'Коммуникативность', score: communication, description: communicationDescription, key: 'communication' },
            { label: 'Решение проблем', score: problemSolving, description: problemSolvingDescription, key: 'problemSolving' },
            { label: 'Командная работа', score: teamwork, description: teamworkDescription, key: 'teamwork' },
            { label: 'Адаптивность', score: adaptability, description: adaptabilityDescription, key: 'adaptability' },
          ].map(({ label, score, description, key }) => (
            <div key={key} className="evaluation-section" style={{marginBottom:"20px"}}> 
              <div className="section-header">
                <h3>{label} {score}/5</h3>
                <button className="toggle-button" onClick={() => toggleSection(key)}>
                  {expandedSections[key] ? 'Скрыть' : 'Подробнее'} 
                </button>
              </div>
              {expandedSections[key] && (
                <div className="evaluation-content">
                  <p style={{textAlign:"justify"}} >{description || "Нет инф."}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="columns-container" style={{marginTop:"100px"}} >
        <div className="column positive-column">
      <h3>Позитивные качества</h3>
      <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
          <li>{positiveQuality}</li>
      </ul>
  </div>
  <div className="column negative-column">
      <h3>Негативные качества</h3>
      <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
          <li>{negativeQuality}</li>
      </ul>
  </div>

        </div>

        <div className="compatibility-section" style={{marginTop:"100px"}} >
          <h3 style={{color:"#3554B9"}}>Самооценивание</h3>
          <p style={{textAlign:"justify"}}>{selfSummary}</p>
        </div>

        {/* Новый раздел для SummaryByOwnReviews */}
        {summaryByOwnReviews && (
          <div className="compatibility-section" /* className="summary-by-own-reviews"*/>
            <h3 style={{color:"#3554B9"}} >Мнение о колегах</h3>
            <p style={{textAlign:"justify"}}>{summaryByOwnReviews}</p>
          </div>
        )}

  <div className="compatibility-section" style={{marginTop:"40px"}} >
    <h2 style={{color:"#3554B9"}}>Совместимость</h2>
    <div className="input-section">
      <label htmlFor="compareIdInput">Сравнить с ID</label>
      <input
        type="number"
        id="compareIdInput"
        value={compareIdInput}
        onChange={(e) => setCompareIdInput(e.target.value)}
        className="form-control"
      />
      <button type="button" className="btn btn-outline-primary" style={{marginTop:"20px", fontSize:"20px"}} onClick={handleCompare}>Проверить</button>
    </div>
    {compatibility !== "" && (
      <div className="compatibility-result">
        {/* Make sure you're displaying the compatibility percentage */}
        <p style={{textAlign:"justify"}}>{compatibility}</p> {/* Add any additional text here */}
      </div>
    )}
  </div>

        
      </div>
    );
  };

  export default App;
