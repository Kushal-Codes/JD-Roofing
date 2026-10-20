export interface VerifiedReview {
  id: string;
  reviewerName: string;
  datePublished: string; // ISO date from source
  displayDate: string;
  rating: number;
  platform: 'Google' | 'Checkatrade' | 'Yell' | 'Trustindex';
  verifiedVia: string;
  sourceUrl: string;
  text: string;
  workType: string;
  isRepeatCustomer?: boolean;
  featuredHighlight?: string;
}

export interface RoofingService {
  id: string;
  number: string;
  title: string;
  shortTitle: string; // Matches Quote Form Step 1 selection
  categoryTag: string;
  description: string;
  keyDetails: string[];
  imageUrl: string;
  imageAlt: string;
}

export type ProjectCategory =
  | 'All Projects'
  | 'Full Roof Replacements'
  | 'Roof Repairs'
  | 'Slate & Tile Roofing'
  | 'Flat Roof Installations'
  | 'Chimney Work'
  | 'Guttering & Roofline'
  | 'Storm Damage Repairs';

export interface ProjectItem {
  id: string;
  title: string;
  location: string;
  category: Exclude<ProjectCategory, 'All Projects'>;
  secondaryCategories?: Array<Exclude<ProjectCategory, 'All Projects'>>;
  description: string;
  technicalScope: string[];
  imageUrl: string;
  imageAlt: string;
  aspectRatio: 'landscape' | 'portrait' | 'square';
}

export interface BeforeAfterComparison {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  beforeImage: string;
  beforeLabel: string;
  beforeAlt: string;
  afterImage: string;
  afterLabel: string;
  afterAlt: string;
  workSummary: string;
  isMatchedJpdProject: boolean;
}

export interface ServiceAreaLocation {
  name: string;
  postcodePrefix: string;
  role: 'Primary Base' | 'Core Service Area' | 'North West Coverage';
  summary: string;
  popularServices: string[];
}

export const BUSINESS_CONFIG = {
  legalName: 'JPD Roofing Ltd',
  brandName: 'JPD Roofing Ltd',
  eyebrowLocation: 'JPD ROOFING LTD · ACCRINGTON, LANCASHIRE',
  primaryContactPerson: 'Jordan',
  address: {
    street: '57 Wordsworth Road',
    town: 'Accrington',
    county: 'Lancashire',
    postcode: 'BB5 0LU',
    country: 'United Kingdom',
    full: '57 Wordsworth Road, Accrington BB5 0LU',
    coordinates: { lat: 53.7478, lng: -2.3554 },
  },
  phone: {
    display: '07512 781329',
    telHref: 'tel:07512781329',
    international: '+44 7512 781329',
    whatsappHref: 'https://wa.me/447512781329',
    confirmationNote:
      '07512 781329 is published on Google Business Profile, Yell, Facebook, and JPD Roofing Ltd vehicle livery. A separate third-party directory lists an alternative landline; confirm preferred primary number with Jordan before domain cutover.',
  },
  email: {
    address: 'jpdroofingltd@outlook.com',
    confirmationNote:
      'Published on JPD Roofing Ltd branded vehicle livery and official workwear (see verified photos hero_2.jpeg & proj_14.jpg). Confirm active inbox forwarding before launch.',
  },
  hours: {
    standardDisplay: 'Monday – Saturday: 07:00 – 19:00',
    emergencyNote:
      'Urgent leak & storm damage enquiries accepted. Please call 07512 781329 to check current emergency call-out availability.',
  },
  externalProfiles: {
    googleMapsShareUrl: 'https://share.google/6RTzfRp9zDaWCNJrL',
    googlePlaceId: 'ChIJAfIkTB5QaCsRxGne6g-vWEA',
    googleDirectionsUrl:
      'https://www.google.com/maps/dir/?api=1&destination=57+Wordsworth+Road,+Accrington+BB5+0LU&destination_place_id=ChIJAfIkTB5QaCsRxGne6g-vWEA',
    facebookUrl: 'https://www.facebook.com/p/JPD-Roofing-Ltd-61562115216734/',
    yellUrl: 'https://www.yell.com/biz/jpd-roofing-ltd-accrington-901770835/',
    trustindexUrl: 'https://www.trustindex.io/reviews/www.jpdroofiing.co.uk',
    checkatradeUrl: 'https://www.checkatrade.com/trades/jpdroofing1072902',
  },
  reputationStats: {
    combinedAverageRating: 4.9,
    combinedTotalReviews: 269,
    fiveStarPercentage: 94,
    yellReviewCount: 100,
    platformsAggregated: ['Google', 'Checkatrade', 'Yell', 'Trustindex'],
    distinctionNotice:
      '4.9/5 average across 269 verified multi-platform reviews aggregated by Trustindex (including Google, Yell and Checkatrade). Yell independently records 100 reviews.',
  },
  ownerConfirmationChecklist: [
    {
      item: 'Preferred Customer Contact Number',
      currentValue: '07512 781329 (Consistent across Google, Yell, Facebook & van livery)',
      status: 'Verify whether secondary directory number should redirect or be retired.',
    },
    {
      item: 'Years of Roofing Experience Statistic',
      currentValue: 'Van livery states "15 Years Experience"; directory profile states "Over 19 Years Experience"',
      status: 'Confirm exact statistic with Jordan before publishing a fixed numerical claim in headline copy.',
    },
    {
      item: '24/7 Emergency Call-Out Hours',
      currentValue: 'Standard hours Mon–Sat 07:00–19:00; emergency enquiries invited by telephone',
      status: 'Confirm whether round-the-clock 24/7 call-outs are active year-round before advertising guaranteed 24/7 dispatch.',
    },
    {
      item: 'Customer Email & WhatsApp Enquiries',
      currentValue: 'jpdroofingltd@outlook.com (printed on JPD van & uniform)',
      status: 'Confirm preferred destination inbox for ENQUIRY_WEBHOOK_URL notifications and WhatsApp preference.',
    },
  ],
};

