const TOTAL_ROUNDS = 20;
const LEADERBOARD_KEY = "melodyHuntersScores";

const LEVELS = [
  {
    id: 1,
    name: "Single Notes",
    points: 10,
    role: "Bright single tones",
    monsters: [
      { id: "butterfly", name: "Butterfly", emoji: "🦋" },
      { id: "frog", name: "Frog", emoji: "🐸" }
    ],
    patterns: [
      { label: "C", notes: [261.63], mode: "single" },
      { label: "D", notes: [293.66], mode: "single" },
      { label: "E", notes: [329.63], mode: "single" },
      { label: "F", notes: [349.23], mode: "single" },
      { label: "G", notes: [392.0], mode: "single" },
      { label: "A", notes: [440.0], mode: "single" },
      { label: "B", notes: [493.88], mode: "single" }
    ]
  },
  {
    id: 2,
    name: "Intervals",
    points: 20,
    role: "Two-note steps",
    monsters: [
      { id: "lion", name: "Lion", emoji: "🦁" },
      { id: "chick", name: "Chick", emoji: "🐤" }
    ],
    patterns: [
      { label: "Major 2 (C-D)", notes: [261.63, 293.66], mode: "sequence" },
      { label: "Major 2 (D-E)", notes: [293.66, 329.63], mode: "sequence" },
      { label: "Major 2 (E-F#)", notes: [329.63, 369.99], mode: "sequence" },
      { label: "Major 2 (F-G)", notes: [349.23, 392.0], mode: "sequence" },
      { label: "Major 2 (G-A)", notes: [392.0, 440.0], mode: "sequence" },
      { label: "Major 2 (A-B)", notes: [440.0, 493.88], mode: "sequence" },
      { label: "Major 2 (B-C#)", notes: [493.88, 554.37], mode: "sequence" },
      { label: "Major 3 (C-E)", notes: [261.63, 329.63], mode: "sequence" },
      { label: "Major 3 (D-F#)", notes: [293.66, 369.99], mode: "sequence" },
      { label: "Major 3 (E-G#)", notes: [329.63, 415.3], mode: "sequence" },
      { label: "Major 3 (F-A)", notes: [349.23, 440.0], mode: "sequence" },
      { label: "Major 3 (G-B)", notes: [392.0, 493.88], mode: "sequence" },
      { label: "Major 3 (A-C#)", notes: [440.0, 554.37], mode: "sequence" },
      { label: "Major 3 (B-D#)", notes: [493.88, 622.25], mode: "sequence" },
      { label: "Perfect 4 (C-F)", notes: [261.63, 349.23], mode: "sequence" },
      { label: "Perfect 4 (D-G)", notes: [293.66, 392.0], mode: "sequence" },
      { label: "Perfect 4 (E-A)", notes: [329.63, 440.0], mode: "sequence" },
      { label: "Perfect 4 (F-Bb)", notes: [349.23, 466.16], mode: "sequence" },
      { label: "Perfect 4 (G-C)", notes: [392.0, 523.25], mode: "sequence" },
      { label: "Perfect 4 (A-D)", notes: [440.0, 587.33], mode: "sequence" },
      { label: "Perfect 4 (B-E)", notes: [493.88, 659.25], mode: "sequence" },
      { label: "Perfect 5 (C-G)", notes: [261.63, 392.0], mode: "sequence" },
      { label: "Perfect 5 (D-A)", notes: [293.66, 440.0], mode: "sequence" },
      { label: "Perfect 5 (E-B)", notes: [329.63, 493.88], mode: "sequence" },
      { label: "Perfect 5 (F-C)", notes: [349.23, 523.25], mode: "sequence" },
      { label: "Perfect 5 (G-D)", notes: [392.0, 587.33], mode: "sequence" },
      { label: "Perfect 5 (A-E)", notes: [440.0, 659.25], mode: "sequence" },
      { label: "Perfect 5 (B-F#)", notes: [493.88, 739.99], mode: "sequence" },
      { label: "Major 6 (C-A)", notes: [261.63, 440.0], mode: "sequence" },
      { label: "Major 6 (D-B)", notes: [293.66, 493.88], mode: "sequence" },
      { label: "Major 6 (E-C#)", notes: [329.63, 554.37], mode: "sequence" },
      { label: "Major 6 (F-D)", notes: [349.23, 587.33], mode: "sequence" },
      { label: "Major 6 (G-E)", notes: [392.0, 659.25], mode: "sequence" },
      { label: "Major 6 (A-F#)", notes: [440.0, 739.99], mode: "sequence" },
      { label: "Major 6 (B-G#)", notes: [493.88, 830.61], mode: "sequence" },
      { label: "Octave (C-C)", notes: [261.63, 523.25], mode: "sequence" },
      { label: "Octave (D-D)", notes: [293.66, 587.33], mode: "sequence" },
      { label: "Octave (E-E)", notes: [329.63, 659.25], mode: "sequence" },
      { label: "Octave (F-F)", notes: [349.23, 698.46], mode: "sequence" },
      { label: "Octave (G-G)", notes: [392.0, 783.99], mode: "sequence" },
      { label: "Octave (A-A)", notes: [440.0, 880.0], mode: "sequence" },
      { label: "Octave (B-B)", notes: [493.88, 987.77], mode: "sequence" }
    ]
  },
  {
    id: 3,
    name: "Harmony Chords",
    points: 30,
    role: "Warm triads",
    monsters: [
      { id: "swan", name: "Swan", emoji: "🦢" },
      { id: "dog", name: "Dog", emoji: "🐕" }
    ],
    patterns: [
      { label: "C Major (C-E-G)", notes: [261.63, 329.63, 392.0], mode: "chord" },
      { label: "D Major (D-F#-A)", notes: [293.66, 369.99, 440.0], mode: "chord" },
      { label: "E Major (E-G#-B)", notes: [329.63, 415.3, 493.88], mode: "chord" },
      { label: "F Major (F-A-C)", notes: [349.23, 440.0, 523.25], mode: "chord" },
      { label: "G Major (G-B-D)", notes: [392.0, 493.88, 587.33], mode: "chord" },
      { label: "A Major (A-C#-E)", notes: [440.0, 554.37, 659.25], mode: "chord" },
      { label: "B Major (B-D#-F#)", notes: [493.88, 622.25, 739.99], mode: "chord" }
    ]
  },
  {
    id: 4,
    name: "Chromatic Half Steps",
    points: 40,
    role: "Close half-step motion",
    monsters: [
      { id: "cat", name: "Cat", emoji: "🐱" },
      { id: "fox", name: "Fox", emoji: "🦊" }
    ],
    patterns: [
      { label: "Minor 2 Up (C-Db)", notes: [261.63, 277.18], mode: "sequence" },
      { label: "Minor 2 Down (C-B)", notes: [261.63, 246.94], mode: "sequence" },
      { label: "Natural Half Step (E-F)", notes: [329.63, 349.23], mode: "sequence" },
      { label: "Natural Half Step (B-C)", notes: [246.94, 261.63], mode: "sequence" },
      { label: "Chromatic Turn (C-Db-C)", notes: [261.63, 277.18, 261.63], mode: "sequence" },
      { label: "Sharp Neighbor (G-G#-G)", notes: [392.0, 415.3, 392.0], mode: "sequence" },
      { label: "Flat Neighbor (A-Ab-A)", notes: [440.0, 415.3, 440.0], mode: "sequence" },
      { label: "Tritone (C-F#)", notes: [261.63, 369.99], mode: "sequence" }
    ]
  },
  {
    id: 5,
    name: "Octave Leaps",
    points: 50,
    role: "Wide melodic jumps",
    monsters: [
      { id: "eagle", name: "Eagle", emoji: "🦅" },
      { id: "deer", name: "Deer", emoji: "🦌" }
    ],
    patterns: [
      { label: "Minor 9 (C-Db)", notes: [130.81, 277.18], mode: "sequence" },
      { label: "Major 9 (C-D)", notes: [130.81, 293.66], mode: "sequence" },
      { label: "Minor 10 (C-Eb)", notes: [130.81, 311.13], mode: "sequence" },
      { label: "Major 10 (C-E)", notes: [130.81, 329.63], mode: "sequence" },
      { label: "Perfect 11 (C-F)", notes: [130.81, 349.23], mode: "sequence" },
      { label: "Augmented 11 (C-F#)", notes: [130.81, 369.99], mode: "sequence" },
      { label: "Perfect 12 (C-G)", notes: [130.81, 392.0], mode: "sequence" },
      { label: "Minor 13 (C-Ab)", notes: [130.81, 415.3], mode: "sequence" },
      { label: "Major 13 (C-A)", notes: [130.81, 440.0], mode: "sequence" },
      { label: "Minor 14 (C-Bb)", notes: [130.81, 466.16], mode: "sequence" },
      { label: "Major 14 (C-B)", notes: [130.81, 493.88], mode: "sequence" },
      { label: "Double Octave (C-C)", notes: [130.81, 523.25], mode: "sequence" }
    ]
  },
  {
    id: 6,
    name: "Dissonant Chords",
    points: 60,
    role: "Unstable clusters",
    monsters: [
      { id: "ogre", name: "Mischief", emoji: "👹" },
      { id: "twister", name: "Twister", emoji: "🌀" }
    ],
    patterns: [
      { label: "Tritone (C-F#)", notes: [261.63, 369.99], mode: "chord" },
      { label: "Cluster (C-C#-D)", notes: [261.63, 277.18, 293.66], mode: "chord" },
      { label: "Sharp Clash (E-F-G#)", notes: [329.63, 349.23, 415.3], mode: "chord" },
      { label: "Low Rumble (C-C#-G)", notes: [130.81, 138.59, 196.0], mode: "chord" }
    ]
  },
  {
    id: 7,
    name: "Advanced Chords",
    points: 70,
    role: "Extended chord colors",
    monsters: [
      { id: "crystal", name: "Crystal", emoji: "🔷" },
      { id: "echo", name: "Echo", emoji: "✨" }
    ],
    patterns: [
      { label: "C Minor (C-Eb-G)", notes: [261.63, 311.13, 392.0], mode: "chord" },
      { label: "C Minor 1st Inv (Eb-G-C)", notes: [311.13, 392.0, 523.25], mode: "chord" },
      { label: "C Minor 2nd Inv (G-C-Eb)", notes: [196.0, 261.63, 311.13], mode: "chord" },
      { label: "C Diminished (C-Eb-Gb)", notes: [261.63, 311.13, 369.99], mode: "chord" },
      { label: "C Dim 1st Inv (Eb-Gb-C)", notes: [311.13, 369.99, 523.25], mode: "chord" },
      { label: "C Dim 2nd Inv (Gb-C-Eb)", notes: [184.99, 261.63, 311.13], mode: "chord" },
      { label: "C Augmented (C-E-G#)", notes: [261.63, 329.63, 415.3], mode: "chord" },
      { label: "C Aug 1st Inv (E-G#-C)", notes: [329.63, 415.3, 523.25], mode: "chord" },
      { label: "C Aug 2nd Inv (G#-C-E)", notes: [207.65, 261.63, 329.63], mode: "chord" },
      { label: "C Sus2 (C-D-G)", notes: [261.63, 293.66, 392.0], mode: "chord" },
      { label: "C Sus2 1st Inv (D-G-C)", notes: [293.66, 392.0, 523.25], mode: "chord" },
      { label: "C Sus4 (C-F-G)", notes: [261.63, 349.23, 392.0], mode: "chord" },
      { label: "C Sus4 1st Inv (F-G-C)", notes: [349.23, 392.0, 523.25], mode: "chord" },
      { label: "C Major 1st Inv (E-G-C)", notes: [329.63, 392.0, 523.25], mode: "chord" },
      { label: "C Major 2nd Inv (G-C-E)", notes: [196.0, 261.63, 329.63], mode: "chord" }
    ]
  }
];

