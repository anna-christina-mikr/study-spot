# 🎓 Nook - Find Your Perfect Study Spot

> A data-driven coffee shop finder built for Columbia students. Because finding outlets shouldn't be harder than your problem sets.

**🚀 [Live Demo](https://anna-christina-mikr.github.io/nook-study-spots/)** | ** [Project Roadmap](#roadmap)**

![Status](https://img.shields.io/badge/status-active%20development-brightgreen)
![License](https://img.shields.io/badge/license-MIT-blue)
![Tech](https://img.shields.io/badge/tech-JavaScript%20%7C%20Python%20%7C%20ML-orange)

---

## 💡 The Problem

Every Columbia student knows the struggle: Finally found a cafe to do some work in, but no outlets. Foumd outlets, but its too loud to think. Found a quiet spoitm but the Wifi is unusable. Everything's perfect, but there's no seating.

Thats why I built Nook. One app, all the data you actually need.

---

## ✨ What It Does

Nook is an intelligent study spot finder that combines **human verification** with **data science** to help you find the perfect place to work.

### Current Features 

**Interactive Map**
- Browse 25+ verified study spots around Columbia & Morningside Heights
- Custom markers showing spot locations
- Integrated Google Maps navigation

**Study-Specific Ratings**
- **Outlets**: How many? Where are they? (1-10 scale)
- **WiFi Quality**: Actually fast or just "available"? (1-10 scale)  
- **Noise Level**: Can you concentrate? (1-10 scale)
- **Seating**: Comfortable for long sessions? (1-10 scale)
- **Bathroom Access**: Available? Code required?

**Smart Search**
- Google Places autocomplete
- Filter by attributes (outlets, noise, etc.)
- See hours, photos, reviews, prices

**Community Reviews**
- Add your own ratings and reviews
- Help other students find great spots

---

## 🚧 Coming Soon: Data Science Features

This project is evolving from a simple directory into an **ML-powered recommendation system**. Here's what's being built:

### Phase 2: NLP & Predictions 🤖

**1. AI Review Analysis**
- Automatically extract study signals from Google reviews
- "Mentions of outlets in 47 reviews: Mostly positive (85% confidence)"
- Show supporting quotes: *"Plenty of outlets by the window" - Sarah M.*
- Validate and supplement manual ratings with data

**2. Busyness Predictions**
- "This spot is usually 30% full at 3pm on Thursdays"
- ML model trained on Google Popular Times + local factors
- Features: time, weather, academic calendar (finals week!), events
- Show "Best times to visit" recommendations

**3. Smart Recommendations**
- "I need outlets, quiet, and I'm 10 minutes from campus"
- Multi-objective scoring algorithm
- Personalized based on your preferences
- Explainable: "Why this spot? → Plenty of outlets (4.5/5), Currently 25% full"

### Phase 3: Production Infrastructure 

**4. Backend & Database**
- Python (Flask/FastAPI) REST API
- PostgreSQL with PostGIS for geospatial queries
- Real-time data updates
- User authentication

**5. Real-Time Check-Ins**
- GPS-verified "I'm here now" reports
- Crowd-sourced current conditions
- "3 students studying here right now"
- Helps improve busyness predictions

**6. Mobile App**
- React Native for iOS & Android
- Push notifications: "Your favorite spot is quiet right now!"
- Offline mode with cached data
- Native camera for uploading photos

---

##  Tech Stack

**Frontend (Current)**
```
Languages:  HTML5, CSS3, Vanilla JavaScript
APIs:       Google Maps JavaScript API, Google Places API
Storage:    Browser localStorage
```

**Backend (In Development)**
```
Language:   Python 3.9+
Framework:  Flask or FastAPI
Database:   PostgreSQL 14+ with PostGIS extension
```

**Data Science Pipeline (Planned)**
```
NLP:        Transformers (BERT), spaCy
ML:         scikit-learn, XGBoost, pandas, NumPy
Analysis:   Sentiment analysis, time-series forecasting
Models:     Recommendation system, busyness prediction
```

**Deployment**
```
Frontend:   GitHub Pages (current), Vercel (future)
Backend:    AWS/GCP (planned)
Mobile:     React Native → App Store + Google Play
```

---

## 🚀 Try It Locally

### Prerequisites
- A web browser (Chrome, Firefox, Safari)
- Google Maps API key ([get one free](https://developers.google.com/maps/documentation/javascript/get-api-key))

### Quick Start

```bash
# 1. Clone the repository
git clone https://github.com/YOUR-USERNAME/nook-study-spots.git
cd nook-study-spots

# 2. Set up your API key
# Option A: Create config.js (gitignored)
echo "const CONFIG = { GOOGLE_MAPS_API_KEY: 'YOUR_KEY_HERE' };" > config.js

# Option B: Edit index.html directly (line XX)
# Replace YOUR_KEY_HERE with your actual key

# 3. Open in browser
open index.html

# Or run a local server
python -m http.server 8000
# Then visit: http://localhost:8000
```

### Setting Up Google Maps API

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project (or use existing)
3. Enable these APIs:
   - **Maps JavaScript API**
   - **Places API**
4. Create credentials → API Key
5. **Restrict your key** (important!):
   - Application restrictions: HTTP referrers
   - Add: `http://localhost:*`, `https://YOUR-USERNAME.github.io/*`
   - API restrictions: Only enable Maps JavaScript API & Places API

---

## 📊 The Data Science Approach

### Problem: Reviews Don't Answer Study-Specific Questions

Google reviews say things like:
- "Great coffee and vibe!"
- "Cozy spot in the neighborhood"
- "Love coming here on weekends"

But students need to know:
- Are there outlets? Where?
- Can I actually work here, or is it too loud?
- Will the WiFi handle a Zoom call?

### Solution: NLP + Structured Ratings

**Step 1: Manual Ground Truth**
- Personally visit and rate each spot (1-10 scales)
- Consistent methodology across all locations
- Take photos, verify hours, test WiFi
- Document best times, laptop policies, etc.

**Step 2: NLP Pipeline (In Development)**
```
Google Reviews → Preprocessing → Aspect Extraction → Sentiment Analysis → Confidence Scoring
```

Example:
```python
Review: "Great spot for getting work done! Plenty of outlets 
         and the WiFi is super fast. Can get noisy during lunch."

Extracted Signals:
├─ Outlets: POSITIVE (confidence: 0.92)
│  └─ "plenty of outlets"
├─ WiFi: POSITIVE (confidence: 0.88)  
│  └─ "super fast"
├─ Study-Friendly: POSITIVE (confidence: 0.85)
│  └─ "great spot for getting work done"
└─ Noise: MIXED (confidence: 0.76)
   └─ "can get noisy during lunch" (time-dependent)
```

**Step 3: Validate & Combine**
- Compare NLP scores with manual ratings
- Target correlation: r > 0.70
- Use NLP to find patterns (e.g., "noisy during lunch rush")
- Display both ratings to users

### Model: Busyness Prediction

**Features**
```python
X = [
    hour,              # 0-23
    day_of_week,       # 0-6 (Monday=0)
    is_weekend,        # Boolean
    is_finals_week,    # Boolean (+25% modifier)
    is_raining,        # Boolean (+15% modifier)
    distance_to_campus,# Meters
    historical_avg     # Baseline from Google Popular Times
]

y = busyness_level  # 0-100 scale
```

**Model Options**
1. **Baseline**: Rule-based with modifiers (MVP)
2. **Intermediate**: Random Forest Regression
3. **Advanced**: LSTM time-series (if enough data)

**Evaluation**
- RMSE on test set (target: < 15%)
- User validation: "Was this accurate?" feedback
- A/B test impact on user satisfaction

### Algorithm: Smart Recommendations

**Multi-Objective Scoring**
```python
def score_spot(spot, user_prefs, context):
    # 1. Preference Match (40%)
    pref_score = weighted_match(
        user_prefs,           # {needs_outlets: True, max_noise: 3}
        spot.ratings          # {outlets: 8, noise: 2}
    )
    
    # 2. Availability (30%)
    predicted_busy = predict_busyness(spot, context.time)
    avail_score = (100 - predicted_busy) / 100
    
    # 3. Distance (20%)
    dist_score = 1 - (spot.distance / user_prefs.max_distance)
    
    # 4. Quality (10%)
    quality_score = spot.overall_rating / 10
    
    final = 0.4*pref_score + 0.3*avail_score + 0.2*dist_score + 0.1*quality_score
    
    return {
        'score': final,
        'reasons': generate_explanations(spot, user_prefs),
        'predicted_busyness': predicted_busy
    }
```

**Why This Approach?**
- Transparent and explainable
- Can tune weights based on user feedback
- Handles trade-offs (close but loud vs. far but perfect)
- Adapts to context (time, weather, urgency)

---




<div align="center">

**⭐ Star this repo if you find it useful!**

**☕ Found a great study spot? [Open an issue](https://github.com/YOUR-USERNAME/nook-study-spots/issues) to suggest it!**

---

*Built with ☕ and 🎓 at Columbia University*

*Last updated: February 2026*

</div>
