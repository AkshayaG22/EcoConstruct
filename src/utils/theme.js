// Time-of-day dynamic theme system for EcoConstruct Pro
export const getTimeOfDay = () => {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) {
    return 'morning';
  } else if (hour >= 12 && hour < 17) {
    return 'afternoon';
  } else {
    return 'evening';
  }
};

export const THEMES = {
  morning: {
    id: 'morning',
    name: 'Morning Fresh',
    tagline: 'Fresh Emerald & Teal Dawn',
    timeRange: '05:00 - 11:59',
    // Ambient backgrounds
    bgPage: 'bg-slate-900',
    bgGradient: 'from-emerald-950/40 via-slate-900 to-teal-950/30',
    headerBg: 'bg-slate-900/90 border-emerald-900/40',
    heroBg: 'bg-gradient-to-b from-emerald-950/30 via-slate-900 to-slate-900',
    // Accents
    accentPrimary: 'bg-emerald-600 hover:bg-emerald-500 text-white',
    accentText: 'text-emerald-400',
    accentGradientText: 'from-emerald-400 via-teal-300 to-emerald-200',
    badgeBg: 'bg-emerald-950 text-emerald-300 border-emerald-800/60',
    glowColor: 'shadow-emerald-500/20',
    cardBorderHover: 'hover:border-emerald-500/50',
    navPill: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30',
    indicatorColor: 'bg-emerald-400',
  },
  afternoon: {
    id: 'afternoon',
    name: 'Solar Afternoon',
    tagline: 'Warm Solar-Amber & Golden Green',
    timeRange: '12:00 - 16:59',
    // Ambient backgrounds
    bgPage: 'bg-slate-900',
    bgGradient: 'from-amber-950/35 via-slate-900 to-emerald-950/25',
    headerBg: 'bg-slate-900/90 border-amber-900/40',
    heroBg: 'bg-gradient-to-b from-amber-950/25 via-slate-900 to-slate-900',
    // Accents
    accentPrimary: 'bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold',
    accentText: 'text-amber-400',
    accentGradientText: 'from-amber-400 via-yellow-300 to-emerald-300',
    badgeBg: 'bg-amber-950/80 text-amber-300 border-amber-800/60',
    glowColor: 'shadow-amber-500/20',
    cardBorderHover: 'hover:border-amber-500/50',
    navPill: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
    indicatorColor: 'bg-amber-400',
  },
  evening: {
    id: 'evening',
    name: 'Midnight Forest',
    tagline: 'Sleek Dark Slate & Midnight Forest',
    timeRange: '17:00 - 04:59',
    // Ambient backgrounds
    bgPage: 'bg-slate-950',
    bgGradient: 'from-slate-950 via-slate-900 to-emerald-950/30',
    headerBg: 'bg-slate-950/90 border-slate-800',
    heroBg: 'bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950',
    // Accents
    accentPrimary: 'bg-emerald-600 hover:bg-emerald-500 text-white',
    accentText: 'text-emerald-300',
    accentGradientText: 'from-emerald-300 via-teal-200 to-cyan-300',
    badgeBg: 'bg-slate-800 text-emerald-300 border-slate-700',
    glowColor: 'shadow-emerald-900/30',
    cardBorderHover: 'hover:border-teal-500/50',
    navPill: 'bg-slate-800 text-teal-300 border-slate-700',
    indicatorColor: 'bg-teal-400',
  }
};