const els = {
  startScreen: document.querySelector("#startScreen"),
  gameScreen: document.querySelector("#gameScreen"),
  endScreen: document.querySelector("#endScreen"),
  playerName: document.querySelector("#playerName"),
  startButton: document.querySelector("#startButton"),
  startLeaderboardButton: document.querySelector("#startLeaderboardButton"),
  soundToggle: document.querySelector("#soundToggle"),
  levelTitle: document.querySelector("#levelTitle"),
  roundStat: document.querySelector("#roundStat"),
  scoreStat: document.querySelector("#scoreStat"),
  streakStat: document.querySelector("#streakStat"),
  accuracyStat: document.querySelector("#accuracyStat"),
  promptTitle: document.querySelector("#promptTitle"),
  promptText: document.querySelector("#promptText"),
  replayButton: document.querySelector("#replayButton"),
  choices: document.querySelector("#choices"),
  teamList: document.querySelector("#teamList"),
  pulse: document.querySelector("#pulse"),
  animalWalker: document.querySelector("#animalWalker"),
  animalSprite: document.querySelector("#animalSprite"),
  finalScore: document.querySelector("#finalScore"),
  bestLevel: document.querySelector("#bestLevel"),
  finalAccuracy: document.querySelector("#finalAccuracy"),
  capturedCount: document.querySelector("#capturedCount"),
  resultTitle: document.querySelector("#resultTitle"),
  collection: document.querySelector("#collection"),
  againButton: document.querySelector("#againButton"),
  shareButton: document.querySelector("#shareButton"),
  leaderboardButton: document.querySelector("#leaderboardButton"),
  leaderboardDialog: document.querySelector("#leaderboardDialog"),
  closeLeaderboard: document.querySelector("#closeLeaderboard"),
  leaderboardList: document.querySelector("#leaderboardList")
};

