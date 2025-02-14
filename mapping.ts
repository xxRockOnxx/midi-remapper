// Kicks
const KICK = "kick";
const ACOUSTIC_BASS_DRUM = "acoustic_bass_drum";

// Snares
const SNARE_HIT = "snare_hit";
const SNARE_STICK = "snare_stick";
const SNARE_FLAM = "snare_flam";
const SNARE_RUFF = "snare_ruff";
const SNARE_OFF = "snare_off";
const SIDE_STICK = "side_stick";
const HAND_CLAP = "hand_clap";
const SNARE_ELECTRIC = "snare_electric";

// Hi-Hats
const HAT_TIGHT = "hat_tight";
const HAT_CLOSED = "hat_closed";
const HAT_PEDAL = "hat_pedal";
const HAT_PEDAL_CHICK = "hat_pedal_chick";
const HAT_OPEN_1 = "hat_open_1";
const HAT_OPEN_2 = "hat_open_2";
const HAT_OPEN_3 = "hat_open_3";
const HAT_EDGE_TIGHT = "hat_edge_tight";
const HAT_CHING = "hat_ching";

// Toms
const RACK_TOM = "rack_tom";
const TOM_FLOOR_LOW = "tom_floor_low";
const TOM_FLOOR_HIGH = "tom_floor_high";
const TOM_LOW = "tom_low";
const TOM_LOW_MID = "tom_low_mid";
const TOM_HI_MID = "tom_hi_mid";
const TOM_HIGH = "tom_high";

// Cymbals
const CRASH_1 = "crash_1";
const CRASH_2 = "crash_2";
const CRASH_L = "crash_l";
const CRASH_L_CHOKE = "crash_l_choke";
const CRASH_R = "crash_r";
const CRASH_R_CHOKE = "crash_r_choke";
const RIDE_1 = "ride_1";
const RIDE_2 = "ride_2";
const RIDE_TIP = "ride_tip";
const RIDE_BELL = "ride_bell";
const RIDE_CRASH = "ride_crash";
const CHINA = "china";
const CHINA_CHOKE = "china_choke";
const SPLASH = "splash";
const SPLASH_CHOKE = "splash_choke";

// Percussion
const TAMBOURINE = "tambourine";
const COWBELL = "cowbell";
const VIBRASLAP = "vibraslap";
const BONGO_HIGH = "bongo_high";
const BONGO_LOW = "bongo_low";
const CONGA_HIGH_MUTE = "conga_high_mute";
const CONGA_HIGH_OPEN = "conga_high_open";
const CONGA_LOW = "conga_low";
const TIMBALE_HIGH = "timbale_high";
const TIMBALE_LOW = "timbale_low";
const AGOGO_HIGH = "agogo_high";
const AGOGO_LOW = "agogo_low";
const CABASA = "cabasa";
const MARACAS = "maracas";
const WHISTLE_SHORT = "whistle_short";
const WHISTLE_LONG = "whistle_long";
const GUIRO_SHORT = "guiro_short";
const GUIRO_LONG = "guiro_long";
const CLAVES = "claves";
const WOODBLOCK_HIGH = "woodblock_high";
const WOODBLOCK_LOW = "woodblock_low";
const CUICA_MUTE = "cuica_mute";
const CUICA_OPEN = "cuica_open";
const TRIANGLE_MUTE = "triangle_mute";
const TRIANGLE_OPEN = "triangle_open";

export interface Instruments {
  [note: number]: string;
}

const GENERAL_MIDI = {
  35: ACOUSTIC_BASS_DRUM,
  36: KICK,
  37: SIDE_STICK,
  38: SNARE_HIT,
  39: HAND_CLAP,
  40: SNARE_ELECTRIC,
  41: TOM_FLOOR_LOW,
  42: HAT_CLOSED,
  43: TOM_FLOOR_HIGH,
  44: HAT_PEDAL,
  45: TOM_LOW,
  46: HAT_OPEN_1,
  47: TOM_LOW_MID,
  48: TOM_HI_MID,
  49: CRASH_1,
  50: TOM_HIGH,
  51: RIDE_1,
  52: CHINA,
  53: RIDE_BELL,
  54: TAMBOURINE,
  55: SPLASH,
  56: COWBELL,
  57: CRASH_2,
  58: VIBRASLAP,
  59: RIDE_2,
  60: BONGO_HIGH,
  61: BONGO_LOW,
  62: CONGA_HIGH_MUTE,
  63: CONGA_HIGH_OPEN,
  64: CONGA_LOW,
  65: TIMBALE_HIGH,
  66: TIMBALE_LOW,
  67: AGOGO_HIGH,
  68: AGOGO_LOW,
  69: CABASA,
  70: MARACAS,
  71: WHISTLE_SHORT,
  72: WHISTLE_LONG,
  73: GUIRO_SHORT,
  74: GUIRO_LONG,
  75: CLAVES,
  76: WOODBLOCK_HIGH,
  77: WOODBLOCK_LOW,
  78: CUICA_MUTE,
  79: CUICA_OPEN,
  80: TRIANGLE_MUTE,
  81: TRIANGLE_OPEN,
};