/**
 * 100% Verbatim Customer Reviews extracted directly from JPD Roofing Ltd's verified Trustindex feed
 * (https://www.trustindex.io/reviews/www.jpdroofiing.co.uk)
 */
export const VERIFIED_REVIEWS: VerifiedReview[] = [
  {
    id: 'david-farrer-2026-09',
    reviewerName: 'David Farrer',
    datePublished: '2026-09-14',
    displayDate: '14 September 2026',
    rating: 5,
    platform: 'Google',
    verifiedVia: 'Verified Google Review via Trustindex',
    sourceUrl: 'https://www.trustindex.io/reviews/www.jpdroofiing.co.uk',
    text: 'This is the third time we’ve had work undertaken by JPD and we can’t recommend them highly enough. Jordan is responsive and will always provide a good review of the issue and options for the job. We’ve had minor repairs and significant work completed and would certainly not look at any other roofing contractors, if you are looking for quality workmanship look no further than JPD.',
    workType: 'Repeat Customer · Minor Repairs & Major Roofing Work',
    isRepeatCustomer: true,
    featuredHighlight: 'Third time using JPD Roofing Ltd',
  },
  {
    id: 'mark-hamer-2026-09',
    reviewerName: 'Mark Hamer',
    datePublished: '2026-09-30',
    displayDate: '30 September 2026',
    rating: 5,
    platform: 'Google',
    verifiedVia: 'Verified Google Review via Trustindex',
    sourceUrl: 'https://www.trustindex.io/reviews/www.jpdroofiing.co.uk',
    text: 'Jordan and his team have done a great job very professional clean and great communication.',
    workType: 'Roofing Work & Site Cleanliness',
    isRepeatCustomer: false,
    featuredHighlight: 'Professional, clean & great communication',
  },
  {
    id: 'james-kay-2026-08',
    reviewerName: 'James Kay',
    datePublished: '2026-08-28',
    displayDate: '28 August 2026',
    rating: 5,
    platform: 'Google',
    verifiedVia: 'Verified Google Review via Trustindex',
    sourceUrl: 'https://www.trustindex.io/reviews/www.jpdroofiing.co.uk',
    text: '2nd time I have used JPD roofing Ltd, quick to respond, competitive pricing, and the job (new roof) was completed to an excellent standard',
    workType: 'Full New Roof Installation',
    isRepeatCustomer: true,
    featuredHighlight: 'Second time customer · New roof installation',
  },
  {
    id: 'andy-taylor-2026-03',
    reviewerName: 'Andy Taylor',
    datePublished: '2026-03-06',
    displayDate: '6 March 2026',
    rating: 5,
    platform: 'Google',
    verifiedVia: 'Verified Google Review via Trustindex',
    sourceUrl: 'https://www.trustindex.io/reviews/www.jpdroofiing.co.uk',
    text: 'Jordan and his team are a rare breed in any business sector; great value, great quality, do what they say they are going to do when they say they are going to do it. Gutters, fascia’s, soffits and down pipes replaced on time in budget and with a minimum of fuss - awesome!',
    workType: 'Fascias, Soffits, Guttering & Downpipes',
    isRepeatCustomer: false,
    featuredHighlight: 'On time, on budget & minimum of fuss',
  },
  {
    id: 'hannah-glanville-2026-03',
    reviewerName: 'Hannah Glanville',
    datePublished: '2026-03-06',
    displayDate: '6 March 2026',
    rating: 5,
    platform: 'Google',
    verifiedVia: 'Verified Google Review via Trustindex',
    sourceUrl: 'https://www.trustindex.io/reviews/www.jpdroofiing.co.uk',
    text: 'Great service - really recommend. Quick to respond to my initial request and throughout - did a great job replacing our bay roof and guttering as well as repointing the front of our house. Really pleased. Thanks Jordan.',
    workType: 'Bay Roof Replacement, Guttering & Repointing',
    isRepeatCustomer: false,
    featuredHighlight: 'Bay roof replacement, guttering & repointing',
  },
  {
    id: 'ian-culshaw-2026-07',
    reviewerName: 'Ian Culshaw',
    datePublished: '2026-07-25',
    displayDate: '25 July 2026',
    rating: 5,
    platform: 'Google',
    verifiedVia: 'Verified Google Review via Trustindex',
    sourceUrl: 'https://www.trustindex.io/reviews/www.jpdroofiing.co.uk',
    text: 'Used jpd roofing for full re-roof on my home very professional and reliable. From quotation to completion no issues at all. I would recommend jpd roofing ltd for any roofing requirements.',
    workType: 'Full Residential Re-Roof',
    isRepeatCustomer: false,
    featuredHighlight: 'Full re-roof from quotation to completion',
  },
  {
    id: 'carl-bolton-2026-02',
    reviewerName: 'Carl Bolton',
    datePublished: '2026-02-20',
    displayDate: '20 February 2026',
    rating: 5,
    platform: 'Google',
    verifiedVia: 'Verified Google Review via Trustindex',
    sourceUrl: 'https://www.trustindex.io/reviews/www.jpdroofiing.co.uk',
    text: 'Excellent service, would highly recommend. Quick to respond to my initial enquiry, did an assessment of the job within a few days of initial contact and planned us in at the next available point. Very fast and well organised on the job, the quality of which at a high standard. Communication throughout was easy and clear. I’d have no concerns booking Jordan and his team again if I need any work doing.',
    workType: 'Roof Assessment & Repair',
    isRepeatCustomer: false,
    featuredHighlight: 'Prompt assessment & clear communication throughout',
  },
  {
    id: 'andy-harrison-2026-05',
    reviewerName: 'Andy Harrison',
    datePublished: '2026-05-29',
    displayDate: '29 May 2026',
    rating: 5,
    platform: 'Google',
    verifiedVia: 'Verified Google Review via Trustindex',
    sourceUrl: 'https://www.trustindex.io/reviews/www.jpdroofiing.co.uk',
    text: 'Returning customer, lead flashing had come away from from porch extension (not originally done by Jordan btw). Prompt response, quote and managed to fit me in the next day',
    workType: 'Lead Flashing Repair',
    isRepeatCustomer: true,
    featuredHighlight: 'Returning customer · Next-day flashing repair',
  },
  {
    id: 'ted-dew-2026-05',
    reviewerName: 'Ted Dew',
    datePublished: '2026-05-22',
    displayDate: '22 May 2026',
    rating: 5,
    platform: 'Google',
    verifiedVia: 'Verified Google Review via Trustindex',
    sourceUrl: 'https://www.trustindex.io/reviews/www.jpdroofiing.co.uk',
    text: 'I have used Jpd for a few jobs now and I have to say the response time is excellent. The jobs have been carried out on time on budget and no mess or fuss. Jordan is quick to reply and very reasonably priced. I will certainly use them again for any other roofing or gutters that need replacing or repairing.',
    workType: 'Multiple Roofing & Guttering Jobs',
    isRepeatCustomer: true,
    featuredHighlight: 'Repeat homeowner · On time, on budget, no mess',
  },
  {
    id: 'charles-rawson-2026-06',
    reviewerName: 'Charles Rawson',
    datePublished: '2026-06-17',
    displayDate: '17 June 2026',
    rating: 5,
    platform: 'Google',
    verifiedVia: 'Verified Google Review via Trustindex',
    sourceUrl: 'https://www.trustindex.io/reviews/www.jpdroofiing.co.uk',
    text: 'Jordan (and his colleague) gave me excellent service. Kept me informed at every stage and was punctual. Prompt to respond to messages and phone calls. Would highly recommend.',
    workType: 'Roofing Repair & Maintenance',
    isRepeatCustomer: false,
    featuredHighlight: 'Informed at every stage & punctual',
  },
  {
    id: 'z-moore-2026-02',
    reviewerName: 'Z Moore',
    datePublished: '2026-02-19',
    displayDate: '19 February 2026',
    rating: 5,
    platform: 'Google',
    verifiedVia: 'Verified Google Review via Trustindex',
    sourceUrl: 'https://www.trustindex.io/reviews/www.jpdroofiing.co.uk',
    text: 'Excellent job done by Jordan and the lads. Arrived on time, did an amazing job of replacing the bay window roof, cleaned up after themselves. Would highly recommend to anyone looking to get some roofing done',
    workType: 'Bay Window Roof Replacement',
    isRepeatCustomer: false,
    featuredHighlight: 'Bay window roof replacement & tidy site handover',
  },
  {
    id: 'steven-leak-2026-04',
    reviewerName: 'Steven Leak',
    datePublished: '2026-04-10',
    displayDate: '10 April 2026',
    rating: 5,
    platform: 'Google',
    verifiedVia: 'Verified Google Review via Trustindex',
    sourceUrl: 'https://www.trustindex.io/reviews/www.jpdroofiing.co.uk',
    text: 'Excellent service from start to finish. The work was completed to a high standard, everything was left clean and tidy, and communication was clear throughout. Highly recommend to anyone looking for a reliable roofer',
    workType: 'Roofing Works',
    isRepeatCustomer: false,
    featuredHighlight: 'High standard of work & left clean and tidy',
  },
];

