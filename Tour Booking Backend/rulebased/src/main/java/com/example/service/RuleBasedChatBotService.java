package com.example.service;

import org.springframework.stereotype.Service;

import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class RuleBasedChatBotService {

    private static final List<String> DESTINATIONS = Arrays.asList("mumbai", "kashmir", "shimla");
    private static final List<String> DURATIONS = Arrays.asList("3n/4d", "4n/5d", "6n/7d");

    public String getReply(String message) {
        if (message == null || message.trim().isEmpty()) {
            return "Please type a message 🙂";
        }

        String msg = normalize(message);

        if (containsAny(msg, "hello", "hi", "hey", "hii", "hola")) {
            return "Hello 👋 I’m your Tour Assistant 🤖\nTell me: destination (Mumbai/Kashmir/Shimla) + duration (3N/4D, 4N/5D, 6N/7D).";
        }

        if (containsAny(msg, "good morning", "gm")) return "Good morning ☀️ How can I help you with your trip?";
        if (containsAny(msg, "good evening")) return "Good evening 🌆 Planning a trip today?";
        if (containsAny(msg, "good night", "gn")) return "Good night 🌙 If you want, tell me your destination & duration and I’ll guide you.";

        if (containsAny(msg, "your name", "who are you", "what are you")) {
            return "I’m Orbit Tour Assistant 🤖 I can help you with packages, itinerary, pricing, and booking steps.";
        }

        if (containsAny(msg, "help", "support", "guide", "how to")) {
            return "Sure 🙂 I can help with:\n• Packages & prices\n• Itinerary (click i icon)\n• Booking steps\n• Cancellation/refund\nTell me what you want.";
        }

        if (containsAny(msg, "packages", "package", "tours", "tour", "destinations", "places")) {
            return "Available destinations: Mumbai, Kashmir, Shimla.\nOpen a destination → select a plan (3N/4D, 4N/5D, 6N/7D) → click Book Now.";
        }

        if (containsAny(msg, "itinerary", "schedule", "plan details", "day wise", "daywise", "route")) {
            String d = extractDestination(msg);
            String dur = extractDuration(msg);
            if (d == null && dur == null) {
                return "To view itinerary: open a destination → choose a plan → click the small “i” icon.\nWhich destination and duration do you want?";
            }
            if (d == null) return "For itinerary, tell me the destination (Mumbai/Kashmir/Shimla).";
            if (dur == null) return "For itinerary, tell me duration: 3N/4D, 4N/5D, or 6N/7D.";
            return "For " + capitalize(d) + " (" + dur.toUpperCase() + ") itinerary:\nOpen " + capitalize(d) + " package → select " + dur.toUpperCase() + " → click “i” icon to see full day-wise plan.";
        }

        if (containsAny(msg, "price", "cost", "rate", "charges", "fee", "budget")) {
            String d = extractDestination(msg);
            String dur = extractDuration(msg);
            Integer budget = extractBudget(msg);

            if (d == null && dur == null) {
                if (budget != null) {
                    return "Your budget is ₹" + budget + ".\nTell me destination (Mumbai/Kashmir/Shimla) and duration (3N/4D, 4N/5D, 6N/7D) so I can match a plan.";
                }
                return "Prices depend on destination and duration.\nWhich destination and duration are you checking?";
            }

            if (d != null && dur == null) {
                return "For " + capitalize(d) + ", choose duration: 3N/4D, 4N/5D, or 6N/7D to see the exact price in the plan card.";
            }

            if (d == null && dur != null) {
                return "For " + dur.toUpperCase() + ", which destination do you want? Mumbai/Kashmir/Shimla";
            }

            return "Price is shown on the plan card for " + capitalize(d) + " (" + dur.toUpperCase() + ").\nOpen the destination → pick the plan → you’ll see ₹ amount beside duration.";
        }

        if (containsAny(msg, "book", "booking", "reserve", "reservation", "confirm")) {
            String d = extractDestination(msg);
            String dur = extractDuration(msg);
            if (d == null && dur == null) {
                return "Booking steps:\n1) Open a destination\n2) Select a plan (duration)\n3) Click Book Now\nWhich destination are you booking?";
            }
            if (d == null) return "Which destination are you booking? Mumbai/Kashmir/Shimla";
            if (dur == null) return "Which plan duration for " + capitalize(d) + "? 3N/4D, 4N/5D, or 6N/7D";
            return "To book " + capitalize(d) + " (" + dur.toUpperCase() + "): open the plan card → click Book Now → fill traveller details → confirm.";
        }

        if (containsAny(msg, "cancel", "cancellation")) {
            return "Cancellation depends on booking policy.\nIf you share your booking date and destination, I’ll guide you with the next steps.";
        }

        if (containsAny(msg, "refund", "refunded", "money back")) {
            return "Refund depends on cancellation window and policy.\nTell me destination + travel date and whether booking is confirmed.";
        }

        if (containsAny(msg, "payment", "pay", "upi", "card", "netbanking", "cash")) {
            return "Payment options usually include UPI/Card/NetBanking (based on your implementation).\nIf you want, tell me what you prefer and I’ll guide the booking flow.";
        }

        if (containsAny(msg, "discount", "offer", "coupon", "promo")) {
            return "If you have a coupon, apply it during booking (or in the payment step if added).\nDo you have a coupon code?";
        }

        if (containsAny(msg, "inclusions", "includes", "facilities", "what is included")) {
            return "Common inclusions: stay + sightseeing (varies by package).\nTell me destination + duration and I’ll list what your plan should include/exclude.";
        }

        if (containsAny(msg, "hotel", "stay", "accommodation")) {
            return "Hotel/stay depends on the selected plan.\nWhich destination and duration are you choosing?";
        }

        if (containsAny(msg, "transport", "cab", "pickup", "drop", "airport", "transfer")) {
            return "Pickup/Drop is typically part of itinerary (airport pickup, hotel check-in, sightseeing).\nWhich destination + duration do you want?";
        }

        if (containsAny(msg, "travellers", "travelers", "people", "persons", "members", "group")) {
            Integer count = extractPeopleCount(msg);
            if (count != null) {
                return "Got it ✅ " + count + " travellers.\nNow tell me destination (Mumbai/Kashmir/Shimla) and duration (3N/4D, 4N/5D, 6N/7D).";
            }
            return "How many travellers are going?";
        }

        if (containsAny(msg, "date", "travel date", "when", "journey")) {
            String date = extractDateLike(msg);
            if (date != null) {
                return "Travel date noted: " + date + " ✅\nNow tell me destination and duration to proceed.";
            }
            return "What is your travel date (example: 20 May or 20/05/2026)?";
        }

        if (containsAny(msg, "best time", "weather", "season")) {
            return "Best time depends on destination.\nWhich destination? Mumbai / Kashmir / Shimla";
        }

        if (containsAny(msg, "documents", "id", "proof", "aadhar", "passport")) {
            return "For domestic trips: ID proof is usually enough.\nFor international: passport/visa required.\nWhich destination are you planning?";
        }

        if (containsAny(msg, "contact", "phone", "email", "call")) {
            return "For support, contact: support@orbit.com | +91-9876543210";
        }

        if (containsAny(msg, "thanks", "thank you", "thx")) {
            return "You’re welcome 😊 Happy to help!";
        }

        if (containsAny(msg, "bye", "goodbye", "see you")) {
            return "Goodbye 👋 Have a great trip!";
        }

        String d = extractDestination(msg);
        String dur = extractDuration(msg);
        if (d != null && dur == null) {
            return "Nice choice ✅ " + capitalize(d) + ". Which duration?\n3N/4D, 4N/5D, or 6N/7D";
        }
        if (dur != null && d == null) {
            return "Got it ✅ " + dur.toUpperCase() + ". Which destination?\nMumbai / Kashmir / Shimla";
        }

        return "Sorry, I didn’t understand that 🙂\nTry asking: packages, price, itinerary, booking, cancellation.\nOr tell me destination + duration.";
    }

    private String normalize(String s) {
        return s.toLowerCase().trim().replaceAll("\\s+", " ");
    }

    private boolean containsAny(String msg, String... keys) {
        for (String k : keys) {
            if (msg.contains(k)) return true;
        }
        return false;
    }

    private String extractDestination(String msg) {
        for (String d : DESTINATIONS) {
            if (msg.contains(d)) return d;
        }
        return null;
    }

    private String extractDuration(String msg) {
        for (String d : DURATIONS) {
            if (msg.contains(d)) return d;
        }
        if (msg.contains("3") && (msg.contains("4d") || msg.contains("4 d"))) return "3n/4d";
        if (msg.contains("4") && (msg.contains("5d") || msg.contains("5 d"))) return "4n/5d";
        if (msg.contains("6") && (msg.contains("7d") || msg.contains("7 d"))) return "6n/7d";
        return null;
    }

    private Integer extractBudget(String msg) {
        Pattern p = Pattern.compile("(?:₹|rs\\.?\\s?)\\s*(\\d{3,7})");
        Matcher m = p.matcher(msg);
        if (m.find()) return Integer.parseInt(m.group(1));
        return null;
    }

    private Integer extractPeopleCount(String msg) {
        Pattern p = Pattern.compile("\\b(\\d{1,2})\\b\\s*(people|persons|members|travellers|travelers)");
        Matcher m = p.matcher(msg);
        if (m.find()) return Integer.parseInt(m.group(1));
        return null;
    }

    private String extractDateLike(String msg) {
        Pattern p1 = Pattern.compile("\\b(\\d{1,2})\\s*(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)\\b");
        Pattern p2 = Pattern.compile("\\b(\\d{1,2})/(\\d{1,2})(?:/(\\d{2,4}))?\\b");
        Matcher m1 = p1.matcher(msg);
        if (m1.find()) return m1.group(0);
        Matcher m2 = p2.matcher(msg);
        if (m2.find()) return m2.group(0);
        return null;
    }

    private String capitalize(String s) {
        if (s == null || s.isEmpty()) return s;
        return s.substring(0, 1).toUpperCase() + s.substring(1);
    }
}