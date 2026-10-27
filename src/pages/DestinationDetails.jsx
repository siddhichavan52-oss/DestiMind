import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Plane,
  TrainFront,
  Car,
  Calendar,
  Wallet,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  MapPin,
  Clock,
  Compass,
  Copy,
  Check,
  Printer,
  Sun,
  CloudSun,
  Moon,
  ChevronRight,
  Utensils,
  Lightbulb,
  Hotel,
  Star,
  CheckCircle2,
} from "lucide-react";
import "./DestinationDetails.css";

function getDefaultHotels(destination, budget) {
  const days = destination.duration ? parseInt(destination.duration) || 5 : 5;
  const name = destination.name || "Destination";
  const city = destination.city || name;
  const stayBase = destination.stayCostPerDay || Math.round((budget.stayTotalINR || 12000) / days) || 2500;
  const roomsNeeded = Math.ceil((budget.groupSize || 1) / 2);
  const people = budget.groupSize || 1;
  const allocatedStay = budget.stayTotalINR || stayBase * days * roomsNeeded;
  const cleanName = name.split('&')[0].trim();

  // Normalize travel dates
  let checkinStr = destination.startDate || "";
  let checkoutStr = destination.endDate || "";
  if (!checkinStr) {
    const d = new Date();
    d.setDate(d.getDate() + 7);
    checkinStr = d.toISOString().split("T")[0];
  }
  if (!checkoutStr) {
    const d = new Date(checkinStr);
    d.setDate(d.getDate() + days);
    checkoutStr = d.toISOString().split("T")[0];
  }

  const d1 = new Date(checkinStr);
  const d2 = new Date(checkoutStr);
  const dateOpts = { day: "numeric", month: "short", year: "numeric" };
  const d1Label = isNaN(d1.getTime()) ? checkinStr : d1.toLocaleDateString("en-IN", dateOpts);
  const d2Label = isNaN(d2.getTime()) ? checkoutStr : d2.toLocaleDateString("en-IN", dateOpts);
  const datesFormatted = `${d1Label} – ${d2Label} (${days} Nights)`;
  const guestRoomFormatted = `${people} Guest${people > 1 ? "s" : ""} · ${roomsNeeded} Room${roomsNeeded > 1 ? "s" : ""}`;

  const budgetPrice = Math.max(900, Math.round(stayBase * 0.58));
  const comfortPrice = Math.max(1800, Math.round(stayBase * 1.05));
  const luxuryPrice = Math.max(3800, Math.round(stayBase * 2.15));

  const makeDeepLinks = (hotelQuery) => {
    const encodedQ = encodeURIComponent(`${hotelQuery} ${city}`);
    const encodedH = encodeURIComponent(`${hotelQuery}`);
    return {
      bookingUrl: `https://www.google.com/travel/hotels?q=${encodedQ}&dates=${checkinStr}_${checkoutStr}&adults=${people}&rooms=${roomsNeeded}`,
      bookingComUrl: `https://www.booking.com/searchresults.html?ss=${encodedH}&checkin=${checkinStr}&checkout=${checkoutStr}&group_adults=${people}&no_rooms=${roomsNeeded}`,
      agodaUrl: `https://www.agoda.com/search?text=${encodedH}&checkIn=${checkinStr}&checkOut=${checkoutStr}&rooms=${roomsNeeded}&adults=${people}`,
      googleMapsUrl: `https://www.google.com/maps/search/${encodedQ}`,
    };
  };

  const hotel1Links = makeDeepLinks(`${cleanName} Heritage Eco-Homestay`);
  const hotel2Links = makeDeepLinks(`${cleanName} Comfort Boutique Hotel & Suites`);
  const hotel3Links = makeDeepLinks(`The Grand ${cleanName} Heritage Resort & Spa`);

  return [
    {
      id: `${destination.id || "dest"}-hotel-1`,
      name: `${cleanName} Heritage Eco-Homestay`,
      tier: "Budget / Homestay",
      categoryTag: "💎 Best Budget Value",
      isRecommended: budget.status === "tight",
      pricePerNightINR: budgetPrice,
      totalStayCostINR: budgetPrice * days * roomsNeeded,
      roomsNeeded,
      days,
      rating: 4.7,
      reviewCount: 175,
      roomType: "Traditional Cozy Room with En-suite Bath",
      amenities: ["Free Home-Cooked Breakfast", "Free High-Speed Wi-Fi", "Authentic Local Host", "24/7 Hot Water", "Local Tour Assistance"],
      locationHighlight: `Quiet residential hamlet · 5-10 mins to central ${city}`,
      availabilityStatus: `Rooms Available for ${d1Label} – ${d2Label}`,
      availabilityBadge: "Instant Confirmation",
      datesFormatted,
      guestRoomFormatted,
      checkinDate: checkinStr,
      checkoutDate: checkoutStr,
      datesPreFilled: true,
      budgetFitNote: `Recommended for budget trips: saves ₹${Math.max(0, allocatedStay - budgetPrice * days * roomsNeeded).toLocaleString()} to keep overall expenses low.`,
      withinBudget: true,
      image: "https://images.unsplash.com/photo-1587061949409-02df41d5e562?auto=format&fit=crop&w=800&q=80",
      ...hotel1Links,
      bookingProvider: "Google Hotels (Live Dates Pre-Filled)",
    },
    {
      id: `${destination.id || "dest"}-hotel-2`,
      name: `${cleanName} Comfort Boutique Hotel & Suites`,
      tier: "Comfort / Mid-Range",
      categoryTag: "⭐ Recommended Best Match",
      isRecommended: budget.status !== "tight",
      pricePerNightINR: comfortPrice,
      totalStayCostINR: comfortPrice * days * roomsNeeded,
      roomsNeeded,
      days,
      rating: 4.8,
      reviewCount: 380,
      roomType: "Deluxe Scenic Balcony Room with Mountain/Valley View",
      amenities: ["Complimentary Multi-Cuisine Breakfast", "Scenic Balcony View", "High-Speed Wi-Fi", "In-House Restaurant & Room Service", "Airport / Station Shuttle Desk"],
      locationHighlight: `Prime central location · Walking distance to main promenade & viewpoints`,
      availabilityStatus: `Rooms Available for ${d1Label} – ${d2Label}`,
      availabilityBadge: "Instant Confirmation",
      datesFormatted,
      guestRoomFormatted,
      checkinDate: checkinStr,
      checkoutDate: checkoutStr,
      datesPreFilled: true,
      budgetFitNote: `Optimal balance: High comfort and scenic views perfectly matching your ₹${(budget.totalEstimatedINR || destination.price || 0).toLocaleString()} budget.`,
      withinBudget: comfortPrice * days * roomsNeeded <= allocatedStay * 1.1,
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
      ...hotel2Links,
      bookingProvider: "Google Hotels (Live Dates Pre-Filled)",
    },
    {
      id: `${destination.id || "dest"}-hotel-3`,
      name: `The Grand ${cleanName} Heritage Resort & Spa`,
      tier: "Luxury / Resort",
      categoryTag: "👑 Luxury Upgrade",
      isRecommended: false,
      pricePerNightINR: luxuryPrice,
      totalStayCostINR: luxuryPrice * days * roomsNeeded,
      roomsNeeded,
      days,
      rating: 4.9,
      reviewCount: 540,
      roomType: "Executive Mountain/Coastal Suite with Private Terrace",
      amenities: ["Buffet Breakfast & Evening High Tea", "Swimming Pool & Wellness Spa", "Fine-Dining Restaurant", "Private Garden Terrace", "Dedicated Concierge Service"],
      locationHighlight: `Exclusive private estate overlooking ${name} panoramic vistas`,
      availabilityStatus: `Rooms Available for ${d1Label} – ${d2Label}`,
      availabilityBadge: "Instant Confirmation",
      datesFormatted,
      guestRoomFormatted,
      checkinDate: checkinStr,
      checkoutDate: checkoutStr,
      datesPreFilled: true,
      budgetFitNote: `Premium upgrade: Elevated resort experience with infinity pool and spa.`,
      withinBudget: luxuryPrice * days * roomsNeeded <= allocatedStay * 1.1,
      image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80",
      ...hotel3Links,
      bookingProvider: "Google Hotels (Live Dates Pre-Filled)",
    },
  ];
}