let audioContext;
let soundOn = true;
let answering = false;
let backgroundTimer = null;

let state = {
  player: "Hunter",
  round: 1,
  level: 1,
  score: 0,
  streak: 0,
  correct: 0,
  bestLevel: 1,
  captured: [],
  patternBags: {},
  lastPatternByLevel: {},
  startedAt: 0,
  runSessionPromise: null,
  scoreSavePromise: null,
  question: null
};

function randomItem(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function shuffle(items) {
  return [...items].sort(() => Math.random() - 0.5);
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function getOnlineConfig() {
  const config = window.MIMO_ONLINE || {};
  const supabaseUrl = String(config.supabaseUrl || "").replace(/\/$/, "");
  const supabaseAnonKey = String(config.supabaseAnonKey || "");
  const edgeFunctionBaseUrl = String(config.edgeFunctionBaseUrl || "").replace(/\/$/, "");
  const edgeFunctionName = String(config.edgeFunctionName || "");
  const table = String(config.table || "mimo_scores");
  const hasPlaceholder = supabaseUrl.includes("YOUR_PROJECT_ID") || supabaseAnonKey.includes("YOUR_SUPABASE");
  if (config.provider !== "supabase" || !supabaseUrl || !supabaseAnonKey || hasPlaceholder) return null;
  return { supabaseUrl, supabaseAnonKey, edgeFunctionBaseUrl, edgeFunctionName, table };
}

function normalizeOnlineRecord(record) {
  return {
    player: record.name || record.player || "Hunter",
    score: Number(record.score || 0),
    bestLevel: Number(record.best_level || record.bestLevel || 1),
    accuracy: Number(record.accuracy || 0),
    monstersCaptured: Number(record.monsters_captured || record.monstersCaptured || 0),
    seconds: Number(record.seconds || 0),
    date: record.created_at || record.date || ""
  };
}

function sortScores(scores) {
  return [...scores].sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    if (b.bestLevel !== a.bestLevel) return b.bestLevel - a.bestLevel;
    if (b.accuracy !== a.accuracy) return b.accuracy - a.accuracy;
    return (a.seconds || 0) - (b.seconds || 0);
  });
}

