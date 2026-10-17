import { useEffect, useState } from 'react';
import { Trophy, Target, Eye, Heart, Award } from 'lucide-react';
import { 
  getGamificationData,
  getCurrentLevel, 
  getNextLevel, 
  getLevelProgress, 
  getUnlockedAchievements,
  getAllAchievements 
} from '../utils/gamification';
import './ExplorerCard.css';

export default function ExplorerCard() {
  const [level, setLevel] = useState(null);
  const [nextLevel, setNextLevel] = useState(null);
  const [progress, setProgress] = useState(null);
  const [unlockedAchievements, setUnlockedAchievements] = useState([]);
  const [allAchievements, setAllAchievements] = useState([]);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const gamificationData = getGamificationData();
    setStats(gamificationData);
    setLevel(getCurrentLevel());
    setNextLevel(getNextLevel());
    setProgress(getLevelProgress());
    setUnlockedAchievements(getUnlockedAchievements());
    setAllAchievements(getAllAchievements());
  }, []);

  if (!level || !stats) return null;

  return (
    <div className="explorer-card">
      <div className="explorer-header">
        <div className="explorer-badge">{level.badge}</div>
        <div className="explorer-level-info">
          <h3>Level {level.level}</h3>
          <p>{level.title}</p>
        </div>
      </div>

      <div className="explorer-stats">
        <div className="explorer-stat">
          <Target size={16} strokeWidth={2} />
          <span>{stats.xp} XP</span>
        </div>
        <div className="explorer-stat">
          <Eye size={16} strokeWidth={2} />
          <span>{stats.views} views</span>
        </div>
        <div className="explorer-stat">
          <Heart size={16} strokeWidth={2} />
          <span>{stats.favorites} favorites</span>
        </div>
        <div className="explorer-stat">
          <Award size={16} strokeWidth={2} />
          <span>{unlockedAchievements.length} achievements</span>
        </div>
      </div>

      {nextLevel && (
        <div className="explorer-progress">
          <div className="progress-label">
            <span>Level {level.level}</span>
            <span>Level {nextLevel.level}: {nextLevel.title}</span>
          </div>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${progress.percentage}%` }}
            />
          </div>
          <div className="progress-text">{progress.percentage}%</div>
        </div>
      )}

      <div className="explorer-achievements">
        <h4>Achievements</h4>
        <div className="achievements-grid">
          {allAchievements.slice(0, 6).map(achievement => (
            <div 
              key={achievement.id}
              className={`achievement-item ${achievement.unlocked ? 'achievement-unlocked' : 'achievement-locked'}`}
              title={achievement.description}
            >
              <span className="achievement-icon">{achievement.icon}</span>
              <span className="achievement-name">{achievement.title}</span>
              {achievement.unlocked && <Trophy size={12} strokeWidth={2} className="achievement-check" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
