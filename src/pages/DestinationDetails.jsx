import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Wallet, MapPin, Clock, Star, Sun, Calendar, Lightbulb, ThumbsUp, ThumbsDown, MessageSquarePlus } from "lucide-react";
import { getSession } from '../utils/auth';
import { getTipsForDestination, addTip, voteTip, isVerifiedTraveler } from '../utils/tipsManager';
import { recordView, recordTipSubmission, checkAchievements } from '../utils/gamification';
import "./DestinationDetails.css";

export default function DestinationDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const destination = location.state;
  const session = getSession();

  const [localTips, setLocalTips] = useState([]);
  const [showTipForm, setShowTipForm] = useState(false);
  const [tipCategory, setTipCategory] = useState('');
  const [tipContent, setTipContent] = useState('');

  // Load local tips for this destination
  useEffect(() => {
    if (destination?.id) {
      setLocalTips(getTipsForDestination(destination.id));
    }
  }, [destination?.id]);

  // Record view for gamification
  useEffect(() => {
    if (destination?.id) {
      recordView();
    }
  }, [destination?.id]);

  const handleAddTip = (e) => {
    e.preventDefault();
    if (!tipCategory || !tipContent) return;

    addTip({
      destinationId: destination.id,
      destinationName: destination.place,
      category: tipCategory,
      content: tipContent,
      author: session?.name || 'Anonymous Explorer',
    });

    recordTipSubmission();
    checkAchievements();

    setTipCategory('');
    setTipContent('');
    setShowTipForm(false);
    setLocalTips(getTipsForDestination(destination.id));
  };

  const handleVote = (tipId, helpful) => {
    voteTip(tipId, helpful);
    setLocalTips(getTipsForDestination(destination.id));
  };

  if (!destination) {
    return (
      <div className="details-page details-empty">
        <div className="details-empty-box">
          <h2>No destination selected</h2>
          <button className="back-btn" onClick={() => navigate(-1)}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            Back to Results
          </button>
        </div>
      </div>
    );
  }

  // Get nearby and similar destinations from route state if available
  const nearbyAttractions = (destination.nearbyAttractions || []).slice(0, 6);
  const similarDestinations = (destination.similarDestinations || []).slice(0, 6);

  // Travel tips based on category
  const getTravelTips = (category) => {
    const tips = {
      "Nature": ["Carry water and comfortable walking shoes", "Best visited during early morning or late afternoon", "Don't forget sunscreen and insect repellent"],
      "Heritage & History": ["Hire a local guide for deeper insights", "Many sites have specific dress codes", "Visit early to avoid crowds"],
      "Sightseeing": ["Start early to make the most of your day", "Keep your camera charged", "Carry snacks and water"],
      "Culture & Religion": ["Dress modestly", "Remove footwear before entering temples", "Respect local customs and traditions"],
      "Adventure": ["Wear appropriate safety gear", "Book activities in advance during peak season", "Carry a first-aid kit"],
      "Shopping": ["Carry cash for smaller vendors", "Bargaining is common in local markets", "Check for authenticity of products"],
    };
    return tips[category] || ["Plan your visit ahead", "Check local weather conditions", "Carry essentials"];
  };

  const travelTips = getTravelTips(destination.category);

  const stats = [
    { label: "State", value: destination.state, icon: MapPin },
    { label: "City", value: destination.city, icon: MapPin },
    { label: "Category", value: destination.category, icon: Star },
    { label: "Visit Duration", value: `${destination.visitHours} hour${destination.visitHours > 1 ? 's' : ''}`, icon: Clock },
    { label: "Rating", value: `${destination.rating} / 5`, icon: Star },
    { label: "Entry Fee", value: destination.estimatedCost === 0 ? "Free" : `₹${destination.estimatedCost}`, icon: Wallet },
  ];

  return (
    <div className="details-page">
      <div className="details-container">
        <div className="details-hero">
          <div className="details-hero-overlay" />

          <button className="back-btn" onClick={() => navigate(-1)}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            Back to Results
          </button>

          <div className="details-hero-content">
            <p className="details-eyebrow">Your next escape</p>
            <h1>{destination.place}</h1>
            <p className="details-location">
              {destination.city}, {destination.state}
            </p>
          </div>
        </div>

        <div className="details-body">
          <div className="details-section-heading">
            <div>
              <p className="details-kicker">Trip snapshot</p>
              <h2>Everything at a glance</h2>
            </div>
            <span className="details-score">{destination.rating} <span>/ 5</span></span>
          </div>
          <div className="stats-grid">
            {stats.map((s) => (
              <div className="stat-chip" key={s.label}>
                {s.icon && <s.icon size={16} strokeWidth={2} className="stat-icon" />}
                <span className="stat-label">{s.label}</span>
                <span className="stat-value">{s.value}</span>
              </div>
            ))}
          </div>

          <div className="about-box">
            <p className="details-kicker">About this place</p>
            <h3>{destination.place}</h3>
            <p>
              Located in {destination.city}, {destination.state}, this {destination.category.toLowerCase()} destination
              offers a unique experience. Perfect for {destination.tripTypes?.join(', ').toLowerCase()} trips.
            </p>
          </div>

          {travelTips.length > 0 && (
            <div className="tips-box">
              <p className="details-kicker">Travel tips</p>
              <h3>Make the most of your visit</h3>
              <ul className="tips-list">
                {travelTips.map((tip, index) => (
                  <li key={index}>{tip}</li>
                ))}
              </ul>
            </div>
          )}

          {nearbyAttractions.length > 0 && (
            <div className="nearby-box">
              <p className="details-kicker">Nearby attractions</p>
              <h3>Explore more in {destination.city}</h3>
              <div className="nearby-grid">
                {nearbyAttractions.map((attr) => (
                  <div key={attr.id} className="nearby-card">
                    <h4>{attr.place}</h4>
                    <p>{attr.category}</p>
                    <span className="nearby-rating">⭐ {attr.rating}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {similarDestinations.length > 0 && (
            <div className="similar-box">
              <p className="details-kicker">Similar destinations</p>
              <h3>More {destination.category} experiences</h3>
              <div className="similar-grid">
                {similarDestinations.map((dest) => (
                  <div key={dest.id} className="similar-card">
                    <h4>{dest.place}</h4>
                    <p>{dest.city}, {dest.state}</p>
                    <span className="similar-rating">⭐ {dest.rating}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="local-tips-box">
            <p className="details-kicker">Local tips from community</p>
            <h3>What travelers say</h3>
            
            {localTips.length > 0 ? (
              <div className="tips-list">
                {localTips.slice(0, 5).map((tip) => (
                  <div key={tip.id} className="tip-card">
                    <div className="tip-header">
                      <span className="tip-category">{tip.category}</span>
                      <span className="tip-author">
                        {isVerifiedTraveler(tip.author) && <span className="verified-badge">✓</span>}
                        {tip.author}
                      </span>
                    </div>
                    <p className="tip-content">{tip.content}</p>
                    <div className="tip-actions">
                      <button 
                        className="tip-vote tip-vote-up"
                        onClick={() => handleVote(tip.id, true)}
                      >
                        <ThumbsUp size={14} strokeWidth={2} />
                        {tip.helpful > 0 && <span>{tip.helpful}</span>}
                      </button>
                      <button 
                        className="tip-vote tip-vote-down"
                        onClick={() => handleVote(tip.id, false)}
                      >
                        <ThumbsDown size={14} strokeWidth={2} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="no-tips">No tips yet. Be the first to share your experience!</p>
            )}

            <button 
              className="add-tip-btn"
              onClick={() => setShowTipForm(!showTipForm)}
            >
              <MessageSquarePlus size={16} strokeWidth={2} />
              Share a tip
            </button>

            {showTipForm && (
              <form className="tip-form" onSubmit={handleAddTip}>
                <select
                  value={tipCategory}
                  onChange={(e) => setTipCategory(e.target.value)}
                  required
                >
                  <option value="">Select category</option>
                  <option>Best Time to Visit</option>
                  <option>What to Skip</option>
                  <option>Local Secret</option>
                  <option>Budget Tip</option>
                  <option>Safety Advice</option>
                  <option>Food Recommendation</option>
                </select>
                <textarea
                  value={tipContent}
                  onChange={(e) => setTipContent(e.target.value)}
                  placeholder="Share your tip..."
                  required
                  rows={3}
                />
                <div className="tip-form-actions">
                  <button type="button" onClick={() => setShowTipForm(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="tip-submit">
                    Submit tip
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
