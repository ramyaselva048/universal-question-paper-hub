import { QuestionPaper, Category } from '../types';

/**
 * 5 Standard Categories for the 12 Demo Sample Papers
 */
export const DEMO_CATEGORIES: Category[] = [
  {
    id: 'cat-school-exams',
    name: 'School Exams',
    description: 'Secondary and higher secondary board examinations, standard syllabus assessments, and foundational subjects.',
    createdAt: '2024-01-15T00:00:00.000Z',
  },
  {
    id: 'cat-college-exams',
    name: 'College Exams',
    description: 'Undergraduate and postgraduate university semester examination papers across engineering, sciences, commerce, and arts.',
    createdAt: '2024-01-15T00:00:00.000Z',
  },
  {
    id: 'cat-government-exams',
    name: 'Government Exams',
    description: 'Civil services, public administration, staff selection commission (SSC), and public sector recruitment examination practice papers.',
    createdAt: '2024-01-15T00:00:00.000Z',
  },
  {
    id: 'cat-competitive-exams',
    name: 'Competitive Exams',
    description: 'Graduate aptitude tests (GATE), national talent search examinations (NTSE), and professional competitive assessments.',
    createdAt: '2024-01-15T00:00:00.000Z',
  },
  {
    id: 'cat-entrance-exams',
    name: 'Entrance Exams',
    description: 'National and state level entrance examinations for engineering (JEE), medicine (NEET), and premier university admissions.',
    createdAt: '2024-01-15T00:00:00.000Z',
  },
];

/**
 * Exactly 12 Realistic Demo Sample Question Papers
 * - 3 School Exams
 * - 3 College Exams
 * - 2 Government Exams
 * - 2 Competitive Exams
 * - 2 Entrance Exams
 *
 * All papers are explicitly marked as isDemo: true and contain complete realistic
 * questions and answer keys.
 */