export const ROOFING_SERVICES: RoofingService[] = [
  {
    id: 'roof-repairs',
    number: '01',
    title: 'Roof Repairs',
    shortTitle: 'Roof Repair',
    categoryTag: 'Diagnostics & Weatherproofing',
    description:
      'Targeted repairs for active leaks, slipped or cracked slates, failed ridge mortar, valley defects and loose lead flashing across terraced, semi-detached and detached properties.',
    keyDetails: [
      'Slipped slate & broken interlocking tile replacement',
      'Lead valley, porch & abutment flashing repairs',
      'Ridge tile re-bedding & mechanically fixed dry-ridge upgrades',
    ],
    imageUrl: '/images/jpd/proj_9.jpg',
    imageAlt: 'JPD Roofing completed roof tiling and skylight flashing repair around chimney stack',
  },
  {
    id: 'new-roofs',
    number: '02',
    title: 'New Roofs & Re-Roofing',
    shortTitle: 'New Roof',
    categoryTag: 'Full Pitched Replacements',
    description:
      'Complete strip-and-reslate or re-tile installations built with high-tensile breathable membranes, graded treated timber battens, dry ridge/hip systems and full scaffolding management.',
    keyDetails: [
      'Full strip back to rafters with breathable membrane & new battens',
      'Natural Welsh/Spanish slate & modern interlocking concrete/clay tiles',
      'Mechanically fixed dry-ridge, dry-hip and dry-verge weatherproofing',
    ],
    imageUrl: '/images/jpd/proj_16.jpg',
    imageAlt: 'Completed full hipped roof replacement by JPD Roofing Ltd in Lancashire',
  },
  {
    id: 'flat-roofing',
    number: '03',
    title: 'Flat Roofing',
    shortTitle: 'Flat Roof',
    categoryTag: 'EPDM Rubber · GRP · Torch-On Felt',
    description:
      'Durable, watertight flat roofing installations and overlays for home extensions, bay windows, dormers, garages and commercial units using single-ply EPDM rubber, GRP fibreglass and high-performance felt.',
    keyDetails: [
      'Seamless EPDM rubber membrane & GRP fibreglass systems',
      'Bay window roofs, rear extensions, garages & dormer roofs',
      'Replacement joists, firring pieces, warm-roof insulation & perimeter trims',
    ],
    imageUrl: '/images/jpd/proj_15.jpg',
    imageAlt: 'JPD Roofing Ltd flat roof installation with JPD Roofing van parked below',
  },
  {
    id: 'storm-damage',
    number: '04',
    title: 'Storm Damage & Emergency Repairs',
    shortTitle: 'Storm Damage',
    categoryTag: 'Rapid Weatherproofing & Make-Safe',
    description:
      'Responsive assessment and repair when high winds or heavy Lancashire rain dislodge ridge tiles, lift flashings or cause sudden water ingress into your loft or ceilings.',
    keyDetails: [
      'Urgent leak tracing, temporary weatherproofing & permanent structural repair',
      'Wind-damaged ridge tiles, hip irons & verge restoration',
      'Clear photographic inspection reports for homeowner peace of mind',
    ],
    imageUrl: '/images/jpd/hero_1.jpeg',
    imageAlt: 'Jordan from JPD Roofing Ltd securing breathable membrane and battens on a Lancashire roof',
  },
  {
    id: 'fascias-soffits-guttering',
    number: '05',
    title: 'Fascias, Soffits & Guttering',
    shortTitle: 'Guttering',
    categoryTag: 'uPVC Roofline & Rainwater Systems',
    description:
      'Complete roofline replacements and guttering repairs that protect your rafters and brickwork from damp penetration, rot and overflowing rainwater.',
    keyDetails: [
      'Low-maintenance uPVC fascias, ventilated soffits & bargeboards',
      'Deep-flow guttering, downpipes, joints & bracket replacements',
      'Dry-verge end caps for clean, mortar-free gable protection',
    ],
    imageUrl: '/images/jpd/proj_4.jpg',
    imageAlt: 'Newly installed dry verge, uPVC fascia, soffit and guttering by JPD Roofing Ltd',
  },
  {
    id: 'chimney-repairs',
    number: '06',
    title: 'Chimney Repairs & Repointing',
    shortTitle: 'Chimney Work',
    categoryTag: 'Masonry · Leadwork · Repointing',
    description:
      'Thorough chimney stack maintenance, weathered mortar raking and repointing, stepped lead flashing dressing, flaunching renewal and cowls to stop damp tracking indoors.',
    keyDetails: [
      'Brick & Lancashire stone chimney repointing and flaunching repairs',
      'Code 4/5 stepped lead flashing, back gutters & apron renewals',
      'House front & gable masonry repointing while scaffolding is in place',
    ],
    imageUrl: '/images/jpd/proj_10.jpg',
    imageAlt: 'Repointed traditional stone chimney stack with lead flashing and slate roof by JPD Roofing Ltd',
  },
  {
    id: 'slate-tile-roofing',
    number: '07',
    title: 'Slate & Tile Roofing',
    shortTitle: 'New Roof',
    categoryTag: 'Traditional & Contemporary Coverings',
    description:
      'Sympathetic traditional natural slating for East Lancashire stone terraces alongside precision interlocking tile systems for modern detached and semi-detached homes.',
    keyDetails: [
      'Traditional Welsh & reclaimed natural slate matching for heritage streets',
      'Modern low-profile interlocking slate-effect and profiled tiles',
      'Velux roof window installation, re-flashing & insulated collars',
    ],
    imageUrl: '/images/jpd/proj_20.jpg',
    imageAlt: 'Completed natural slate terraced roof and chimney stack by JPD Roofing Ltd',
  },
  {
    id: 'roof-maintenance',
    number: '08',
    title: 'Roof Maintenance',
    shortTitle: 'Not Sure',
    categoryTag: 'Preventative Care & Inspections',
    description:
      'Honest roof health checks, moss and debris clearance, valley cleaning and preventative maintenance designed to extend the working life of your existing roof.',
    keyDetails: [
      'Pre-winter roof, valley, flashing & guttering inspections',
      'Moss removal, roof cleaning & blocked rainwater outlet clearance',
      'Straightforward advice on repair vs replacement options',
    ],
    imageUrl: '/images/jpd/proj_5.jpg',
    imageAlt: 'JPD Roofing Ltd carrying out roof inspection and chimney maintenance on a detached brick home',
  },
];