async function fetchOnlineLeaderboard() {
  const config = getOnlineConfig();
  if (!config) return null;
  const params = "select=name,score,best_level,accuracy,monsters_captured,seconds,created_at&order=score.desc,best_level.desc,accuracy.desc,seconds.asc&limit=10";
  const response = await fetch(`${config.supabaseUrl}/rest/v1/${config.table}?${params}`, {
    headers: {
      apikey: config.supabaseAnonKey,
      Authorization: `Bearer ${config.supabaseAnonKey}`
    }
  });
  if (!response.ok) throw new Error(`Leaderboard fetch failed: ${response.status}`);
  return (await response.json()).map(normalizeOnlineRecord);
}

async function createRemoteRunSession(playerName) {
  const config = getOnlineConfig();
  if (!config?.edgeFunctionBaseUrl || !config?.edgeFunctionName) return null;
  const response = await fetch(`${config.edgeFunctionBaseUrl}/${config.edgeFunctionName}?action=start`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: config.supabaseAnonKey,
      Authorization: `Bearer ${config.supabaseAnonKey}`
    },
    body: JSON.stringify({ playerName })
  });
  if (!response.ok) {
    const message = await response.text();
    throw new Error(`Run session request failed: ${response.status} ${message}`.trim());
  }
  return response.json();
}