export const DEMO_PAPERS: QuestionPaper[] = [
  // =========================================================================
  // CATEGORY 1: SCHOOL EXAMS (3 Papers)
  // =========================================================================
  {
    id: 'demo-school-cbse-math-10',
    title: 'Class 10 CBSE Board Examination - Mathematics (Standard)',
    category: 'School Exams',
    year: 2024,
    description: 'Secondary school board model examination covering Real Numbers, Quadratic Equations, Trigonometric Identities, and Statistics with detailed scoring rubric.',
    fileName: 'DEMO_CBSE_Class10_Mathematics_2024.pdf',
    fileSize: 1420000,
    fileUrl: '',
    downloadCount: 3,
    viewCount: 14,
    uploadedAt: '2024-03-10T10:30:00.000Z',
    updatedAt: '2024-03-10T10:30:00.000Z',
    uploadedBy: 'demo_seed',
    tags: ['Class 10', 'CBSE', 'Mathematics', 'Board Exam', 'Standard Math'],
    isDemo: true,
    hasAnswerKey: true,
    timeAllowed: '3 Hours',
    maxMarks: 80,
    generalInstructions: [
      'This question paper contains 38 questions divided into 5 Sections: A, B, C, D, and E.',
      'Section A comprises 20 Multiple Choice Questions (MCQs) of 1 mark each.',
      'Section B comprises 5 Very Short Answer (VSA) questions of 2 marks each.',
      'Section C comprises 6 Short Answer (SA) questions of 3 marks each.',
      'Section D comprises 4 Long Answer (LA) questions of 5 marks each.',
      'Section E comprises 3 Case-Based Integrated Units of Assessment of 4 marks each with sub-parts.',
      'All Questions are compulsory. However, internal choices are provided in 2 questions of 2 marks, 2 questions of 3 marks, and 2 questions of 5 marks.',
    ],
    sections: [
      {
        title: 'SECTION A — OBJECTIVE TYPE QUESTIONS (1 Mark Each)',
        marks: 20,
        questions: [
          {
            questionNumber: '1',
            text: 'If two positive integers a and b are expressible in the form a = x³y² and b = xy³, where x and y are prime numbers, then HCF(a, b) is equal to:',
            marks: 1,
            options: ['(A) xy', '(B) xy²', '(C) x³y³', '(D) x²y²'],
            answerKey: '(B) xy²',
            explanation: 'HCF is the product of the smallest power of each common prime factor: x¹ · y² = xy².',
          },
          {
            questionNumber: '2',
            text: 'The discriminant of the quadratic equation 2x² - 4x + 3 = 0 is:',
            marks: 1,
            options: ['(A) -8', '(B) 10', '(C) -16', '(D) 8'],
            answerKey: '(A) -8',
            explanation: 'D = b² - 4ac = (-4)² - 4(2)(3) = 16 - 24 = -8. Since D < 0, roots are non-real complex conjugates.',
          },
          {
            questionNumber: '3',
            text: 'If sin θ + cos θ = √2 cos θ, then the value of (cos θ - sin θ) is:',
            marks: 1,
            options: ['(A) √2 sin θ', '(B) √2 cos θ', '(C) 2 sin θ', '(D) sin θ'],
            answerKey: '(A) √2 sin θ',
            explanation: 'Squaring and using cos² θ + sin² θ = 1 gives (cos θ - sin θ)² = 2 sin² θ, hence cos θ - sin θ = √2 sin θ.',
          },
          {
            questionNumber: '4',
            text: 'The distance between the points (a cos θ + b sin θ, 0) and (0, a sin θ - b cos θ) is:',
            marks: 1,
            options: ['(A) a² + b²', '(B) √(a² + b²)', '(C) a + b', '(D) a² - b²'],
            answerKey: '(B) √(a² + b²)',
            explanation: 'Distance d = √[(a cos θ + b sin θ)² + (a sin θ - b cos θ)²] = √[a²(cos² θ + sin² θ) + b²(sin² θ + cos² θ)] = √(a² + b²).',
          },
        ],
      },
      {
        title: 'SECTION B — SHORT ANSWER TYPE I (2 Marks Each)',
        marks: 10,
        questions: [
          {
            questionNumber: '5',
            text: 'Prove that 3 + 2√5 is an irrational number, given that √5 is known to be irrational.',
            marks: 2,
            answerKey: 'Contradiction proof showing (p - 3q)/(2q) = √5 leads to a rational equating to an irrational.',
            explanation: 'Let 3 + 2√5 = p/q (co-prime integers, q ≠ 0). Then 2√5 = p/q - 3 = (p - 3q)/q => √5 = (p - 3q)/(2q). Since p, q are integers, (p - 3q)/(2q) is rational, which contradicts the fact that √5 is irrational. Hence, 3 + 2√5 is irrational.',
          },
          {
            questionNumber: '6',
            text: 'Find the 20th term from the end of the Arithmetic Progression: 3, 8, 13, ..., 253.',
            marks: 2,
            answerKey: '158',
            explanation: 'Common difference d = 5. Reverse the AP: a = 253, d = -5. The 20th term = a + 19d = 253 + 19(-5) = 253 - 95 = 158.',
          },
        ],
      },
      {
        title: 'SECTION C — SHORT ANSWER TYPE II (3 Marks Each)',
        marks: 18,
        questions: [
          {
            questionNumber: '7',
            text: 'In a circle of radius 21 cm, an arc subtends an angle of 60° at the centre. Find: (i) the length of the arc, and (ii) the area of the sector formed by the arc. (Use π = 22/7)',
            marks: 3,
            answerKey: '(i) 22 cm, (ii) 231 cm²',
            explanation: '(i) Length of arc = (θ/360°) × 2πr = (60/360) × 2 × (22/7) × 21 = (1/6) × 132 = 22 cm. (ii) Area of sector = (θ/360°) × πr² = (1/6) × (22/7) × 21 × 21 = 231 cm².',
          },
          {
            questionNumber: '8',
            text: 'Prove the trigonometric identity: (sin θ - 2 sin³ θ) / (2 cos³ θ - cos θ) = tan θ.',
            marks: 3,
            answerKey: 'Proof verified using cos 2θ or 1 - 2sin²θ = 2cos²θ - 1 identity.',
            explanation: 'LHS = [sin θ (1 - 2 sin² θ)] / [cos θ (2 cos² θ - 1)]. Since 1 - 2 sin² θ = cos 2θ and 2 cos² θ - 1 = cos 2θ, the numerator and denominator brackets cancel out: sin θ / cos θ = tan θ = RHS.',
          },
        ],
      },
      {
        title: 'SECTION D — LONG ANSWER & MARKING KEY (5 Marks Each)',
        marks: 20,
        questions: [
          {
            questionNumber: '9',
            text: 'A straight highway leads to the foot of a 60m tower. A surveyor standing at the top observes a car at an angle of depression of 30°, which is approaching the foot of the tower at a uniform speed. Six seconds later, the angle of depression becomes 60°. Find the time taken by the car to reach the foot of the tower from this point.',
            marks: 5,
            answerKey: 'Time required = 3 seconds (Total time from first point = 9 seconds).',
            explanation: 'Let tower height h = 60m. Initially, distance x1 = h cot 30° = 60√3 m. Later, distance x2 = h cot 60° = 60/√3 = 20√3 m. Distance covered in 6 seconds = x1 - x2 = 40√3 m. Speed v = (40√3)/6 = (20√3)/3 m/s. Remaining distance x2 = 20√3 m. Time t = x2 / v = (20√3) / ((20√3)/3) = 3 seconds.',
          },
        ],
      },
    ],
  },
  {
    id: 'demo-school-hsc-physics-12',
    title: 'Class 12 Higher Secondary - Physics Theory & Electromagnetism',
    category: 'School Exams',
    year: 2023,
    description: 'Higher secondary school certificate physics exam featuring Electrostatics, Magnetic Effects of Current, Wave Optics, and Semiconductor Physics with complete answers.',
    fileName: 'DEMO_HSC_Class12_Physics_Theory_2023.pdf',
    fileSize: 1580000,
    fileUrl: '',
    downloadCount: 2,
    viewCount: 11,
    uploadedAt: '2023-11-20T09:15:00.000Z',
    updatedAt: '2023-11-20T09:15:00.000Z',
    uploadedBy: 'demo_seed',
    tags: ['Class 12', 'HSC', 'Physics', 'Board Exam', 'Electromagnetism'],
    isDemo: true,
    hasAnswerKey: true,
    timeAllowed: '3 Hours',
    maxMarks: 70,
    generalInstructions: [
      'All questions are compulsory. There are 35 questions in total.',
      'Section A contains 16 questions: 12 MCQs and 4 Assertion-Reasoning questions of 1 mark each.',
      'Section B contains 5 questions of 2 marks each.',
      'Section C contains 7 questions of 3 marks each.',
      'Section D contains 2 case study-based questions of 4 marks each.',
      'Section E contains 3 long answer questions of 5 marks each.',
      'Values of physical constants: c = 3 × 10⁸ m/s, h = 6.63 × 10⁻³⁴ J·s, e = 1.6 × 10⁻¹⁹ C, ε₀ = 8.854 × 10⁻¹² C²N⁻¹m⁻².',
    ],
    sections: [
      {
        title: 'SECTION A — OBJECTIVE & REASONING (1 Mark Each)',
        marks: 16,
        questions: [
          {
            questionNumber: '1',
            text: 'An electric dipole of dipole moment p is placed in a uniform electric field E. The torque experienced by the dipole is given by:',
            marks: 1,
            options: ['(A) p · E', '(B) p × E', '(C) zero', '(D) -p · E'],
            answerKey: '(B) p × E',
            explanation: 'The torque τ on an electric dipole in an external electric field is vector product τ = p × E.',
          },
          {
            questionNumber: '2',
            text: 'What is the de Broglie wavelength associated with an electron accelerated through an electric potential difference of 100 V?',
            marks: 1,
            options: ['(A) 0.123 nm', '(B) 1.23 nm', '(C) 12.3 nm', '(D) 0.012 nm'],
            answerKey: '(A) 0.123 nm',
            explanation: 'λ = 1.227 / √V nm = 1.227 / √100 = 1.227 / 10 = 0.1227 nm ≈ 0.123 nm.',
          },
          {
            questionNumber: '3',
            text: 'A circular coil of radius 10 cm and 100 turns carries a current of 3.2 A. The magnetic field at the centre of the coil is:',
            marks: 1,
            options: ['(A) 2.01 × 10⁻³ T', '(B) 4.02 × 10⁻⁴ T', '(C) 1.01 × 10⁻² T', '(D) 2.01 × 10⁻⁵ T'],
            answerKey: '(A) 2.01 × 10⁻³ T',
            explanation: 'B = (μ₀ N I) / (2R) = (4π × 10⁻⁷ × 100 × 3.2) / (2 × 0.1) = 2.01 × 10⁻³ T.',
          },
        ],
      },
      {
        title: 'SECTION B — CONCEPTUAL DERIVATIONS (2 Marks Each)',
        marks: 10,
        questions: [
          {
            questionNumber: '4',
            text: 'State Gauss’s law in electrostatics. Apply it to show that the electric field inside a uniformly charged conducting spherical shell is zero.',
            marks: 2,
            answerKey: 'Closed surface integral ∮ E · dA = q_enclosed / ε₀. Since inside shell q_enclosed = 0, E = 0.',
            explanation: 'Gauss’s Law states that total electric flux through a closed Gaussian surface is equal to 1/ε₀ times net charge enclosed. For r < R, Gaussian surface encloses no free charge (q = 0), therefore ∮ E · dA = 0 => E = 0 everywhere inside.',
          },
          {
            questionNumber: '5',
            text: 'Distinguish between intrinsic and extrinsic semiconductors. Why does the electrical conductivity of a semiconductor increase with temperature?',
            marks: 2,
            answerKey: 'Intrinsic is pure; extrinsic is doped (n-type/p-type). Higher T breaks covalent bonds releasing electron-hole pairs.',
            explanation: 'Intrinsic semiconductors are chemically pure (e.g., pure Si, Ge). Extrinsic semiconductors are doped with trivalent or pentavalent impurities to tailor carrier density. As temperature increases, thermal energy excites valence electrons across the bandgap Eg into the conduction band, increasing carrier concentration n exponentially.',
          },
        ],
      },
      {
        title: 'SECTION C & E — LONG ANSWERS & FULL SOLUTION KEYS',
        marks: 25,
        questions: [
          {
            questionNumber: '6',
            text: 'Using Huygens’ wave theory, derive the laws of reflection of a plane wave at a plane reflecting surface. Draw the associated wavefront diagrams.',
            marks: 5,
            answerKey: 'Demonstrated congruence of triangles showing angle of incidence i equals angle of reflection r.',
            explanation: 'Consider a plane wavefront incident at angle i on a plane mirror. In time t, secondary wavelets from point A reach B’ while point B reaches A’. The triangles formed share the hypotenuse and have equal radii v·t. By RHS congruence, angle of incidence i = angle of reflection r, and incident ray, normal, and reflected ray lie in the same plane.',
          },
        ],
      },
    ],
  },
  {
    id: 'demo-school-icse-english-10',
    title: 'ICSE Class 10 Literature in English & Language Comprehensive',
    category: 'School Exams',
    year: 2024,
    description: 'Secondary school English model examination covering Shakespearean drama (The Merchant of Venice), poetry analysis, prose interpretation, and functional grammar with answer keys.',
    fileName: 'DEMO_ICSE_Class10_English_Comprehensive_2024.pdf',
    fileSize: 1190000,
    fileUrl: '',
    downloadCount: 1,
    viewCount: 8,
    uploadedAt: '2024-02-18T11:45:00.000Z',
    updatedAt: '2024-02-18T11:45:00.000Z',
    uploadedBy: 'demo_seed',
    tags: ['Class 10', 'ICSE', 'English Literature', 'Grammar', 'Secondary School'],
    isDemo: true,
    hasAnswerKey: true,
    timeAllowed: '2.5 Hours',
    maxMarks: 80,
    generalInstructions: [
      'Answers to this paper must be written on the paper provided separately.',
      'You are not allowed to write during the first 15 minutes. This time is to be spent in reading the question paper.',
      'The paper is divided into two sections: Section A (Language Skills - 40 Marks) and Section B (Literature Texts - 40 Marks).',
      'Attempt all questions from Section A and four selected questions from Section B.',
    ],
    sections: [
      {
        title: 'SECTION A — LANGUAGE MECHANICS & COMPREHENSION',
        marks: 40,
        questions: [
          {
            questionNumber: '1',
            text: 'Rewrite the following sentence according to the instructions given: "As soon as the bell rang, the students rushed to the playground." (Begin: No sooner...)',
            marks: 2,
            answerKey: 'No sooner did the bell ring than the students rushed to the playground.',
            explanation: 'Standard correlative conjunction "No sooner... than" inverted syntax requires the auxiliary "did" followed by the base verb "ring".',
          },
          {
            questionNumber: '2',
            text: 'Change into Indirect Speech: She said to him, "Please explain this concept before the examination tomorrow."',
            marks: 2,
            answerKey: 'She requested him to explain that concept before the examination the next day.',
            explanation: 'Imperative sentence with "please" changes reporting verb to "requested", "this" converts to "that", and "tomorrow" converts to "the next day".',
          },
        ],
      },
      {
        title: 'SECTION B — LITERATURE IN ENGLISH & DRAMATIC ANALYSIS',
        marks: 40,
        questions: [
          {
            questionNumber: '3',
            text: 'Refer to Portia’s speech on the "Quality of Mercy" in The Merchant of Venice (Act IV, Scene 1): How does Portia establish mercy as an attribute superior to temporal power and justice? Discuss Shylock’s reaction to her appeal.',
            marks: 10,
            answerKey: 'Portia emphasizes mercy drops as gentle rain from heaven, twice blest. Shylock insists upon the bond, leading to his legal trap.',
            explanation: 'Portia contrasts the monarch’s earthly crown and sceptre (temporal force) with mercy that resides in the hearts of kings as an attribute to God himself. She argues that earthly power shows likest God’s when mercy seasons justice. Shylock, blinded by retribution, demands the strict letter of the law, sealing his undoing when Portia invokes Venetian statute prohibiting shedding Christian blood.',
          },
        ],
      },
    ],
  },

  // =========================================================================
  // CATEGORY 2: COLLEGE EXAMS (3 Papers)
  // =========================================================================
  {
    id: 'demo-college-btech-cs-dsa',
    title: 'B.Tech Computer Science Sem IV - Data Structures & Algorithms',
    category: 'College Exams',
    year: 2024,
    description: 'Undergraduate engineering university semester examination covering AVL Tree rotations, Graph algorithms (Dijkstra, Floyd-Warshall), Dynamic Programming, and complexity analysis.',
    fileName: 'DEMO_BTech_CS_DataStructures_Algorithms_2024.pdf',
    fileSize: 1650000,
    fileUrl: '',
    downloadCount: 3,
    viewCount: 16,
    uploadedAt: '2024-05-14T14:00:00.000Z',
    updatedAt: '2024-05-14T14:00:00.000Z',
    uploadedBy: 'demo_seed',
    tags: ['B.Tech', 'Computer Science', 'Data Structures', 'Algorithms', 'University Exam'],
    isDemo: true,
    hasAnswerKey: true,
    timeAllowed: '3 Hours',
    maxMarks: 100,
    generalInstructions: [
      'Answer any FIVE full questions, choosing at least ONE question from each of the 4 Modules.',
      'Assume suitable standard missing data and specify assumptions clearly.',
      'All algorithm representations should include asymptotic time and space complexity in Big-O notation.',
      'Illustrate answers with neat schematic flow diagrams and tree diagrams wherever applicable.',
    ],
    sections: [
      {
        title: 'MODULE I — BALANCED SEARCH TREES & HEAPS',
        marks: 25,
        questions: [
          {
            questionNumber: '1(a)',
            text: 'Define the Balance Factor in an AVL Tree. Show the step-by-step rebalancing operations (specifying rotation types: LL, RR, LR, RL) when inserting the keys: [14, 17, 11, 7, 53, 4, 13] into an initially empty AVL tree.',
            marks: 12,
            answerKey: 'Tree constructed with balance factors between -1 and +1. Insertion of 4 causes Right rotation (LL) at node 7.',
            explanation: 'Balance Factor BF = height(left_subtree) - height(right_subtree). Permissible values are {-1, 0, +1}. Upon inserting 4, node 7 has BF = +2 with left child 4 (BF = +1), requiring an LL Single Right Rotation around 7. Final root is 14 with left subtree rooted at 11 and right subtree rooted at 17.',
          },
          {
            questionNumber: '1(b)',
            text: 'Construct a Min-Heap from the unsorted array [45, 12, 85, 32, 89, 39, 69, 44, 42, 1, 80]. Show the Build-Heap procedure and explain why Build-Heap runs in O(N) time rather than O(N log N).',
            marks: 13,
            answerKey: 'Min-Heap satisfies A[parent] <= A[child]. Sum of heights Σ (h/2^h) converges to 2, proving linear O(N) build time.',
            explanation: 'In bottom-up heapification, we iterate from index ⌊n/2⌋ down to 1. Nodes at height h take O(h) work. Number of nodes at height h is at most ⌈n / 2^(h+1)⌉. Total cost T(n) = Σ_{h=1}^{log n} ⌈n/2^(h+1)⌉ · O(h) = O(n Σ h/2^h) = O(2n) = O(n).',
          },
        ],
      },
      {
        title: 'MODULE II — GRAPH ALGORITHMS & SHORTEST PATHS',
        marks: 25,
        questions: [
          {
            questionNumber: '2',
            text: 'Differentiate between Kruskal’s and Prim’s Minimum Spanning Tree algorithms. Explain the implementation of Disjoint Set Union (DSU) with Path Compression and Union by Rank used in Kruskal’s algorithm. State its overall complexity.',
            marks: 15,
            answerKey: 'Prim grows a single component from a seed vertex; Kruskal adds minimum weight global edges checking cycles with DSU. Time: O(E log E) or O(E log V).',
            explanation: 'Kruskal sorts all edges and employs Disjoint Set Union. With Path Compression (find_set(v) flattens pointers) and Union by Rank (attaching smaller tree under deeper root), each find/union operation executes in nearly constant inverse Ackermann time α(V). Overall runtime is dominated by edge sorting: O(E log E).',
          },
        ],
      },
      {
        title: 'MODULE III & IV — DYNAMIC PROGRAMMING & COMPLETE SOLUTIONS',
        marks: 50,
        questions: [
          {
            questionNumber: '3',
            text: 'Formulate the 0/1 Knapsack problem using Dynamic Programming. Trace the DP table for items with weights = [2, 3, 4, 5] and values = [3, 4, 5, 6] with maximum knapsack capacity W = 8. Identify the optimal subset of selected items and maximum profit.',
            marks: 20,
            answerKey: 'Maximum Profit = 10 (Selected items: Item 1 of wt 2, val 3 and Item 4 of wt 5, val 6 + Item 2/3 variants or Item 2+3+1 = 12 total wt cap 8 gives max value 10).',
            explanation: 'DP state: dp[i][w] = max profit considering first i items with remaining capacity w. Recurrence: if w_i <= w, dp[i][w] = max(dp[i-1][w], dp[i-1][w - w_i] + v_i); else dp[i][w] = dp[i-1][w]. By backtracking from dp[4][8] = 10, the optimal item combination is identified.',
          },
        ],
      },
    ],
  },
  {
    id: 'demo-college-btech-mech-fluid-thermo',
    title: 'B.Tech Mechanical Engineering Sem V - Fluid Mechanics & Thermodynamics',
    category: 'College Exams',
    year: 2023,
    description: 'Mechanical engineering degree semester examination covering Navier-Stokes equations, Bernoulli energy conservation, Rankine power cycles, and heat exchanger LMTD calculations.',
    fileName: 'DEMO_BTech_Mech_FluidThermodynamics_2023.pdf',
    fileSize: 1520000,
    fileUrl: '',
    downloadCount: 2,
    viewCount: 10,
    uploadedAt: '2023-12-05T13:30:00.000Z',
    updatedAt: '2023-12-05T13:30:00.000Z',
    uploadedBy: 'demo_seed',
    tags: ['B.Tech', 'Mechanical Engineering', 'Fluid Mechanics', 'Thermodynamics', 'Rankine Cycle'],
    isDemo: true,
    hasAnswerKey: true,
    timeAllowed: '3 Hours',
    maxMarks: 100,
    generalInstructions: [
      'Use of standard Thermodynamic Steam Tables and Mollier Charts is strictly permitted.',
      'Answer any 5 full questions, selecting at least one from each section.',
      'Draw neat schematic sketches showing thermodynamic state diagrams (T-s, P-h, P-v) where required.',
    ],
    sections: [
      {
        title: 'PART A — FLUID STATICS & HYDRODYNAMICS',
        marks: 50,
        questions: [
          {
            questionNumber: '1',
            text: 'Derive Euler’s equation of motion along a streamline. Integrate Euler’s equation to obtain Bernoulli’s equation, and state four physical assumptions required for validity.',
            marks: 14,
            answerKey: 'dp/ρ + v dv + g dz = 0 => P/ρ + v²/2 + gz = Constant. Assumptions: Incompressible, inviscid, steady, along streamline.',
            explanation: 'Considering an infinitesimal cylindrical fluid element of length ds and cross-section dA along a streamline, balance pressure forces (P dA - (P + dP)dA), gravity component (-ρ g dA ds cos θ), and inertial force (ρ dA ds a_s). Simplifying yields dp/ρ + v dv + g dz = 0. Integrating along streamline for constant density ρ yields Bernoulli’s equation: P/ρg + v²/(2g) + z = H (constant total head).',
          },
          {
            questionNumber: '2',
            text: 'Explain boundary layer separation over an aerodynamic airfoil. What causes adverse pressure gradients (dp/dx > 0), and how do vortex generators mitigate separation?',
            marks: 12,
            answerKey: 'Adverse pressure gradient causes fluid velocity near wall to reverse (∂u/∂y = 0 at separation point). Vortex generators energize boundary layer.',
            explanation: 'As fluid flows past the maximum thickness of a curved surface, it decelerates, causing a positive pressure gradient dp/dx > 0. Viscous shear retards near-wall fluid. When kinetic energy is insufficient to overcome adverse pressure, near-wall flow stops and reverses direction, causing the boundary layer to detach. Vortex generators introduce high-momentum freestream fluid into the near-wall layer.',
          },
        ],
      },
      {
        title: 'PART B — THERMODYNAMIC CYCLES & ANSWER KEY',
        marks: 50,
        questions: [
          {
            questionNumber: '3',
            text: 'A steam turbine power plant operates on an ideal reheat Rankine cycle between pressures of 80 bar and 0.08 bar. Steam leaves the boiler superheated to 480°C. After expansion to 10 bar, it is reheated to 480°C before entering the low-pressure turbine. Determine: (i) Net work output per kg of steam, (ii) Thermal efficiency of the cycle, and (iii) Steam consumption rate.',
            marks: 24,
            answerKey: '(i) W_net = 1420 kJ/kg, (ii) η_th = 41.2%, (iii) Specific steam consumption = 2.53 kg/kWh.',
            explanation: 'Enthalpies determined from steam tables: h1 (at 80 bar, 480°C) = 3348 kJ/kg, s1 = 6.658 kJ/kg·K. Isentropic expansion to 10 bar gives h2 = 2820 kJ/kg. Reheating to 480°C at 10 bar gives h3 = 3426 kJ/kg. Second expansion to 0.08 bar gives h4 = 2334 kJ/kg. Pump work W_p = v_f (P_boiler - P_condenser) = 0.001008 × (8000 - 8) = 8.05 kJ/kg. W_turbine = (h1 - h2) + (h3 - h4) = 528 + 1092 = 1620 kJ/kg. W_net = 1620 - 8.05 ≈ 1612 kJ/kg. Heat input Q_in = (h1 - h_f4) + (h3 - h2) = (3348 - 173) + (3426 - 2820) = 3781 kJ/kg. Thermal efficiency η = 1612 / 3781 = 42.6%.',
          },
        ],
      },
    ],
  },
  {
    id: 'demo-college-bcom-corporate-accounting',
    title: 'B.Com / BBA Semester III - Corporate Financial Accounting',
    category: 'College Exams',
    year: 2024,
    description: 'University commerce semester examination covering Cash Flow Statements (AS-3), Forfeiture and Reissue of Shares, Goodwill valuation, and Working Capital Ratios with ledger solutions.',
    fileName: 'DEMO_BCom_Corporate_Accounting_2024.pdf',
    fileSize: 1380000,
    fileUrl: '',
    downloadCount: 1,
    viewCount: 7,
    uploadedAt: '2024-04-12T10:00:00.000Z',
    updatedAt: '2024-04-12T10:00:00.000Z',
    uploadedBy: 'demo_seed',
    tags: ['B.Com', 'BBA', 'Corporate Accounting', 'Finance', 'Commerce'],
    isDemo: true,
    hasAnswerKey: true,
    timeAllowed: '3 Hours',
    maxMarks: 80,
    generalInstructions: [
      'Question 1 in Section A is compulsory. Attempt any 4 questions from Section B.',
      'Working notes must form part of the respective answers.',
      'State all assumptions clearly regarding taxation and proposed dividends.',
    ],
    sections: [
      {
        title: 'SECTION A — COMPULSORY ACCOUNTING PRINCIPLES',
        marks: 20,
        questions: [
          {
            questionNumber: '1',
            text: 'As per Accounting Standard 3 (AS-3 / Ind AS 7), classify each of the following cash transactions into Operating, Investing, or Financing Activities: (a) Proceeds from issuance of 9% Debentures, (b) Purchase of Patent rights, (c) Cash dividend received on long-term equity holdings, (d) Payment of income tax liability.',
            marks: 8,
            answerKey: '(a) Financing, (b) Investing, (c) Investing (for non-financial enterprise), (d) Operating.',
            explanation: 'Issuing debentures provides long-term capital (Financing). Purchasing intangible fixed assets is an acquisition of long-term resource (Investing). Dividend received from non-operating investments represents returns on capital deployed (Investing). Income taxes generally relate to operating profits and are classified under Operating activities unless specifically associated with investing/financing.',
          },
        ],
      },
      {
        title: 'SECTION B — SHARE FORFEITURE & RATIO ANALYSIS',
        marks: 60,
        questions: [
          {
            questionNumber: '2',
            text: 'Apex Global Ltd. forfeited 500 equity shares of $10 each fully called up, issued at a premium of $2 per share, for non-payment of allotment money of $5 per share (including premium) and first & final call of $3 per share. Out of these, 300 shares were reissued as fully paid up for $8 per share. Pass necessary Journal Entries in the books of the company.',
            marks: 15,
            answerKey: 'Share Capital A/c Dr $5,000, Securities Premium Dr $1,000 to Share Allotment $2,500, to Share Call $1,500, to Forfeited Shares $2,000. Capital Reserve transfer = $600.',
            explanation: 'Application money received was $4 ($10 + $2 - $5 - $3 = $4). On reissue of 300 shares at $8 ($2 discount): Bank Dr $2,400, Forfeited Shares A/c Dr $600 to Share Capital $3,000. Amount available in Forfeited Shares for 300 shares = 300 × $4 = $1,200. Less discount utilized $600 = Transfer to Capital Reserve $600.',
          },
        ],
      },
    ],
  },

  // =========================================================================
  // CATEGORY 3: GOVERNMENT EXAMS (2 Papers)
  // =========================================================================
  {
    id: 'demo-govt-upsc-prelims-gs1',
    title: 'UPSC Civil Services Preliminary - General Studies Paper I',
    category: 'Government Exams',
    year: 2024,
    description: 'National civil services preliminary examination practice paper covering Indian Polity & Constitution, Macroeconomics, Environmental Ecology, Modern History, and Geography with explanatory keys.',
    fileName: 'DEMO_UPSC_Prelims_GS1_Model_2024.pdf',
    fileSize: 1750000,
    fileUrl: '',
    downloadCount: 3,
    viewCount: 19,
    uploadedAt: '2024-05-02T08:00:00.000Z',
    updatedAt: '2024-05-02T08:00:00.000Z',
    uploadedBy: 'demo_seed',
    tags: ['UPSC', 'Civil Services', 'IAS', 'Prelims', 'General Studies'],
    isDemo: true,
    hasAnswerKey: true,
    timeAllowed: '2 Hours',
    maxMarks: 200,
    generalInstructions: [
      'This question paper contains 100 objective multiple-choice questions.',
      'Each question carries 2 marks. There will be negative marking of 1/3rd (0.66 marks) for each wrong answer.',
      'Candidate must select only ONE answer for each question.',
      'Read all statements carefully before arriving at the conclusion.',
    ],
    sections: [
      {
        title: 'PART I — INDIAN POLITY, CONSTITUTION & GOVERNANCE',
        marks: 80,
        questions: [
          {
            questionNumber: '1',
            text: 'With reference to the Writ of Mandamus in the Indian Constitutional framework, consider the following statements:\n1. It can be issued against a private individual or body to enforce a private right.\n2. It cannot be issued against the President of India or State Governors for exercise and performance of official duties.\n3. A petition for Mandamus can be filed only by a person whose legal right has been directly infringed.\nWhich of the statements given above is/are correct?',
            marks: 2,
            options: ['(A) 1 and 2 only', '(B) 2 and 3 only', '(C) 2 only', '(D) 1, 2 and 3'],
            answerKey: '(B) 2 and 3 only',
            explanation: 'Statement 1 is incorrect: Mandamus lies only against a public authority, statutory body, or tribunal performing a public duty, not purely private bodies. Statement 2 is correct under Article 361 immunity. Statement 3 is correct: Locus standi requires an existing legal right of the petitioner.',
          },
          {
            questionNumber: '2',
            text: 'Which one of the following Constitutional Amendments inserted Article 51A(k) into the Constitution of India, making it a Fundamental Duty of parents/guardians to provide educational opportunities to their child between 6 and 14 years of age?',
            marks: 2,
            options: ['(A) 42nd Amendment Act, 1976', '(B) 44th Amendment Act, 1978', '(C) 86th Amendment Act, 2002', '(D) 91st Amendment Act, 2003'],
            answerKey: '(C) 86th Amendment Act, 2002',
            explanation: 'The 86th Constitutional Amendment Act, 2002 inserted Article 21A (Right to Education as Fundamental Right) and added clause (k) to Article 51A (Fundamental Duties).',
          },
        ],
      },
      {
        title: 'PART II — ECONOMICS, ECOLOGY & ENVIRONMENT WITH ANSWER KEYS',
        marks: 120,
        questions: [
          {
            questionNumber: '3',
            text: 'In the context of the Indian economy, what does the term "Core Inflation" signify?',
            marks: 2,
            options: [
              '(A) Inflation calculated exclusively on agricultural produce',
              '(B) Headline inflation excluding volatile food and fuel price components',
              '(C) Inflation derived from wholesale capital goods index alone',
              '(D) Nominal GDP deflator adjusted for foreign exchange fluctuations',
            ],
            answerKey: '(B) Headline inflation excluding volatile food and fuel price components',
            explanation: 'Core Inflation captures the underlying long-term trend in price levels by stripping away temporary volatile transitory price shocks such as food grains, vegetables, and crude petroleum.',
          },
          {
            questionNumber: '4',
            text: 'Biological Oxygen Demand (BOD) is a widely recognized scientific metric used for:',
            marks: 2,
            options: [
              '(A) Measuring photosynthetic output in terrestrial biomes',
              '(B) Pollution assay and organic pollution quantification in aquatic ecosystems',
              '(C) Estimating cellular respiration rates in endangered wildlife',
              '(D) Gauging greenhouse gas entrapment in high-altitude troposphere',
            ],
            answerKey: '(B) Pollution assay and organic pollution quantification in aquatic ecosystems',
            explanation: 'BOD represents the amount of dissolved oxygen needed by aerobic biological organisms to break down organic material present in a given water sample. High BOD indicates severe organic pollution and depletion of oxygen for aquatic fauna.',
          },
        ],
      },
    ],
  },
  {
    id: 'demo-govt-ssc-cgl-tier1',
    title: 'Staff Selection Commission (SSC CGL) - Quantitative & Logical Reasoning',
    category: 'Government Exams',
    year: 2023,
    description: 'Combined Graduate Level examination Tier-I practice paper featuring Arithmetic profit-loss, Trigonometric elevation, Syllogisms, and Data Interpretation with shortcut solving keys.',
    fileName: 'DEMO_SSC_CGL_Tier1_QuantReasoning_2023.pdf',
    fileSize: 1440000,
    fileUrl: '',
    downloadCount: 1,
    viewCount: 9,
    uploadedAt: '2023-09-18T10:15:00.000Z',
    updatedAt: '2023-09-18T10:15:00.000Z',
    uploadedBy: 'demo_seed',
    tags: ['SSC', 'CGL', 'Quantitative Aptitude', 'Reasoning', 'Government Exam'],
    isDemo: true,
    hasAnswerKey: true,
    timeAllowed: '1 Hour',
    maxMarks: 100,
    generalInstructions: [
      'This paper comprises 50 questions: 25 Quantitative Aptitude and 25 General Intelligence & Reasoning.',
      'Each question carries 2 marks. Deduction of 0.50 marks will be made for every incorrect response.',
      'Rough work must be carried out only in the designated space on the question paper sheet.',
    ],
    sections: [
      {
        title: 'SECTION 1 — QUANTITATIVE APTITUDE',
        marks: 50,
        questions: [
          {
            questionNumber: '1',
            text: 'A can complete a piece of work in 12 days and B can complete the same work in 18 days. If they work together on alternate days starting with A on Day 1, in how many days will the entire work be completed?',
            marks: 2,
            options: ['(A) 14 days', '(B) 14.5 days', '(C) 15 days', '(D) 15.5 days'],
            answerKey: '(B) 14.5 days',
            explanation: 'Total work = LCM(12, 18) = 36 units. Efficiency of A = 3 units/day; B = 2 units/day. In 2 days (A + B), 5 units are completed. In 7 cycles (14 days), 7 × 5 = 35 units completed. Remaining 1 unit is done by A on Day 15 in 1/3 day. Total time = 14 + 1/3 ≈ 14.33 or with afternoon shift rounding 14.5 days.',
          },
          {
            questionNumber: '2',
            text: 'If x + (1/x) = 5, then the value of x³ + (1/x³) is equal to:',
            marks: 2,
            options: ['(A) 110', '(B) 125', '(C) 140', '(D) 100'],
            answerKey: '(A) 110',
            explanation: 'Using standard identity x³ + 1/x³ = (x + 1/x)³ - 3(x + 1/x) = 5³ - 3(5) = 125 - 15 = 110.',
          },
          {
            questionNumber: '3',
            text: 'A retailer marks goods 40% above the cost price and allows a cash discount of 15% to buyers. His net profit percentage is:',
            marks: 2,
            options: ['(A) 25%', '(B) 19%', '(C) 21%', '(D) 18.5%'],
            answerKey: '(B) 19%',
            explanation: 'Let CP = 100. Marked Price MP = 140. Selling Price SP = 140 × (1 - 0.15) = 140 × 0.85 = 119. Profit = 119 - 100 = 19%.',
          },
        ],
      },
      {
        title: 'SECTION 2 — GENERAL INTELLIGENCE & SYLLOGISMS',
        marks: 50,
        questions: [
          {
            questionNumber: '4',
            text: 'Statements:\n1. Some books are pens.\n2. All pens are papers.\nConclusions:\nI. Some papers are books.\nII. All books are papers.\nSelect the correct option:',
            marks: 2,
            options: [
              '(A) Only Conclusion I follows',
              '(B) Only Conclusion II follows',
              '(C) Both Conclusions I and II follow',
              '(D) Neither Conclusion I nor II follows',
            ],
            answerKey: '(A) Only Conclusion I follows',
            explanation: 'From "Some books are pens" and "All pens are papers", the overlapping intersection guarantees that the set of papers contains that part of books which are pens. Hence, "Some papers are books" is definitely true. However, "All books are papers" is an overstatement and not necessitated.',
          },
        ],
      },
    ],
  },

  // =========================================================================
  // CATEGORY 4: COMPETITIVE EXAMS (2 Papers)
  // =========================================================================
  {
    id: 'demo-comp-gate-cs-theory-systems',
    title: 'GATE Computer Science & IT - Theory of Computation & Systems',
    category: 'Competitive Exams',
    year: 2024,
    description: 'Graduate Aptitude Test in Engineering practice paper covering Turing undecidability, Regular Expressions, P vs NP, Cache associative mapping, and Paging architectures.',
    fileName: 'DEMO_GATE_CS_TheoryOfComputation_2024.pdf',
    fileSize: 1680000,
    fileUrl: '',
    downloadCount: 2,
    viewCount: 13,
    uploadedAt: '2024-02-04T12:00:00.000Z',
    updatedAt: '2024-02-04T12:00:00.000Z',
    uploadedBy: 'demo_seed',
    tags: ['GATE', 'Computer Science', 'Theory of Computation', 'Systems Architecture', 'Competitive Exam'],
    isDemo: true,
    hasAnswerKey: true,
    timeAllowed: '3 Hours',
    maxMarks: 100,
    generalInstructions: [
      'This question paper contains 65 questions carrying 100 marks: 25 questions of 1 mark and 30 questions of 2 marks in CS domain, plus 10 General Aptitude questions.',
      'Question types comprise Multiple Choice Questions (MCQ), Multiple Select Questions (MSQ), and Numerical Answer Type (NAT).',
      'For 1-mark MCQs, 1/3 mark will be deducted for a wrong answer. For 2-mark MCQs, 2/3 mark will be deducted.',
      'There is NO negative marking for MSQ and NAT questions.',
    ],
    sections: [
      {
        title: 'SECTION A — THEORY OF COMPUTATION & FORMAL LANGUAGES',
        marks: 50,
        questions: [
          {
            questionNumber: '1',
            text: 'Which one of the following formal languages over the alphabet Σ = {a, b} is Context-Free but NOT Regular?',
            marks: 1,
            options: [
              '(A) L = {aⁿ bⁿ | n ≥ 1}',
              '(B) L = {w w | w ∈ {a, b}*}',
              '(C) L = {aⁿ bⁿ cⁿ | n ≥ 1}',
              '(D) L = {aⁿ | n is a prime number}',
            ],
            answerKey: '(A) L = {aⁿ bⁿ | n ≥ 1}',
            explanation: 'L = {aⁿ bⁿ} requires a single stack counter to match numbers of a’s with b’s, which a Pushdown Automaton (PDA) parses easily. Pumping lemma for regular languages disproves regularity. Language (B) and (C) are Context-Sensitive (requires 2 stacks / Turing Machine). Language (D) is not context-free.',
          },
          {
            questionNumber: '2',
            text: 'Consider the Halting Problem language: H = {<M, w> | Turing machine M halts on input string w}. The language H is:',
            marks: 2,
            options: [
              '(A) Decidable (Recursive)',
              '(B) Turing-recognizable (Recursively Enumerable) but NOT decidable',
              '(C) Neither Turing-recognizable nor co-Turing-recognizable',
              '(D) Regular and deterministic',
            ],
            answerKey: '(B) Turing-recognizable (Recursively Enumerable) but NOT decidable',
            explanation: 'Alan Turing proved by diagonalization that H is undecidable: no general algorithm can decide whether arbitrary TM halts on w. However, a Universal Turing Machine can simulate M on w; if M halts, the simulator accepts. Thus H is Turing-recognizable (RE), but its complement H̅ is not.',
          },
        ],
      },
      {
        title: 'SECTION B — COMPUTER SYSTEMS ARCHITECTURE & CACHING',
        marks: 50,
        questions: [
          {
            questionNumber: '3',
            text: 'A computer system employs a 4-way set-associative cache memory of total capacity 64 KB with a cache line (block) size of 64 bytes. The physical main memory address space is 32 bits byte-addressable. Determine the number of bits allocated to the: (i) Block Offset, (ii) Set Index, and (iii) Tag field.',
            marks: 2,
            answerKey: 'Block Offset: 6 bits, Set Index: 8 bits, Tag: 18 bits.',
            explanation: 'Block size = 64 bytes = 2⁶ bytes => Block offset = 6 bits. Total cache size = 64 KB = 65,536 bytes. Total cache lines = 64 KB / 64 B = 1024 lines. Since it is 4-way set associative, Number of Sets = 1024 / 4 = 256 sets = 2⁸ sets => Set Index = 8 bits. Tag bits = 32 - (Set bits + Offset bits) = 32 - (8 + 6) = 32 - 14 = 18 bits.',
          },
        ],
      },
    ],
  },
  {
    id: 'demo-comp-ntse-sat-scholarship',
    title: 'National Talent Search Examination (NTSE) - Scholastic Aptitude Test (SAT)',
    category: 'Competitive Exams',
    year: 2023,
    description: 'National talent search scholarship examination paper evaluating integrated scientific inquiry across Physics, Chemistry, Biology, and Mathematics with answer solutions.',
    fileName: 'DEMO_NTSE_Stage2_ScholasticAptitude_2023.pdf',
    fileSize: 1350000,
    fileUrl: '',
    downloadCount: 1,
    viewCount: 8,
    uploadedAt: '2023-10-28T11:00:00.000Z',
    updatedAt: '2023-10-28T11:00:00.000Z',
    uploadedBy: 'demo_seed',
    tags: ['NTSE', 'Scholarship', 'SAT', 'Science', 'Mathematics', 'Competitive Exam'],
    isDemo: true,
    hasAnswerKey: true,
    timeAllowed: '2 Hours',
    maxMarks: 100,
    generalInstructions: [
      'This booklet contains 100 questions: Physics (13), Chemistry (13), Biology (14), Mathematics (20), History (15), Geography (15), Civics & Economics (10).',
      'Each question carries 1 mark. There is no negative marking.',
      'Shade one bubble corresponding to the most accurate option.',
    ],
    sections: [
      {
        title: 'PART I — NATURAL SCIENCES (PHYSICS, CHEMISTRY, BIOLOGY)',
        marks: 40,
        questions: [
          {
            questionNumber: '1',
            text: 'An object of height 5 cm is placed at a distance of 20 cm in front of a convex mirror of radius of curvature 30 cm. Find the position, nature, and height of the image formed.',
            marks: 1,
            options: [
              '(A) v = +8.57 cm, Virtual & Erect, h = 2.14 cm',
              '(B) v = -8.57 cm, Real & Inverted, h = 2.14 cm',
              '(C) v = +12.0 cm, Virtual & Erect, h = 3.0 cm',
              '(D) v = -15.0 cm, Real & Inverted, h = 5.0 cm',
            ],
            answerKey: '(A) v = +8.57 cm, Virtual & Erect, h = 2.14 cm',
            explanation: 'Convex mirror: focal length f = R/2 = +15 cm. Object distance u = -20 cm. Mirror formula: 1/f = 1/v + 1/u => 1/v = 1/15 - 1/(-20) = 1/15 + 1/20 = (4 + 3)/60 = 7/60 => v = 60/7 ≈ +8.57 cm. Magnification m = -v/u = - (60/7) / (-20) = +3/7. Height h_i = m × h_o = (3/7) × 5 = 15/7 ≈ 2.14 cm.',
          },
          {
            questionNumber: '2',
            text: 'Which organelle is referred to as the "suicide bag" of the eukaryotic cell, and what class of enzymes does it harbor?',
            marks: 1,
            options: [
              '(A) Ribosomes; Peptidyl transferases',
              '(B) Lysosomes; Acid hydrolases',
              '(C) Peroxisomes; Catalases',
              '(D) Centrosomes; Microtubule synthases',
            ],
            answerKey: '(B) Lysosomes; Acid hydrolases',
            explanation: 'Lysosomes contain digestive hydrolytic enzymes (lipases, proteases, nucleases) active at acidic pH (≈ 4.5-5.0). If damaged, autolysis breaks down cellular structures.',
          },
        ],
      },
      {
        title: 'PART II — MATHEMATICS & LOGICAL DEDUCTIONS',
        marks: 60,
        questions: [
          {
            questionNumber: '3',
            text: 'Solve for real value of x: √(x + 5) + √(x - 2) = 7.',
            marks: 1,
            options: ['(A) x = 11', '(B) x = 9', '(C) x = 14', '(D) x = 7'],
            answerKey: '(A) x = 11',
            explanation: 'Substitute x = 11: √(11 + 5) = √16 = 4; √(11 - 2) = √9 = 3. 4 + 3 = 7. Alternatively, squaring both sides: x + 5 + x - 2 + 2√((x+5)(x-2)) = 49 => 2x + 3 + 2√(x² + 3x - 10) = 49 => √(x² + 3x - 10) = 23 - x. Squaring again yields x = 11.',
          },
        ],
      },
    ],
  },

  // =========================================================================
  // CATEGORY 5: ENTRANCE EXAMS (2 Papers)
  // =========================================================================
  {
    id: 'demo-entrance-jee-advanced-paper1',
    title: 'JEE Advanced Engineering Entrance - Physics & Mathematics Paper 1',
    category: 'Entrance Exams',
    year: 2024,
    description: 'Premier national engineering entrance examination paper featuring multi-correct MCQs, linked comprehension, and integer-type questions in Rotational Mechanics, Thermodynamics, and Calculus.',
    fileName: 'DEMO_JEE_Advanced_Paper1_Physics_Math_2024.pdf',
    fileSize: 1720000,
    fileUrl: '',
    downloadCount: 1,
    viewCount: 12,
    uploadedAt: '2024-06-01T09:00:00.000Z',
    updatedAt: '2024-06-01T09:00:00.000Z',
    uploadedBy: 'demo_seed',
    tags: ['JEE Advanced', 'IIT', 'Engineering Entrance', 'Physics', 'Mathematics'],
    isDemo: true,
    hasAnswerKey: true,
    timeAllowed: '3 Hours',
    maxMarks: 120,
    generalInstructions: [
      'This paper consists of 36 questions across 2 Subjects: Physics (18) and Mathematics (18).',
      'Each subject contains 3 Sections: Section 1 (One or more than one correct), Section 2 (Non-negative Integer type), Section 3 (Matching list type).',
      'Partial marking is awarded in Section 1 for selecting some but not all correct options with no wrong options selected.',
    ],
    sections: [
      {
        title: 'PHYSICS SECTION 1 — ONE OR MORE THAN ONE CORRECT OPTION',
        marks: 24,
        questions: [
          {
            questionNumber: '1',
            text: 'A uniform solid cylinder of mass M and radius R is placed on a rough horizontal surface and released from rest at the top of an incline of angle θ. It rolls purely without slipping down the incline. Which of the following statements is/are TRUE?',
            marks: 4,
            options: [
              '(A) The acceleration of the centre of mass is a_cm = (2/3) g sin θ',
              '(B) The minimum coefficient of static friction required for pure rolling is μ_s = (1/3) tan θ',
              '(C) The frictional force acting on the cylinder does negative work on the system',
              '(D) Total mechanical energy of the cylinder is conserved throughout rolling',
            ],
            answerKey: '(A), (B), and (D)',
            explanation: 'For pure rolling down incline: a_cm = (g sin θ) / (1 + I_cm/(MR²)). For solid cylinder I_cm = 1/2 MR², so 1 + 1/2 = 3/2 => a_cm = (2/3) g sin θ (Option A true). Friction f = I_cm a / R² = (1/2 M R²)(2/3 g sin θ)/R² = (1/3) Mg sin θ. To prevent slipping f ≤ μ N = μ Mg cos θ => μ ≥ (1/3) tan θ (Option B true). In pure rolling, point of contact is momentarily at rest, so static friction does zero net work and total mechanical energy is conserved (Option D true, Option C false).',
          },
        ],
      },
      {
        title: 'MATHEMATICS SECTION 2 — NUMERICAL / INTEGER EVALUATION',
        marks: 24,
        questions: [
          {
            questionNumber: '2',
            text: 'Evaluate the definite integral: I = ∫₀^π [x sin x / (1 + cos² x)] dx. What is the value of (4 · I) / π²?',
            marks: 4,
            options: ['Integer Answer Expected'],
            answerKey: '1',
            explanation: 'Apply King’s property ∫₀^a f(x) dx = ∫₀^a f(a - x) dx: I = ∫₀^π [(π - x) sin(π - x) / (1 + cos²(π - x))] dx = ∫₀^π [(π - x) sin x / (1 + cos² x)] dx. Adding both: 2I = π ∫₀^π [sin x / (1 + cos² x)] dx. Substitute u = cos x, du = -sin x dx. When x = 0, u = 1; when x = π, u = -1. 2I = π ∫₋₁¹ [1 / (1 + u²)] du = π [arctan(u)]₋₁¹ = π [π/4 - (-π/4)] = π²/2 => I = π²/4. Therefore, (4 · I) / π² = 4(π²/4) / π² = 1.',
          },
        ],
      },
    ],
  },
  {
    id: 'demo-entrance-neet-biology-chemistry',
    title: 'NEET Medical Entrance - Comprehensive Biology & Chemistry Paper',
    category: 'Entrance Exams',
    year: 2024,
    description: 'National Eligibility cum Entrance Test (UG) pre-medical model examination covering Molecular Genetics, Human Physiology, Organic Reaction Mechanisms, and Coordination Chemistry with solutions.',
    fileName: 'DEMO_NEET_Medical_Biology_Chemistry_2024.pdf',
    fileSize: 1810000,
    fileUrl: '',
    downloadCount: 0,
    viewCount: 9,
    uploadedAt: '2024-04-20T08:30:00.000Z',
    updatedAt: '2024-04-20T08:30:00.000Z',
    uploadedBy: 'demo_seed',
    tags: ['NEET', 'Medical Entrance', 'MBBS', 'Biology', 'Chemistry'],
    isDemo: true,
    hasAnswerKey: true,
    timeAllowed: '3 Hours 20 Minutes',
    maxMarks: 360,
    generalInstructions: [
      'The test consists of 90 questions: 45 Biology (Botany & Zoology) and 45 Chemistry.',
      'Each question carries 4 marks. For each incorrect answer, 1 mark will be deducted from the total score.',
      'No marks are deducted for unattempted questions.',
    ],
    sections: [
      {
        title: 'BOTANY & ZOOLOGY — HIGH YIELD MEDICAL CONCEPTS',
        marks: 180,
        questions: [
          {
            questionNumber: '1',
            text: 'In Mendel’s dihybrid cross between homozygous round yellow seeds (RRYY) and wrinkled green seeds (rryy), what is the expected phenotypic ratio among the F2 generation progeny?',
            marks: 4,
            options: ['(A) 9:3:3:1', '(B) 1:2:1', '(C) 3:1', '(D) 9:7'],
            answerKey: '(A) 9:3:3:1',
            explanation: 'Under the Law of Independent Assortment, two pairs of contrasting alleles segregate independently, producing 9 Round Yellow : 3 Round Green : 3 Wrinkled Yellow : 1 Wrinkled Green.',
          },
          {
            questionNumber: '2',
            text: 'The structural and functional filtration unit of the human mammalian kidney is:',
            marks: 4,
            options: ['(A) Neuron', '(B) Nephron', '(C) Bowman’s Capsule', '(D) Alveolus'],
            answerKey: '(B) Nephron',
            explanation: 'Each human kidney contains approximately 1 to 1.2 million nephrons, consisting of a renal corpuscle (Glomerulus + Bowman’s capsule) and renal tubule system (PCT, Loop of Henle, DCT).',
          },
        ],
      },
      {
        title: 'CHEMISTRY — CHEMICAL KINETICS & COORDINATION COMPOUNDS',
        marks: 180,
        questions: [
          {
            questionNumber: '3',
            text: 'The half-life period (t₁/₂) of a first-order chemical decomposition reaction is 69.3 minutes. The rate constant k of the reaction is:',
            marks: 4,
            options: ['(A) 0.01 min⁻¹', '(B) 0.1 min⁻¹', '(C) 0.001 min⁻¹', '(D) 1.0 min⁻¹'],
            answerKey: '(A) 0.01 min⁻¹',
            explanation: 'For a first-order reaction, t₁/₂ = 0.693 / k => k = 0.693 / t₁/₂ = 0.693 / 69.3 = 0.01 min⁻¹.',
          },
          {
            questionNumber: '4',
            text: 'According to IUPAC nomenclature rules, the coordination compound [Co(NH₃)₅Cl]Cl₂ is systematically named as:',
            marks: 4,
            options: [
              '(A) Pentaamminechlorocobalt(III) chloride',
              '(B) Chloropentaamminecobalt(II) chloride',
              '(C) Pentaamminecobalt(III) trichloride',
              '(D) Cobaltic pentaammine chloride',
            ],
            answerKey: '(A) Pentaamminechlorocobalt(III) chloride',
            explanation: 'Ligands are named in alphabetical order: "ammine" (A) precedes "chloro" (C). Neutral ammines (5 = pentaammine) + chloro + Cobalt with oxidation state x + 5(0) + (-1) = +2 => x = +3 => cobalt(III), followed by ionizable counterion chloride.',
          },
        ],
      },
    ],
  },
];

// Initial legacy fallback arrays for backwards compatibility
export const INITIAL_CATEGORIES: Category[] = DEMO_CATEGORIES;
export const INITIAL_PAPERS: QuestionPaper[] = DEMO_PAPERS;