export const PROJECT_PORTFOLIO: ProjectItem[] = [
  {
    id: 'jpd-terraced-slate-reroof',
    title: 'Full Terraced Slate Re-Roof & Dry Ridge System',
    location: 'Accrington, BB5',
    category: 'Full Roof Replacements',
    secondaryCategories: ['Slate & Tile Roofing'],
    description:
      'Complete strip and re-slate of a traditional East Lancashire terraced property, finished with precision-coursed smooth grey slates, mechanically fixed dry ridge and dressed chimney leadwork.',
    technicalScope: [
      'Full strip of aged covering to structural rafters',
      'Breathable membrane & graded treated timber battens',
      'New slate courses & ventilated dry-ridge system',
    ],
    imageUrl: '/images/jpd/proj_20.jpg',
    imageAlt: 'Completed terraced slate re-roof by JPD Roofing Ltd in Lancashire',
    aspectRatio: 'portrait',
  },
  {
    id: 'jpd-hipped-interlocking-tile',
    title: 'Detached Hipped Roof Replacement',
    location: 'Blackburn & Hyndburn',
    category: 'Full Roof Replacements',
    secondaryCategories: ['Slate & Tile Roofing'],
    description:
      'Full replacement of a hipped pitched roof in anthracite interlocking tiles with mechanically fixed dry-hip and ridge detailing overlooking a flat roof abutment.',
    technicalScope: [
      'Anthracite profiled interlocking roof tiles',
      'Mechanically fixed dry-hip system for storm resilience',
      'Full perimeter guttering & eaves protection renewal',
    ],
    imageUrl: '/images/jpd/proj_16.jpg',
    imageAlt: 'Completed hipped roof replacement in dark interlocking tiles by JPD Roofing Ltd',
    aspectRatio: 'portrait',
  },
  {
    id: 'jpd-epdm-flat-roof-extension',
    title: 'EPDM Single-Ply Flat Roof & Pitched Junction',
    location: 'Oswaldtwistle, BB5',
    category: 'Flat Roof Installations',
    secondaryCategories: ['Full Roof Replacements'],
    description:
      'Seamless EPDM rubber flat roof installation abutting a pitched tiled roof, completed with neat perimeter trims and dry-hip junction detailing.',
    technicalScope: [
      'Single-ply EPDM rubber membrane installation',
      'Weatherproof abutment detailing into pitched elevation',
      'Perimeter drip & edge trim system',
    ],
    imageUrl: '/images/jpd/proj_15.jpg',
    imageAlt: 'JPD Roofing Ltd flat roof installation in Lancashire',
    aspectRatio: 'portrait',
  },
  {
    id: 'jpd-natural-slate-chimney-velux',
    title: 'Natural Slate Roof, Twin Skylights & Multi-Pot Chimney',
    location: 'Ribble Valley, Lancashire',
    category: 'Slate & Tile Roofing',
    secondaryCategories: ['Chimney Work'],
    description:
      'Traditional riven natural slate roof featuring twin recessed roof windows and a stone chimney stack with dressed lead flashing and five terracotta pots.',
    technicalScope: [
      'Traditional riven natural slate courses',
      'Twin skylight flashing kits integrated into slate plane',
      'Stone chimney stack lead apron, soakers & stepped flashing',
    ],
    imageUrl: '/images/jpd/proj_10.jpg',
    imageAlt: 'Natural slate roof with twin skylights and stone chimney stack completed by JPD Roofing Ltd',
    aspectRatio: 'portrait',
  },
  {
    id: 'jpd-bungalow-full-reroof-van',
    title: 'Bungalow Re-Roof & Full Scaffolding Setup',
    location: 'Hyndburn, Lancashire',
    category: 'Full Roof Replacements',
    secondaryCategories: ['Guttering & Roofline'],
    description:
      'Complete front-and-rear bungalow roof replacement in dark grey interlocking tiles with integrated skylight, full access scaffolding and tidy site management.',
    technicalScope: [
      'Full scaffold access & waste management on site',
      'New dark grey interlocking tile roof & ridge line',
      'Integrated roof window & eaves roofline overhaul',
    ],
    imageUrl: '/images/jpd/proj_14.jpg',
    imageAlt: 'JPD Roofing Ltd completed bungalow re-roof project in Lancashire',
    aspectRatio: 'portrait',
  },
  {
    id: 'jpd-detached-brick-chimney-roof',
    title: 'Large Detached Residence Roof & Chimney Overhaul',
    location: 'Blackburn, Lancashire',
    category: 'Roof Repairs',
    secondaryCategories: ['Chimney Work', 'Slate & Tile Roofing'],
    description:
      'High-level chimney flashing, ridge and tile maintenance across a substantial detached red-brick family home with dormer and double garage.',
    technicalScope: [
      'Chimney stack leadwork & mortar inspection',
      'Dormer & main roof tile overhaul',
      'Clean driveway protection and waste removal',
    ],
    imageUrl: '/images/jpd/proj_5.jpg',
    imageAlt: 'JPD Roofing team working on the roof and chimney of a large detached brick house',
    aspectRatio: 'landscape',
  },
  {
    id: 'jpd-y-junction-dry-hip-slate',
    title: 'Precision Y-Junction Dry-Hip & Slate Roof',
    location: 'Accrington, Lancashire',
    category: 'Slate & Tile Roofing',
    secondaryCategories: ['Full Roof Replacements'],
    description:
      'Top-down view of a newly slated hipped roof demonstrating clean mitred slate courses and a mechanically fixed ventilated dry-hip and ridge intersection.',
    technicalScope: [
      'Close-mitred slate cuts along both hip lines',
      'Ventilated roll-out dry ridge & hip weatherproofing',
      'Stainless steel mechanical fixings and hip clips',
    ],
    imageUrl: '/images/jpd/proj_7.jpg',
    imageAlt: 'Top-down view of JPD Roofing Ltd precision dry-hip and slate installation',
    aspectRatio: 'portrait',
  },
  {
    id: 'jpd-gable-dry-verge-roofline',
    title: 'Gable Dry-Verge, Fascia, Soffit & Guttering Renewal',
    location: 'Rishton & Great Harwood',
    category: 'Guttering & Roofline',
    secondaryCategories: ['Roof Repairs'],
    description:
      'Neat anthracite interlocking dry-verge units paired with crisp white uPVC soffits, fascia boards and deep-flow rainwater guttering.',
    technicalScope: [
      'Mortar-free interlocking dry-verge end caps',
      'Clean uPVC fascia & soffit board installation',
      'High-capacity rainwater guttering & downpipe connection',
    ],
    imageUrl: '/images/jpd/proj_4.jpg',
    imageAlt: 'Gable dry verge, fascia, soffit and guttering completed by JPD Roofing Ltd',
    aspectRatio: 'portrait',
  },
  {
    id: 'jpd-commercial-epdm-flat-roof',
    title: 'Large-Area EPDM Rubber Flat Roof & Perimeter Trim',
    location: 'East Lancashire',
    category: 'Flat Roof Installations',
    secondaryCategories: ['Storm Damage Repairs'],
    description:
      'Weatherproof EPDM membrane installation on a large flat roof extension with mechanically fixed aluminium termination bar.',
    technicalScope: [
      'One-piece EPDM rubber flat roof membrane',
      'Mechanically fixed perimeter termination bar',
      'Watertight lap and edge detailing',
    ],
    imageUrl: '/images/jpd/proj_11.jpg',
    imageAlt: 'Large EPDM flat roof installation by JPD Roofing Ltd',
    aspectRatio: 'portrait',
  },
  {
    id: 'jpd-dormer-roofline-overhaul',
    title: 'Front Elevation Dormer, Valley & Roofline Works',
    location: 'Burnley & Pendle',
    category: 'Roof Repairs',
    secondaryCategories: ['Guttering & Roofline'],
    description:
      'Front elevation pitched roof, lead dormer sill apron, fibreglass/lead valley and garage roofline completed to a clean, uniform finish.',
    technicalScope: [
      'Dormer window lead sill apron & cheek weatherproofing',
      'Pitched tile courses & valley junction alignment',
      'Front elevation guttering and fascia alignment',
    ],
    imageUrl: '/images/jpd/proj_17.jpg',
    imageAlt: 'Dormer roof, valley and front garage roofline completed by JPD Roofing Ltd',
    aspectRatio: 'portrait',
  },
  {
    id: 'jpd-gable-masonry-repointing',
    title: 'Gable Brickwork Repointing & High-Level Access',
    location: 'Accrington, BB5',
    category: 'Chimney Work',
    secondaryCategories: ['Roof Repairs'],
    description:
      'Full gable-end scaffolding erected for weathered mortar raking and repointing alongside verge and roofline maintenance.',
    technicalScope: [
      'Multi-lift scaffold access for safe masonry work',
      'Raking out perished mortar joints & repointing',
      'Gable apex and verge weatherproofing inspection',
    ],
    imageUrl: '/images/jpd/proj_3.jpg',
    imageAlt: 'JPD Roofing team member repointing brickwork on a scaffolded gable wall',
    aspectRatio: 'portrait',
  },
  {
    id: 'jpd-storm-strip-membrane-batten',
    title: 'Terraced Roof Strip, Breathable Membrane & New Battens',
    location: 'Accrington & Hyndburn',
    category: 'Storm Damage Repairs',
    secondaryCategories: ['Full Roof Replacements'],
    description:
      'Complete strip-back of an ageing terraced roof in Lancashire, installing high-performance breathable membrane and graded treated timber battens prior to slating.',
    technicalScope: [
      'Full strip-back & structural rafter inspection',
      'High-tensile breathable underlay & treated laths',
      'Lead chimney apron & flashing preparation',
    ],
    imageUrl: '/images/jpd/land_5.jpeg',
    imageAlt: 'Jordan from JPD Roofing Ltd installing treated battens and breathable membrane on a Lancashire terraced roof',
    aspectRatio: 'landscape',
  },
];