async function submitRemoteRecord(record, token) {
  const config = getOnlineConfig();
  if (!config?.edgeFunctionBaseUrl || !config?.edgeFunctionName) return false;
  const response = await fetch(`${config.edgeFunctionBaseUrl}/${config.edgeFunctionName}?action=submit`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: config.supabaseAnonKey,
      Authorization: `Bearer ${config.supabaseAnonKey}`
    },
    body: JSON.stringify({ ...record, token })
  });
  if (!response.ok) {
    const message = await response.text();
    throw new Error(`Leaderboard submit failed: ${response.status} ${message}`.trim());
  }
  return true;
}

function splitAnswerLabel(label) {
  const match = label.match(/^(.+?)\s*(\(.+\))$/);
  if (!match) {
    return { main: label, notes: "" };
  }
  return { main: match[1], notes: match[2] };
}

function getLevel(id = state.level) {
  return LEVELS[id - 1];
}

function createPatternBags() {
  return LEVELS.reduce((bags, level) => {
    bags[level.id] = shuffle(level.patterns);
    return bags;
  }, {});
}

function drawPatternForLevel(level) {
  if (!state.patternBags[level.id] || state.patternBags[level.id].length === 0) {
    state.patternBags[level.id] = shuffle(level.patterns);
    const lastLabel = state.lastPatternByLevel[level.id];
    if (lastLabel && state.patternBags[level.id].length > 1) {
      const repeatedIndex = state.patternBags[level.id].findIndex((pattern) => pattern.label === lastLabel);
      if (repeatedIndex === state.patternBags[level.id].length - 1) {
        const swapIndex = Math.floor(Math.random() * (state.patternBags[level.id].length - 1));
        [state.patternBags[level.id][repeatedIndex], state.patternBags[level.id][swapIndex]] =
          [state.patternBags[level.id][swapIndex], state.patternBags[level.id][repeatedIndex]];
      }
    }
  }
  const pattern = state.patternBags[level.id].pop();
  state.lastPatternByLevel[level.id] = pattern.label;
  return pattern;
}

function ensureAudio() {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioContext.state === "suspended") {
    audioContext.resume();
  }
  return audioContext;
}

function playTone(freq, start, duration, type = "sine", gainValue = 0.13) {
  if (!soundOn) return;
  const ctx = ensureAudio();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, start);
  gain.gain.setValueAtTime(0.0001, start);
  gain.gain.exponentialRampToValueAtTime(gainValue, start + 0.025);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(start);
  osc.stop(start + duration + 0.04);
}

function playKick(start) {
  if (!soundOn) return;
  const ctx = ensureAudio();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "sine";
  osc.frequency.setValueAtTime(86, start);
  osc.frequency.exponentialRampToValueAtTime(38, start + 0.16);
  gain.gain.setValueAtTime(0.0001, start);
  gain.gain.exponentialRampToValueAtTime(0.12, start + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.22);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(start);
  osc.stop(start + 0.24);
}

function playNoiseHit(start, duration, gainValue, filterFreq) {
  if (!soundOn) return;
  const ctx = ensureAudio();
  const buffer = ctx.createBuffer(1, Math.floor(ctx.sampleRate * duration), ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < data.length; i += 1) {
    data[i] = Math.random() * 2 - 1;
  }
  const source = ctx.createBufferSource();
  const filter = ctx.createBiquadFilter();
  const gain = ctx.createGain();
  source.buffer = buffer;
  filter.type = "lowpass";
  filter.frequency.setValueAtTime(filterFreq, start);
  gain.gain.setValueAtTime(0.0001, start);
  gain.gain.exponentialRampToValueAtTime(gainValue, start + 0.006);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
  source.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);
  source.start(start);
  source.stop(start + duration + 0.02);
}

