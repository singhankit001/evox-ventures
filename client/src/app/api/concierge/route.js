import { NextResponse } from "next/server";
import OpenAI from "openai";

// ─── OpenAI Configuration ───────────────────────────────────────────────────
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// ─── Pricing Engine ──────────────────────────────────────────────────────────
const BASE_PRICING = {
  wedding:    { venue: 200000, decor: 150000, catering: 300000, entertainment: 80000 },
  corporate:  { venue: 120000, decor: 60000,  catering: 150000, entertainment: 40000 },
  club_party: { venue: 80000,  decor: 40000,  catering: 60000,  entertainment: 120000 },
  beach_trip: { venue: 50000,  decor: 20000,  catering: 80000,  entertainment: 30000 },
  sports:     { venue: 90000,  decor: 30000,  catering: 70000,  entertainment: 60000 },
  birthday:   { venue: 60000,  decor: 50000,  catering: 80000,  entertainment: 40000 },
  default:    { venue: 100000, decor: 50000,  catering: 100000, entertainment: 50000 },
};

function detectEventType(text) {
  const t = text.toLowerCase();
  if (t.match(/wedding|shaadi|marriage|nikah/)) return "wedding";
  if (t.match(/corporate|conference|summit|office|company|team|business/)) return "corporate";
  if (t.match(/club|party|rave|dj|nightlife|bar|lounge/)) return "club_party";
  if (t.match(/beach|coastal|goa|retreat|outdoor/)) return "beach_trip";
  if (t.match(/cricket|football|sport|badminton|tournament/)) return "sports";
  if (t.match(/birthday|bday|anniversary|celebration/)) return "birthday";
  return null;
}

function extractGuests(text) {
  const match = text.match(/(\d+)\s*(people|guests|persons|pax|attendees)?/i);
  return match ? parseInt(match[1]) : null;
}

function getRuleBasedReply(messages, sessionData) {
  const lastUserMsg = messages.filter((m) => m.role === "user").pop()?.content || "";
  const data = { ...sessionData };

  if (!data.eventType) {
    const detected = detectEventType(lastUserMsg);
    if (detected) {
      data.eventType = detected;
      return {
        reply: `Excellent choice. A ${detected.replace("_", " ")} experience — this is what we live for. ✨\n\nTo craft the perfect plan, how many guests are you expecting?`,
        sessionData: data,
        complete: false,
      };
    }
    if (messages.filter((m) => m.role === "user").length === 1) {
      return {
        reply: `Welcome to Evox Concierge — where extraordinary events are born.\n\nWhat kind of event are you planning? (Wedding, Corporate, Club Party, Beach Retreat, Sports, Birthday...)`,
        sessionData: data,
        complete: false,
      };
    }
    return {
      reply: `I'd love to help create something unforgettable. Could you tell me what type of event you have in mind?`,
      sessionData: data,
      complete: false,
    };
  }

  if (!data.guests) {
    const guests = extractGuests(lastUserMsg);
    if (guests) {
      data.guests = guests;
      return {
        reply: `${guests} guests — we'll make every single one feel VIP. 🎯\n\nWhere is this event taking place? (City or venue in mind?)`,
        sessionData: data,
        complete: false,
      };
    }
    return {
      reply: `Approximately how many guests are you expecting? This helps us scale everything perfectly.`,
      sessionData: data,
      complete: false,
    };
  }

  if (!data.location) {
    if (lastUserMsg.trim().length > 0) {
      data.location = lastUserMsg.trim();
      return {
        reply: `${data.location} — a fantastic setting. 📍\n\nWhen are you thinking of hosting this? A date or rough timeframe works.`,
        sessionData: data,
        complete: false,
      };
    }
    return { reply: `Which city or venue do you have in mind?`, sessionData: data, complete: false };
  }

  if (!data.date) {
    if (lastUserMsg.trim().length > 0) {
      data.date = lastUserMsg.trim();
      return {
        reply: `Perfect timing. Last question — what's your approximate budget for this event? Even a rough range helps us curate the right experience.`,
        sessionData: data,
        complete: false,
      };
    }
    return { reply: `Do you have a preferred date or month in mind?`, sessionData: data, complete: false };
  }

  if (!data.budget) {
    data.budget = lastUserMsg.trim();
    return {
      reply: `That sounds like a stunning event. I have everything I need to build your personalized plan. ✨\n\nLet me prepare a curated estimate for your ${data.eventType.replace("_", " ")} in ${data.location} for ${data.guests} guests.\n\nOne last step — where should I send your personalized breakdown?`,
      sessionData: data,
      complete: true,
    };
  }

  return {
    reply: `Your personalized event plan is ready. Let me know if you'd like any adjustments.`,
    sessionData: data,
    complete: true,
  };
}

// ─── OpenAI Handler ───────────────────────────────────────────────────────────
async function getAIReply(messages, sessionData) {
  const systemPrompt = `You are the Evox Concierge — a premium luxury event planning AI for Evox Ventures India.

Persona: Confident, warm, luxury-focused. Short, elegant responses. No filler.

Collect these fields ONE AT A TIME (ask only for missing ones):
1. eventType (wedding/corporate/club_party/beach_trip/sports/birthday)
2. guests (number)
3. location (city)
4. date (timeframe)
5. budget (approximate)

Current data: ${JSON.stringify(sessionData)}

When ALL 5 collected, say "That sounds like a stunning event..." and set complete: true.

ALWAYS respond as JSON: { "reply": string, "sessionData": { "eventType": null, "guests": null, "location": null, "date": null, "budget": null }, "complete": boolean }
Keep replies under 50 words.`;

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "system", content: systemPrompt }, ...messages],
    response_format: { type: "json_object" },
    temperature: 0.7,
    max_tokens: 250,
  });

  const parsed = JSON.parse(response.choices[0].message.content);
  return {
    reply: parsed.reply,
    sessionData: { ...sessionData, ...parsed.sessionData },
    complete: parsed.complete || false,
  };
}

// ─── Route Handler ─────────────────────────────────────────────────────────────
export async function POST(req) {
  try {
    const { messages = [], sessionData = {} } = await req.json();

    let result;
    if (process.env.OPENAI_API_KEY) {
      try {
        result = await getAIReply(messages, sessionData);
      } catch (aiErr) {
        console.warn("[AI Fallback]", aiErr.message);
        result = getRuleBasedReply(messages, sessionData);
      }
    } else {
      result = getRuleBasedReply(messages, sessionData);
    }

    return NextResponse.json(result);
  } catch (err) {
    console.error("[Concierge API Error]", err.message);
    return NextResponse.json({ error: "Concierge temporarily unavailable." }, { status: 500 });
  }
}