export const BEFORE_AFTER_COMPARISONS: BeforeAfterComparison[] = [
  {
    id: 'velux-pitched-refurbishment',
    title: 'Pitched Roof & Twin Velux Skylight Refurbishment',
    subtitle: 'Full strip-back to rafters, insulation & breathable membrane vs completed tiling & flashing',
    category: 'Full Roof Replacements',
    beforeImage: '/images/jpd/proj_8.jpg',
    beforeLabel: 'Stage 1: Stripped to Rafters, Membrane & Battens',
    beforeAlt: 'Roof stripped around twin Velux windows with insulation, breathable membrane and new battens',
    afterImage: '/images/jpd/proj_9.jpg',
    afterLabel: 'Stage 2: Tiled, Flashed & Weatherproofed',
    afterAlt: 'Completed roof tiles and flashing around the twin Velux windows and chimney',
    workSummary:
      'Full structural preparation beneath the tiles—inspecting exposed rafters, upgrading loft insulation, laying high-tensile breathable underlay, fixing graded treated timber battens and interlocking dry verge—followed by the completed tiled and flashed roof.',
    isMatchedJpdProject: true,
  },
  {
    id: 'profiled-commercial-reroof',
    title: 'Large-Span Profiled Roof & Box Gutter Replacement',
    subtitle: 'Membrane & batten preparation over aged sheeting vs completed profiled metal roof',
    category: 'Flat & Profiled Roofs',
    beforeImage: '/images/jpd/proj_13.jpg',
    beforeLabel: 'Stage 1: Breathable Underlay & Batten Grid',
    beforeAlt: 'Installing breathable membranes and timber battens on a large commercial roof',
    afterImage: '/images/jpd/proj_12.jpg',
    afterLabel: 'Stage 2: New Profiled Sheet Roof & Box Guttering',
    afterAlt: 'Completed profiled metal sheet roof and industrial guttering',
    workSummary:
      'Complete refurbishment of a weathered commercial roof from breathable underlay and batten grid installation through to the finished profiled cladding and high-capacity valley guttering.',
    isMatchedJpdProject: true,
  },
  {
    id: 'lancashire-terraced-slate',
    title: 'East Lancashire Terraced Slate Roof Renewal',
    subtitle: 'Weathered original slate courses vs newly installed smooth slate & dry-ridge system',
    category: 'Slate & Tile Roofing',
    beforeImage: '/images/jpd/upright_4.jpeg',
    beforeLabel: 'Before: Weathered Slate & Ageing Mortar',
    beforeAlt: 'Weathered terraced slate roof between brick chimneys prior to re-slating',
    afterImage: '/images/jpd/proj_20.jpg',
    afterLabel: 'After: New Slate Courses & Repointed Chimney',
    afterAlt: 'Completed terraced slate re-roof with crisp slate courses and repointed brick chimney',
    workSummary:
      'Transforming an ageing East Lancashire terraced slate roof into a weatherproof, uniform natural slate roof with dressed chimney leadwork, repointed brickwork and a mechanically fixed ridge.',
    isMatchedJpdProject: true,
  },
];