function playBackgroundBar() {
  if (!soundOn) return;
  const ctx = ensureAudio();
  const now = ctx.currentTime + 0.03;
  [0, 0.74, 1.12, 1.5].forEach((beat) => playKick(now + beat));
  [0.38, 1.12].forEach((beat) => playNoiseHit(now + beat, 0.12, 0.032, 950));
  [0.18, 0.56, 0.94, 1.31, 1.69].forEach((beat) => playNoiseHit(now + beat, 0.045, 0.014, 3600));
}

function startBackgroundMusic() {
  if (backgroundTimer || !soundOn) return;
  playBackgroundBar();
  backgroundTimer = window.setInterval(playBackgroundBar, 1900);
}

function stopBackgroundMusic() {
  if (!backgroundTimer) return;
  window.clearInterval(backgroundTimer);
  backgroundTimer = null;
}

function playPattern(pattern) {
  if (!soundOn) return;
  const ctx = ensureAudio();
  const now = ctx.currentTime + 0.02;
  els.pulse.classList.add("playing");
  window.setTimeout(() => els.pulse.classList.remove("playing"), 900);

  if (pattern.mode === "single") {
    playTone(pattern.notes[0], now, 0.85, "sine", 0.16);
  } else if (pattern.mode === "sequence") {
    pattern.notes.forEach((note, index) => playTone(note, now + index * 0.38, 0.34, "triangle", 0.14));
  } else {
    pattern.notes.forEach((note) => playTone(note, now, 0.9, pattern.notes.length > 2 ? "sawtooth" : "triangle", 0.07));
  }
}

function playFeedback(ok) {
  if (!soundOn) return;
  const ctx = ensureAudio();
  const now = ctx.currentTime + 0.02;
  if (ok) {
    [523.25, 659.25, 783.99].forEach((freq, index) => playTone(freq, now + index * 0.09, 0.16, "triangle", 0.09));
  } else {
    playTone(196, now, 0.38, "sawtooth", 0.08);
    playTone(146.83, now + 0.18, 0.32, "sawtooth", 0.07);
  }
}

function buildQuestion() {
  const level = getLevel();
  const answerPattern = drawPatternForLevel(level);
  const optionCount = level.id === 1 ? 7 : Math.min(4, level.patterns.length);
  const decoys = shuffle(level.patterns.filter((pattern) => pattern.label !== answerPattern.label)).slice(0, optionCount - 1);
  const options = shuffle([answerPattern, ...decoys]).map((pattern) => ({
    pattern,
    isCorrect: pattern.label === answerPattern.label
  }));
  const monster = randomItem(level.monsters);

  state.question = { level, answerPattern, options, monster };
}

function render() {
  const level = getLevel();
  els.levelTitle.textContent = `Level ${level.id}: ${level.name}`;
  els.roundStat.textContent = `${state.round} / ${TOTAL_ROUNDS}`;
  els.scoreStat.textContent = state.score;
  els.streakStat.textContent = state.streak;
  els.accuracyStat.textContent = `${Math.round((state.correct / Math.max(1, state.round - 1)) * 100)}%`;
  els.promptTitle.textContent = "Listen closely";
  els.promptText.textContent = level.id === 1
    ? `This Level 1 challenge is worth ${level.points} points. Choose C, D, E, F, G, A, or B.`
    : `This Level ${level.id} challenge is worth ${level.points} points. Choose the matching English label.`;
  els.animalSprite.className = `pixel-animal ${state.question.monster.id}`;
  els.animalWalker.classList.remove("caught", "escaped");

  els.choices.innerHTML = "";
  state.question.options.forEach((option, index) => {
    const card = document.createElement("button");
    card.className = "answer-card";
    card.type = "button";
    card.dataset.index = index;
    const labelParts = splitAnswerLabel(option.pattern.label);
    const labelClass = labelParts.notes ? "answer-label split-label" : "answer-label";
    card.innerHTML = `
      <div class="answer-card-inner">
        <span class="${labelClass}">
          <span class="answer-main">${escapeHtml(labelParts.main)}</span>
          ${labelParts.notes ? `<span class="answer-notes">${escapeHtml(labelParts.notes)}</span>` : ""}
        </span>
        <span class="answer-hint">${level.role}</span>
      </div>
    `;
    card.addEventListener("click", () => chooseOption(index));
    els.choices.appendChild(card);
  });

  renderTeam();
  renderMeter();
}