const MM_GGD = {
  36: KICK,
  37: SNARE_HIT,
  38: SNARE_FLAM,
  39: SNARE_RUFF,
  40: SNARE_STICK,
  41: SNARE_OFF,
  42: RACK_TOM,
  43: TOM_FLOOR_LOW,
  45: TOM_FLOOR_LOW,
  46: TOM_FLOOR_HIGH,
  48: HAT_TIGHT,
  49: HAT_CLOSED,
  52: HAT_OPEN_1,
  53: HAT_OPEN_2,
  54: HAT_OPEN_3,
  55: HAT_PEDAL_CHICK,
  57: HAT_CHING,
  58: CRASH_L,
  59: CRASH_L_CHOKE,
  61: CRASH_R,
  62: CRASH_R_CHOKE,
  71: CHINA,
  72: CHINA_CHOKE,
  73: RIDE_TIP,
  74: RIDE_BELL,
  76: RIDE_CRASH,
  77: SPLASH,
  83: SPLASH_CHOKE,
};

const OKW_AR_GGD = {
  36: KICK,
  37: SNARE_HIT,
  40: SNARE_STICK,
  42: RACK_TOM,
  45: TOM_FLOOR_LOW,
  48: HAT_TIGHT,
  49: HAT_CLOSED,
  52: HAT_OPEN_1,
  53: HAT_OPEN_2,
  54: HAT_EDGE_TIGHT,
  55: HAT_PEDAL_CHICK,
  57: HAT_OPEN_3,
  58: CRASH_L,
  59: CRASH_L_CHOKE,
  61: CRASH_R,
  62: CRASH_R_CHOKE,
  71: CHINA,
  72: CHINA_CHOKE,
  73: RIDE_TIP,
  74: RIDE_BELL,
  77: SPLASH,
  83: SPLASH_CHOKE,
};

export {
  // Export all constants
  KICK,
  ACOUSTIC_BASS_DRUM,
  SNARE_HIT,
  SNARE_STICK,
  SNARE_FLAM,
  SNARE_RUFF,
  SNARE_OFF,
  SIDE_STICK,
  HAND_CLAP,
  SNARE_ELECTRIC,
  HAT_TIGHT,
  HAT_CLOSED,
  HAT_PEDAL,
  HAT_PEDAL_CHICK,
  HAT_OPEN_1,
  HAT_OPEN_2,
  HAT_OPEN_3,
  HAT_EDGE_TIGHT,
  HAT_CHING,
  RACK_TOM,
  TOM_FLOOR_LOW,
  TOM_FLOOR_HIGH,
  TOM_LOW,
  TOM_LOW_MID,
  TOM_HI_MID,
  TOM_HIGH,
  CRASH_1,
  CRASH_2,
  CRASH_L,
  CRASH_L_CHOKE,
  CRASH_R,
  CRASH_R_CHOKE,
  RIDE_1,
  RIDE_2,
  RIDE_TIP,
  RIDE_BELL,
  RIDE_CRASH,
  CHINA,
  CHINA_CHOKE,
  SPLASH,
  SPLASH_CHOKE,
  TAMBOURINE,
  COWBELL,
  VIBRASLAP,
  BONGO_HIGH,
  BONGO_LOW,
  CONGA_HIGH_MUTE,
  CONGA_HIGH_OPEN,
  CONGA_LOW,
  TIMBALE_HIGH,
  TIMBALE_LOW,
  AGOGO_HIGH,
  AGOGO_LOW,
  CABASA,
  MARACAS,
  WHISTLE_SHORT,
  WHISTLE_LONG,
  GUIRO_SHORT,
  GUIRO_LONG,
  CLAVES,
  WOODBLOCK_HIGH,
  WOODBLOCK_LOW,
  CUICA_MUTE,
  CUICA_OPEN,
  TRIANGLE_MUTE,
  TRIANGLE_OPEN,

  // Export mappings
  GENERAL_MIDI,
  MM_GGD,
  OKW_AR_GGD,
};
