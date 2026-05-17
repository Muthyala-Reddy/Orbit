from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

import re

app = FastAPI(title="Orbit RAG Chatbot")

# ✅ Allow React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    message: str

# -----------------------------
# 1) Plan data
# -----------------------------
PLANS = [
    {"title": "3N/4D", "description": "Ideal for short and comfortable travel", "price": 10000, "duration_days": 3},
    {"title": "4N/5D", "description": "Perfect for medium trips", "price": 20000, "duration_days": 4},
    {"title": "6N/7D", "description": "Best for long vacations", "price": 30000, "duration_days": 6},
]

DESTINATIONS = ["Mumbai", "Kashmir", "Shimla"]

# -----------------------------
# 2) Itinerary data
# -----------------------------
ITINERARIES_BY_DURATION = {
    "3N/4D": [
        {"day": "Day 1", "title": "Arrival", "description": "Hotel check-in and leisure"},
        {"day": "Day 2", "title": "Excursion", "description": "Visit attractions"},
        {"day": "Day 3", "title": "Local tour", "description": "Markets and sightseeing"},
        {"day": "Day 4", "title": "Departure", "description": "Checkout"},
    ],
    "4N/5D": [
        {"day": "Day 1", "title": "Arrival", "description": "Hotel check-in"},
        {"day": "Day 2", "title": "City Tour", "description": "Explore main city"},
        {"day": "Day 3", "title": "Excursion", "description": "Nearby trip"},
        {"day": "Day 4", "title": "Leisure", "description": "Shopping and free time"},
        {"day": "Day 5", "title": "Departure", "description": "Checkout"},
    ],
    "6N/7D": [
        {"day": "Day 1", "title": "Arrival", "description": "Rest day"},
        {"day": "Day 2", "title": "City Tour", "description": "Explore landmarks"},
        {"day": "Day 3", "title": "Excursion", "description": "Scenic trip"},
        {"day": "Day 4", "title": "Nature", "description": "Mountains / beaches"},
        {"day": "Day 5", "title": "Adventure", "description": "Optional activities"},
        {"day": "Day 6", "title": "Shopping", "description": "Local markets"},
        {"day": "Day 7", "title": "Departure", "description": "Checkout"},
    ],
}

# -----------------------------
# 3) Knowledge base
# -----------------------------
documents = []
doc_meta = []

def itinerary_to_text(duration, destination):
    base = ITINERARIES_BY_DURATION.get(duration, [])

    if destination == "Mumbai":
        extra = "City life, Gateway of India, Marine Drive"
    elif destination == "Kashmir":
        extra = "Srinagar, Gulmarg, lakes and mountains"
    elif destination == "Shimla":
        extra = "Mall Road, Kufri, hill station views"
    else:
        extra = ""

    lines = [f"{it['day']}: {it['title']} - {it['description']}" for it in base]

    return extra + ". " + " | ".join(lines)

for dest in DESTINATIONS:
    for plan in PLANS:
        dur = plan["title"]
        text = (
            f"Destination: {dest}. "
            f"Plan: {dur}. "
            f"Price: ₹{plan['price']}. "
            f"Description: {plan['description']}. "
            f"Itinerary: {itinerary_to_text(dur, dest)}."
        )
        documents.append(text)
        doc_meta.append({"destination": dest.lower(), "duration": dur.lower()})

# Vector search
vectorizer = TfidfVectorizer()
doc_vectors = vectorizer.fit_transform(documents)

# -----------------------------
# Utility
# -----------------------------
def normalize_text(s):
    return re.sub(r"\s+", " ", s.lower().strip())

def extract_destination(q):
    for d in DESTINATIONS:
        if d.lower() in q:
            return d.lower()
    return None

def extract_duration(q):
    for d in ["3n/4d", "4n/5d", "6n/7d"]:
        if d in q:
            return d
    if "3" in q and "4" in q: return "3n/4d"
    if "4" in q and "5" in q: return "4n/5d"
    if "6" in q and "7" in q: return "6n/7d"
    return None

def retrieve(query, k=3):
    q_vec = vectorizer.transform([query])
    sims = cosine_similarity(q_vec, doc_vectors)[0]
    idx = sims.argsort()[::-1][:k]
    return [(documents[i], doc_meta[i]) for i in idx]

# -----------------------------
# Response formatting
# -----------------------------
def format_reply(query, doc, meta):
    dest = meta["destination"].capitalize()
    dur = meta["duration"].upper()

    q = query.lower()

    price = re.search(r"₹(\d+)", doc).group(1)
    desc = re.search(r"Description: (.*?). Itinerary:", doc).group(1)

    response = []
    response.append(f"Here’s what I found for {dest} ({dur}) 👇\n")
    response.append(f"💰 Price: ₹{price}")
    response.append(f"✨ {desc}")

    # itinerary
    if "itinerary" in q or "plan" in q:
        it = doc.split("Itinerary: ")[1]
        parts = [p.strip() for p in it.split("|")]

        response.append("\n🗓️ Day-wise itinerary:\n")
        for p in parts:
            response.append(f"➡️ {p}")

    response.append("\nLet me know if you need booking help 😊")

    return "\n".join(response)

# -----------------------------
# API
# -----------------------------
@app.post("/chat")
def chat(req: ChatRequest):
    msg = normalize_text(req.message)

    if not msg:
        return {"reply": "Please type a message 🙂"}
    
    
    if "book" in msg:
        return {
            "reply": "Sure! Which destination and plan do you want?\n(e.g., Kashmir 4N/5D)"
        }


    words = msg.split()
    if any(w in ["hi", "hello", "hey", "hii"] for w in words):
        return {"reply": "Hello 👋 I’m Orbit Assistant 🤖\nAsk me about plans, price, or itinerary!"}

    if len(words) <= 1:
        return {"reply": "🙂 Please give more details like 'Kashmir 4N/5D itinerary'"}
    

        
    dest = extract_destination(msg)
    dur = extract_duration(msg)

    if dest and dur:
        return {
            "reply": f"Great choice! {dest.capitalize()} {dur.upper()}.\nOpening booking options for you 👇",
            "action": "BOOK",
            "destination": dest,
            "duration": dur
        }


    hits = retrieve(msg)
    doc, meta = hits[0]

    return {"reply": format_reply(msg, doc, meta)}