function renderTeam() {
  if (state.captured.length === 0) {
    els.teamList.textContent = "No monsters yet";
    return;
  }
  const counts = state.captured.reduce((acc, monster) => {
    acc[monster.id] = acc[monster.id] || { ...monster, count: 0 };
    acc[monster.id].count += 1;
    return acc;
  }, {});
  els.teamList.innerHTML = Object.values(counts)
    .map((monster) => `<span class="team-chip">${monster.emoji} ${monster.name} ×${monster.count}</span>`)
    .join("");
}

function renderMeter() {
  document.querySelectorAll(".level-meter span").forEach((dot, index) => {
    dot.classList.toggle("active", index < state.level);
  });
}

function chooseOption(index) {
  if (answering) return;
  answering = true;

  const selected = state.question.options[index];
  const buttons = [...document.querySelectorAll(".answer-card")];
  playFeedback(selected.isCorrect);

  if (selected.isCorrect) {
    const monster = state.question.monster;
    buttons[index].classList.add("correct");
    els.animalWalker.classList.add("caught");
    state.score += state.question.level.points;
    state.streak += 1;
    state.correct += 1;
    state.captured.push(monster);
    els.promptTitle.textContent = "Captured!";
    els.promptText.textContent = `${monster.name} joined your team. +${state.question.level.points} points`;
  } else {
    buttons[index].classList.add("wrong");
    const correctIndex = state.question.options.findIndex((option) => option.isCorrect);
    if (correctIndex >= 0) {
      buttons[correctIndex].classList.add("correct-answer");
    }
    els.animalWalker.classList.add("escaped");
    state.streak = 0;
    els.gameScreen.classList.add("shake");
    els.promptTitle.innerHTML = `Correct answer: <span class="big-answer">${escapeHtml(state.question.answerPattern.label)}</span>`;
    els.promptText.textContent = "The animal exploded. Listen for the match next time.";
  }

  buttons.forEach((button) => {
    button.disabled = true;
  });
  window.setTimeout(() => {
    advance(selected.isCorrect);
  }, 1150);
}

function advance(wasCorrect) {
  if (wasCorrect && state.streak >= 2) {
    state.level = Math.min(LEVELS.length, state.level + 1);
    state.streak = 0;
  } else if (!wasCorrect) {
    state.level = Math.max(1, state.level - 1);
  }

  state.bestLevel = Math.max(state.bestLevel, state.level);
  state.round += 1;
  els.gameScreen.classList.remove("shake");
  answering = false;

  if (state.round > TOTAL_ROUNDS) {
    finishGame();
    return;
  }

  buildQuestion();
  render();
  window.setTimeout(() => playPattern(state.question.answerPattern), 260);
}

function startGame() {
  state = {
    player: els.playerName.value.trim() || "Hunter",
    round: 1,
    level: 1,
    score: 0,
    streak: 0,
    correct: 0,
    bestLevel: 1,
    captured: [],
    patternBags: createPatternBags(),
    lastPatternByLevel: {},
    startedAt: performance.now(),
    runSessionPromise: null,
    scoreSavePromise: null,
    question: null
  };
  const config = getOnlineConfig();
  if (config?.edgeFunctionBaseUrl && config?.edgeFunctionName) {
    state.runSessionPromise = createRemoteRunSession(state.player).catch((error) => {
      console.warn(error);
      return null;
    });
  }
  ensureAudio();
  startBackgroundMusic();
  buildQuestion();
  showScreen("game");
  render();
  window.setTimeout(() => playPattern(state.question.answerPattern), 350);
}