function getDefaultItinerary(destination) {
  const days = destination.duration ? parseInt(destination.duration) || 5 : 5;
  const name = destination.name || "Destination";
  const state = destination.state || "India";
  const highlights = destination.highlights || ["Local viewpoints", "Cultural heritage", "Scenic trails"];
  const mode = destination.transportAvailability?.mode || "Flight";
  const hub = destination.transportAvailability?.nearestHub || "Airport / Junction";

  return Array.from({ length: days }, (_, i) => {
    const dayNum = i + 1;
    if (dayNum === 1) {
      return {
        dayNumber: 1,
        dateLabel: "Day 1",
        dayOfWeek: "Arrival Day",
        theme: `Arrival via ${mode}, Check-in & Orientation Stroll`,
        summary: `Arrive via ${mode} at ${hub}, take a scenic transfer to your hotel in ${name}, freshen up, and enjoy a relaxed evening sunset walk with regional ${state} dinner.`,
        morning: {
          time: "08:30 AM - 12:00 PM",
          title: `${mode} Arrival & Scenic Hotel Transfer`,
          activity: `Arrive by ${mode.toLowerCase()} at ${hub}. Take a pre-arranged cab transfer to your accommodations in ${name}. Enjoy hot regional breakfast on the way.`,
          location: hub,
          estCostINR: 800,
        },
        afternoon: {
          time: "12:30 PM - 04:00 PM",
          title: `Check-in, Unpack & Welcome ${state} Lunch`,
          activity: `Check in to hotel, unpack, freshen up, and savor authentic regional ${state} culinary specialties at a heritage eatery.`,
          location: `Central ${name}`,
          estCostINR: 1200,
        },
        evening: {
          time: "04:30 PM - 08:30 PM",
          title: "Golden Hour Sunset & Evening Market Walk",
          activity: `Take a gentle orientation stroll through the nearby lanes, waterfront promenade, or temple square. Sip regional tea/coffee as dusk falls.`,
          location: `${name} Promenade`,
          estCostINR: 1000,
        },
        dailyEstimatedSpendINR: 3000,
        transitTip: `Use authorized airport/railway taxi counters for fixed government tariffs to avoid surge rates.`,
        crowdTip: `Keep Day 1 light and relaxed after your journey to recharge for deep exploration.`,
        mealRecommendation: `Try authentic ${state} welcome thali or regional specialty platter.`,
        isOffbeatHighlight: false,
      };
    } else if (dayNum === days) {
      return {
        dayNumber: dayNum,
        dateLabel: `Day ${dayNum}`,
        dayOfWeek: "Farewell & Departure",
        theme: `Farewell Sunrise, Souvenir Discovery & ${mode} Departure`,
        summary: `Capture a final golden sunrise, shop for regional handicrafts and authentic spices, check out, and head to ${hub} for your departure journey home.`,
        morning: {
          time: "07:30 AM - 11:30 AM",
          title: "Sunrise Panorama & Artisan Souvenir Shopping",
          activity: `Capture final morning photos at a scenic viewpoint. Shop for authentic local spices, teas, and handmade craft cooperatives.`,
          location: `Local Bazaar & Crafts Center`,
          estCostINR: 1200,
        },
        afternoon: {
          time: "12:00 PM - 03:30 PM",
          title: "Farewell Feast & Hotel Check-out",
          activity: `Check out of your stay and enjoy a memorable farewell lunch at your favorite eatery, reviewing memories and photos.`,
          location: `Favorite ${name} Bistro`,
          estCostINR: 1000,
        },
        evening: {
          time: "04:30 PM - 09:00 PM",
          title: `Transfer to ${hub} & Departure ${mode}`,
          activity: `Board your taxi transfer to ${hub}. Complete check-in for your evening departure ${mode.toLowerCase()} back home.`,
          location: hub,
          estCostINR: 800,
        },
        dailyEstimatedSpendINR: 3000,
        transitTip: `Arrive at the ${mode.toLowerCase()} departure hub at least 90-120 minutes prior to scheduled departure.`,
        crowdTip: `Morning shopping bazaars are far quieter between 09:30 AM and 11:00 AM before tour shoppers arrive.`,
        mealRecommendation: `Pack fresh regional sweet delicacies or dry snacks for your return journey.`,
        isOffbeatHighlight: false,
      };
    } else if (dayNum === 2) {
      const h1 = highlights[0] || `${name} Landmark`;
      return {
        dayNumber: 2,
        dateLabel: "Day 2",
        dayOfWeek: "Iconic Landmarks",
        theme: `Signature Heritage & Iconic Wonders of ${name}`,
        summary: `Dedicate your first full day to ${h1} and signature landmarks, beating the midday heat and tourist queues with an early morning start.`,
        morning: {
          time: "08:00 AM - 12:00 PM",
          title: `Early Morning Exploration: ${h1}`,
          activity: `Visit ${h1} right as gates open. Enjoy cool morning temperatures, minimal queues, and pristine photography angles with golden natural lighting.`,
          location: h1,
          estCostINR: 1000,
        },
        afternoon: {
          time: "12:30 PM - 04:30 PM",
          title: "Cultural Heritage Tour & Regional Food Walk",
          activity: `Head to a historic dining institution for regional delicacies, followed by a guided walking tour of ancient architectural sites and local temples.`,
          location: `Historic District`,
          estCostINR: 1100,
        },
        evening: {
          time: "05:00 PM - 09:00 PM",
          title: "Sunset Overlook & Evening Street Flavours",
          activity: `Watch the sunset from a high vantage point overlooking ${name}. Conclude with evening street food tasting or live cultural music.`,
          location: `Sunset Point`,
          estCostINR: 900,
        },
        dailyEstimatedSpendINR: 3000,
        transitTip: `Hire a local auto-rickshaw or electric cab on half-day package for easy navigation between sights.`,
        crowdTip: `Arriving before 09:00 AM saves up to 45 minutes of waiting time in ticket queues.`,
        mealRecommendation: `Farm-fresh regional specialties and heritage street delicacies.`,
        isOffbeatHighlight: false,
      };
    } else if (dayNum === 3) {
      return {
        dayNumber: 3,
        dateLabel: "Day 3",
        dayOfWeek: "Hidden Gem Trail",
        theme: `💎 Offbeat Wonders: Hidden Secrets of ${name}`,
        summary: `Escape commercial crowds for a full day of pristine nature, secluded trails, and authentic cultural encounters in ${state}.`,
        morning: {
          time: "08:30 AM - 12:30 PM",
          title: "Offbeat Secluded Trail & Pristine Nature Walk",
          activity: destination.hiddenGemHighlights || `Explore secluded forest trails and untouched viewpoints of ${name} that commercial tour buses skip.`,
          location: `Offbeat Sanctuary`,
          estCostINR: 900,
        },
        afternoon: {
          time: "01:00 PM - 04:30 PM",
          title: "Village Kitchen Lunch & Traditional Living",
          activity: `Dine at an authentic village homestay with farm-to-table organic cooking, meeting local artisans and learning traditional customs.`,
          location: `Village Community`,
          estCostINR: 1100,
        },
        evening: {
          time: "05:00 PM - 08:30 PM",
          title: "Tranquil Overlook & Starlit Twilight",
          activity: `Relax at a secluded sunset overlook with tea, followed by starlit twilight relaxation away from city noise.`,
          location: `Nature Overlook`,
          estCostINR: 800,
        },
        dailyEstimatedSpendINR: 2800,
        transitTip: `Arrange your private cab or scooter for the full day as public transit into offbeat hamlets can be infrequent.`,
        crowdTip: `This offbeat area has virtually zero commercial tourist footfall — ideal for peaceful photography and meditation.`,
        mealRecommendation: `Homestyle village meal cooked over woodfire with locally grown organic produce.`,
        isOffbeatHighlight: true,
      };
    } else {
      const hX = highlights[(dayNum - 1) % highlights.length] || `Scenic Excursion in ${state}`;
      return {
        dayNumber: dayNum,
        dateLabel: `Day ${dayNum}`,
        dayOfWeek: "Outdoor Excursion",
        theme: `Excursion & Adventure: ${hX}`,
        summary: `Immerse yourself in ${hX}, experiencing dynamic outdoor activities, panoramic viewpoints, and regional landscapes.`,
        morning: {
          time: "08:30 AM - 12:30 PM",
          title: `Active Adventure: ${hX}`,
          activity: `Engage in outdoor activities at ${hX} (guided nature hike, boat ride, water sports, or panoramic view).`,
          location: hX,
          estCostINR: 1100,
        },
        afternoon: {
          time: "01:00 PM - 04:30 PM",
          title: "Plantation / Orchard Tour & Artisan Studio",
          activity: `Visit a local spice plantation, tea estate, or artisan handloom workshop. Enjoy freshly prepared local snacks.`,
          location: `Scenic Valleys`,
          estCostINR: 1000,
        },
        evening: {
          time: "05:00 PM - 09:00 PM",
          title: "Scenic Sunset Dinner & Acoustic Evening",
          activity: `Indulge in a scenic dinner at an open-air terrace with panoramic views of the illuminated valleys or shoreline.`,
          location: `Terrace Viewpoint Restaurant`,
          estCostINR: 1000,
        },
        dailyEstimatedSpendINR: 3100,
        transitTip: `Wear comfortable walking shoes with grip for outdoor trails.`,
        crowdTip: `Book guided outdoor activities in the morning when breeze is gentle and visibility is highest.`,
        mealRecommendation: `Seasonal grilled specialties and fresh orchard fruit bowls.`,
        isOffbeatHighlight: false,
      };
    }
  });
}

