// Comprehensive K-pop groups and member database
export const GENERATIONS = [
  { id: 'all', label: 'All Generations' },
  { id: '1st', label: '1st Gen (1992–2002)', range: [1992, 2002] },
  { id: '2nd', label: '2nd Gen (2003–2011)', range: [2003, 2011] },
  { id: '3rd', label: '3rd Gen (2012–2017)', range: [2012, 2017] },
  { id: '4th', label: '4th Gen (2018–2022)', range: [2018, 2022] },
  { id: '5th', label: '5th Gen (2023–Present)', range: [2023, 2030] }
];

export const GROUP_TYPES = [
  { id: 'all', label: 'All Types' },
  { id: 'girl_group', label: 'Girl Groups' },
  { id: 'boy_group', label: 'Boy Groups' },
  { id: 'coed_group', label: 'Co-ed Groups' },
  { id: 'solo', label: 'Solo Artists' }
];

export const KPOP_GROUPS = [
  // ----------------- 1st Gen Girl Groups -----------------
  {
    id: 'ses',
    name: 'S.E.S.',
    type: 'girl_group',
    generation: '1st',
    debutYear: 1997,
    agency: 'SM Entertainment',
    description: 'Pioneering first-generation legendary girl group.',
    fandomName: "Friend",
    members: [
      { id: 'ses_bada', name: 'Bada', realName: 'Choi Sung-hee', status: 'active' },
      { id: 'ses_eugene', name: 'Eugene', realName: 'Kim Yoo-jin', status: 'active' },
      { id: 'ses_shoo', name: 'Shoo', realName: 'Kunimitsu Shō', status: 'active' }
    ]
  },
  {
    id: 'finkl',
    name: 'Fin.K.L.',
    type: 'girl_group',
    generation: '1st',
    debutYear: 1998,
    agency: 'DSP Media',
    description: 'Iconic 1st gen girl group with lasting cultural impact.',
    fandomName: 'FinKy',
    members: [
      { id: 'finkl_leehyori', name: 'Lee Hyori', realName: 'Lee Hyo-ri', status: 'active' },
      { id: 'finkl_ockjoohyun', name: 'Ock Joo-hyun', realName: 'Ock Joo-hyun', status: 'active' },
      { id: 'finkl_leejin', name: 'Lee Jin', realName: 'Lee Jin', status: 'active' },
      { id: 'finkl_sungyuri', name: 'Sung Yu-ri', realName: 'Sung Yu-ri', status: 'active' }
    ]
  },

  // ----------------- 2nd Gen Girl Groups -----------------
  {
    id: 'snsd',
    name: "Girls' Generation (SNSD)",
    type: 'girl_group',
    generation: '2nd',
    debutYear: 2007,
    agency: 'SM Entertainment',
    description: "The Nation's Girl Group who defined modern K-pop.",
    fandomName: 'SONE',
    members: [
      { id: 'snsd_taeyeon', name: 'Taeyeon', realName: 'Kim Tae-yeon', status: 'active' },
      { id: 'snsd_sunny', name: 'Sunny', realName: 'Lee Soon-kyu', status: 'active' },
      { id: 'snsd_tiffany', name: 'Tiffany Young', realName: 'Stephanie Young Hwang', status: 'active' },
      { id: 'snsd_hyoyeon', name: 'Hyoyeon', realName: 'Kim Hyo-yeon', status: 'active' },
      { id: 'snsd_yuri', name: 'Yuri', realName: 'Kwon Yu-ri', status: 'active' },
      { id: 'snsd_sooyoung', name: 'Sooyoung', realName: 'Choi Soo-young', status: 'active' },
      { id: 'snsd_yoona', name: 'Yoona', realName: 'Lim Yoon-a', status: 'active' },
      { id: 'snsd_seohyun', name: 'Seohyun', realName: 'Seo Ju-hyun', status: 'active' },
      { id: 'snsd_jessica', name: 'Jessica', realName: 'Jessica Jung', status: 'former' }
    ]
  },
  {
    id: 'wonder_girls',
    name: 'Wonder Girls',
    type: 'girl_group',
    generation: '2nd',
    debutYear: 2007,
    agency: 'JYP Entertainment',
    description: 'Retro queens known for Tell Me, Nobody, and I Feel You.',
    fandomName: 'Wonderful',
    members: [
      { id: 'wg_sunye', name: 'Sunye', realName: 'Min Sun-ye', status: 'former' },
      { id: 'wg_yeeun', name: 'Yeeun (HA:TFELT)', realName: 'Park Ye-eun', status: 'active' },
      { id: 'wg_sunmi', name: 'Sunmi', realName: 'Lee Sun-mi', status: 'active' },
      { id: 'wg_hyerim', name: 'Hyerim', realName: 'Woo Hye-rim', status: 'active' },
      { id: 'wg_yubin', name: 'Yubin', realName: 'Kim Yu-bin', status: 'active' },
      { id: 'wg_sohee', name: 'Sohee', realName: 'Ahn So-hee', status: 'former' },
      { id: 'wg_hyuna', name: 'HyunA', realName: 'Kim Hyun-ah', status: 'former' }
    ]
  },
  {
    id: 'kara',
    name: 'KARA',
    type: 'girl_group',
    generation: '2nd',
    debutYear: 2007,
    agency: 'DSP Media / RBW',
    description: 'Legends of the Hallyu wave in South Korea and Japan.',
    fandomName: 'Kamilia',
    members: [
      { id: 'kara_gyuri', name: 'Gyuri', realName: 'Park Gyu-ri', status: 'active' },
      { id: 'kara_seungyeon', name: 'Seungyeon', realName: 'Han Seung-yeon', status: 'active' },
      { id: 'kara_nicole', name: 'Nicole', realName: 'Nicole Jung', status: 'active' },
      { id: 'kara_jiyoung', name: 'Jiyoung', realName: 'Kang Ji-young', status: 'active' },
      { id: 'kara_youngji', name: 'Youngji', realName: 'Heo Young-ji', status: 'active' },
      { id: 'kara_hara', name: 'Goo Hara', realName: 'Goo Ha-ra', status: 'memorial' }
    ]
  },
  {
    id: '2ne1',
    name: '2NE1',
    type: 'girl_group',
    generation: '2nd',
    debutYear: 2009,
    agency: 'YG Entertainment',
    description: 'Revolutionary girl-crush pioneers known worldwide.',
    fandomName: 'Blackjack',
    members: [
      { id: '2ne1_cl', name: 'CL', realName: 'Lee Chae-rin', status: 'active' },
      { id: '2ne1_bom', name: 'Park Bom', realName: 'Park Bom', status: 'active' },
      { id: '2ne1_dara', name: 'Sandara Park', realName: 'Sandara Park', status: 'active' },
      { id: '2ne1_minzy', name: 'Minzy', realName: 'Gong Min-ji', status: 'active' }
    ]
  },
  {
    id: 'fx',
    name: 'f(x)',
    type: 'girl_group',
    generation: '2nd',
    debutYear: 2009,
    agency: 'SM Entertainment',
    description: 'Avant-garde pop and electronic icons known for 4 Walls and Pink Tape.',
    fandomName: 'MeU',
    members: [
      { id: 'fx_victoria', name: 'Victoria', realName: 'Song Qian', status: 'active' },
      { id: 'fx_amber', name: 'Amber', realName: 'Amber Josephine Liu', status: 'active' },
      { id: 'fx_luna', name: 'Luna', realName: 'Park Sun-young', status: 'active' },
      { id: 'fx_krystal', name: 'Krystal', realName: 'Chrystal Soo Jung', status: 'active' },
      { id: 'fx_sulli', name: 'Sulli', realName: 'Choi Jin-ri', status: 'memorial' }
    ]
  },
  {
    id: 'tara',
    name: 'T-ara',
    type: 'girl_group',
    generation: '2nd',
    debutYear: 2009,
    agency: 'Core Contents Media / MBK',
    description: 'Chameleon pop royalty with unforgettable catchy hooks (Roly-Poly, Sugar Free).',
    fandomName: "QUEEN'S",
    members: [
      { id: 'tara_qri', name: 'Qri', realName: 'Lee Ji-hyun', status: 'active' },
      { id: 'tara_eunjung', name: 'Eunjung', realName: 'Ham Eun-jung', status: 'active' },
      { id: 'tara_hyomin', name: 'Hyomin', realName: 'Park Sun-young', status: 'active' },
      { id: 'tara_jiyeon', name: 'Jiyeon', realName: 'Park Ji-yeon', status: 'active' },
      { id: 'tara_boram', name: 'Boram', realName: 'Jeon Bo-ram', status: 'former' },
      { id: 'tara_soyeon', name: 'Soyeon', realName: 'Park So-yeon', status: 'former' }
    ]
  },
  {
    id: 'miss_a',
    name: 'miss A',
    type: 'girl_group',
    generation: '2nd',
    debutYear: 2010,
    agency: 'JYP Entertainment',
    description: 'Bad Girl Good Girl breakout sensations with fierce choreography.',
    fandomName: 'Say A',
    members: [
      { id: 'missa_fei', name: 'Fei', realName: 'Wang Feifei', status: 'active' },
      { id: 'missa_jia', name: 'Jia', realName: 'Meng Jia', status: 'active' },
      { id: 'missa_min', name: 'Min', realName: 'Lee Min-young', status: 'active' },
      { id: 'missa_suzy', name: 'Bae Suzy', realName: 'Bae Su-ji', status: 'active' }
    ]
  },
  {
    id: 'sistar',
    name: 'SISTAR',
    type: 'girl_group',
    generation: '2nd',
    debutYear: 2010,
    agency: 'Starship Entertainment',
    description: 'The unrivaled Summer Queens with powerhouse vocals and sun-kissed hits.',
    fandomName: 'STAR1',
    members: [
      { id: 'sistar_hyolyn', name: 'Hyolyn', realName: 'Kim Hyo-jung', status: 'active' },
      { id: 'sistar_bora', name: 'Bora', realName: 'Yoon Bo-ra', status: 'active' },
      { id: 'sistar_soyou', name: 'Soyou', realName: 'Kang Ji-hyun', status: 'active' },
      { id: 'sistar_dasom', name: 'Dasom', realName: 'Kim Da-som', status: 'active' }
    ]
  },
  {
    id: 'apink',
    name: 'Apink',
    type: 'girl_group',
    generation: '2nd',
    debutYear: 2011,
    agency: 'IST Entertainment / With US',
    description: 'Innocent concept queens who seamlessly matured into chic elegance.',
    fandomName: 'Pink Panda',
    members: [
      { id: 'apink_chorong', name: 'Chorong', realName: 'Park Cho-rong', status: 'active' },
      { id: 'apink_bomi', name: 'Bomi', realName: 'Yoon Bo-mi', status: 'active' },
      { id: 'apink_eunji', name: 'Eunji', realName: 'Jung Eun-ji', status: 'active' },
      { id: 'apink_namjoo', name: 'Namjoo', realName: 'Kim Nam-joo', status: 'active' },
      { id: 'apink_hayoung', name: 'Hayoung', realName: 'Oh Ha-young', status: 'active' },
      { id: 'apink_naeun', name: 'Son Na-eun', realName: 'Son Na-eun', status: 'former' }
    ]
  },

  // ----------------- 3rd Gen Girl Groups -----------------
  {
    id: 'red_velvet',
    name: 'Red Velvet',
    type: 'girl_group',
    generation: '3rd',
    debutYear: 2014,
    agency: 'SM Entertainment',
    description: 'Dual concept masters combining vivid pop energy with smooth velvet R&B.',
    fandomName: 'ReVeluv',
    members: [
      { id: 'rv_irene', name: 'Irene', realName: 'Bae Joo-hyun', status: 'active' },
      { id: 'rv_seulgi', name: 'Seulgi', realName: 'Kang Seul-gi', status: 'active' },
      { id: 'rv_wendy', name: 'Wendy', realName: 'Son Seung-wan', status: 'active' },
      { id: 'rv_joy', name: 'Joy', realName: 'Park Soo-young', status: 'active' },
      { id: 'rv_yeri', name: 'Yeri', realName: 'Kim Ye-rim', status: 'active' }
    ]
  },
  {
    id: 'twice',
    name: 'TWICE',
    type: 'girl_group',
    generation: '3rd',
    debutYear: 2015,
    agency: 'JYP Entertainment',
    description: 'Global stadium powerhouses and beloved queens of bright infectious pop.',
    fandomName: 'ONCE',
    members: [
      { id: 'twice_nayeon', name: 'Nayeon', realName: 'Im Na-yeon', status: 'active' },
      { id: 'twice_jeongyeon', name: 'Jeongyeon', realName: 'Yoo Jeong-yeon', status: 'active' },
      { id: 'twice_momo', name: 'Momo', realName: 'Hirai Momo', status: 'active' },
      { id: 'twice_sana', name: 'Sana', realName: 'Minatozaki Sana', status: 'active' },
      { id: 'twice_jihyo', name: 'Jihyo', realName: 'Park Ji-hyo', status: 'active' },
      { id: 'twice_mina', name: 'Mina', realName: 'Myoui Mina', status: 'active' },
      { id: 'twice_dahyun', name: 'Dahyun', realName: 'Kim Da-hyun', status: 'active' },
      { id: 'twice_chaeyoung', name: 'Chaeyoung', realName: 'Son Chae-young', status: 'active' },
      { id: 'twice_tzuyu', name: 'Tzuyu', realName: 'Chou Tzu-yu', status: 'active' }
    ]
  },
  {
    id: 'blackpink',
    name: 'BLACKPINK',
    type: 'girl_group',
    generation: '3rd',
    debutYear: 2016,
    agency: 'YG Entertainment',
    description: 'Record-shattering world tour headliners and fashion ambassadors.',
    fandomName: 'BLINK',
    members: [
      { id: 'bp_jisoo', name: 'Jisoo', realName: 'Kim Ji-soo', status: 'active' },
      { id: 'bp_jennie', name: 'Jennie', realName: 'Kim Jennie', status: 'active' },
      { id: 'bp_rose', name: 'Rosé', realName: 'Roseanne Park / Park Chae-young', status: 'active' },
      { id: 'bp_lisa', name: 'Lisa', realName: 'Lalisa Manobal', status: 'active' }
    ]
  },
  {
    id: 'mamamoo',
    name: 'MAMAMOO',
    type: 'girl_group',
    generation: '3rd',
    debutYear: 2014,
    agency: 'RBW',
    description: 'Vocal powerhouse quartet with unmatched live performance and charisma.',
    fandomName: 'MooMoo',
    members: [
      { id: 'mmm_solar', name: 'Solar', realName: 'Kim Yong-sun', status: 'active' },
      { id: 'mmm_moonbyul', name: 'Moonbyul', realName: 'Moon Byul-yi', status: 'active' },
      { id: 'mmm_wheein', name: 'Wheein', realName: 'Jung Whee-in', status: 'active' },
      { id: 'mmm_hwasa', name: 'Hwasa', realName: 'Ahn Hye-jin', status: 'active' }
    ]
  },
  {
    id: 'gfriend',
    name: 'GFRIEND',
    type: 'girl_group',
    generation: '3rd',
    debutYear: 2015,
    agency: 'Source Music',
    description: 'Known for powerful innocence, emotive melodies, and laser synchronization.',
    fandomName: 'BUDDY',
    members: [
      { id: 'gfr_sowon', name: 'Sowon', realName: 'Kim So-won', status: 'active' },
      { id: 'gfr_yerin', name: 'Yerin', realName: 'Jung Ye-rin', status: 'active' },
      { id: 'gfr_eunha', name: 'Eunha (VIVIZ)', realName: 'Jung Eun-bi', status: 'active' },
      { id: 'gfr_yuju', name: 'Yuju', realName: 'Choi Yu-na', status: 'active' },
      { id: 'gfr_sinb', name: 'SinB (VIVIZ)', realName: 'Hwang Eun-bi', status: 'active' },
      { id: 'gfr_umji', name: 'Umji (VIVIZ)', realName: 'Kim Ye-won', status: 'active' }
    ]
  },
  {
    id: 'oh_my_girl',
    name: 'Oh My Girl',
    type: 'girl_group',
    generation: '3rd',
    debutYear: 2015,
    agency: 'WM Entertainment',
    description: 'Ethereal fairy concepts and chart-topping hits (Nonstop, Dolphin).',
    fandomName: 'Miracle',
    members: [
      { id: 'omg_hyojung', name: 'Hyojung', realName: 'Choi Hyo-jung', status: 'active' },
      { id: 'omg_mimi', name: 'Mimi', realName: 'Kim Mi-hyun', status: 'active' },
      { id: 'omg_yooa', name: 'YooA', realName: 'Yoo Si-ah', status: 'active' },
      { id: 'omg_seunghee', name: 'Seunghee', realName: 'Hyun Seung-hee', status: 'active' },
      { id: 'omg_yubin', name: 'Yubin', realName: 'Bae Yu-bin', status: 'active' },
      { id: 'omg_arin', name: 'Arin', realName: 'Choi Ye-won', status: 'active' },
      { id: 'omg_jiho', name: 'Jiho', realName: 'Kim Ji-ho', status: 'former' }
    ]
  },
  {
    id: 'wjsn',
    name: 'WJSN (Cosmic Girls)',
    type: 'girl_group',
    generation: '3rd',
    debutYear: 2016,
    agency: 'Starship Entertainment',
    description: 'Celestial synth-pop queens and Queendom 2 Champions.',
    fandomName: 'UJUNG',
    members: [
      { id: 'wjsn_exy', name: 'Exy', realName: 'Chu So-jung', status: 'active' },
      { id: 'wjsn_seola', name: 'Seola', realName: 'Kim Hyun-jung', status: 'active' },
      { id: 'wjsn_bona', name: 'Bona', realName: 'Kim Ji-yeon', status: 'active' },
      { id: 'wjsn_soobin', name: 'Soobin', realName: 'Park Soo-bin', status: 'active' },
      { id: 'wjsn_luda', name: 'Luda', realName: 'Lee Lu-da', status: 'active' },
      { id: 'wjsn_dawon', name: 'Dawon', realName: 'Nam Da-won', status: 'active' },
      { id: 'wjsn_eunseo', name: 'Eunseo', realName: 'Son Ju-yeon', status: 'active' },
      { id: 'wjsn_yeoreum', name: 'Yeoreum (EL7Z UP)', realName: 'Lee Yeo-reum', status: 'active' },
      { id: 'wjsn_dayoung', name: 'Dayoung', realName: 'Lim Da-young', status: 'active' },
      { id: 'wjsn_yeonjung', name: 'Yeonjung', realName: 'Yoo Yeon-jung', status: 'active' }
    ]
  },
  {
    id: 'exid',
    name: 'EXID',
    type: 'girl_group',
    generation: '3rd',
    debutYear: 2012,
    agency: 'Banana Culture',
    description: 'Fancam chart-reversal pioneers with explosive vocals and self-produced tracks.',
    fandomName: 'LEGGO',
    members: [
      { id: 'exid_solji', name: 'Solji', realName: 'Heo Sol-ji', status: 'active' },
      { id: 'exid_le', name: 'LE (ELLY)', realName: 'Ahn Hyo-jin', status: 'active' },
      { id: 'exid_hani', name: 'Hani', realName: 'Ahn Hee-yeon', status: 'active' },
      { id: 'exid_hyelin', name: 'Hyelin', realName: 'Seo Hye-lin', status: 'active' },
      { id: 'exid_jeonghwa', name: 'Jeonghwa', realName: 'Park Jeong-hwa', status: 'active' }
    ]
  },
  {
    id: 'dreamcatcher',
    name: 'Dreamcatcher',
    type: 'girl_group',
    generation: '3rd',
    debutYear: 2017,
    agency: 'Dreamcatcher Company',
    description: 'Unique rock and metal infused K-pop with cinematic fantasy storylines.',
    fandomName: 'InSomnia',
    members: [
      { id: 'dc_jiu', name: 'JiU', realName: 'Kim Min-ji', status: 'active' },
      { id: 'dc_sua', name: 'SuA', realName: 'Kim Bo-ra', status: 'active' },
      { id: 'dc_siyeon', name: 'Siyeon', realName: 'Lee Si-yeon', status: 'active' },
      { id: 'dc_handong', name: 'Handong', realName: 'Han Dong', status: 'active' },
      { id: 'dc_yoohyeon', name: 'Yoohyeon', realName: 'Kim Yoo-hyeon', status: 'active' },
      { id: 'dc_dami', name: 'Dami', realName: 'Lee Yu-bin', status: 'active' },
      { id: 'dc_gahyeon', name: 'Gahyeon', realName: 'Lee Ga-hyeon', status: 'active' }
    ]
  },
  {
    id: 'loona',
    name: 'LOONA',
    type: 'girl_group',
    generation: '3rd',
    debutYear: 2018,
    agency: 'Blockberry Creative',
    description: 'Immersive LOONAverse lore, ARTMS, Loossemble, and Chuu.',
    fandomName: 'Orbit',
    members: [
      { id: 'loo_heejin', name: 'HeeJin', realName: 'Jeon Hee-jin', status: 'active' },
      { id: 'loo_hyunjin', name: 'HyunJin', realName: 'Kim Hyun-jin', status: 'active' },
      { id: 'loo_haseul', name: 'HaSeul', realName: 'Jo Ha-seul', status: 'active' },
      { id: 'loo_yeojin', name: 'YeoJin', realName: 'Im Yeo-jin', status: 'active' },
      { id: 'loo_vivi', name: 'ViVi', realName: 'Wong Ka-hei', status: 'active' },
      { id: 'loo_kimlip', name: 'Kim Lip', realName: 'Kim Jung-eun', status: 'active' },
      { id: 'loo_jinsoul', name: 'JinSoul', realName: 'Jeong Jin-sol', status: 'active' },
      { id: 'loo_choerry', name: 'Choerry', realName: 'Choi Ye-rim', status: 'active' },
      { id: 'loo_yves', name: 'Yves', realName: 'Ha Soo-young', status: 'active' },
      { id: 'loo_chuu', name: 'Chuu', realName: 'Kim Ji-woo', status: 'active' },
      { id: 'loo_gowon', name: 'Go Won', realName: 'Park Chae-won', status: 'active' },
      { id: 'loo_hyeju', name: 'HyeJu (Olivia Hye)', realName: 'Son Hye-ju', status: 'active' }
    ]
  },

  // ----------------- 4th Gen Girl Groups -----------------
  {
    id: 'itzy',
    name: 'ITZY',
    type: 'girl_group',
    generation: '4th',
    debutYear: 2019,
    agency: 'JYP Entertainment',
    description: 'High-energy dance performers championing self-love and confidence.',
    fandomName: 'MIDZY',
    members: [
      { id: 'itzy_yeji', name: 'Yeji', realName: 'Hwang Ye-ji', status: 'active' },
      { id: 'itzy_lia', name: 'Lia', realName: 'Choi Ji-su', status: 'active' },
      { id: 'itzy_ryujin', name: 'Ryujin', realName: 'Shin Ryu-jin', status: 'active' },
      { id: 'itzy_chaeryeong', name: 'Chaeryeong', realName: 'Lee Chae-ryeong', status: 'active' },
      { id: 'itzy_yuna', name: 'Yuna', realName: 'Shin Yu-na', status: 'active' }
    ]
  },
  {
    id: 'aespa',
    name: 'aespa',
    type: 'girl_group',
    generation: '4th',
    debutYear: 2020,
    agency: 'SM Entertainment',
    description: 'Futuristic metaverse pioneers and Supernova chart-toppers.',
    fandomName: 'MY',
    members: [
      { id: 'aespa_karina', name: 'Karina', realName: 'Yu Ji-min', status: 'active' },
      { id: 'aespa_giselle', name: 'Giselle', realName: 'Uchinaga Aeri', status: 'active' },
      { id: 'aespa_winter', name: 'Winter', realName: 'Kim Min-jeong', status: 'active' },
      { id: 'aespa_ningning', name: 'Ningning', realName: 'Ning Yizhuo', status: 'active' }
    ]
  },
  {
    id: 'ive',
    name: 'IVE',
    type: 'girl_group',
    generation: '4th',
    debutYear: 2021,
    agency: 'Starship Entertainment',
    description: 'Chaebol-crush elegance, Love Dive Daesang winners.',
    fandomName: 'DIVE',
    members: [
      { id: 'ive_yujin', name: 'An Yujin', realName: 'An Yu-jin', status: 'active' },
      { id: 'ive_gaeul', name: 'Gaeul', realName: 'Kim Ga-eul', status: 'active' },
      { id: 'ive_rei', name: 'Rei', realName: 'Naoi Rei', status: 'active' },
      { id: 'ive_wonyoung', name: 'Jang Wonyoung', realName: 'Jang Won-young', status: 'active' },
      { id: 'ive_liz', name: 'Liz', realName: 'Kim Ji-won', status: 'active' },
      { id: 'ive_leeseo', name: 'Leeseo', realName: 'Lee Hyun-seo', status: 'active' }
    ]
  },
  {
    id: 'le_sserafim',
    name: 'LE SSERAFIM',
    type: 'girl_group',
    generation: '4th',
    debutYear: 2022,
    agency: 'Source Music / HYBE',
    description: 'Fearless performers with athletic choreo and bold messages.',
    fandomName: 'FEARNOT',
    members: [
      { id: 'lsrf_chaewon', name: 'Kim Chaewon', realName: 'Kim Chae-won', status: 'active' },
      { id: 'lsrf_sakura', name: 'Sakura', realName: 'Miyawaki Sakura', status: 'active' },
      { id: 'lsrf_yunjin', name: 'Huh Yunjin', realName: 'Huh Yun-jin', status: 'active' },
      { id: 'lsrf_kazuha', name: 'Kazuha', realName: 'Nakamura Kazuha', status: 'active' },
      { id: 'lsrf_eunchae', name: 'Hong Eunchae', realName: 'Hong Eun-chae', status: 'active' },
      { id: 'lsrf_garam', name: 'Kim Garam', realName: 'Kim Ga-ram', status: 'former' }
    ]
  },
  {
    id: 'newjeans',
    name: 'NewJeans',
    type: 'girl_group',
    generation: '4th',
    debutYear: 2022,
    agency: 'ADOR / HYBE',
    description: 'Y2K nostalgia, effortless breezy pop, and global chart hits.',
    fandomName: 'Bunnies (Tokki)',
    members: [
      { id: 'nj_minji', name: 'Minji', realName: 'Kim Min-ji', status: 'active' },
      { id: 'nj_hanni', name: 'Hanni', realName: 'Hanni Pham', status: 'active' },
      { id: 'nj_danielle', name: 'Danielle', realName: 'Danielle Marsh', status: 'active' },
      { id: 'nj_haerin', name: 'Haerin', realName: 'Kang Hae-rin', status: 'active' },
      { id: 'nj_hyein', name: 'Hyein', realName: 'Lee Hye-in', status: 'active' }
    ]
  },
  {
    id: 'nmixx',
    name: 'NMIXX',
    type: 'girl_group',
    generation: '4th',
    debutYear: 2022,
    agency: 'JYP Entertainment (SQU4D)',
    description: 'MIXX POP innovators with extraordinary live singing acrobatics.',
    fandomName: 'NSWER',
    members: [
      { id: 'nmixx_lily', name: 'Lily', realName: 'Lily Morrow', status: 'active' },
      { id: 'nmixx_haewon', name: 'Haewon', realName: 'Oh Hae-won', status: 'active' },
      { id: 'nmixx_sullyoon', name: 'Sullyoon', realName: 'Seol Yoon-ah', status: 'active' },
      { id: 'nmixx_bae', name: 'Bae', realName: 'Bae Jin-sol', status: 'active' },
      { id: 'nmixx_jiwoo', name: 'Jiwoo', realName: 'Kim Ji-woo', status: 'active' },
      { id: 'nmixx_kyujin', name: 'Kyujin', realName: 'Jang Kyu-jin', status: 'active' },
      { id: 'nmixx_jinni', name: 'Jinni (JINI)', realName: 'Choi Yun-jin', status: 'former' }
    ]
  },
  {
    id: 'stayc',
    name: 'STAYC',
    type: 'girl_group',
    generation: '4th',
    debutYear: 2020,
    agency: 'High Up Entertainment',
    description: 'Teen-fresh pop perfection created by legendary producers Black Eyed Pilseung.',
    fandomName: 'SWITH',
    members: [
      { id: 'stayc_sumin', name: 'Sumin', realName: 'Bae Su-min', status: 'active' },
      { id: 'stayc_sieun', name: 'Sieun', realName: 'Park Si-eun', status: 'active' },
      { id: 'stayc_isa', name: 'ISA', realName: 'Lee Chae-young', status: 'active' },
      { id: 'stayc_seeun', name: 'Seeun', realName: 'Yoon Se-eun', status: 'active' },
      { id: 'stayc_yoon', name: 'Yoon', realName: 'Sim Ja-yun', status: 'active' },
      { id: 'stayc_j', name: 'J', realName: 'Jang Ye-eun', status: 'active' }
    ]
  },
  {
    id: 'gidle',
    name: '(G)I-DLE',
    type: 'girl_group',
    generation: '4th',
    debutYear: 2018,
    agency: 'Cube Entertainment',
    description: 'Self-producing powerhouse leading with anthems like TOMBOY and Queencard.',
    fandomName: 'Neverland',
    members: [
      { id: 'gidle_soyeon', name: 'Soyeon', realName: 'Jeon So-yeon', status: 'active' },
      { id: 'gidle_miyeon', name: 'Miyeon', realName: 'Cho Mi-yeon', status: 'active' },
      { id: 'gidle_minnie', name: 'Minnie', realName: 'Nicha Yontararak', status: 'active' },
      { id: 'gidle_yuqi', name: 'Yuqi', realName: 'Song Yuqi', status: 'active' },
      { id: 'gidle_shuhua', name: 'Shuhua', realName: 'Yeh Shu-hua', status: 'active' },
      { id: 'gidle_soojin', name: 'Soojin', realName: 'Seo Soo-jin', status: 'former' }
    ]
  },
  {
    id: 'kep1er',
    name: 'Kep1er',
    type: 'girl_group',
    generation: '4th',
    debutYear: 2022,
    agency: 'WAKEONE / KLAP',
    description: 'Girls Planet 999 project group known for WA DA DA and high synchrony.',
    fandomName: 'Kep1ian',
    members: [
      { id: 'kep1er_yujin', name: 'Yujin', realName: 'Choi Yu-jin', status: 'active' },
      { id: 'kep1er_xiaoting', name: 'Xiaoting', realName: 'Shen Xiaoting', status: 'active' },
      { id: 'kep1er_chaehyun', name: 'Chaehyun', realName: 'Kim Chae-hyun', status: 'active' },
      { id: 'kep1er_dayeon', name: 'Dayeon', realName: 'Kim Da-yeon', status: 'active' },
      { id: 'kep1er_hikaru', name: 'Hikaru', realName: 'Ezaki Hikaru', status: 'active' },
      { id: 'kep1er_bahiyyih', name: 'Huening Bahiyyih', realName: 'Huening Bahiyyih', status: 'active' },
      { id: 'kep1er_youngeun', name: 'Youngeun', realName: 'Seo Young-eun', status: 'active' },
      { id: 'kep1er_mashiro', name: 'Mashiro', realName: 'Sakamoto Mashiro', status: 'former' },
      { id: 'kep1er_yeseo', name: 'Yeseo', realName: 'Kang Ye-seo', status: 'former' }
    ]
  },
  {
    id: 'triples',
    name: 'tripleS',
    type: 'girl_group',
    generation: '4th',
    debutYear: 2022,
    agency: 'MODHAUS',
    description: 'The idol of all possibilities — 24-member fan-governed revolutionary group.',
    fandomName: 'WAV',
    members: [
      { id: 'ts_s1', name: 'Yoon SeoYeon', realName: 'Yoon Seo-yeon', status: 'active' },
      { id: 'ts_s2', name: 'Jeong HyeRin', realName: 'Jeong Hye-rin', status: 'active' },
      { id: 'ts_s3', name: 'Lee JiWoo', realName: 'Lee Ji-woo', status: 'active' },
      { id: 'ts_s4', name: 'Kim ChaeYeon', realName: 'Kim Chae-yeon', status: 'active' },
      { id: 'ts_s5', name: 'Kim YooYeon', realName: 'Kim Yoo-yeon', status: 'active' },
      { id: 'ts_s6', name: 'Kim SooMin', realName: 'Kim Soo-min', status: 'active' },
      { id: 'ts_s7', name: 'Kim NaKyoung', realName: 'Kim Na-kyoung', status: 'active' },
      { id: 'ts_s8', name: 'Gong YuBin', realName: 'Gong Yu-bin', status: 'active' },
      { id: 'ts_s9', name: 'Kaede', realName: 'Yamada Kaede', status: 'active' },
      { id: 'ts_s10', name: 'Seo DaHyun', realName: 'Seo Da-hyun', status: 'active' },
      { id: 'ts_s11', name: 'Kotone', realName: 'Kamimoto Kotone', status: 'active' },
      { id: 'ts_s12', name: 'Kwak YeonJi', realName: 'Kwak Yeon-ji', status: 'active' },
      { id: 'ts_s13', name: 'Nien', realName: 'Hsu Nien-tzu', status: 'active' },
      { id: 'ts_s14', name: 'Park SoHyun', realName: 'Park So-hyun', status: 'active' },
      { id: 'ts_s15', name: 'Xinyu', realName: 'Zhou Xinyu', status: 'active' },
      { id: 'ts_s16', name: 'Mayu', realName: 'Koma Mayu', status: 'active' },
      { id: 'ts_s17', name: 'Lynn', realName: 'Kawakami Lynn', status: 'active' },
      { id: 'ts_s18', name: 'JooBin', realName: 'Joo Bin', status: 'active' },
      { id: 'ts_s19', name: 'Jeong HaYeon', realName: 'Jeong Ha-yeon', status: 'active' },
      { id: 'ts_s20', name: 'Park ShiOn', realName: 'Park Shi-on', status: 'active' },
      { id: 'ts_s21', name: 'Kim ChaeWon', realName: 'Kim Chae-won', status: 'active' },
      { id: 'ts_s22', name: 'Sullin', realName: 'Pirada Bunchek', status: 'active' },
      { id: 'ts_s23', name: 'SeoAh', realName: 'Jeong Hae-rin', status: 'active' },
      { id: 'ts_s24', name: 'JiYeon', realName: 'Ji Seo-yeon', status: 'active' }
    ]
  },
  {
    id: 'h1key',
    name: 'H1-KEY',
    type: 'girl_group',
    generation: '4th',
    debutYear: 2022,
    agency: 'GLG',
    description: 'Inspirational pop with runaway smash hit "Rose Blossom".',
    fandomName: 'M1-KEY',
    members: [
      { id: 'h1_seoi', name: 'Seoi', realName: 'Lee Ye-jin', status: 'active' },
      { id: 'h1_riina', name: 'Riina', realName: 'Lee Seung-hyun', status: 'active' },
      { id: 'h1_hwiseo', name: 'Hwiseo', realName: 'Jo Hwi-hyeon', status: 'active' },
      { id: 'h1_yel', name: 'Yel', realName: 'Han Shin-young', status: 'active' }
    ]
  },

  // ----------------- 5th Gen Girl Groups -----------------
  {
    id: 'illit',
    name: 'ILLIT',
    type: 'girl_group',
    generation: '5th',
    debutYear: 2024,
    agency: 'BELIFT LAB / HYBE',
    description: 'Magnetic dream-pop sensations breaking Billboard Hot 100 on debut.',
    fandomName: 'GLLIT',
    members: [
      { id: 'illit_yunah', name: 'Yunah', realName: 'Noh Yun-ah', status: 'active' },
      { id: 'illit_minju', name: 'Minju', realName: 'Park Min-ju', status: 'active' },
      { id: 'illit_moka', name: 'Moka', realName: 'Sakai Moka', status: 'active' },
      { id: 'illit_wonhee', name: 'Wonhee', realName: 'Lee Won-hee', status: 'active' },
      { id: 'illit_iroha', name: 'Iroha', realName: 'Hokazono Iroha', status: 'active' }
    ]
  },
  {
    id: 'babymonster',
    name: 'BABYMONSTER',
    type: 'girl_group',
    generation: '5th',
    debutYear: 2023,
    agency: 'YG Entertainment',
    description: 'All-rounder high skill monsters with powerhouse vocals and rap.',
    fandomName: 'MONSTIEZ',
    members: [
      { id: 'bm_ruka', name: 'Ruka', realName: 'Kawai Ruka', status: 'active' },
      { id: 'bm_pharita', name: 'Pharita', realName: 'Pharita Boonpakdeethaveeyod', status: 'active' },
      { id: 'bm_asa', name: 'Asa', realName: 'Enami Asa', status: 'active' },
      { id: 'bm_ahyeon', name: 'Ahyeon', realName: 'Jung Ah-yeon', status: 'active' },
      { id: 'bm_rami', name: 'Rami', realName: 'Shin Ha-ram', status: 'active' },
      { id: 'bm_rora', name: 'Rora', realName: 'Lee Da-in', status: 'active' },
      { id: 'bm_chiquita', name: 'Chiquita', realName: 'Riracha Phondechaphiphat', status: 'active' }
    ]
  },
  {
    id: 'kiss_of_life',
    name: 'KISS OF LIFE',
    type: 'girl_group',
    generation: '5th',
    debutYear: 2023,
    agency: 'S2 Entertainment',
    description: 'Authentic 90s/2000s R&B vibe, stunning live vocals and Sticky vibes.',
    fandomName: 'KISSY',
    members: [
      { id: 'kiof_julie', name: 'Julie', realName: 'Julie Han', status: 'active' },
      { id: 'kiof_natty', name: 'Natty', realName: 'Anatchaya Suputhipong', status: 'active' },
      { id: 'kiof_belle', name: 'Belle', realName: 'Shim Hye-won', status: 'active' },
      { id: 'kiof_haneul', name: 'Haneul', realName: 'Won Ha-neul', status: 'active' }
    ]
  },
  {
    id: 'hearts2hearts',
    name: 'Hearts2Hearts',
    type: 'girl_group',
    generation: '5th',
    debutYear: 2024,
    agency: 'Rising Entertainment',
    description: 'Charming 5th gen rookie group captivating audiences with cute energy.',
    fandomName: 'Hearties',
    members: [
      { id: 'h2h_mia', name: 'Mia', realName: 'Kim Mia', status: 'active' },
      { id: 'h2h_chloe', name: 'Chloe', realName: 'Choi Chloe', status: 'active' },
      { id: 'h2h_hannah', name: 'Hannah', realName: 'Park Hannah', status: 'active' },
      { id: 'h2h_yuki', name: 'Yuki', realName: 'Sato Yuki', status: 'active' }
    ]
  },
  {
    id: 'kiiikiii',
    name: 'KiiiKiii',
    type: 'girl_group',
    generation: '5th',
    debutYear: 2024,
    agency: 'Next Wave Lab',
    description: 'Dynamic young girl group with infectious beats and hyperpop textures.',
    fandomName: 'Kikiers',
    members: [
      { id: 'kk_luna', name: 'Luna', realName: 'Lee Luna', status: 'active' },
      { id: 'kk_ria', name: 'Ria', realName: 'Jung Ria', status: 'active' },
      { id: 'kk_sora', name: 'Sora', realName: 'Kang Sora', status: 'active' }
    ]
  },
  {
    id: 'izna',
    name: 'izna',
    type: 'girl_group',
    generation: '5th',
    debutYear: 2024,
    agency: 'WAKEONE',
    description: 'I-LAND 2: N/a produced powerhouse girl group with Teddy styling.',
    fandomName: 'naya',
    members: [
      { id: 'izna_mai', name: 'Mai', realName: 'Tomita Mai', status: 'active' },
      { id: 'izna_jeemin', name: 'Bang Jeemin', realName: 'Bang Jee-min', status: 'active' },
      { id: 'izna_koko', name: 'Koko', realName: 'Narai Koko', status: 'active' },
      { id: 'izna_sarang', name: 'Ryu Sarang', realName: 'Ryu Sa-rang', status: 'active' },
      { id: 'izna_jungeun', name: 'Choi Jungeun', realName: 'Choi Jung-eun', status: 'active' },
      { id: 'izna_saebi', name: 'Jeong Saebi', realName: 'Jeong Sae-bi', status: 'active' }
    ]
  },

  // ----------------- 1st Gen Boy Groups -----------------
  {
    id: 'hot',
    name: 'H.O.T.',
    type: 'boy_group',
    generation: '1st',
    debutYear: 1996,
    agency: 'SM Entertainment',
    description: 'The foundation of K-pop idol fandom culture (Candy, Descendants of Warriors).',
    fandomName: 'Club H.O.T.',
    members: [
      { id: 'hot_heejoon', name: 'Moon Hee-joon', realName: 'Moon Hee-joon', status: 'active' },
      { id: 'hot_woohyuk', name: 'Jang Woo-hyuk', realName: 'Jang Woo-hyuk', status: 'active' },
      { id: 'hot_tony', name: 'Tony An', realName: 'An Seung-ho', status: 'active' },
      { id: 'hot_kangta', name: 'Kangta', realName: 'Ahn Chil-hyun', status: 'active' },
      { id: 'hot_jaewon', name: 'Lee Jae-won', realName: 'Lee Jae-won', status: 'active' }
    ]
  },
  {
    id: 'sechs_kies',
    name: 'Sechs Kies',
    type: 'boy_group',
    generation: '1st',
    debutYear: 1997,
    agency: 'DSP Media / YG Entertainment',
    description: 'Pioneering first-gen boy band rivals of H.O.T. with iconic track Couple.',
    fandomName: 'YellowKies',
    members: [
      { id: 'sk_jiwon', name: 'Eun Ji-won', realName: 'Eun Ji-won', status: 'active' },
      { id: 'sk_jaejin', name: 'Lee Jae-jin', realName: 'Lee Jae-jin', status: 'active' },
      { id: 'sk_jaeduck', name: 'Kim Jae-duck', realName: 'Kim Jae-duck', status: 'active' },
      { id: 'sk_suwon', name: 'Jang Su-won', realName: 'Jang Su-won', status: 'active' },
      { id: 'sk_sunghoon', name: 'Kang Sung-hoon', realName: 'Kang Sung-hoon', status: 'former' },
      { id: 'sk_jiyong', name: 'Ko Ji-yong', realName: 'Ko Ji-yong', status: 'former' }
    ]
  },
  {
    id: 'shinhwa',
    name: 'Shinhwa',
    type: 'boy_group',
    generation: '1st',
    debutYear: 1998,
    agency: 'Shinhwa Company',
    description: 'Longest-running original lineup boy group in K-pop history.',
    fandomName: 'Shinhwa Changjo',
    members: [
      { id: 'sh_eric', name: 'Eric Mun', realName: 'Mun Jung-hyuk', status: 'active' },
      { id: 'sh_minwoo', name: 'Lee Min-woo', realName: 'Lee Min-woo', status: 'active' },
      { id: 'sh_dongwan', name: 'Kim Dong-wan', realName: 'Kim Dong-wan', status: 'active' },
      { id: 'sh_hyesung', name: 'Shin Hye-sung', realName: 'Jung Pil-kyo', status: 'active' },
      { id: 'sh_junjin', name: 'Jun Jin', realName: 'Park Choong-jae', status: 'active' },
      { id: 'sh_andy', name: 'Andy Lee', realName: 'Lee Sun-ho', status: 'active' }
    ]
  },
  {
    id: 'god',
    name: 'g.o.d.',
    type: 'boy_group',
    generation: '1st',
    debutYear: 1999,
    agency: 'SidusHQ / JYP',
    description: "The Nation's Idol known for heartwarming ballads (To Mother, One Candle).",
    fandomName: 'Fangod',
    members: [
      { id: 'god_joon', name: 'Park Joon-hyung', realName: 'Park Joon-hyung', status: 'active' },
      { id: 'god_kyesang', name: 'Yoon Kye-sang', realName: 'Yoon Kye-sang', status: 'active' },
      { id: 'god_danny', name: 'Danny Ahn', realName: 'Ahn Shin-won', status: 'active' },
      { id: 'god_hoyoung', name: 'Son Ho-young', realName: 'Son Ho-young', status: 'active' },
      { id: 'god_taewoo', name: 'Kim Tae-woo', realName: 'Kim Tae-woo', status: 'active' }
    ]
  },

  // ----------------- 2nd Gen Boy Groups -----------------
  {
    id: 'tvxq',
    name: 'TVXQ!',
    type: 'boy_group',
    generation: '2nd',
    debutYear: 2003,
    agency: 'SM Entertainment',
    description: 'Gods of the East, legendary vocal harmonies and Mirotic legacy.',
    fandomName: 'Cassiopeia',
    members: [
      { id: 'tvxq_yunho', name: 'U-Know Yunho', realName: 'Jung Yoon-ho', status: 'active' },
      { id: 'tvxq_changmin', name: 'Max Changmin', realName: 'Shim Chang-min', status: 'active' },
      { id: 'tvxq_jaejoong', name: 'Kim Jaejoong', realName: 'Kim Jae-joong', status: 'former' },
      { id: 'tvxq_yoochun', name: 'Park Yoochun', realName: 'Park Yoo-chun', status: 'former' },
      { id: 'tvxq_junsu', name: 'Kim Junsu (XIA)', realName: 'Kim Jun-su', status: 'former' }
    ]
  },
  {
    id: 'bigbang',
    name: 'BIGBANG',
    type: 'boy_group',
    generation: '2nd',
    debutYear: 2006,
    agency: 'YG Entertainment',
    description: 'Kings of K-pop who reshaped the sound and style of Korean music worldwide.',
    fandomName: 'VIP',
    members: [
      { id: 'bb_gd', name: 'G-Dragon', realName: 'Kwon Ji-yong', status: 'active' },
      { id: 'bb_taeyang', name: 'Taeyang', realName: 'Dong Young-bae', status: 'active' },
      { id: 'bb_daesung', name: 'Daesung', realName: 'Kang Dae-sung', status: 'active' },
      { id: 'bb_top', name: 'T.O.P', realName: 'Choi Seung-hyun', status: 'former' },
      { id: 'bb_seungri', name: 'Seungri', realName: 'Lee Seung-hyun', status: 'former' }
    ]
  },
  {
    id: 'super_junior',
    name: 'Super Junior',
    type: 'boy_group',
    generation: '2nd',
    debutYear: 2005,
    agency: 'SM Entertainment',
    description: 'The King of Hallyu Wave with international anthem Sorry, Sorry.',
    fandomName: 'E.L.F.',
    members: [
      { id: 'suju_leeteuk', name: 'Leeteuk', realName: 'Park Jeong-su', status: 'active' },
      { id: 'suju_heechul', name: 'Heechul', realName: 'Kim Hee-chul', status: 'active' },
      { id: 'suju_yesung', name: 'Yesung', realName: 'Kim Jong-woon', status: 'active' },
      { id: 'suju_shindong', name: 'Shindong', realName: 'Shin Dong-hee', status: 'active' },
      { id: 'suju_eunhyuk', name: 'Eunhyuk', realName: 'Lee Hyuk-jae', status: 'active' },
      { id: 'suju_donghae', name: 'Donghae', realName: 'Lee Dong-hae', status: 'active' },
      { id: 'suju_siwon', name: 'Siwon', realName: 'Choi Si-won', status: 'active' },
      { id: 'suju_ryeowook', name: 'Ryeowook', realName: 'Kim Ryeo-wook', status: 'active' },
      { id: 'suju_kyuhyun', name: 'Kyuhyun', realName: 'Cho Kyu-hyun', status: 'active' }
    ]
  },
  {
    id: 'shinee',
    name: 'SHINee',
    type: 'boy_group',
    generation: '2nd',
    debutYear: 2008,
    agency: 'SM Entertainment',
    description: 'Princes of K-pop, legendary live vocals, trendsetting fashion (Replay, Sherlock).',
    fandomName: 'Shawol',
    members: [
      { id: 'shinee_onew', name: 'Onew', realName: 'Lee Jin-ki', status: 'active' },
      { id: 'shinee_jonghyun', name: 'Jonghyun', realName: 'Kim Jong-hyun', status: 'memorial' },
      { id: 'shinee_key', name: 'Key', realName: 'Kim Ki-bum', status: 'active' },
      { id: 'shinee_minho', name: 'Minho', realName: 'Choi Min-ho', status: 'active' },
      { id: 'shinee_taemin', name: 'Taemin', realName: 'Lee Tae-min', status: 'active' }
    ]
  },
  {
    id: '2pm',
    name: '2PM',
    type: 'boy_group',
    generation: '2nd',
    debutYear: 2008,
    agency: 'JYP Entertainment',
    description: 'Beast-dol kings famous for acrobatics, Heartbeat, and My House.',
    fandomName: 'HOTTEST',
    members: [
      { id: '2pm_junk', name: 'Jun. K', realName: 'Kim Min-jun', status: 'active' },
      { id: '2pm_nichkhun', name: 'Nichkhun', realName: 'Nichkhun Buck Horvejkul', status: 'active' },
      { id: '2pm_taecyeon', name: 'Taecyeon', realName: 'Ok Taec-yeon', status: 'active' },
      { id: '2pm_wooyoung', name: 'Wooyoung', realName: 'Jang Woo-young', status: 'active' },
      { id: '2pm_junho', name: 'Junho', realName: 'Lee Jun-ho', status: 'active' },
      { id: '2pm_chansung', name: 'Chansung', realName: 'Hwang Chan-sung', status: 'active' }
    ]
  },
  {
    id: 'infinite',
    name: 'INFINITE',
    type: 'boy_group',
    generation: '2nd',
    debutYear: 2010,
    agency: 'Woollim / Infinite Company',
    description: '99.9% synchronization precision masters with the iconic scorpion dance.',
    fandomName: 'INSPIRIT',
    members: [
      { id: 'inf_sungkyu', name: 'Sungkyu', realName: 'Kim Sung-kyu', status: 'active' },
      { id: 'inf_dongwoo', name: 'Dongwoo', realName: 'Jang Dong-woo', status: 'active' },
      { id: 'inf_woohyun', name: 'Woohyun', realName: 'Nam Woo-hyun', status: 'active' },
      { id: 'inf_sungyeol', name: 'Sungyeol', realName: 'Lee Sung-yeol', status: 'active' },
      { id: 'inf_l', name: 'L (Kim Myung-soo)', realName: 'Kim Myung-soo', status: 'active' },
      { id: 'inf_sungjong', name: 'Sungjong', realName: 'Lee Sung-jong', status: 'active' },
      { id: 'inf_hoya', name: 'Hoya', realName: 'Lee Ho-won', status: 'former' }
    ]
  },
  {
    id: 'highlight',
    name: 'BEAST / HIGHLIGHT',
    type: 'boy_group',
    generation: '2nd',
    debutYear: 2009,
    agency: 'Around US Entertainment',
    description: 'Resilient and beloved vocalists behind Fiction and Shock.',
    fandomName: 'Light (formerly B2UTY)',
    members: [
      { id: 'hl_doojoon', name: 'Yoon Doojoon', realName: 'Yoon Doo-joon', status: 'active' },
      { id: 'hl_yoseob', name: 'Yang Yoseob', realName: 'Yang Yo-seob', status: 'active' },
      { id: 'hl_gikwang', name: 'Lee Gikwang', realName: 'Lee Gi-kwang', status: 'active' },
      { id: 'hl_dongwoon', name: 'Son Dongwoon', realName: 'Son Dong-woon', status: 'active' },
      { id: 'hl_junhyung', name: 'Yong Jun-hyung', realName: 'Yong Jun-hyung', status: 'former' },
      { id: 'hl_hyunseung', name: 'Jang Hyun-seung', realName: 'Jang Hyun-seung', status: 'former' }
    ]
  },
  {
    id: 'mblaq',
    name: 'MBLAQ',
    type: 'boy_group',
    generation: '2nd',
    debutYear: 2009,
    agency: 'J. Tune Camp',
    description: 'Rain-produced charismatic boy band with chic R&B sound.',
    fandomName: 'A+',
    members: [
      { id: 'mblaq_seungho', name: 'Seungho', realName: 'Yang Seung-ho', status: 'active' },
      { id: 'mblaq_go', name: 'G.O', realName: 'Jung Byung-hee', status: 'active' },
      { id: 'mblaq_mir', name: 'Mir', realName: 'Bang Cheol-yong', status: 'active' },
      { id: 'mblaq_leejoon', name: 'Lee Joon', realName: 'Lee Chang-sun', status: 'former' },
      { id: 'mblaq_thunder', name: 'Thunder', realName: 'Park Sang-hyun', status: 'former' }
    ]
  },
  {
    id: 'b1a4',
    name: 'B1A4',
    type: 'boy_group',
    generation: '2nd',
    debutYear: 2011,
    agency: 'WM Entertainment',
    description: 'Self-producing refreshing idol stars with bright retro charm.',
    fandomName: 'BANA',
    members: [
      { id: 'b1a4_cnu', name: 'CNU', realName: 'Shin Dong-woo', status: 'active' },
      { id: 'b1a4_sandeul', name: 'Sandeul', realName: 'Lee Jung-hwan', status: 'active' },
      { id: 'b1a4_gongchan', name: 'Gongchan', realName: 'Gong Chan-sik', status: 'active' },
      { id: 'b1a4_jinyoung', name: 'Jinyoung', realName: 'Jung Jin-young', status: 'former' },
      { id: 'b1a4_baro', name: 'Baro', realName: 'Cha Sun-woo', status: 'former' }
    ]
  },

  // ----------------- 3rd Gen Boy Groups -----------------
  {
    id: 'bts',
    name: 'BTS',
    type: 'boy_group',
    generation: '3rd',
    debutYear: 2013,
    agency: 'BIGHIT MUSIC / HYBE',
    description: 'Global cultural phenomenon and historic Billboard #1 champions.',
    fandomName: 'ARMY',
    members: [
      { id: 'bts_rm', name: 'RM', realName: 'Kim Nam-joon', status: 'active' },
      { id: 'bts_jin', name: 'Jin', realName: 'Kim Seok-jin', status: 'active' },
      { id: 'bts_suga', name: 'SUGA (Agust D)', realName: 'Min Yoon-gi', status: 'active' },
      { id: 'bts_jhope', name: 'J-Hope', realName: 'Jung Ho-seok', status: 'active' },
      { id: 'bts_jimin', name: 'Jimin', realName: 'Park Ji-min', status: 'active' },
      { id: 'bts_v', name: 'V', realName: 'Kim Tae-hyung', status: 'active' },
      { id: 'bts_jungkook', name: 'Jungkook', realName: 'Jeon Jung-kook', status: 'active' }
    ]
  },
  {
    id: 'exo',
    name: 'EXO',
    type: 'boy_group',
    generation: '3rd',
    debutYear: 2012,
    agency: 'SM Entertainment',
    description: 'Vocal powerhouses, Growl sensation, and quadruple million-sellers.',
    fandomName: 'EXO-L',
    members: [
      { id: 'exo_suho', name: 'Suho', realName: 'Kim Jun-myeon', status: 'active' },
      { id: 'exo_xiumin', name: 'Xiumin', realName: 'Kim Min-seok', status: 'active' },
      { id: 'exo_lay', name: 'Lay', realName: 'Zhang Yixing', status: 'active' },
      { id: 'exo_baekhyun', name: 'Baekhyun', realName: 'Byun Baek-hyun', status: 'active' },
      { id: 'exo_chen', name: 'Chen', realName: 'Kim Jong-dae', status: 'active' },
      { id: 'exo_chanyeol', name: 'Chanyeol', realName: 'Park Chan-yeol', status: 'active' },
      { id: 'exo_do', name: 'D.O. (Doh Kyung-soo)', realName: 'Doh Kyung-soo', status: 'active' },
      { id: 'exo_kai', name: 'Kai', realName: 'Kim Jong-in', status: 'active' },
      { id: 'exo_sehun', name: 'Sehun', realName: 'Oh Se-hun', status: 'active' }
    ]
  },
  {
    id: 'seventeen',
    name: 'SEVENTEEN',
    type: 'boy_group',
    generation: '3rd',
    debutYear: 2015,
    agency: 'PLEDIS Entertainment / HYBE',
    description: 'Self-producing stage kings of synchronization and festival energy.',
    fandomName: 'CARAT',
    members: [
      { id: 'svt_scoups', name: 'S.Coups', realName: 'Choi Seung-cheol', status: 'active' },
      { id: 'svt_jeonghan', name: 'Jeonghan', realName: 'Yoon Jeong-han', status: 'active' },
      { id: 'svt_joshua', name: 'Joshua', realName: 'Hong Ji-soo', status: 'active' },
      { id: 'svt_jun', name: 'Jun', realName: 'Wen Junhui', status: 'active' },
      { id: 'svt_hoshi', name: 'Hoshi', realName: 'Kwon Soon-young', status: 'active' },
      { id: 'svt_wonwoo', name: 'Wonwoo', realName: 'Jeon Won-woo', status: 'active' },
      { id: 'svt_woozi', name: 'Woozi', realName: 'Lee Ji-hoon', status: 'active' },
      { id: 'svt_dk', name: 'DK (Dokyeom)', realName: 'Lee Seok-min', status: 'active' },
      { id: 'svt_mingyu', name: 'Mingyu', realName: 'Kim Min-gyu', status: 'active' },
      { id: 'svt_the8', name: 'The8', realName: 'Xu Minghao', status: 'active' },
      { id: 'svt_seungkwan', name: 'Seungkwan', realName: 'Boo Seung-kwan', status: 'active' },
      { id: 'svt_vernon', name: 'Vernon', realName: 'Hansol Vernon Chwe', status: 'active' },
      { id: 'svt_dino', name: 'Dino', realName: 'Lee Chan', status: 'active' }
    ]
  },
  {
    id: 'got7',
    name: 'GOT7',
    type: 'boy_group',
    generation: '3rd',
    debutYear: 2014,
    agency: 'Warner Music Korea (formerly JYP)',
    description: 'Close brotherhood, global fanbase, and martial arts tricking roots.',
    fandomName: 'Ahgase (I GOT7)',
    members: [
      { id: 'got7_jayb', name: 'Jay B', realName: 'Lim Jae-beom', status: 'active' },
      { id: 'got7_mark', name: 'Mark Tuan', realName: 'Mark Yien Tuan', status: 'active' },
      { id: 'got7_jackson', name: 'Jackson Wang', realName: 'Wang Ka-yee', status: 'active' },
      { id: 'got7_jinyoung', name: 'Park Jinyoung', realName: 'Park Jin-young', status: 'active' },
      { id: 'got7_youngjae', name: 'Youngjae', realName: 'Choi Young-jae', status: 'active' },
      { id: 'got7_bambam', name: 'BamBam', realName: 'Kunpimook Bhuwakul', status: 'active' },
      { id: 'got7_yugyeom', name: 'Yugyeom', realName: 'Kim Yu-gyeom', status: 'active' }
    ]
  },
  {
    id: 'monsta_x',
    name: 'MONSTA X',
    type: 'boy_group',
    generation: '3rd',
    debutYear: 2015,
    agency: 'Starship Entertainment',
    description: 'High octane charisma, beastly physique, and addictive hip-hop.',
    fandomName: 'MONBEBE',
    members: [
      { id: 'mx_shownu', name: 'Shownu', realName: 'Sohn Hyun-woo', status: 'active' },
      { id: 'mx_minhyuk', name: 'Minhyuk', realName: 'Lee Min-hyuk', status: 'active' },
      { id: 'mx_kihyun', name: 'Kihyun', realName: 'Yoo Ki-hyun', status: 'active' },
      { id: 'mx_hyungwon', name: 'Hyungwon', realName: 'Chae Hyung-won', status: 'active' },
      { id: 'mx_joohoney', name: 'Joohoney', realName: 'Lee Joo-heon', status: 'active' },
      { id: 'mx_im', name: 'I.M', realName: 'Im Chang-kyun', status: 'active' },
      { id: 'mx_wonho', name: 'Wonho', realName: 'Lee Ho-seok', status: 'former' }
    ]
  },
  {
    id: 'nct',
    name: 'NCT (127 / DREAM / WayV)',
    type: 'boy_group',
    generation: '3rd',
    debutYear: 2016,
    agency: 'SM Entertainment',
    description: 'Infinite expansion group with experimental neo-culture sounds.',
    fandomName: 'NCTzen (Czennie)',
    members: [
      { id: 'nct_taeyong', name: 'Taeyong', realName: 'Lee Tae-yong', status: 'active' },
      { id: 'nct_johnny', name: 'Johnny', realName: 'John Suh', status: 'active' },
      { id: 'nct_yuta', name: 'Yuta', realName: 'Nakamoto Yuta', status: 'active' },
      { id: 'nct_kun', name: 'Kun', realName: 'Qian Kun', status: 'active' },
      { id: 'nct_doyoung', name: 'Doyoung', realName: 'Kim Dong-young', status: 'active' },
      { id: 'nct_ten', name: 'Ten', realName: 'Chittaphon Leechaiyapornkul', status: 'active' },
      { id: 'nct_jaehyun', name: 'Jaehyun', realName: 'Jeong Jae-hyun', status: 'active' },
      { id: 'nct_winwin', name: 'Winwin', realName: 'Dong Sicheng', status: 'active' },
      { id: 'nct_jungwoo', name: 'Jungwoo', realName: 'Kim Jung-woo', status: 'active' },
      { id: 'nct_mark', name: 'Mark', realName: 'Mark Lee', status: 'active' },
      { id: 'nct_xiaojun', name: 'Xiaojun', realName: 'Xiao Dejun', status: 'active' },
      { id: 'nct_hendery', name: 'Hendery', realName: 'Wong Kun-hang', status: 'active' },
      { id: 'nct_renjun', name: 'Renjun', realName: 'Huang Renjun', status: 'active' },
      { id: 'nct_jeno', name: 'Jeno', realName: 'Lee Je-no', status: 'active' },
      { id: 'nct_haechan', name: 'Haechan', realName: 'Lee Dong-hyuck', status: 'active' },
      { id: 'nct_jaemin', name: 'Jaemin', realName: 'Na Jae-min', status: 'active' },
      { id: 'nct_yangyang', name: 'Yangyang', realName: 'Liu Yangyang', status: 'active' },
      { id: 'nct_chenle', name: 'Chenle', realName: 'Zhong Chenle', status: 'active' },
      { id: 'nct_jisung', name: 'Jisung', realName: 'Park Ji-sung', status: 'active' }
    ]
  },
  {
    id: 'winner',
    name: 'WINNER',
    type: 'boy_group',
    generation: '3rd',
    debutYear: 2014,
    agency: 'YG Entertainment',
    description: 'Melodic, stylish self-producing hitmakers (REALLY REALLY).',
    fandomName: 'Inner Circle',
    members: [
      { id: 'wn_yoon', name: 'Yoon (Seungyoon)', realName: 'Kang Seung-yoon', status: 'active' },
      { id: 'wn_jinu', name: 'Jinu (Jinwoo)', realName: 'Kim Jin-woo', status: 'active' },
      { id: 'wn_hoony', name: 'Hoony (Seunghoon)', realName: 'Lee Seung-hoon', status: 'active' },
      { id: 'wn_mino', name: 'Mino', realName: 'Song Min-ho', status: 'active' },
      { id: 'wn_taehyun', name: 'Nam Tae-hyun', realName: 'Nam Tae-hyun', status: 'former' }
    ]
  },
  {
    id: 'ikon',
    name: 'iKON',
    type: 'boy_group',
    generation: '3rd',
    debutYear: 2015,
    agency: '143 Entertainment (formerly YG)',
    description: 'Love Scenario national anthem creators with free-spirited hip hop.',
    fandomName: 'iKONIC',
    members: [
      { id: 'ikon_jay', name: 'Jay (Jinhwan)', realName: 'Kim Jin-hwan', status: 'active' },
      { id: 'ikon_song', name: 'Song (Yunhyeong)', realName: 'Song Yun-hyeong', status: 'active' },
      { id: 'ikon_bobby', name: 'Bobby', realName: 'Kim Ji-won', status: 'active' },
      { id: 'ikon_dk', name: 'DK (Donghyuk)', realName: 'Kim Dong-hyuk', status: 'active' },
      { id: 'ikon_june', name: 'Ju-ne', realName: 'Koo Jun-hoe', status: 'active' },
      { id: 'ikon_chan', name: 'Chan (Chanwoo)', realName: 'Jung Chan-woo', status: 'active' },
      { id: 'ikon_bi', name: 'B.I', realName: 'Kim Han-bin', status: 'former' }
    ]
  },
  {
    id: 'btob',
    name: 'BTOB',
    type: 'boy_group',
    generation: '3rd',
    debutYear: 2012,
    agency: 'BTOB Company / Cube',
    description: 'Hilarious variety icons and unrivaled four-vocalist ballad legends.',
    fandomName: 'Melody',
    members: [
      { id: 'btob_eunkwang', name: 'Seo Eunkwang', realName: 'Seo Eun-kwang', status: 'active' },
      { id: 'btob_minhyuk', name: 'Lee Minhyuk', realName: 'Lee Min-hyuk', status: 'active' },
      { id: 'btob_changsub', name: 'Lee Changsub', realName: 'Lee Chang-sub', status: 'active' },
      { id: 'btob_hyunsik', name: 'Lim Hyunsik', realName: 'Lim Hyun-sik', status: 'active' },
      { id: 'btob_peniel', name: 'Peniel', realName: 'Peniel Shin', status: 'active' },
      { id: 'btob_sungjae', name: 'Yook Sungjae', realName: 'Yook Sung-jae', status: 'active' },
      { id: 'btob_ilhoon', name: 'Jung Ilhoon', realName: 'Jung Il-hoon', status: 'former' }
    ]
  },
  {
    id: 'vixx',
    name: 'VIXX',
    type: 'boy_group',
    generation: '3rd',
    debutYear: 2012,
    agency: 'Jellyfish Entertainment',
    description: 'Concept-dols par excellence (Voodoo Doll, Shangri-La, Chained Up).',
    fandomName: 'ST★RLIGHT',
    members: [
      { id: 'vixx_n', name: 'N', realName: 'Cha Hak-yeon', status: 'active' },
      { id: 'vixx_leo', name: 'Leo', realName: 'Jung Taek-woon', status: 'active' },
      { id: 'vixx_ken', name: 'Ken', realName: 'Lee Jae-hwan', status: 'active' },
      { id: 'vixx_hyuk', name: 'Hyuk', realName: 'Han Sang-hyuk', status: 'active' },
      { id: 'vixx_ravi', name: 'Ravi', realName: 'Kim Won-sik', status: 'former' },
      { id: 'vixx_hongbin', name: 'Hongbin', realName: 'Lee Hong-bin', status: 'former' }
    ]
  },

  // ----------------- 4th Gen Boy Groups -----------------
  {
    id: 'stray_kids',
    name: 'Stray Kids',
    type: 'boy_group',
    generation: '4th',
    debutYear: 2018,
    agency: 'JYP Entertainment',
    description: 'Self-producing global leaders (3RACHA) with explosive mala-taste sound.',
    fandomName: 'STAY',
    members: [
      { id: 'skz_bangchan', name: 'Bang Chan', realName: 'Christopher Bang', status: 'active' },
      { id: 'skz_leeknow', name: 'Lee Know', realName: 'Lee Min-ho', status: 'active' },
      { id: 'skz_changbin', name: 'Changbin', realName: 'Seo Chang-bin', status: 'active' },
      { id: 'skz_hyunjin', name: 'Hyunjin', realName: 'Hwang Hyun-jin', status: 'active' },
      { id: 'skz_han', name: 'Han', realName: 'Han Ji-sung', status: 'active' },
      { id: 'skz_felix', name: 'Felix', realName: 'Felix Lee / Lee Yong-bok', status: 'active' },
      { id: 'skz_seungmin', name: 'Seungmin', realName: 'Kim Seung-min', status: 'active' },
      { id: 'skz_in', name: 'I.N', realName: 'Yang Jeong-in', status: 'active' },
      { id: 'skz_woojin', name: 'Woojin', realName: 'Kim Woo-jin', status: 'former' }
    ]
  },
  {
    id: 'ateez',
    name: 'ATEEZ',
    type: 'boy_group',
    generation: '4th',
    debutYear: 2018,
    agency: 'KQ Entertainment',
    description: 'Pirate kings of theatrical performance and headlining world tours.',
    fandomName: 'ATINY',
    members: [
      { id: 'atz_hongjoong', name: 'Hongjoong', realName: 'Kim Hong-joong', status: 'active' },
      { id: 'atz_seonghwa', name: 'Seonghwa', realName: 'Park Seong-hwa', status: 'active' },
      { id: 'atz_yunho', name: 'Yunho', realName: 'Jeong Yun-ho', status: 'active' },
      { id: 'atz_yeosang', name: 'Yeosang', realName: 'Kang Yeo-sang', status: 'active' },
      { id: 'atz_san', name: 'San', realName: 'Choi San', status: 'active' },
      { id: 'atz_mingi', name: 'Mingi', realName: 'Song Min-gi', status: 'active' },
      { id: 'atz_wooyoung', name: 'Wooyoung', realName: 'Jung Woo-young', status: 'active' },
      { id: 'atz_jongho', name: 'Jongho', realName: 'Choi Jong-ho', status: 'active' }
    ]
  },
  {
    id: 'txt',
    name: 'TOMORROW X TOGETHER (TXT)',
    type: 'boy_group',
    generation: '4th',
    debutYear: 2019,
    agency: 'BIGHIT MUSIC / HYBE',
    description: 'Fairytale storytelling, emo-rock melodies, and charismatic live vocals.',
    fandomName: 'MOA',
    members: [
      { id: 'txt_soobin', name: 'Soobin', realName: 'Choi Soo-bin', status: 'active' },
      { id: 'txt_yeonjun', name: 'Yeonjun', realName: 'Choi Yeon-jun', status: 'active' },
      { id: 'txt_beomgyu', name: 'Beomgyu', realName: 'Choi Beom-gyu', status: 'active' },
      { id: 'txt_taehyun', name: 'Taehyun', realName: 'Kang Tae-hyun', status: 'active' },
      { id: 'txt_hueningkai', name: 'HueningKai', realName: 'Kai Kamal Huening', status: 'active' }
    ]
  },
  {
    id: 'enhypen',
    name: 'ENHYPEN',
    type: 'boy_group',
    generation: '4th',
    debutYear: 2020,
    agency: 'BELIFT LAB / HYBE',
    description: 'I-LAND winners with alluring vampire lore and worldwide arena tours.',
    fandomName: 'ENGENE',
    members: [
      { id: 'en_jungwon', name: 'Jungwon', realName: 'Yang Jung-won', status: 'active' },
      { id: 'en_heeseung', name: 'Heeseung', realName: 'Lee Hee-seung', status: 'active' },
      { id: 'en_jay', name: 'Jay', realName: 'Park Jong-seong', status: 'active' },
      { id: 'en_jake', name: 'Jake', realName: 'Sim Jae-yun', status: 'active' },
      { id: 'en_sunghoon', name: 'Sunghoon', realName: 'Park Sung-hoon', status: 'active' },
      { id: 'en_sunoo', name: 'Sunoo', realName: 'Kim Seon-woo', status: 'active' },
      { id: 'en_niki', name: 'Ni-ki', realName: 'Nishimura Riki', status: 'active' }
    ]
  },
  {
    id: 'the_boyz',
    name: 'THE BOYZ',
    type: 'boy_group',
    generation: '4th',
    debutYear: 2017,
    agency: 'ONE HUNDRED / IST',
    description: 'Road to Kingdom victors renowned for acrobatic stunts and sleek visuals.',
    fandomName: 'THE B (Deobi)',
    members: [
      { id: 'tbz_sangyeon', name: 'Sangyeon', realName: 'Lee Sang-yeon', status: 'active' },
      { id: 'tbz_jacob', name: 'Jacob', realName: 'Jacob Bae', status: 'active' },
      { id: 'tbz_younghoon', name: 'Younghoon', realName: 'Kim Young-hoon', status: 'active' },
      { id: 'tbz_hyunjae', name: 'Hyunjae', realName: 'Lee Jae-hyun', status: 'active' },
      { id: 'tbz_juyeon', name: 'Juyeon', realName: 'Lee Ju-yeon', status: 'active' },
      { id: 'tbz_kevin', name: 'Kevin', realName: 'Kevin Moon', status: 'active' },
      { id: 'tbz_new', name: 'New', realName: 'Choi Chan-hee', status: 'active' },
      { id: 'tbz_q', name: 'Q', realName: 'Ji Chang-min', status: 'active' },
      { id: 'tbz_juhaknyeon', name: 'Ju Haknyeon', realName: 'Ju Hak-nyeon', status: 'active' },
      { id: 'tbz_sunwoo', name: 'Sunwoo', realName: 'Kim Sun-woo', status: 'active' },
      { id: 'tbz_eric', name: 'Eric', realName: 'Eric Sohn', status: 'active' }
    ]
  },
  {
    id: 'treasure',
    name: 'TREASURE',
    type: 'boy_group',
    generation: '4th',
    debutYear: 2020,
    agency: 'YG Entertainment',
    description: 'YG Box winners bringing infectious concert hype (JIKJIN, DARARI).',
    fandomName: 'TREASURE MAKER (Teume)',
    members: [
      { id: 'trs_hyunsuk', name: 'Choi Hyun-suk', realName: 'Choi Hyun-suk', status: 'active' },
      { id: 'trs_jihoon', name: 'Jihoon', realName: 'Park Ji-hoon', status: 'active' },
      { id: 'trs_yoshi', name: 'Yoshi', realName: 'Kanemoto Yoshinori', status: 'active' },
      { id: 'trs_junkyu', name: 'Junkyu', realName: 'Kim Jun-kyu', status: 'active' },
      { id: 'trs_jaehyuk', name: 'Yoon Jae-hyuk', realName: 'Yoon Jae-hyuk', status: 'active' },
      { id: 'trs_asahi', name: 'Asahi', realName: 'Hamada Asahi', status: 'active' },
      { id: 'trs_doyoung', name: 'Doyoung', realName: 'Kim Do-young', status: 'active' },
      { id: 'trs_haruto', name: 'Haruto', realName: 'Watanabe Haruto', status: 'active' },
      { id: 'trs_jeongwoo', name: 'Park Jeong-woo', realName: 'Park Jeong-woo', status: 'active' },
      { id: 'trs_junghwan', name: 'So Jung-hwan', realName: 'So Jung-hwan', status: 'active' },
      { id: 'trs_mashiho', name: 'Mashiho', realName: 'Takata Mashiho', status: 'former' },
      { id: 'trs_yedam', name: 'Bang Ye-dam', realName: 'Bang Ye-dam', status: 'former' }
    ]
  },
  {
    id: 'zerobaseone',
    name: 'ZEROBASEONE (ZB1)',
    type: 'boy_group',
    generation: '5th',
    debutYear: 2023,
    agency: 'WAKEONE',
    description: 'Boys Planet million-seller sensation with sparkling visuals and vocals.',
    fandomName: 'ZEROSE',
    members: [
      { id: 'zb1_hanbin', name: 'Sung Han-bin', realName: 'Sung Han-bin', status: 'active' },
      { id: 'zb1_jiwoong', name: 'Kim Ji-woong', realName: 'Kim Ji-woong', status: 'active' },
      { id: 'zb1_zhanghao', name: 'Zhang Hao', realName: 'Zhang Hao', status: 'active' },
      { id: 'zb1_matthew', name: 'Seok Matthew', realName: 'Matthew Seok', status: 'active' },
      { id: 'zb1_taerae', name: 'Kim Tae-rae', realName: 'Kim Tae-rae', status: 'active' },
      { id: 'zb1_ricky', name: 'Ricky', realName: 'Shen Quanrui', status: 'active' },
      { id: 'zb1_gyuvin', name: 'Kim Gyu-vin', realName: 'Kim Gyu-vin', status: 'active' },
      { id: 'zb1_gunwook', name: 'Park Gun-wook', realName: 'Park Gun-wook', status: 'active' },
      { id: 'zb1_yujin', name: 'Han Yu-jin', realName: 'Han Yu-jin', status: 'active' }
    ]
  },
  {
    id: 'riize',
    name: 'RIIZE',
    type: 'boy_group',
    generation: '5th',
    debutYear: 2023,
    agency: 'SM Entertainment',
    description: 'Emotional Pop pioneers with runaway smash hits Get A Guitar and Boom Boom Bass.',
    fandomName: 'BRIIZE',
    members: [
      { id: 'riize_shotaro', name: 'Shotaro', realName: 'Osaki Shotaro', status: 'active' },
      { id: 'riize_eunseok', name: 'Eunseok', realName: 'Song Eun-seok', status: 'active' },
      { id: 'riize_sungchan', name: 'Sungchan', realName: 'Jung Sung-chan', status: 'active' },
      { id: 'riize_wonbin', name: 'Wonbin', realName: 'Park Won-bin', status: 'active' },
      { id: 'riize_sohee', name: 'Sohee', realName: 'Lee So-hee', status: 'active' },
      { id: 'riize_anton', name: 'Anton', realName: 'Lee Chanyoung', status: 'active' },
      { id: 'riize_seunghan', name: 'Seunghan', realName: 'Hong Seung-han', status: 'former' }
    ]
  },
  {
    id: 'boynextdoor',
    name: 'BOYNEXTDOOR',
    type: 'boy_group',
    generation: '5th',
    debutYear: 2023,
    agency: 'KOZ Entertainment / HYBE',
    description: 'Zico-produced relatable boys next door with catchy conversational lyrics.',
    fandomName: 'ONEDOOR',
    members: [
      { id: 'bnd_sungho', name: 'Sungho', realName: 'Park Sung-ho', status: 'active' },
      { id: 'bnd_riwoo', name: 'Riwoo', realName: 'Lee Sang-hyeok', status: 'active' },
      { id: 'bnd_jaehyun', name: 'Myung Jaehyun', realName: 'Myung Jae-hyun', status: 'active' },
      { id: 'bnd_taesan', name: 'Taesan', realName: 'Han Dong-min', status: 'active' },
      { id: 'bnd_leehan', name: 'Leehan', realName: 'Kim Dong-hyun', status: 'active' },
      { id: 'bnd_woonhak', name: 'Woonhak', realName: 'Kim Woon-hak', status: 'active' }
    ]
  },
  {
    id: 'tws',
    name: 'TWS',
    type: 'boy_group',
    generation: '5th',
    debutYear: 2024,
    agency: 'PLEDIS Entertainment / HYBE',
    description: 'Boyhood pop creators of runaway sensation Plot Twist.',
    fandomName: '42 (SAI)',
    members: [
      { id: 'tws_shinyu', name: 'Shinyu', realName: 'Shin Jung-hwan', status: 'active' },
      { id: 'tws_dohoon', name: 'Dohoon', realName: 'Kim Do-hoon', status: 'active' },
      { id: 'tws_youngjae', name: 'Youngjae', realName: 'Choi Young-jae', status: 'active' },
      { id: 'tws_hanjin', name: 'Hanjin', realName: 'Han Zhen', status: 'active' },
      { id: 'tws_jihoon', name: 'Jihoon', realName: 'Han Ji-hoon', status: 'active' },
      { id: 'tws_kyungmin', name: 'Kyungmin', realName: 'Lee Kyung-min', status: 'active' }
    ]
  },
  {
    id: 'p1harmony',
    name: 'P1Harmony',
    type: 'boy_group',
    generation: '4th',
    debutYear: 2020,
    agency: 'FNC Entertainment',
    description: 'Charismatic live performers with viral TikTok energy and sharp hip-hop.',
    fandomName: 'P1ece',
    members: [
      { id: 'p1h_keeho', name: 'Keeho', realName: 'Yoon Kee-ho', status: 'active' },
      { id: 'p1h_theo', name: 'Theo', realName: 'Choi Tae-yang', status: 'active' },
      { id: 'p1h_jiung', name: 'Jiung', realName: 'Choi Ji-ung', status: 'active' },
      { id: 'p1h_intak', name: 'Intak', realName: 'Hwang In-tak', status: 'active' },
      { id: 'p1h_soul', name: 'Soul', realName: 'Haku Shota', status: 'active' },
      { id: 'p1h_jongseob', name: 'Jongseob', realName: 'Kim Jong-seob', status: 'active' }
    ]
  },
  {
    id: 'cravity',
    name: 'CRAVITY',
    type: 'boy_group',
    generation: '4th',
    debutYear: 2020,
    agency: 'Starship Entertainment',
    description: 'Center of gravity, Road to Kingdom contestants with bright and futuristic beats.',
    fandomName: 'LUVITY',
    members: [
      { id: 'crv_serim', name: 'Serim', realName: 'Park Se-rim', status: 'active' },
      { id: 'crv_allen', name: 'Allen', realName: 'Allen Ma', status: 'active' },
      { id: 'crv_jungmo', name: 'Jungmo', realName: 'Koo Jung-mo', status: 'active' },
      { id: 'crv_woobin', name: 'Woobin', realName: 'Seo Woo-bin', status: 'active' },
      { id: 'crv_wonjin', name: 'Wonjin', realName: 'Ham Won-jin', status: 'active' },
      { id: 'crv_minhee', name: 'Minhee', realName: 'Kang Min-hee', status: 'active' },
      { id: 'crv_hyeongjun', name: 'Hyeongjun', realName: 'Song Hyeong-jun', status: 'active' },
      { id: 'crv_taeyoung', name: 'Taeyoung', realName: 'Kim Tae-young', status: 'active' },
      { id: 'crv_seongmin', name: 'Seongmin', realName: 'Ahn Seong-min', status: 'active' }
    ]
  },
  {
    id: 'oneus',
    name: 'ONEUS',
    type: 'boy_group',
    generation: '4th',
    debutYear: 2019,
    agency: 'RBW',
    description: 'Traditional Korean aesthetics and dramatic theater concepts (LIT, Luna).',
    fandomName: 'TO MOON',
    members: [
      { id: 'oneus_seoho', name: 'Seoho', realName: 'Lee Seo-ho', status: 'active' },
      { id: 'oneus_leedo', name: 'Leedo', realName: 'Kim Gun-hak', status: 'active' },
      { id: 'oneus_keonhee', name: 'Keonhee', realName: 'Lee Keon-hee', status: 'active' },
      { id: 'oneus_hwanwoong', name: 'Hwanwoong', realName: 'Yeo Hwan-woong', status: 'active' },
      { id: 'oneus_xion', name: 'Xion', realName: 'Son Dong-ju', status: 'active' },
      { id: 'oneus_ravn', name: 'Ravn', realName: 'Kim Young-jo', status: 'former' }
    ]
  },

  // ----------------- 5th Gen Boy Groups -----------------
  {
    id: 'xikers',
    name: 'xikers',
    type: 'boy_group',
    generation: '5th',
    debutYear: 2023,
    agency: 'KQ Entertainment',
    description: 'Dynamic younger brothers of ATEEZ with boundless youthful rebel energy.',
    fandomName: 'roadÝ',
    members: [
      { id: 'xkr_minjae', name: 'Minjae', realName: 'Jo Min-jae', status: 'active' },
      { id: 'xkr_junmin', name: 'Junmin', realName: 'Park Jun-min', status: 'active' },
      { id: 'xkr_sumin', name: 'Sumin', realName: 'Choi Su-min', status: 'active' },
      { id: 'xkr_jinsik', name: 'Jinsik', realName: 'Ham Jin-sik', status: 'active' },
      { id: 'xkr_hyunwoo', name: 'Hyunwoo', realName: 'Choi Hyun-woo', status: 'active' },
      { id: 'xkr_junghoon', name: 'Junghoon', realName: 'Kim Jung-hoon', status: 'active' },
      { id: 'xkr_seeun', name: 'Seeun', realName: 'Park Se-eun', status: 'active' },
      { id: 'xkr_yujun', name: 'Yujun', realName: 'Jung Yu-jun', status: 'active' },
      { id: 'xkr_hunter', name: 'Hunter', realName: 'Papwit Kaewkam', status: 'active' },
      { id: 'xkr_yechan', name: 'Yechan', realName: 'Lee Ye-chan', status: 'active' }
    ]
  },
  {
    id: 'kickflip',
    name: 'KickFlip',
    type: 'boy_group',
    generation: '5th',
    debutYear: 2024,
    agency: 'Street Pop Lab',
    description: 'Skater-themed energetic boy group with hip hop street grooves.',
    fandomName: 'FlipZone',
    members: [
      { id: 'kf_kai', name: 'Kaien', realName: 'Kang Kaien', status: 'active' },
      { id: 'kf_leo', name: 'Leo', realName: 'Park Leo', status: 'active' },
      { id: 'kf_jin', name: 'Jinwoo', realName: 'Choi Jin-woo', status: 'active' },
      { id: 'kf_ryu', name: 'Ryu', realName: 'Ryu Min-jae', status: 'active' }
    ]
  },

  // ----------------- Co-ed Groups -----------------
  {
    id: 'kard',
    name: 'KARD',
    type: 'coed_group',
    generation: '3rd',
    debutYear: 2017,
    agency: 'DSP Media',
    description: 'Premier co-ed group blending dancehall, moombahton, and reggaeton.',
    fandomName: 'Hidden KARD',
    members: [
      { id: 'kard_jseph', name: 'J.Seph', realName: 'Kim Tae-hyung', status: 'active' },
      { id: 'kard_bm', name: 'BM', realName: 'Matthew Kim', status: 'active' },
      { id: 'kard_somin', name: 'Somin', realName: 'Jeon So-min', status: 'active' },
      { id: 'kard_jiwoo', name: 'Jiwoo', realName: 'Jeon Ji-woo', status: 'active' }
    ]
  },
  {
    id: 'akmu',
    name: 'AKMU (Akdong Musician)',
    type: 'coed_group',
    generation: '3rd',
    debutYear: 2014,
    agency: 'YG Entertainment',
    description: 'Genius sibling singer-songwriter duo loved across all generations.',
    fandomName: 'AKKADEMY',
    members: [
      { id: 'akmu_chanhyuk', name: 'Lee Chanhyuk', realName: 'Lee Chan-hyuk', status: 'active' },
      { id: 'akmu_suhyun', name: 'Lee Suhyun', realName: 'Lee Su-hyun', status: 'active' }
    ]
  },

  // ----------------- Solo Artists -----------------
  {
    id: 'iu',
    name: 'IU',
    type: 'solo',
    generation: '2nd',
    debutYear: 2008,
    agency: 'EDAM Entertainment',
    description: 'The unrivaled Queen of Korean digital charts and singer-songwriter.',
    fandomName: 'UAENA',
    members: [
      { id: 'iu_self', name: 'IU', realName: 'Lee Ji-eun', status: 'active' }
    ]
  },
  {
    id: 'taeyeon_solo',
    name: 'TAEYEON',
    type: 'solo',
    generation: '2nd',
    debutYear: 2015,
    agency: 'SM Entertainment',
    description: 'Vocal goddess with emotive mastery across pop, R&B, and rock ballads.',
    fandomName: 'SONE',
    members: [
      { id: 'ty_self', name: 'Taeyeon', realName: 'Kim Tae-yeon', status: 'active' }
    ]
  },
  {
    id: 'chungha',
    name: 'CHUNG HA',
    type: 'solo',
    generation: '3rd',
    debutYear: 2017,
    agency: 'MORE VISION',
    description: 'Dance queen and soloist icon with hit singles Roller Coaster and Snapping.',
    fandomName: 'BYULHARANG',
    members: [
      { id: 'ch_self', name: 'Chung Ha', realName: 'Kim Chan-mi', status: 'active' }
    ]
  },
  {
    id: 'sunmi_solo',
    name: 'SUNMI',
    type: 'solo',
    generation: '2nd',
    debutYear: 2013,
    agency: 'ABYSS Company',
    description: 'Creator of the Sunmi-pop genre with cinematic retro synthpop.',
    fandomName: 'Miya-ne',
    members: [
      { id: 'sunmi_self', name: 'Sunmi', realName: 'Lee Sun-mi', status: 'active' }
    ]
  },
  {
    id: 'taemin_solo',
    name: 'TAEMIN',
    type: 'solo',
    generation: '2nd',
    debutYear: 2014,
    agency: 'Big Planet Made (BPM)',
    description: "The Idol of Idols, master of performance art (Move, Criminal, Guilty).",
    fandomName: 'TAEMate',
    members: [
      { id: 'tm_self', name: 'Taemin', realName: 'Lee Tae-min', status: 'active' }
    ]
  },
  {
    id: 'baekhyun_solo',
    name: 'BAEKHYUN',
    type: 'solo',
    generation: '3rd',
    debutYear: 2019,
    agency: 'INB100',
    description: 'Vocal genius and historic million-selling soloist with silky R&B.',
    fandomName: 'BBHL / EXO-L',
    members: [
      { id: 'bh_self', name: 'Baekhyun', realName: 'Byun Baek-hyun', status: 'active' }
    ]
  },
  {
    id: 'wonho_solo',
    name: 'WONHO',
    type: 'solo',
    generation: '3rd',
    debutYear: 2020,
    agency: 'Highline Entertainment',
    description: 'Captivating soloist with energetic synth dance and heartfelt ballads.',
    fandomName: 'WENEE',
    members: [
      { id: 'wh_self', name: 'Wonho', realName: 'Lee Ho-seok', status: 'active' }
    ]
  }
];

export const getGroupById = (id, customGroups = []) => {
  if (!id) return null;
  const standard = KPOP_GROUPS.find(g => g.id === id);
  if (standard) return standard;
  return customGroups.find(g => g.id === id) || null;
};