function finishGame() {
  stopBackgroundMusic();
  showScreen("end");
  const accuracy = Math.round((state.correct / TOTAL_ROUNDS) * 100);
  els.finalScore.textContent = state.score;
  els.bestLevel.textContent = `Level ${state.bestLevel}`;
  els.finalAccuracy.textContent = `${accuracy}%`;
  els.capturedCount.textContent = state.captured.length;
  els.resultTitle.textContent = state.score >= 500 ? "Elite ears" : state.score >= 260 ? "Sharp hunter" : "Training run";
  els.collection.innerHTML = state.captured.length
    ? state.captured.map((monster) => `<span class="team-chip">${monster.emoji} ${monster.name}</span>`).join("")
    : `<span class="team-chip">No captures this time</span>`;
  state.scoreSavePromise = saveScore({
    player: state.player,
    score: state.score,
    bestLevel: state.bestLevel,
    accuracy,
    monstersCaptured: state.captured.length,
    seconds: Math.max(1, Math.round((performance.now() - state.startedAt) / 1000))
  });
}

function showScreen(name) {
  els.startScreen.classList.toggle("hidden", name !== "start");
  els.gameScreen.classList.toggle("hidden", name !== "game");
  els.endScreen.classList.toggle("hidden", name !== "end");
}

async function saveScore(entry) {
  const record = { ...entry, date: new Date().toISOString() };
  try {
    const config = getOnlineConfig();
    if (config?.edgeFunctionBaseUrl && config?.edgeFunctionName) {
      const session = await state.runSessionPromise;
      if (session?.token) {
        await submitRemoteRecord(record, session.token);
        return;
      }
    }
  } catch (error) {
    console.warn(error);
  }

  const scores = getScores();
  scores.push(record);
  localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(sortScores(scores).slice(0, 10)));
}

function getScores() {
  try {
    const scores = JSON.parse(localStorage.getItem(LEADERBOARD_KEY) || "[]");
    return Array.isArray(scores) ? scores : [];
  } catch {
    return [];
  }
}

async function showLeaderboard() {
  els.leaderboardList.innerHTML = "<li>Syncing<span>Loading</span></li>";
  els.leaderboardDialog.showModal();
  if (state.scoreSavePromise) {
    await state.scoreSavePromise.catch((error) => console.warn(error));
  }

  let scores = sortScores(getScores()).slice(0, 10);
  let source = "Local";
  if (getOnlineConfig()) {
    try {
      scores = sortScores(await fetchOnlineLeaderboard()).slice(0, 10);
      source = "Online";
    } catch (error) {
      console.warn(error);
      source = "Local fallback";
    }
  }

  els.leaderboardList.innerHTML = scores.length
    ? scores.map((entry) => `<li>${escapeHtml(entry.player)}<span>${entry.score} pts · L${entry.bestLevel} · ${entry.accuracy}%</span></li>`).join("")
    : "<li>No scores yet<span>Play a run</span></li>";
  els.leaderboardList.insertAdjacentHTML("afterbegin", `<li class="leaderboard-source">${source}<span>${scores.length ? "Top 10" : ""}</span></li>`);
}

async function shareScore() {
  const gameUrl = `${window.location.origin}${window.location.pathname}`;
  const text = `I scored ${state.score} points in Melody Hunters! 🎵✨ Can you beat my score?\nHunter: ${state.player}\n${gameUrl}`;

  try {
    await navigator.clipboard.writeText(text);
    const originalText = els.shareButton.textContent;
    els.shareButton.textContent = "Copied";
    window.setTimeout(() => {
      els.shareButton.textContent = originalText;
    }, 1400);
  } catch (error) {
    console.warn(error);
  }
}

els.startButton.addEventListener("click", startGame);
if (els.startLeaderboardButton) {
  els.startLeaderboardButton.addEventListener("click", showLeaderboard);
}
els.againButton.addEventListener("click", startGame);
els.shareButton.addEventListener("click", shareScore);
els.replayButton.addEventListener("click", () => {
  if (state.question) playPattern(state.question.answerPattern);
});
els.soundToggle.addEventListener("click", () => {
  soundOn = !soundOn;
  els.soundToggle.textContent = soundOn ? "🔊" : "🔇";
  if (soundOn && !els.gameScreen.classList.contains("hidden")) {
    startBackgroundMusic();
  } else {
    stopBackgroundMusic();
  }
});
els.leaderboardButton.addEventListener("click", showLeaderboard);
els.closeLeaderboard.addEventListener("click", () => els.leaderboardDialog.close());
els.playerName.addEventListener("keydown", (event) => {
  if (event.key === "Enter") startGame();
});