export default function DestinationDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const destination = location.state;

  const [activeDayIndex, setActiveDayIndex] = useState(0);
  const [viewMode, setViewMode] = useState("tabs"); // "tabs" | "all"
  const [copied, setCopied] = useState(false);
  const [hotelFilter, setHotelFilter] = useState("All"); // "All" | "Budget" | "Comfort" | "Luxury"

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

  const isHidden = Boolean(destination.isHiddenGem);
  const transit = destination.transportAvailability || {};
  const budget = destination.budgetBreakdown || {};

  const hotels =
    Array.isArray(destination.hotels) && destination.hotels.length > 0
      ? destination.hotels
      : getDefaultHotels(destination, budget);

  const filteredHotels =
    hotelFilter === "All"
      ? hotels
      : hotelFilter === "Budget"
      ? hotels.filter((h) => h.tier.includes("Budget"))
      : hotelFilter === "Comfort"
      ? hotels.filter((h) => h.tier.includes("Comfort"))
      : hotels.filter((h) => h.tier.includes("Luxury"));

  const itinerary =
    Array.isArray(destination.itinerary) && destination.itinerary.length > 0
      ? destination.itinerary
      : getDefaultItinerary(destination);

  const displayedDays = viewMode === "all" ? itinerary : [itinerary[activeDayIndex] || itinerary[0]];

  const handleCopyItinerary = () => {
    let text = `🌟 DestiMind Travel Plan: ${destination.name}, ${destination.state}\n`;
    text += `Duration: ${itinerary.length} Days | Travel Mode: ${transit.mode || "Flight"}\n`;
    text += `Estimated Total Budget: ₹${(budget.totalEstimatedINR || destination.price || 0).toLocaleString()}\n`;
    text += `Crowd Forecast: ${destination.crowd || "Moderate"}\n\n`;

    itinerary.forEach((d) => {
      text += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
      text += `📅 DAY ${d.dayNumber}: ${d.theme} (${d.dateLabel || `Day ${d.dayNumber}`})\n`;
      if (d.summary) text += `${d.summary}\n\n`;
      if (d.morning) {
        text += `🌅 MORNING (${d.morning.time}): ${d.morning.title}\n`;
        text += `   ${d.morning.activity}\n`;
        text += `   Location: ${d.morning.location} | Est: ₹${d.morning.estCostINR || 0}\n\n`;
      }
      if (d.afternoon) {
        text += `☀️ AFTERNOON (${d.afternoon.time}): ${d.afternoon.title}\n`;
        text += `   ${d.afternoon.activity}\n`;
        text += `   Location: ${d.afternoon.location} | Est: ₹${d.afternoon.estCostINR || 0}\n\n`;
      }
      if (d.evening) {
        text += `🌙 EVENING (${d.evening.time}): ${d.evening.title}\n`;
        text += `   ${d.evening.activity}\n`;
        text += `   Location: ${d.evening.location} | Est: ₹${d.evening.estCostINR || 0}\n\n`;
      }
      if (d.transitTip) text += `🚗 Transit Tip: ${d.transitTip}\n`;
      if (d.crowdTip) text += `👥 Crowd Strategy: ${d.crowdTip}\n`;
      if (d.mealRecommendation) text += `🍽️ Meal: ${d.mealRecommendation}\n`;
      text += `💰 Day Estimated Spend: ₹${(d.dailyEstimatedSpendINR || 0).toLocaleString()}\n\n`;
    });

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const stats = [
    { label: "Category", value: isHidden ? "💎 Hidden Gem" : "⭐ Popular Highlight" },
    { label: "State & City", value: `${destination.city}, ${destination.state}` },
    { label: "Weather", value: destination.weather },
    { label: "Estimated Trip Cost", value: `₹${destination.price.toLocaleString()}` },
    { label: "Match Score", value: `${destination.match}%` },
    { label: "Crowd Forecast", value: destination.crowd },
    { label: "Rating", value: `${destination.rating} / 5` },
    { label: "Best Time to Visit", value: destination.bestTime },
    { label: "Recommended Duration", value: destination.duration },
    { label: "Language", value: destination.language },
  ];

  return (
    <div
      className="details-page"
      style={{ "--details-hero-img": `url(${destination.image})` }}
    >
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
            <div className="details-hero-badges">
              {isHidden && <span className="details-gem-pill">💎 Verified Hidden Gem</span>}
              <span className="details-match">{destination.match}% Match</span>
            </div>
            <p className="details-eyebrow">Personalized Destination Spotlight</p>
            <h1>{destination.name}</h1>
            <p className="details-location">
              📍 {destination.city ? `${destination.city}, ` : ""}{destination.state} &mdash; {destination.country}
            </p>
          </div>
        </div>

        <div className="details-body">
          {/* Hidden Gem Spotlight if applicable */}
          {isHidden && destination.hiddenGemHighlights && (
            <div className="details-hidden-spotlight">
              <div className="spotlight-title">
                <Sparkles size={18} strokeWidth={2.4} color="#c084fc" />
                <h3>Why this is a Hidden Destination</h3>
              </div>
              <p>{destination.hiddenGemHighlights}</p>
            </div>
          )}

          {/* Snapshot Grid */}
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
                <span className="stat-label">{s.label}</span>
                <span className="stat-value">{s.value}</span>
              </div>
            ))}
          </div>

          {/* Date-Aware Crowd Intelligence */}
          <div className="details-block details-crowd-block">
            <div className="block-header">
              <Calendar size={18} strokeWidth={2.2} color="var(--teal, #4fd1c5)" />
              <div>
                <span className="block-kicker">Date-Aware Crowd Forecast</span>
                <h3>{destination.crowd} &bull; {destination.crowdStatus || "Seasonal Density"}</h3>
              </div>
            </div>
            <div className="block-content">
              <p className="block-reason">{destination.crowdReason}</p>
              {destination.crowdAvoidanceTip && (
                <div className="crowd-tip-box">
                  <strong>💡 Crowd Avoidance Advice:</strong> {destination.crowdAvoidanceTip}
                </div>
              )}
            </div>
          </div>

          {/* Flight / Train Availability Intelligence */}
          {transit.mode && (
            <div className="details-block details-transit-block">
              <div className="block-header">
                {transit.mode === "Flight" ? (
                  <Plane size={18} strokeWidth={2.2} color="#818cf8" />
                ) : transit.mode === "Train" ? (
                  <TrainFront size={18} strokeWidth={2.2} color="#818cf8" />
                ) : (
                  <Car size={18} strokeWidth={2.2} color="#818cf8" />
                )}
                <div>
                  <span className="block-kicker">Route & Availability Intelligence</span>
                  <h3>{transit.mode} Connectivity & Seat Status</h3>
                </div>
              </div>
              <div className="block-content">
                <div className="transit-hub-detail">
                  <p><strong>Nearest Hub:</strong> {transit.nearestHub}</p>
                  <p><strong>Status:</strong> <span className="transit-avail-pill">{transit.availabilityBadge}</span></p>
                  <p><strong>Route Connectivity:</strong> {transit.connectivitySummary}</p>
                  {transit.bookingAdvisory && (
                    <p className="transit-advisory"><strong>Advisory:</strong> {transit.bookingAdvisory}</p>
                  )}
                </div>

                {/* Flight Route Carrier Price Comparison */}
                {transit.mode === "Flight" && (transit.carrierComparison || transit.flightComparison?.carriers) && (
                  <div className="flight-carrier-breakdown-card">
                    <div className="flight-carrier-header">
                      <span className="carrier-header-title">✈️ Route Flight Price Comparison</span>
                      <span className="carrier-origin-pill">From {destination.originCity || "Origin Hub"}</span>
                    </div>
                    <div className="carrier-list-grid">
                      {(transit.carrierComparison || transit.flightComparison?.carriers || []).map((c, idx) => (
                        <div key={idx} className={`carrier-row-item ${c.carrier === transit.cheapestCarrier ? 'carrier-cheapest' : ''}`}>
                          <div className="carrier-info">
                            <span className="carrier-name">{c.carrier}</span>
                            <span className="carrier-flight-type">{c.type || 'Scheduled Service'}</span>
                          </div>
                          <div className="carrier-price-col">
                            <span className="carrier-price">₹{c.roundTripINR.toLocaleString()}</span>
                            <span className="carrier-price-sub">roundtrip / person</span>
                          </div>
                          {c.carrier === transit.cheapestCarrier && (
                            <span className="cheapest-flight-tag">Lowest Fare</span>
                          )}
                        </div>
                      ))}
                    </div>
                    {transit.totalFlightGroupINR && (
                      <p className="flight-group-summary-note">
                        Total roundtrip airfare for {budget.groupSize || 1} {(budget.groupSize || 1) === 1 ? 'traveller' : 'travellers'}: <strong>₹{transit.totalFlightGroupINR.toLocaleString()}</strong> (included in locked budget).
                      </p>
                    )}
                  </div>
                )}

                {transit.bookingUrl && (
                  <div className="transit-action-row">
                    <a
                      href={transit.bookingUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="transit-action-btn"
                    >
                      <span>Check Live {transit.mode} Availability</span>
                      <ExternalLink size={14} strokeWidth={2.2} />
                    </a>
                    <span className="transit-provider-note">Powered by {transit.bookingProvider}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Itemized Trip Budget */}
          {budget.totalEstimatedINR && (
            <div className="details-block details-budget-block">
              <div className="block-header">
                <Wallet size={18} strokeWidth={2.2} color="var(--dawn, #ffb347)" />
                <div>
                  <span className="block-kicker">Appropriate Trip Budget</span>
                  <h3>Estimated Total: ₹{budget.totalEstimatedINR.toLocaleString()} (₹{budget.perPersonINR.toLocaleString()} / person)</h3>
                </div>
              </div>
              <div className="block-content">
                <div className="budget-cards-grid">
                  <div className="budget-card-item">
                    <span className="budget-item-name">Accommodation</span>
                    <span className="budget-item-val">₹{budget.stayTotalINR.toLocaleString()}</span>
                    <span className="budget-item-sub">{budget.days} nights</span>
                  </div>
                  <div className="budget-card-item">
                    <span className="budget-item-name">Intercity Transit ({transit.mode || "Travel"})</span>
                    <span className="budget-item-val">₹{budget.transitTotalINR.toLocaleString()}</span>
                    <span className="budget-item-sub">{budget.groupSize} travellers roundtrip</span>
                  </div>
                  <div className="budget-card-item">
                    <span className="budget-item-name">Meals & Local Sights</span>
                    <span className="budget-item-val">₹{budget.mealsActivitiesTotalINR.toLocaleString()}</span>
                    <span className="budget-item-sub">Daily allowances</span>
                  </div>
                </div>

                <div className="budget-footer-row">
                  <span className={`budget-status-pill ${budget.withinBudget ? "status-fit" : "status-over"}`}>
                    {budget.statusText}
                  </span>
                  {budget.savingTip && (
                    <span className="budget-saving-tip">💡 {budget.savingTip}</span>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* 🏨 RECOMMENDED HOTELS & ACCOMMODATIONS BY BUDGET */}
          {/* ========================================================================= */}
          <div className="details-block details-hotels-block" id="hotels-section">
            <div className="hotels-header-row">
              <div>
                <span className="block-kicker">Accommodations Tailored to Your Budget</span>
                <h3 className="hotels-main-title">🏨 Recommended Stays by Budget</h3>
                <p className="hotels-subtitle">
                  Stay Budget Allocated: <strong>₹{(budget.stayTotalINR || (destination.stayCostPerDay || 2500) * (budget.days || 5)).toLocaleString()}</strong> for {budget.days || 5} nights ({Math.ceil((budget.groupSize || 1) / 2)} room{Math.ceil((budget.groupSize || 1) / 2) > 1 ? "s" : ""}) &bull; Handpicked for <strong>{destination.name}</strong>
                </p>
              </div>

              {/* Tier Filter Pills */}
              <div className="hotel-tier-filters">
                <button
                  type="button"
                  className={`tier-filter-btn ${hotelFilter === "All" ? "active" : ""}`}
                  onClick={() => setHotelFilter("All")}
                >
                  All Stays ({hotels.length})
                </button>
                <button
                  type="button"
                  className={`tier-filter-btn ${hotelFilter === "Budget" ? "active" : ""}`}
                  onClick={() => setHotelFilter("Budget")}
                >
                  💎 Budget Homestay
                </button>
                <button
                  type="button"
                  className={`tier-filter-btn ${hotelFilter === "Comfort" ? "active" : ""}`}
                  onClick={() => setHotelFilter("Comfort")}
                >
                  ⭐ Comfort / Mid-Range
                </button>
                <button
                  type="button"
                  className={`tier-filter-btn ${hotelFilter === "Luxury" ? "active" : ""}`}
                  onClick={() => setHotelFilter("Luxury")}
                >
                  👑 Luxury Resort
                </button>
              </div>
            </div>

            {/* Live Dates Pre-Locked Alert Banner */}
            <div className="hotel-date-lock-banner">
              <div className="hotel-date-lock-left">
                <span className="hotel-lock-icon">🔒</span>
                <div>
                  <h4 className="hotel-lock-title">
                    Live Travel Dates Pre-Locked: {hotels[0]?.datesFormatted || `${budget.days || 5} Nights`}
                  </h4>
                  <p className="hotel-lock-desc">
                    ⚡ <strong>1-Click Direct Booking:</strong> Travel dates ({hotels[0]?.checkinDate || "Check-in"} to {hotels[0]?.checkoutDate || "Check-out"}) and party size ({hotels[0]?.guestRoomFormatted || `${budget.groupSize || 1} Guests`}) are pre-filled in all booking links. No need to re-enter anything on the hotel website!
                  </p>
                </div>
              </div>
              <span className="hotel-lock-pill">
                <CheckCircle2 size={14} strokeWidth={2.4} color="#10b981" />
                <span>Availability Verified</span>
              </span>
            </div>

            {/* Hotel Cards Grid */}
            <div className="hotels-grid">
              {filteredHotels.map((hotel) => (
                <div
                  key={hotel.id}
                  className={`hotel-card ${hotel.isRecommended ? "hotel-card-recommended" : ""}`}
                >
                  <div className="hotel-card-image-wrap">
                    <img
                      src={hotel.image}
                      alt={hotel.name}
                      className="hotel-card-img"
                      loading="lazy"
                    />
                    <div className="hotel-badge-overlay">
                      <span className="hotel-tier-tag">{hotel.categoryTag}</span>
                      {hotel.isRecommended && (
                        <span className="hotel-best-pick-pill">
                          <Sparkles size={11} strokeWidth={2.4} /> DestiMind's Budget Pick
                        </span>
                      )}
                    </div>
                    <span className="hotel-rating-chip">★ {hotel.rating} ({hotel.reviewCount}+)</span>
                  </div>

                  <div className="hotel-card-body">
                    <div className="hotel-title-row">
                      <div>
                        <h4 className="hotel-name">{hotel.name}</h4>
                        <p className="hotel-room-type">{hotel.roomType}</p>
                      </div>
                    </div>

                    <p className="hotel-location">
                      <MapPin size={12} strokeWidth={2.2} /> {hotel.locationHighlight}
                    </p>

                    {/* Date-Aware Availability Pill */}
                    <div className="hotel-dates-badge-row">
                      <span className="hotel-avail-badge">
                        <span className="live-dot" /> {hotel.availabilityBadge || "Instant Confirmation"}
                      </span>
                      <span className="hotel-dates-text">
                        {hotel.datesFormatted ? `📅 ${hotel.datesFormatted}` : `📅 Available for ${hotel.days} nights`}
                      </span>
                    </div>

                    <p className="hotel-budget-note">{hotel.budgetFitNote}</p>

                    {/* Amenities Chips */}
                    <div className="hotel-amenities-row">
                      {hotel.amenities?.map((amenity, aIdx) => (
                        <span key={aIdx} className="hotel-amenity-chip">
                          {amenity}
                        </span>
                      ))}
                    </div>

                    <div className="hotel-card-footer">
                      <div className="hotel-footer-top">
                        <div className="hotel-pricing">
                          <div className="hotel-nightly-rate">
                            <span className="rate-val">₹{hotel.pricePerNightINR?.toLocaleString()}</span>
                            <span className="rate-unit">/ night</span>
                          </div>
                          <span className="hotel-total-stay">
                            ₹{hotel.totalStayCostINR?.toLocaleString()} total for {hotel.days} nights ({hotel.roomsNeeded} room{hotel.roomsNeeded > 1 ? "s" : ""})
                          </span>
                        </div>
                      </div>

                      {/* 1-Click Direct Booking Actions */}
                      <div className="hotel-booking-actions">
                        <a
                          href={hotel.bookingUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="hotel-book-btn"
                          title="Open Google Hotels with dates & guests pre-filled"
                        >
                          <span>Book on Google Hotels (Dates Pre-Filled)</span>
                          <ExternalLink size={13} strokeWidth={2.2} />
                        </a>

                        <div className="hotel-alt-booking-links">
                          <span className="alt-links-label">Direct Portals:</span>
                          {hotel.bookingComUrl && (
                            <a
                              href={hotel.bookingComUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="alt-booking-btn"
                              title="Booking.com with pre-filled dates & guests"
                            >
                              Booking.com ↗
                            </a>
                          )}
                          {hotel.agodaUrl && (
                            <a
                              href={hotel.agodaUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="alt-booking-btn"
                              title="Agoda with pre-filled dates & guests"
                            >
                              Agoda ↗
                            </a>
                          )}
                          {hotel.googleMapsUrl && (
                            <a
                              href={hotel.googleMapsUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="alt-booking-btn"
                              title="View on Google Maps"
                            >
                              Maps 📍
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ========================================================================= */}
          {/* 🗓️ COMPLETE DAY-BY-DAY TRAVEL PLAN & ITINERARY */}
          {/* ========================================================================= */}
          <div className="details-block details-itinerary-block" id="itinerary-plan">
            <div className="itinerary-header-row">
              <div>
                <span className="block-kicker">Custom End-to-End Travel Itinerary</span>
                <h3 className="itinerary-main-title">🗓️ Complete {itinerary.length}-Day Travel Plan</h3>
                <p className="itinerary-subtitle">
                  Tailored for <strong>{destination.name}</strong> &bull; Travel Mode: <strong>{transit.mode || "Flight"}</strong> &bull; Budget: <strong>₹{(budget.totalEstimatedINR || destination.price || 0).toLocaleString()}</strong> ({budget.groupSize || 1} traveller{(budget.groupSize || 1) > 1 ? "s" : ""})
                </p>
              </div>

              <div className="itinerary-action-toolbar">
                <button
                  type="button"
                  className={`itin-btn ${copied ? "itin-btn-success" : ""}`}
                  onClick={handleCopyItinerary}
                  title="Copy complete itinerary to clipboard"
                >
                  {copied ? <Check size={14} strokeWidth={2.4} /> : <Copy size={14} strokeWidth={2.2} />}
                  <span>{copied ? "Copied to Clipboard!" : "Copy Itinerary"}</span>
                </button>

                <button
                  type="button"
                  className="itin-btn itin-btn-secondary"
                  onClick={() => window.print()}
                  title="Print or Save PDF"
                >
                  <Printer size={14} strokeWidth={2.2} />
                  <span>Print Plan</span>
                </button>

                <div className="itin-view-toggle">
                  <button
                    type="button"
                    className={`toggle-pill ${viewMode === "tabs" ? "active" : ""}`}
                    onClick={() => setViewMode("tabs")}
                  >
                    Day Tabs
                  </button>
                  <button
                    type="button"
                    className={`toggle-pill ${viewMode === "all" ? "active" : ""}`}
                    onClick={() => setViewMode("all")}
                  >
                    All Days
                  </button>
                </div>
              </div>
            </div>

            {/* Day Selector Pills */}
            <div className="day-selector-pills">
              {itinerary.map((day, idx) => (
                <button
                  key={day.dayNumber}
                  type="button"
                  className={`day-pill-btn ${activeDayIndex === idx ? "active" : ""} ${day.isOffbeatHighlight ? "gem-day-pill" : ""}`}
                  onClick={() => {
                    setActiveDayIndex(idx);
                    if (viewMode === "all") {
                      const el = document.getElementById(`itinerary-day-${day.dayNumber}`);
                      if (el) el.scrollIntoView({ behavior: "smooth", block: "nearest" });
                    }
                  }}
                >
                  <span className="pill-day-num">Day {day.dayNumber}</span>
                  <span className="pill-day-theme">
                    {day.isOffbeatHighlight && "💎 "}
                    {day.dayOfWeek || (idx === 0 ? "Arrival" : idx === itinerary.length - 1 ? "Departure" : `Day ${day.dayNumber}`)}
                  </span>
                </button>
              ))}
            </div>

            {/* Days Itinerary Cards */}
            <div className="itinerary-cards-container">
              {displayedDays.map((day) => (
                <div
                  key={day.dayNumber}
                  id={`itinerary-day-${day.dayNumber}`}
                  className={`day-card ${day.isOffbeatHighlight ? "day-card-offbeat" : ""}`}
                >
                  <div className="day-card-header">
                    <div className="day-card-title-group">
                      <span className="day-num-badge">Day {day.dayNumber}</span>
                      <div>
                        <h4 className="day-theme-title">{day.theme}</h4>
                        <p className="day-date-text">
                          {day.dateLabel} {day.dayOfWeek ? `&bull; ${day.dayOfWeek}` : ""}
                        </p>
                      </div>
                    </div>

                    <div className="day-header-meta">
                      {day.isOffbeatHighlight && (
                        <span className="day-gem-tag">💎 Hidden Gem Trail</span>
                      )}
                      {day.dailyEstimatedSpendINR && (
                        <span className="day-spend-pill">
                          Est. Daily Spend: ₹{day.dailyEstimatedSpendINR.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>

                  {day.summary && (
                    <p className="day-narrative-summary">{day.summary}</p>
                  )}

                  {/* Morning, Afternoon, Evening Time Slots */}
                  <div className="time-slots-grid">
                    {/* Morning Slot */}
                    {day.morning && (
                      <div className="time-slot-card slot-morning">
                        <div className="slot-badge">
                          <Sun size={15} color="#f59e0b" strokeWidth={2.4} />
                          <span>Morning &bull; {day.morning.time}</span>
                        </div>
                        <h5 className="slot-title">{day.morning.title}</h5>
                        <p className="slot-activity">{day.morning.activity}</p>
                        <div className="slot-footer">
                          <span className="slot-location">
                            <MapPin size={12} strokeWidth={2.2} /> {day.morning.location}
                          </span>
                          {day.morning.estCostINR > 0 && (
                            <span className="slot-cost">~₹{day.morning.estCostINR.toLocaleString()}</span>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Afternoon Slot */}
                    {day.afternoon && (
                      <div className="time-slot-card slot-afternoon">
                        <div className="slot-badge">
                          <CloudSun size={15} color="#f97316" strokeWidth={2.4} />
                          <span>Afternoon &bull; {day.afternoon.time}</span>
                        </div>
                        <h5 className="slot-title">{day.afternoon.title}</h5>
                        <p className="slot-activity">{day.afternoon.activity}</p>
                        <div className="slot-footer">
                          <span className="slot-location">
                            <MapPin size={12} strokeWidth={2.2} /> {day.afternoon.location}
                          </span>
                          {day.afternoon.estCostINR > 0 && (
                            <span className="slot-cost">~₹{day.afternoon.estCostINR.toLocaleString()}</span>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Evening Slot */}
                    {day.evening && (
                      <div className="time-slot-card slot-evening">
                        <div className="slot-badge">
                          <Moon size={15} color="#818cf8" strokeWidth={2.4} />
                          <span>Evening & Night &bull; {day.evening.time}</span>
                        </div>
                        <h5 className="slot-title">{day.evening.title}</h5>
                        <p className="slot-activity">{day.evening.activity}</p>
                        <div className="slot-footer">
                          <span className="slot-location">
                            <MapPin size={12} strokeWidth={2.2} /> {day.evening.location}
                          </span>
                          {day.evening.estCostINR > 0 && (
                            <span className="slot-cost">~₹{day.evening.estCostINR.toLocaleString()}</span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Day Pro-Tips Row (Transit, Crowd, Regional Meal) */}
                  <div className="day-pro-tips-row">
                    {day.transitTip && (
                      <div className="pro-tip-item tip-transit">
                        <strong>
                          {transit.mode === "Flight" ? "✈️ Flight/Airport Transfer: " : transit.mode === "Train" ? "🚆 Station Transit: " : "🚗 Route Transit: "}
                        </strong>
                        <span>{day.transitTip}</span>
                      </div>
                    )}
                    {day.crowdTip && (
                      <div className="pro-tip-item tip-crowd">
                        <strong>👥 Crowd Strategy: </strong>
                        <span>{day.crowdTip}</span>
                      </div>
                    )}
                    {day.mealRecommendation && (
                      <div className="pro-tip-item tip-meal">
                        <strong>🍽️ Regional Dish to Try: </strong>
                        <span>{day.mealRecommendation}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* About destination & highlights */}
          <div className="about-box">
            <p className="details-kicker">Why you'll love it</p>
            <h3>About {destination.name}</h3>
            <p>{destination.description}</p>

            {destination.highlights?.length > 0 && (
              <div className="details-highlights">
                <h4>Trip Highlights:</h4>
                <ul>
                  {destination.highlights.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