export const SERVICE_AREAS: ServiceAreaLocation[] = [
  {
    name: 'Accrington & Hyndburn',
    postcodePrefix: 'BB5',
    role: 'Primary Base',
    summary:
      'Based at Wordsworth Road in Accrington (BB5 0LU), we provide rapid local assessments for terraced slate re-roofs, bay window roofs, chimney repointing and urgent leak repairs across Oswaldtwistle, Church, Huncoat, Clayton-le-Moors, Rishton and Great Harwood.',
    popularServices: ['Roofers Accrington', 'Slate Re-Roofs BB5', 'Guttering Repairs Accrington', 'Chimney Repointing'],
  },
  {
    name: 'Blackburn & Darwen',
    postcodePrefix: 'BB1 – BB3',
    role: 'Core Service Area',
    summary:
      'Comprehensive pitched roof replacements, EPDM/GRP flat roofs, storm damage repairs and uPVC fascias, soffits and guttering for residential and commercial properties throughout Blackburn and Darwen.',
    popularServices: ['Roof Repairs Blackburn', 'New Roofs Blackburn', 'Flat Roofing BB1/BB2', 'Roofline Replacements'],
  },
  {
    name: 'Ribble Valley & Clitheroe',
    postcodePrefix: 'BB6 – BB7',
    role: 'Core Service Area',
    summary:
      'Sympathetic natural slate and stone-built chimney roofing work across Clitheroe, Whalley, Billington, Langho and surrounding Ribble Valley villages.',
    popularServices: ['Natural Slate Roofing', 'Chimney Leadwork & Pointing', 'Velux Skylight Installations'],
  },
  {
    name: 'Burnley, Padiham & Pendle',
    postcodePrefix: 'BB8 – BB12',
    role: 'Core Service Area',
    summary:
      'Full re-roofing, dry-ridge and dry-verge upgrades, valley renewals and storm damage repairs across Burnley, Padiham, Nelson, Barrowford and Colne.',
    popularServices: ['Full Roof Replacement', 'Emergency Roof Repairs Lancashire', 'Dry Ridge & Verge Upgrades'],
  },
  {
    name: 'Rossendale & Bury North',
    postcodePrefix: 'BB4 · BL0 · BL8',
    role: 'Core Service Area',
    summary:
      'Weather-resilient roofing installations, high-wind ridge security, lead flashing and flat roof replacements for exposed hillside properties across Haslingden, Rawtenstall, Bacup and Ramsbottom.',
    popularServices: ['Storm Damage Repairs', 'Lead Flashing & Valleys', 'GRP & EPDM Flat Roofs'],
  },
  {
    name: 'Rochdale, Todmorden & Wigan',
    postcodePrefix: 'OL11 – OL16 · WN1 – WN6',
    role: 'North West Coverage',
    summary:
      'Extending across Rochdale, Littleborough, Todmorden and Wigan for full roof replacements, commercial roofing, flat roofs and complete roofline transformations.',
    popularServices: ['Full Re-Roofs', 'Flat Roof Installations', 'Fascias, Soffits & Guttering'],
  },
];
