import { I18nLangCode, I18nLangMeta, UserGuideTranslation } from '../types';

export const SUPPORTED_LANGUAGES: I18nLangMeta[] = [
  { code: 'en', label: 'English', nativeLabel: 'English', dir: 'ltr', flag: '🇬🇧' },
  { code: 'fr', label: 'French', nativeLabel: 'Français', dir: 'ltr', flag: '🇫🇷' },
  { code: 'de', label: 'German', nativeLabel: 'Deutsch', dir: 'ltr', flag: '🇩🇪' },
  { code: 'it', label: 'Italian', nativeLabel: 'Italiano', dir: 'ltr', flag: '🇮🇹' },
  { code: 'es', label: 'Spanish', nativeLabel: 'Español', dir: 'ltr', flag: '🇪🇸' },
  { code: 'pt', label: 'Portuguese', nativeLabel: 'Português', dir: 'ltr', flag: '🇵🇹' },
  { code: 'id', label: 'Indonesian', nativeLabel: 'Bahasa Indonesia', dir: 'ltr', flag: '🇮🇩' },
  { code: 'sw', label: 'Swahili', nativeLabel: 'Kiswahili', dir: 'ltr', flag: '🇰🇪' },
  { code: 'tr', label: 'Turkish', nativeLabel: 'Türkçe', dir: 'ltr', flag: '🇹🇷' },
  { code: 'ru', label: 'Russian', nativeLabel: 'Русский', dir: 'ltr', flag: '🇷🇺' },
  { code: 'zh', label: 'Chinese', nativeLabel: '中文 (简体)', dir: 'ltr', flag: '🇨🇳' },
  { code: 'ja', label: 'Japanese', nativeLabel: '日本語', dir: 'ltr', flag: '🇯🇵' },
  { code: 'ar', label: 'Arabic', nativeLabel: 'العربية', dir: 'rtl', flag: '🇸🇦' },
  { code: 'ur', label: 'Urdu', nativeLabel: 'اردو', dir: 'rtl', flag: '🇵🇰' },
  { code: 'hi', label: 'Hindi', nativeLabel: 'हिन्दी', dir: 'ltr', flag: '🇮🇳' },
  { code: 'vi', label: 'Vietnamese', nativeLabel: 'Tiếng Việt', dir: 'ltr', flag: '🇻🇳' },
  { code: 'ko', label: 'Korean', nativeLabel: '한국어', dir: 'ltr', flag: '🇰🇷' },
  { code: 'fa', label: 'Persian', nativeLabel: 'فارسی', dir: 'rtl', flag: '🇮🇷' },
  { code: 'mr', label: 'Marathi', nativeLabel: 'मराठी', dir: 'ltr', flag: '🇮🇳' },
  { code: 'bn', label: 'Bangla', nativeLabel: 'বাংলা', dir: 'ltr', flag: '🇧🇩' },
  { code: 'ta', label: 'Tamil', nativeLabel: 'தமிழ்', dir: 'ltr', flag: '🇮🇳' },
  { code: 'te', label: 'Telugu', nativeLabel: 'తెలుగు', dir: 'ltr', flag: '🇮🇳' },
];

export const TRANSLATIONS: Record<I18nLangCode, UserGuideTranslation> = {
  en: {
    languageName: 'English',
    dir: 'ltr',
    title: 'KayBiT_Games: Sandbox Systems Programming Lab',
    subtitle: 'Comprehensive Student Curriculum & Architecture Reference',
    introduction: 'KayBiT_Games bridges 6 iconic sandbox architectures with enterprise backend engineering, compiler design, engine architectures, and low-level systems programming across 21 languages.',
    quickStart: 'Select any project lab from the top navigation bar to explore real-time interactive algorithms, switch between target programming language implementations, and analyze runtime telemetry.',
    projectGuides: [
      {
        id: 'voxel',
        title: 'Project 1: Distributing a Voxel Engine',
        inspiration: 'Minecraft',
        focus: 'C++, Rust, Go, Java, C# · Systems Architecture, Graphics/Compute, Distributed Sync',
        coreConcepts: ['Procedural 3D Simplex noise compute shaders', 'Sparse Voxel Octrees (SVO) & Chunk-Paged Cache', 'Greedy meshing vertex reduction', 'FlatBuffers/Protobuf delta sync over UDP/TCP'],
        technicalArchitecture: 'Partitions world data into 16x16x256 chunk page tables. Implements greedy face-merging to reduce GPU draw calls by up to 85%, and streams delta-compressed binary bitmasks.',
        learningExercises: ['Write a SIMD-accelerated 3D Simplex noise generator', 'Implement a greedy mesher in C# or Java with zero heap allocations', 'Construct a Go FlatBuffers delta sync pipeline']
      },
      {
        id: 'pipeline',
        title: 'Project 2: High-Throughput Item Pipeline Engine',
        inspiration: 'Factorio',
        focus: 'Rust, C++, C#, Java, Go · Data Structures, Concurrency Models, Performance Engineering',
        coreConcepts: ['Data-Oriented Design (DOD) & Structure-of-Arrays (SoA)', 'Directed graph logistics segments', 'Bitwise deterministic lockstep simulation', 'Delta-compressed state snapshots and instant rollback'],
        technicalArchitecture: 'Replaces object-oriented pointer chasing with contiguous memory arrays, achieving >90% CPU L1/L2 cache hit rates. Abstract belt spans into closed-form linear velocity equations.',
        learningExercises: ['Benchmark L1 cache misses comparing OOP vs ECS', 'Implement a graph belt segmenter merging continuous lines', 'Design a lockstep tick engine using fixed-point math']
      },
      {
        id: 'procedural',
        title: 'Project 3: Infinite Procedural State Engine',
        inspiration: "No Man's Sky",
        focus: 'Kotlin, Java, Go, R, Python, MATLAB · Mathematical Modeling, Data Persistence, Spatial APIs',
        coreConcepts: ['Stateless coordinate seed hash f(x,y,z)', 'Distributed Quadtree and R-Tree spatial indexing', 'Lazy-evaluated reactive data streams (Flow/Rx)', 'Telemetry analytics & stochastic distribution validation'],
        technicalArchitecture: 'Calculates entire planetary systems, atmospheres, and mineral yields on-the-fly from 64-bit coordinate seeds with zero database storage. Quadtrees provide sub-millisecond proximity queries.',
        learningExercises: ['Formulate a stateless 64-bit coordinate hashing pipeline', 'Build a concurrent spatial Quadtree index', 'Validate resource distributions via Python/R Monte Carlo simulation']
      },
      {
        id: 'kinematic',
        title: 'Project 4: Kinematic Component Compiler & Physics Engine',
        inspiration: 'Scrap Mechanic',
        focus: 'C++, Rust, C#, Java, TypeScript · Physics Mechanics, Compiler Theory, Hardware Simulation',
        coreConcepts: ['Iterative impulse velocity constraint solvers', 'Abstract Syntax Tree (AST) grid wiring compiler', 'Closed-loop cycle detection (Tarjan SCC)', 'Finite-element structural stress profiler'],
        technicalArchitecture: 'Solves Newtonian constraint systems with rotational bearings and thrusters. Wire connections compile into an AST executed in a lightweight VM, resolving feedback loops without recursion traps.',
        learningExercises: ['Build an impulse-based velocity constraint solver', 'Design an AST compiler for logic gate networks', 'Calculate dynamic stress vectors across joint linkages']
      },
      {
        id: 'sandbox',
        title: 'Project 5: Sandboxed VM & Multi-tenant Execution Platform',
        inspiration: 'Roblox',
        focus: 'TypeScript, Go, Dart/Flutter, PHP, Ruby, Bash, PowerShell · Cloud Engineering, Security, Virtualization',
        coreConcepts: ['Hardened VM runtime with cgroups & seccomp', 'Multi-tenant ephemeral container orchestration', 'Content-Addressable Storage (CAS SHA-256) pipeline', 'DevOps automated fuzzing & leak detection'],
        technicalArchitecture: 'Enforces strict memory caps, instruction quotas, and blocked syscalls for untrusted scripts. Scale-out microservices dynamically provision isolate pods, streaming validated assets from CAS storage.',
        learningExercises: ['Implement a Go sandbox wrapper with CPU instruction quotas', 'Build a PHP/Ruby CAS asset validation microservice', 'Write an automated Bash/PowerShell fuzzing harness']
      },
      {
        id: 'economy',
        title: 'Project 6: Relational Economy & World State Backend',
        inspiration: 'Terraria',
        focus: 'SQL, Java, C#, Go, COBOL/Assembly, Scala · Relational Systems, Enterprise FinTech, State Machines',
        coreConcepts: ['ACID-compliant Two-Phase Commit escrow marketplace', 'Functional progression finite state machine (Scala)', 'Low-level binary chunk archiving (COBOL & Assembly)', 'Append-only event sourcing with point-in-time recovery (PITR)'],
        technicalArchitecture: 'Eliminates duplication exploits through strict row-level lock escrow transactions. An append-only immutable ledger records all world events, while binary serializers pack tile grids into database pages.',
        learningExercises: ['Author an atomic PostgreSQL trade escrow transaction', 'Design an event-sourced world progression state machine in Scala', 'Write a raw binary tile packer using COBOL record layouts']
      }
    ],
    technologyMatrixTitle: 'Technology & Language Mapping Guide',
    technologyMatrixSummary: 'All 21 languages mapped to core computer science, engine systems, and backend domains.',
    gradingRubricTitle: 'Curriculum Assessment & Grading Rubric',
    gradingRubric: [
      { criteria: 'Architectural Rigor', weight: '30%', description: 'Correct implementation of ECS, SVO, AST compilers, and ACID transactions.' },
      { criteria: 'Memory & Cache Optimization', weight: '25%', description: 'Cache locality, zero-allocation loops, and minimal GC footprint.' },
      { criteria: 'Concurrency & Concurrency Safety', weight: '20%', description: 'Thread safety, lockstep determinism, and deadlock freedom.' },
      { criteria: 'Code Craftsmanship', weight: '15%', description: 'Clean idiomatic code across bare-metal, managed, and functional paradigms.' },
      { criteria: 'Testing & Verification', weight: '10%', description: 'Comprehensive unit tests, fuzz testing, and stress benchmarks.' }
    ],
    glossary: [
      { term: 'Sparse Voxel Octree (SVO)', definition: 'Hierarchical tree structure where nodes subdivide space into octants to compress 3D voxel grids.' },
      { term: 'Greedy Meshing', definition: 'Optimization algorithm that merges adjacent coplanar voxel faces into larger quadrilaterals, slashing polygon counts.' },
      { term: 'Structure of Arrays (SoA)', definition: 'Data-Oriented memory layout storing distinct component fields in contiguous parallel arrays to maximize CPU cache hits.' },
      { term: 'Deterministic Lockstep', definition: 'Simulation model where all nodes execute identical discrete ticks using fixed-point math and synchronized PRNG seeds.' },
      { term: 'Content-Addressable Storage (CAS)', definition: 'Storage architecture where files are identified and retrieved strictly by cryptographic content hashes (e.g., SHA-256).' },
      { term: 'Two-Phase Commit (2PC)', definition: 'Distributed consensus algorithm ensuring multi-node atomic transactions either fully commit or abort without inconsistent states.' }
    ]
  },
  fr: {
    languageName: 'Français',
    dir: 'ltr',
    title: 'KayBiT_Games : Laboratoire d\'Architecture Système & Sandbox',
    subtitle: 'Guide Pédagogique Étudiant & Référence Technique',
    introduction: 'KayBiT_Games relie 6 architectures emblématiques de jeux sandbox au génie logiciel d\'entreprise, aux compilateurs, aux moteurs de jeu et à la programmation bas niveau à travers 21 langages.',
    quickStart: 'Sélectionnez un laboratoire de projet dans la barre supérieure pour explorer les algorithmes en temps réel, comparer les implémentations dans les langages cibles et mesurer la télémétrie.',
    projectGuides: [
      {
        id: 'voxel',
        title: 'Projet 1 : Moteur Voxel Distribué (Minecraft)',
        inspiration: 'Minecraft',
        focus: 'C++, Rust, Go, Java, C# · Architecture Système, Compute Shaders, Synchronisation Réseau',
        coreConcepts: ['Shaders de calcul de bruit Simplex 3D procédural', 'Octrees Voxel Clairsemés (SVO) & Cache de Chunks', 'Algorithme de Greedy Meshing', 'Synchronisation delta FlatBuffers/Protobuf sur UDP/TCP'],
        technicalArchitecture: 'Partitionne les données du monde en blocs de 16x16x256. Fusionne les faces coplanaires pour réduire les appels de rendu GPU jusqu\'à 85%.',
        learningExercises: ['Générateur de bruit Simplex 3D accéléré par SIMD', 'Mesher gourmand sans allocation de tas en C# ou Java', 'Serveur de synchronisation delta en Go']
      },
      {
        id: 'pipeline',
        title: 'Projet 2 : Moteur de Pipeline d\'Objets à Haut Débit (Factorio)',
        inspiration: 'Factorio',
        focus: 'Rust, C++, C#, Java, Go · Structures de Données, Concurrence, Optimisation Cache',
        coreConcepts: ['Conception Orientée Données (DOD) & Structure de Tableaux', 'Segments logistiques modélisés en graphe orienté', 'Simulation déterministe en pas cadencé', 'Instantanés d\'état différentiels et réconciliation rollback'],
        technicalArchitecture: 'Remplace le parcours de pointeurs objet par des tableaux continus en mémoire, atteignant >90% de taux de succès de cache L1/L2.',
        learningExercises: ['Mesurer les défauts de cache L1 entre POO et ECS', 'Segmenter un réseau de convoyeurs en équations linéaires', 'Moteur de pas déterministe à virgule fixe']
      },
      {
        id: 'procedural',
        title: 'Projet 3 : Moteur d\'État Procédural Infini (No Man\'s Sky)',
        inspiration: "No Man's Sky",
        focus: 'Kotlin, Java, Go, R, Python, MATLAB · Modélisation Mathématique, Flux Réactifs, Index Spatial',
        coreConcepts: ['Fonction de hachage de coordonnées sans état f(x,y,z)', 'Arbres R et Quadtrees spatiaux distribués', 'Flux réactifs à évaluation paresseuse (Kotlin Flow / Rx)', 'Analyse télémétrique et validation stochastique'],
        technicalArchitecture: 'Génère galaxies, atmosphères et minéraux à la volée à partir de graines de coordonnées sans stockage en base de données.',
        learningExercises: ['Pipeline de hachage de coordonnées 64 bits sans état', 'Arbre spatial Quadtree concurrent', 'Modélisation stochastique en Python ou R']
      },
      {
        id: 'kinematic',
        title: 'Projet 4 : Compilateur de Composants Cinématiques & Moteur Physique (Scrap Mechanic)',
        inspiration: 'Scrap Mechanic',
        focus: 'C++, Rust, C#, Java, TypeScript · Mécanique Physique, Théorie des Compilateurs, Simulation Matérielle',
        coreConcepts: ['Solveur de contraintes de vitesse par impulsions', 'Compilateur d\'arbre syntaxique abstrait (AST) de câblage logique', 'Détection de cycles en boucle fermée (Tarjan)', 'Profileur de contraintes structurelles aux éléments finis'],
        technicalArchitecture: 'Résout les liaisons rigides, suspensions et propulseurs. Compile les circuits logiques en un AST exécuté par une VM sans boucle infinie.',
        learningExercises: ['Solveur de liaisons articulées par impulsions', 'Compilateur AST de portes logiques en bytecode', 'Calculateur de contraintes dynamiques de cisaillement']
      },
      {
        id: 'sandbox',
        title: 'Projet 5 : VM Sandboxée & Plateforme Multi-Tenant (Roblox)',
        inspiration: 'Roblox',
        focus: 'TypeScript, Go, Dart/Flutter, PHP, Ruby, Bash, PowerShell · Sécurité Cloud, Virtualisation, Isolation Conteneur',
        coreConcepts: ['Environnement de bac à sable durci avec cgroups et seccomp', 'Orchestration multi-tenant de pods éphémères', 'Stockage adressable par le contenu (CAS SHA-256)', 'Chaîne de fuzzing et tests de sécurité automatisés'],
        technicalArchitecture: 'Applique des quotas stricts d\'instructions et filtre les appels système pour les scripts non fiables. Microservices déployés dynamiquement.',
        learningExercises: ['Wrapper d\'isolation Go avec quotas d\'instructions', 'Microservice CAS de validation d\'objets 3D en PHP/Ruby', 'Scripts Bash de fuzzing automatisé']
      },
      {
        id: 'economy',
        title: 'Projet 6 : Économie Relationnelle & Backend d\'État du Monde (Terraria)',
        inspiration: 'Terraria',
        focus: 'SQL, Java, C#, Go, COBOL/Assembly, Scala · Systèmes Relationnels, FinTech, Machines à États',
        coreConcepts: ['Place de marché ACID à validation en deux phases (2PC)', 'Machine à états de progression événementielle (Scala)', 'Archivage binaire bas niveau (COBOL & Assembleur)', 'Journal immuable Event Sourcing avec restauration PITR'],
        technicalArchitecture: 'Élimine les failles de duplication par verrouillage de lignes. Journalise tous les événements du monde pour un audit infalsifiable.',
        learningExercises: ['Procédure stockée SQL pour échanges atomiques sécurisés', 'Machine à états de progression en Scala', 'Empaqueteur binaire de tuiles en COBOL / Assembleur']
      }
    ],
    technologyMatrixTitle: 'Guide de Correspondance des 21 Langages',
    technologyMatrixSummary: 'Cartographie rigoureuse des technologies entre bas niveau, managé, fonctionnel et cloud.',
    gradingRubricTitle: 'Barème d\'Évaluation Pédagogique',
    gradingRubric: [
      { criteria: 'Rigueur Architecturale', weight: '30%', description: 'Implémentation conforme des architectures ECS, SVO, AST et transactions ACID.' },
      { criteria: 'Optimisation Mémoire & Cache', weight: '25%', description: 'Localité de cache, boucle sans allocation de tas et minimisation GC.' },
      { criteria: 'Concurrence & Fiabilité', weight: '20%', description: 'Gestion des threads, simulation déterministe et absence d\'interblocage.' },
      { criteria: 'Qualité du Code', weight: '15%', description: 'Code idiomatique, interfaces propres et documentation technique.' },
      { criteria: 'Tests & Benchmarks', weight: '10%', description: 'Couverture de tests unitaires, fuzzing et bancs d\'essai de performance.' }
    ],
    glossary: [
      { term: 'Sparse Voxel Octree (SVO)', definition: 'Structure arborescente partitionnant l\'espace 3D en huit quadrants pour compresser les voxels.' },
      { term: 'Greedy Meshing', definition: 'Algorithme fusionnant les faces coplanaires adjacentes en polygones unifiés pour réduire les vertex GPU.' },
      { term: 'Structure of Arrays (SoA)', definition: 'Organisation mémoire stockant les attributs dans des tableaux parallèles pour optimiser le cache CPU.' }
    ]
  },
  de: {
    languageName: 'Deutsch',
    dir: 'ltr',
    title: 'KayBiT_Games: Sandbox-Systemprogrammierungslabor',
    subtitle: 'Umfassender Studienplan & Architektur-Referenz für Studierende',
    introduction: 'KayBiT_Games verknüpft 6 ikonische Sandbox-Architekturen mit Unternehmens-Backend-Systemen, Compiler-Design und hardwarenaher Systemprogrammierung in 21 Sprachen.',
    quickStart: 'Wählen Sie ein Projektlabor aus der oberen Navigationsleiste, um Echtzeit-Algorithmen interaktiv zu steuern und Quellcode in den Zielsprachen zu untersuchen.',
    projectGuides: [
      {
        id: 'voxel',
        title: 'Projekt 1: Verteilte Voxel-Engine (Minecraft)',
        inspiration: 'Minecraft',
        focus: 'C++, Rust, Go, Java, C# · Systemarchitektur, Compute-Pipelines, Verteilte Synchronisation',
        coreConcepts: ['3D-Simplex-Rauschen via Compute Shader', 'Sparse Voxel Octrees (SVO) & Chunk-Paged Cache', 'Greedy-Meshing-Optimierung', 'FlatBuffers Delta-Synchronisation'],
        technicalArchitecture: 'Teilt Raumdaten in 16x16x256 Chunks. Greedy-Meshing senkt GPU-Draw-Calls um bis zu 85%.',
        learningExercises: ['SIMD-beschleunigter 3D-Rauschgenerator', 'Allokationsfreier Greedy-Mesher in Java/C#', 'Go FlatBuffers Netzwerk-Server']
      },
      {
        id: 'pipeline',
        title: 'Projekt 2: Hochdurchsatz-Item-Pipeline (Factorio)',
        inspiration: 'Factorio',
        focus: 'Rust, C++, C#, Java, Go · Datenstrukturen, Nebenläufigkeit, Performance Engineering',
        coreConcepts: ['Data-Oriented Design (DOD) & SoA', 'Gerichtete Förderband-Graphen', 'Deterministische Lockstep-Simulation', 'Delta-Snapshots und Rollback-Versöhnung'],
        technicalArchitecture: 'Nutzt zusammenhängende Speicher-Arrays zur Erzielung von über 90% L1/L2-Cache-Treffern.',
        learningExercises: ['L1-Cache-Misses zwischen OOP und ECS messen', 'Graphenbasierte Förderstrecken-Segmentierung', 'Fixed-Point Lockstep-Tick-Simulator']
      },
      {
        id: 'procedural',
        title: 'Projekt 3: Unendliche Prozedurale Zustands-Engine (No Man\'s Sky)',
        inspiration: "No Man's Sky",
        focus: 'Kotlin, Java, Go, R, Python, MATLAB · Mathematische Modellierung, Reaktive Streams, Räumliche Abfragen',
        coreConcepts: ['Zustandsloser Koordinaten-Hash f(x,y,z)', 'Verteilte Quadtree- und R-Tree-Indizes', 'Reaktive Datenströme mit Backpressure', 'Stochastische Ressourcenmodellierung'],
        technicalArchitecture: 'Erzeugt Planeten, Atmosphären und Mineralien ohne Datenbank rein deterministisch aus Koordinaten-Seeds.',
        learningExercises: ['Zustandslose 64-Bit-Hashfunktion formulieren', 'Nebenläufigen Quadtree entwickeln', 'Monte-Carlo-Validierung in Python/R']
      },
      {
        id: 'kinematic',
        title: 'Projekt 4: Kinematischer Komponenten-Compiler & Physik (Scrap Mechanic)',
        inspiration: 'Scrap Mechanic',
        focus: 'C++, Rust, C#, Java, TypeScript · Physikmechanik, Compilerbau, Hardwarenahe Simulation',
        coreConcepts: ['Impulsbasierte Geschwindigkeits-Constraint-Solver', 'AST-Schaltkreis-Compiler', 'Rückkopplungs-Zykluserkennung (Tarjan)', 'Finite-Elemente-Spannungsprofiler'],
        technicalArchitecture: 'Löst Starrkörper-Gelenke und Strahlantriebe. Kompiliert Logikgitter in einen AST ohne Endlosrekursion.',
        learningExercises: ['Impulsbasierter Gelenk-Solver in C++/Rust', 'Logikgatter-AST-Compiler in Bytecode', 'Spannungsberechnung unter Drehmomentbelastung']
      },
      {
        id: 'sandbox',
        title: 'Projekt 5: Sandboxed VM & Multi-Tenant-Plattform (Roblox)',
        inspiration: 'Roblox',
        focus: 'TypeScript, Go, Dart/Flutter, PHP, Ruby, Bash, PowerShell · Cloud-Sicherheit, Container-Isolation, Virtualisierung',
        coreConcepts: ['Gehärtete Sandbox mit cgroups & seccomp', 'Multi-Tenant-Pod-Orchestrierung', 'Content-Addressable Storage (CAS)', 'Automatisierte Fuzzing-Toolchains'],
        technicalArchitecture: 'Erzwingt strikte Speicherlimits und blockiert unsichere Systemaufrufe für nutzergenerierte Skripte.',
        learningExercises: ['Go-Isolator mit Befehlsquoten', 'PHP/Ruby CAS-Mesh-Validierungsdienst', 'Automatisierter Bash-Fuzzing-Harness']
      },
      {
        id: 'economy',
        title: 'Projekt 6: Relationale Wirtschaft & Weltzustands-Backend (Terraria)',
        inspiration: 'Terraria',
        focus: 'SQL, Java, C#, Go, COBOL/Assembly, Scala · Relationale Datenbanksysteme, FinTech, Transaktionsintegrität',
        coreConcepts: ['ACID Two-Phase-Commit Marktplatz', 'Ereignisgesteuerte Scala-Zustandsmaschine', 'Binäre Chunk-Archivierung (COBOL & Assembler)', 'Event-Sourcing-Hauptbuch mit PITR'],
        technicalArchitecture: 'Verhindert Duplikations-Exploits durch Zeilensperren. Unveränderliches Ledger garantiert vollständige Revisionssicherheit.',
        learningExercises: ['Atomare SQL-Treuhandtransaktion schreiben', 'Event-Sourced Zustandsmaschine in Scala', 'COBOL-Binärpacker für Kachelmatrizen']
      }
    ],
    technologyMatrixTitle: 'Technologie- & Sprachzuordnungsmatrix',
    technologyMatrixSummary: 'Alle 21 Programmiersprachen systematisch den Kernarchitekturen zugeordnet.',
    gradingRubricTitle: 'Bewertungs- und Benotungsraster',
    gradingRubric: [
      { criteria: 'Architektonische Tiefe', weight: '30%', description: 'Präzise Umsetzung von ECS, SVO, AST-Compilern und ACID-Pipelines.' },
      { criteria: 'Speicher- und Cache-Optimierung', weight: '25%', description: 'Cache-Lokalität, allokationsfreie Schleifen und minimale GC-Latenz.' },
      { criteria: 'Nebenläufigkeit & Robustheit', weight: '20%', description: 'Threadsicherheit, deterministischer Gleichschritt und Deadlock-Freiheit.' },
      { criteria: 'Code-Qualität', weight: '15%', description: 'Idiomatischer und sauber strukturierter Quellcode.' },
      { criteria: 'Tests & Benchmarks', weight: '10%', description: 'Umfassende automatisierte Tests, Fuzzing und Lasttests.' }
    ],
    glossary: [
      { term: 'Sparse Voxel Octree (SVO)', definition: 'Baumstruktur zur rekursiven Raumunterteilung in Oktanten zwecks Voxel-Kompression.' },
      { term: 'Greedy Meshing', definition: 'Polygon-Reduktionsverfahren, das benachbarte coplanare Voxel-Flächen zusammenfasst.' }
    ]
  },
  es: {
    languageName: 'Español',
    dir: 'ltr',
    title: 'KayBiT_Games: Laboratorio de Arquitectura de Sistemas y Sandbox',
    subtitle: 'Guía Integral para Estudiantes y Referencia Técnica',
    introduction: 'KayBiT_Games conecta 6 arquitecturas icónicas de juegos sandbox con ingeniería de backends empresariales, diseño de compiladores y programación de sistemas en 21 lenguajes.',
    quickStart: 'Seleccione cualquier proyecto en la barra superior para interactuar con algoritmos en tiempo real, alternar códigos fuente y evaluar telemetría.',
    projectGuides: [
      {
        id: 'voxel',
        title: 'Proyecto 1: Motor Voxel Distribuido (Minecraft)',
        inspiration: 'Minecraft',
        focus: 'C++, Rust, Go, Java, C# · Arquitectura de Sistemas, Shaders de Cómputo, Replicación en Red',
        coreConcepts: ['Ruido Simplex 3D procedural', 'Octrees Voxel Dispersos (SVO) y Memoria Paginada', 'Algoritmo Greedy Meshing', 'Sincronización delta binaria con FlatBuffers'],
        technicalArchitecture: 'Particiona el mundo en bloques de 16x16x256. Reduce las llamadas de dibujo GPU hasta un 85% fusionando caras coplanares.',
        learningExercises: ['Generador de ruido Simplex SIMD en C++/Rust', 'Mesher voraz sin asignaciones en heap en C# o Java', 'Servidor de sincronización delta en Go']
      },
      {
        id: 'pipeline',
        title: 'Proyecto 2: Motor de Tuberías de Ítems de Alto Rendimiento (Factorio)',
        inspiration: 'Factorio',
        focus: 'Rust, C++, C#, Java, Go · Estructuras de Datos, Modelos de Concurrencia, Rendimiento',
        coreConcepts: ['Diseño Orientado a Datos (DOD) y SoA', 'Segmentos logísticos basados en grafos dirigidos', 'Simulación determinista en lockstep', 'Instantáneas de estado delta y reconciliación rollback'],
        technicalArchitecture: 'Maximiza el acierto de caché L1/L2 al almacenar cintas transportadoras en arreglos continuos de memoria.',
        learningExercises: ['Comparar fallos de caché L1 entre POO y ECS', 'Segmentador de cintas en ecuaciones lineales', 'Validador de simulación determinista de punto fijo']
      },
      {
        id: 'procedural',
        title: 'Proyecto 3: Motor de Estado Procedural Infinito (No Man\'s Sky)',
        inspiration: "No Man's Sky",
        focus: 'Kotlin, Java, Go, R, Python, MATLAB · Modelado Matemático, Streams Reactivos, Búsqueda Espacial',
        coreConcepts: ['Hash de coordenadas sin estado f(x,y,z)', 'Consultas espaciales con Quadtree y R-Tree', 'Tuberías reactivas con evaluación perezosa', 'Análisis estadístico y validación estocástica'],
        technicalArchitecture: 'Genera universos estelares completos puramente a partir de semillas de coordenadas sin necesidad de base de datos.',
        learningExercises: ['Función hash de coordenadas de 64 bits sin estado', 'Índice espacial concurrente Quadtree', 'Script de análisis estocástico en Python o R']
      },
      {
        id: 'kinematic',
        title: 'Proyecto 4: Compilador de Componentes Cinemáticos y Física (Scrap Mechanic)',
        inspiration: 'Scrap Mechanic',
        focus: 'C++, Rust, C#, Java, TypeScript · Mecánica Física, Teoría de Compiladores, Simulación',
        coreConcepts: ['Solucionador de restricciones de velocidad por impulsos', 'Compilador AST de conexiones lógicas', 'Detección de ciclos de retroalimentación (Tarjan)', 'Perfilador de esfuerzos estructurales por elementos finitos'],
        technicalArchitecture: 'Simula restricciones mecánicas y compila cableado en un AST ejecutado en una máquina virtual sin desbordar la pila.',
        learningExercises: ['Solucionador cinemático de uniones rígidas', 'Compilador AST de compuertas a bytecode', 'Evaluador de tensión estructural bajo torsión']
      },
      {
        id: 'sandbox',
        title: 'Proyecto 5: VM en Sandbox y Plataforma Multi-Inquilino (Roblox)',
        inspiration: 'Roblox',
        focus: 'TypeScript, Go, Dart/Flutter, PHP, Ruby, Bash, PowerShell · Seguridad Cloud, Aislamiento en Contenedores, Fuzzing',
        coreConcepts: ['Aislamiento con cgroups y seccomp', 'Orquestación de microservicios multi-inquilino', 'Almacenamiento direccionable por contenido (CAS)', 'Automatización DevOps y pruebas de fuzzing'],
        technicalArchitecture: 'Aplica límites estrictos de memoria y llamadas al sistema a scripts no confiables mientras escala pods efímeros.',
        learningExercises: ['Envoltorio seguro en Go con cuotas de CPU', 'Microservicio CAS de validación 3D en PHP/Ruby', 'Suite automatizada de fuzzing en Bash/PowerShell']
      },
      {
        id: 'economy',
        title: 'Proyecto 6: Economía Relacional y Backend del Estado del Mundo (Terraria)',
        inspiration: 'Terraria',
        focus: 'SQL, Java, C#, Go, COBOL/Assembly, Scala · Sistemas Relacionales, FinTech, Transacciones ACID',
        coreConcepts: ['Mercado global con Two-Phase Commit', 'Máquina de estados de progresión en Scala', 'Archivado binario de bloques (COBOL y Ensamblador)', 'Libro contable inmutable Event Sourcing con PITR'],
        technicalArchitecture: 'Garantiza transacciones libres de duplicación mediante bloqueos de fila y mantiene una pista de auditoría inmutable.',
        learningExercises: ['Procedimiento almacenado atómico en PostgreSQL', 'Máquina de estados orientada a eventos en Scala', 'Empaquetador de bloques en formato COBOL/Assembly']
      }
    ],
    technologyMatrixTitle: 'Matriz de Mapeo de Tecnologías (21 Lenguajes)',
    technologyMatrixSummary: 'Mapeo integral de lenguajes a conceptos clave de ingeniería de sistemas.',
    gradingRubricTitle: 'Rúbrica de Evaluación Académica',
    gradingRubric: [
      { criteria: 'Rigor Arquitectónico', weight: '30%', description: 'Implementación correcta de ECS, SVO, AST y transacciones ACID.' },
      { criteria: 'Optimización de Memoria y Caché', weight: '25%', description: 'Localidad de caché, reducción de recolección de basura y algoritmos O(1)/O(log N).' },
      { criteria: 'Concurrencia y Robustez', weight: '20%', description: 'Simulación determinista, seguridad de hilos y prevención de bloqueos mutuos.' },
      { criteria: 'Calidad del Código', weight: '15%', description: 'Código limpio, idiomático y modular en los lenguajes evaluados.' },
      { criteria: 'Pruebas y Verificación', weight: '10%', description: 'Pruebas unitarias, fuzzing y métricas de rendimiento.' }
    ],
    glossary: [
      { term: 'Sparse Voxel Octree (SVO)', definition: 'Estructura en árbol que divide el espacio en octantes para comprimir cuadrículas 3D.' },
      { term: 'Greedy Meshing', definition: 'Algoritmo que fusiona caras coplanares contiguas para reducir polígonos y llamadas de dibujado.' }
    ]
  },
  zh: {
    languageName: '中文 (简体)',
    dir: 'ltr',
    title: 'KayBiT_Games: 沙盒系统编程与底层架构实验室',
    subtitle: '高级程序员与计算机系统架构学生教学全书',
    introduction: 'KayBiT_Games 跨越 21 种编程语言，将 6 大经典沙盒游戏的核心架构深度映射至企业级分布式后端、编译器设计、物理引擎与底层系统编程。',
    quickStart: '点击顶部导航栏进入各项目实验室，实时操控系统模拟算法，切换多语言底层源码实现，并观察 CPU 缓存与网络遥测指标。',
    projectGuides: [
      {
        id: 'voxel',
        title: '项目 1: 分布式体素引擎架构 (Minecraft)',
        inspiration: 'Minecraft',
        focus: 'C++, Rust, Go, Java, C# · 系统架构, 计算管线, 分布式差分同步',
        coreConcepts: ['计算着色器 3D Simplex 过程化噪声', '稀疏体素八叉树 (SVO) 与分块分页缓存', '贪心网格合并算法 (Greedy Meshing)', 'FlatBuffers / Protobuf 二进制网络增量同步'],
        technicalArchitecture: '将世界划分为 16x16x256 分块。利用贪心网格化将共面相邻面合并为单个大四边形，使 GPU 绘制调用降低达 85%，并通过二进制位掩码进行增量同步。',
        learningExercises: ['编写 SIMD 加速的 3D Simplex 噪声核', '在 C# 或 Java 中实现零堆分配的贪心网格合并器', '使用 Go 搭建 FlatBuffers 体素增量同步服务端']
      },
      {
        id: 'pipeline',
        title: '项目 2: 高吞吐物品流水线引擎 (Factorio)',
        inspiration: 'Factorio',
        focus: 'Rust, C++, C#, Java, Go · 数据结构, 并发模型, 性能工程',
        coreConcepts: ['面向数据设计 (DOD) 与数组结构 (SoA)', '有向图物流传送带线段化', '位级别确定性锁步模拟 (Lockstep)', '差分状态快照与毫秒级回滚'],
        technicalArchitecture: '彻底摒弃指针寻址的面向对象设计，改用连续内存数组，使 CPU L1/L2 缓存命中率超越 90%。将连续传输带合并为线性速度方程。',
        learningExercises: ['使用性能分析工具量化 OOP 与 ECS 的 L1 缓存缺失率', '在 Rust 或 Go 中实现有向图传送带线段压缩器', '使用定点数设计确定性锁步模拟引擎']
      },
      {
        id: 'procedural',
        title: '项目 3: 无限过程化世界状态引擎 (No Man\'s Sky)',
        inspiration: "No Man's Sky",
        focus: 'Kotlin, Java, Go, R, Python, MATLAB · 数学建模, 响应式数据流, 分布式空间索引',
        coreConcepts: ['无状态坐标哈希种子算法 f(x,y,z)', '分布式四叉树与 R-Tree 亚毫秒空间索引', '惰性求值响应式流式管道 (Flow/Rx)', '遥测分析与随机资源分布验证'],
        technicalArchitecture: '仅凭 64 位三维坐标哈希纯数学派生恒星、行星大气与矿物储量，完全无需数据库持久化。四叉树支持极速范围探测。',
        learningExercises: ['设计无状态 64 位三维空间坐标哈希生成器', '实现并发安全的四叉树星系空间查询索引', '使用 Python/R 编写蒙特卡洛随机资源分布校验脚本']
      },
      {
        id: 'kinematic',
        title: '项目 4: 运动学组件编译器与物理引擎 (Scrap Mechanic)',
        inspiration: 'Scrap Mechanic',
        focus: 'C++, Rust, C#, Java, TypeScript · 刚体约束动力学, 编译器理论, 硬件模拟',
        coreConcepts: ['基于冲量的速度约束求解器', '逻辑连线抽象语法树 (AST) 编译器', '闭环反馈环路检测 (Tarjan SCC)', '有限元结构应力与断裂分析'],
        technicalArchitecture: '求解刚体铰接、悬挂与推力矢量。将逻辑开关与传感器连线编译为 AST 字节码并在虚拟机运行，杜绝无限递归爆栈。',
        learningExercises: ['在 C++ 或 Rust 中实现基于冲量的速度约束求解器', '为电路逻辑网设计 AST 编译器并生成字节码', '计算旋转扭矩载荷下的关节动态剪切应力']
      },
      {
        id: 'sandbox',
        title: '项目 5: 沙箱虚拟机与多租户云执行平台 (Roblox)',
        inspiration: 'Roblox',
        focus: 'TypeScript, Go, Dart/Flutter, PHP, Ruby, Bash, PowerShell · 云安全, 容器隔离, 运行时虚拟化',
        coreConcepts: ['内核级 cgroups 内存配额与 seccomp 系统调用过滤', '多租户微服务弹性容器编排', '内容寻址存储 (CAS SHA-256) 资产管线', 'DevOps 自动化模糊测试与内存泄漏排查'],
        technicalArchitecture: '为不可信用户脚本提供严格隔离的运行沙箱，限制 CPU 指令与内存，并配合自动化 CI/CD 模糊测试工具链。',
        learningExercises: ['使用 Go 编写带 CPU 指令限额与系统调用黑名单的沙箱隔离器', '使用 PHP/Ruby 构建 SHA-256 内容寻址资产校验微服务', '编写 Bash/PowerShell 自动化对抗性输入模糊测试脚本']
      },
      {
        id: 'economy',
        title: '项目 6: 关系型经济与世界状态后端 (Terraria)',
        inspiration: 'Terraria',
        focus: 'SQL, Java, C#, Go, COBOL/Assembly, Scala · 关系数据库, 金融级事务, 状态机',
        coreConcepts: ['ACID 两阶段提交 (2PC) 防刷交易市场', '函数式推进事件驱动状态机 (Scala)', '底层二进制分块存储解析 (COBOL & 汇编)', '不可变事件溯源账本与时间点恢复 (PITR)'],
        technicalArchitecture: '通过严格的行级排他锁保证原子交易，杜绝刷钱刷物漏洞。不可变事件账本记录所有世界变更，提供审计追踪与时光倒流。',
        learningExercises: ['编写严格防重入与死锁防范的 PostgreSQL 玩家交易存储过程', '在 Scala 中设计事件溯源的世界阶段转换状态机', '使用 COBOL 固定宽度记录格式与汇编编写分块位压缩器']
      }
    ],
    technologyMatrixTitle: '21 种编程语言架构映射指南',
    technologyMatrixSummary: '系统性对比底层裸机语言、托管语言、函数式语言与脚本语言的工程权衡。',
    gradingRubricTitle: '学生作业评分标准与量规',
    gradingRubric: [
      { criteria: '架构设计严谨性', weight: '30%', description: '准确实现 ECS、SVO、AST 编译器及 ACID 事务隔离。' },
      { criteria: '内存与缓存性能优化', weight: '25%', description: 'CPU 缓存局部性、避免堆内存分配抖动与 GC 暂停。' },
      { criteria: '并发控制与可靠性', weight: '20%', description: '线程安全、确定性锁步执行与无死锁保障。' },
      { criteria: '工程代码规范', weight: '15%', description: '符合目标语言惯用法的高内聚、低耦合模块化代码。' },
      { criteria: '自动化测试与基准', weight: '10%', description: '单元测试覆盖率、模糊测试与性能基准跑分。' }
    ],
    glossary: [
      { term: '稀疏体素八叉树 (SVO)', definition: '一种将三维空间递归细分为八个子象限以高倍压缩体素网格的层次化数据结构。' },
      { term: '贪心网格化 (Greedy Meshing)', definition: '在体素切片平面合并连续相邻共面网格的几何优化算法，大幅降低渲染面数。' }
    ]
  },
  ja: {
    languageName: '日本語',
    dir: 'ltr',
    title: 'KayBiT_Games: サンドボックス・システムプログラミング実験室',
    subtitle: '高度プログラミング学生向けシステムアーキテクチャ標準ガイド',
    introduction: 'KayBiT_Gamesは、6つの名作サンドボックスゲームの内部構造を、21の言語を用いてエンタープライズバックエンド、コンパイラ設計、低レイヤシステムプログラミングへと昇華させる実践的教育ラボです。',
    quickStart: '上部バーから各プロジェクトを選択し、リアルタイムアルゴリズムを検証し、対象言語の実装コードを比較してください。',
    projectGuides: [
      {
        id: 'voxel',
        title: 'プロジェクト1: 分散ボクセルエンジン (Minecraft)',
        inspiration: 'Minecraft',
        focus: 'C++, Rust, Go, Java, C# · システムアーキテクチャ, コンピュートシェーダー, 分散同期',
        coreConcepts: ['3D Simplexノイズ生成コンピュートシェーダー', 'スパースボクセル八分木 (SVO) とチャンクキャッシュ', 'Greedy Meshing (貪欲メッシュ最適化)', 'FlatBuffersによるUDP/TCPバイナリ差分同期'],
        technicalArchitecture: '16x16x256チャンク単位で空間を管理し、Greedy Meshingにより描画コールを最大85%削減します。',
        learningExercises: ['SIMD対応3Dノイズエンジンの実装', 'C#/JavaにおけるゼロアロケーションGreedy Mesher', 'GoによるFlatBuffers差分同期サーバー']
      },
      {
        id: 'pipeline',
        title: 'プロジェクト2: 高スループット・アイテムパイプライン (Factorio)',
        inspiration: 'Factorio',
        focus: 'Rust, C++, C#, Java, Go · データ構造, 並行処理, パフォーマンス工学',
        coreConcepts: ['データ指向設計 (DOD) とSoA配列構造', '有向グラフによるベルト線分化', '完全決定論的ロックステップシミュレーション', '差分スナップショットとロールバック復元'],
        technicalArchitecture: 'ポインタ追跡を排除し連続配列に格納することで、CPU L1/L2キャッシュヒット率90%以上を達成します。',
        learningExercises: ['OOPとECSのL1キャッシュミス比較測定', '直線搬送ベルトの数式セグメント化', '固定小数点ロックステップシミュレータ']
      },
      {
        id: 'procedural',
        title: 'プロジェクト3: 無限プロシージャル状態エンジン (No Man\'s Sky)',
        inspiration: "No Man's Sky",
        focus: 'Kotlin, Java, Go, R, Python, MATLAB · 数学モデリング, リアクティブストリーム, 空間インデックス',
        coreConcepts: ['ステートレス座標ハッシュ種生成 f(x,y,z)', '分散四分木 / R-Tree空間検索', '遅延評価リアクティブパイプライン (Flow/Rx)', 'テレメトリ統計分析と乱数検証'],
        technicalArchitecture: 'DBを一切介さず、64ビット座標ハッシュのみから恒星系、大気、鉱物埋蔵量を瞬時に決定論的計算します。',
        learningExercises: ['ステートレス64bit座標ハッシュ関数の作成', '並行安全な四分木インデックスの実装', 'Python/Rを用いたモンテカルロ資源分布解析']
      },
      {
        id: 'kinematic',
        title: 'プロジェクト4: 運動学コンポーネントコンパイラ & 物理 (Scrap Mechanic)',
        inspiration: 'Scrap Mechanic',
        focus: 'C++, Rust, C#, Java, TypeScript · 剛体物理, コンパイラ理論, ハードウェアエミュレーション',
        coreConcepts: ['インパルスベース速度拘束ソルバー', '論理配線ASTコンパイラ', '閉ループ閉路検出 (Tarjan SCC)', '有限要素法による構造応力解析'],
        technicalArchitecture: '軸受やスラスターの物理拘束を解き、論理回路をASTにコンパイルしてスタックオーバーフローなしに実行します。',
        learningExercises: ['インパルス拘束ソルバーの作成', '論理ゲートASTバイトコードコンパイラ', 'ねじりトルクによる接合部せん断応力計算']
      },
      {
        id: 'sandbox',
        title: 'プロジェクト5: サンドボックスVM & マルチテナント基盤 (Roblox)',
        inspiration: 'Roblox',
        focus: 'TypeScript, Go, Dart/Flutter, PHP, Ruby, Bash, PowerShell · クラウドセキュリティ, 仮想化, コンテナ分離',
        coreConcepts: ['cgroupsとseccompによる堅牢サンドボックス', 'マルチテナント短命ポッドのオーケストレーション', 'コンテンツ指向ストレージ (CAS SHA-256)', '自動ファジングとメモリリーク検知'],
        technicalArchitecture: '信頼できないコードに対して厳格な命令数制限とシステムコール遮断を行い、安全に並行実行します。',
        learningExercises: ['GoによるCPU命令制限付き隔離ラッパー', 'PHP/RubyによるCASアセット検証サービス', 'Bashによる自動ファジングスクリプト']
      },
      {
        id: 'economy',
        title: 'プロジェクト6: リレーショナル経済 & 世界状態バックエンド (Terraria)',
        inspiration: 'Terraria',
        focus: 'SQL, Java, C#, Go, COBOL/Assembly, Scala · リレーショナルDB, FinTech, 状態機械',
        coreConcepts: ['2フェーズコミット (2PC) ACID取引所', '関数型進行状態機械 (Scala)', '低レイヤバイナリアーカイブ (COBOL & アセンブラ)', '追記型イベントソーシング台帳とPITR'],
        technicalArchitecture: '厳格な行ロックによりアイテム増殖バグを排除。追記専用台帳により過去の任意時点へのロールバックを保証します。',
        learningExercises: ['PostgreSQL不可分取引ストアドプロシージャ', 'Scalaによるイベント駆動型進行状態機械', 'COBOLレコード形式によるタイルバイナリ圧縮']
      }
    ],
    technologyMatrixTitle: '21言語アーキテクチャ対応表',
    technologyMatrixSummary: '全21プログラミング言語の低レイヤ・分散・データ処理特性を網羅。',
    gradingRubricTitle: '評価・採点ルーブリック',
    gradingRubric: [
      { criteria: 'アーキテクチャの厳密さ', weight: '30%', description: 'ECS、SVO、AST、ACIDの正しい設計と実装。' },
      { criteria: 'メモリとキャッシュ最適化', weight: '25%', description: 'キャッシュ局所性、ヒープ割り当ての最小化。' },
      { criteria: '並行性と堅牢性', weight: '20%', description: 'スレッド安全性、決定論的同期、デッドロック回避。' },
      { criteria: 'コード品質', weight: '15%', description: '言語特性を活かした保守性の高いモジュール設計。' },
      { criteria: 'テストと検証', weight: '10%', description: '単体テスト、ファジング、負荷ベンチマーク。' }
    ],
    glossary: [
      { term: 'Sparse Voxel Octree (SVO)', definition: '空間を8分割して階層化し、ボクセル配列を効率的に圧縮する木構造。' },
      { term: 'Greedy Meshing', definition: '同一平面上の隣接面を大きなポリゴンに結合し頂点数を削減するアルゴリズム。' }
    ]
  },
  ru: {
    languageName: 'Русский',
    dir: 'ltr',
    title: 'KayBiT_Games: Лаборатория системного программирования и песочниц',
    subtitle: 'Комплексное учебное пособие и архитектурный справочник',
    introduction: 'KayBiT_Games проецирует архитектуру 6 культовых игр-песочниц на корпоративные бэкенды, теорию компиляторов и низкоуровневое системное программирование на 21 языке.',
    quickStart: 'Выберите любой проект в верхней панели для запуска интерактивных алгоритмов, анализа исходного кода и телеметрии кэша CPU.',
    projectGuides: [
      {
        id: 'voxel',
        title: 'Проект 1: Распределенный воксельный движок (Minecraft)',
        inspiration: 'Minecraft',
        focus: 'C++, Rust, Go, Java, C# · Системная архитектура, Вычислительные шейдеры, Дельта-синхронизация',
        coreConcepts: ['Вычислительные шейдеры 3D шума Simplex', 'Разреженные воксельные октадеревья (SVO)', 'Алгоритм Greedy Meshing', 'Бинарная дельта-синхронизация FlatBuffers'],
        technicalArchitecture: 'Делит мир на чанки 16x16x256. Объединение компланарных граней снижает вызовы отрисовки GPU на 85%.',
        learningExercises: ['SIMD-генератор 3D шума Simplex', 'Greedy Mesher в C# или Java без выделений в куче', 'Сервер дельта-синхронизации на Go']
      },
      {
        id: 'pipeline',
        title: 'Проект 2: Высокопроизводительный конвейер предметов (Factorio)',
        inspiration: 'Factorio',
        focus: 'Rust, C++, C#, Java, Go · Структуры данных, Параллелизм, Производительность',
        coreConcepts: ['Data-Oriented Design (DOD) и SoA', 'Сегменты логистики на ориентированных графах', 'Детерминированный пошаговый цикл (Lockstep)', 'Дельта-снимки состояния и мгновенный откат'],
        technicalArchitecture: 'Заменяет указатели непрерывными массивами в памяти, обеспечивая >90% попаданий в L1/L2 кэш CPU.',
        learningExercises: ['Замер промахов L1 кэша в ООП против ECS', 'Сегментация конвейеров через линейные уравнения', 'Детерминированный пошаговый цикл с фиксированной запятой']
      },
      {
        id: 'procedural',
        title: 'Проект 3: Бесконечный процедурный генератор вселенной (No Man\'s Sky)',
        inspiration: "No Man's Sky",
        focus: 'Kotlin, Java, Go, R, Python, MATLAB · Математическое моделирование, Реактивные потоки, Пространственный поиск',
        coreConcepts: ['Хэш-генерация без состояния f(x,y,z)', 'Пространственные деревья Quadtree и R-Tree', 'Ленивые реактивные потоки с backpressure', 'Стохастическая верификация распределения ресурсов'],
        technicalArchitecture: 'Генерирует звездные системы, атмосферы и минералы из 64-битных семян координат без базы данных.',
        learningExercises: ['Безвекторная 64-битная хэш-функция координат', 'Параллельный пространственный индекс Quadtree', 'Анализ распределений методом Монте-Карло в Python/R']
      },
      {
        id: 'kinematic',
        title: 'Проект 4: Компилятор кинематических узлов и физика (Scrap Mechanic)',
        inspiration: 'Scrap Mechanic',
        focus: 'C++, Rust, C#, Java, TypeScript · Физическая механика, Теория компиляторов, Моделирование',
        coreConcepts: ['Импульсный солвер скоростных ограничений', 'Компилятор логических цепей в AST', 'Поиск циклов обратной связи (Tarjan SCC)', 'Анализ структурных напряжений методом конечных элементов'],
        technicalArchitecture: 'Моделирует шарниры и двигатели. Компилирует логику в AST для безопасного выполнения в виртуальной машине.',
        learningExercises: ['Импульсный солвер шарнирных ограничений', 'Компилятор логических вентилей в байткод AST', 'Расчет динамических напряжений кручения']
      },
      {
        id: 'sandbox',
        title: 'Проект 5: Изолированная VM и мультиарендная платформа (Roblox)',
        inspiration: 'Roblox',
        focus: 'TypeScript, Go, Dart/Flutter, PHP, Ruby, Bash, PowerShell · Облачная безопасность, Изоляция контейнеров, Fuzzing',
        coreConcepts: ['Песочница на cgroups и seccomp', 'Оркестрация мультиарендных подов', 'Хранилище с адресацией по содержимому (CAS SHA-256)', 'Автоматизированный фаззинг и поиск утечек памяти'],
        technicalArchitecture: 'Ограничивает инструкции CPU и системные вызовы для ненадежного кода, динамически масштабируя микросервисы.',
        learningExercises: ['Изолятор на Go с лимитами команд CPU', 'Микросервис валидации 3D-ассетов на PHP/Ruby', 'Скрипт фаззинг-тестирования на Bash/PowerShell']
      },
      {
        id: 'economy',
        title: 'Проект 6: Реляционная экономика и состояние мира (Terraria)',
        inspiration: 'Terraria',
        focus: 'SQL, Java, C#, Go, COBOL/Assembly, Scala · Реляционные базы, FinTech, Конечные автоматы',
        coreConcepts: ['ACID-рынок с двухфазной фиксацией (2PC)', 'Событийный автомат прогрессии мира (Scala)', 'Низкоуровневая бинарная упаковка чанков (COBOL и Ассемблер)', 'Неизменяемый журнал Event Sourcing с PITR'],
        technicalArchitecture: 'Исключает дюп предметов с помощью построчных блокировок. Неизменяемый журнал обеспечивает полный аудит.',
        learningExercises: ['Атомарная процедура обмена в PostgreSQL', 'Событийно-ориентированный конечный автомат в Scala', 'Бинарный упаковщик чанков в COBOL/Ассемблере']
      }
    ],
    technologyMatrixTitle: 'Матрица соответствия 21 языка программирования',
    technologyMatrixSummary: 'Сопоставление языков с ключевыми концепциями компьютерных наук.',
    gradingRubricTitle: 'Критерии оценки и академический регламент',
    gradingRubric: [
      { criteria: 'Архитектурная строгость', weight: '30%', description: 'Корректность ECS, SVO, AST и транзакций ACID.' },
      { criteria: 'Память и кэш-оптимизация', weight: '25%', description: 'Локальность данных в кэше и минимум аллокаций в куче.' },
      { criteria: 'Параллелизм и надежность', weight: '20%', description: 'Потокобезопасность, детерминизм и защита от взаимных блокировок.' },
      { criteria: 'Качество кода', weight: '15%', description: 'Чистый модульный код с учетом идиом конкретного языка.' },
      { criteria: 'Тестирование и верификация', weight: '10%', description: 'Модульные тесты, фаззинг и замеры производительности.' }
    ],
    glossary: [
      { term: 'Sparse Voxel Octree (SVO)', definition: 'Иерархическая структура данных, разбивающая 3D-пространство на октанты для сжатия вокселей.' },
      { term: 'Greedy Meshing', definition: 'Алгоритм объединения соседних компланарных граней для снижения числа полигонов.' }
    ]
  },
  ar: {
    languageName: 'العربية',
    dir: 'rtl',
    title: 'KayBiT_Games: مختبر برمجة النظم وهندسة ألعاب الصندوق الرملي',
    subtitle: 'دليل المناهج والمرجع المعماري للطلاب',
    introduction: 'يربط مختبر KayBiT_Games بين الهياكل المعمارية لـ 6 ألعاب شهيرة وبين أنظمة الخوادم المؤسسية وتصميم المترجمات وبرمجة النظم عبر 21 لغة برمجية.',
    quickStart: 'اختر أي مشروع من الشريط العلوي لاستكشاف الخوارزميات التفاعلية في الوقت الفعلي وفحص الشيفرات المصدرية بلغات البرمجة المستهدفة.',
    projectGuides: [
      {
        id: 'voxel',
        title: 'المشروع 1: محرك فوكسل موزع (Minecraft)',
        inspiration: 'Minecraft',
        focus: 'C++, Rust, Go, Java, C# · بنية النظم، معالجة الرسوميات، المزامنة الموزعة',
        coreConcepts: ['توليد تضاريس ثلاثية الأبعاد بضوضاء Simplex', 'أشجار الفوكسل الثمانية المتفرقة (SVO)', 'خوارزمية Greedy Meshing لضغط المضلعات', 'مزامنة الفروقات الثنائية FlatBuffers عبر UDP/TCP'],
        technicalArchitecture: 'يقسم العالم إلى كتل بحجم 16x16x256 ويدمج الأوجه المستوية المتجاورة لتخفيض استدعاءات رسم بطاقة الرسوميات بنسبة تصل إلى 85%.',
        learningExercises: ['مولد ضوضاء Simplex مسرع بتعليمات SIMD', 'خوارزمية Greedy Meshing خالية من حجز الذاكرة العشوائية', 'خادم مزامنة فروقات ثنائية في Go']
      },
      {
        id: 'pipeline',
        title: 'المشروع 2: محرك خطوط نقل العناصر عالي الإنتاجية (Factorio)',
        inspiration: 'Factorio',
        focus: 'Rust, C++, C#, Java, Go · تراكيب البيانات، التوازي، هندسة الأداء',
        coreConcepts: ['التصميم الموجه للبيانات (DOD) ومصفوفات SoA', 'نمذجة شبكات النقل بالرسوم البيانية الموجهة', 'محاكاة حتمية متزامنة الخطوات (Lockstep)', 'لقطات الحالة التفاضلية والتراجع الفوري'],
        technicalArchitecture: 'يستبدل تتبع مؤشرات الكائنات بمصفوفات متصلة بالذاكرة لتحقيق معدل إصابة في الذاكرة المخبأة L1/L2 يتجاوز 90%.',
        learningExercises: ['قياس إخفاقات الذاكرة المخبأة L1 بين البرمجة الكائنية ونظام ECS', 'دمج مسارات النقل في معادلات سرعة خطية', 'محاكي خطوات حتمي باستخدام الأعداد الثابتة']
      },
      {
        id: 'procedural',
        title: 'المشروع 3: محرك الحالة الإجرائية اللانهائية (No Man\'s Sky)',
        inspiration: "No Man's Sky",
        focus: 'Kotlin, Java, Go, R, Python, MATLAB · النمذجة الرياضية، التدفقات التفاعلية، الفهرسة المكانية',
        coreConcepts: ['تجزئة الإحداثيات عديمة الحالة f(x,y,z)', 'فهرسة مكانية سريعة بأشجار Quadtree و R-Tree', 'تدفقات بيانات تفاعلية مع كبح الضغط الخلفي', 'تحليل قياسات التوزيع العشوائي للموارد'],
        technicalArchitecture: 'يحسب خصائص الكواكب والأغلفة الجوية والمعادن آنياً من بذور الإحداثيات دون الحاجة لتخزينها في قاعدة بيانات.',
        learningExercises: ['صياغة دالة تجزئة إحداثيات 64-بت عديمة الحالة', 'بناء فهرس Quadtree مكاني متزامن', 'التحقق العشوائي من توزيع العناصر عبر Python أو R']
      },
      {
        id: 'kinematic',
        title: 'المشروع 4: مترجم المكونات الحركية ومحرك الفيزياء (Scrap Mechanic)',
        inspiration: 'Scrap Mechanic',
        focus: 'C++, Rust, C#, Java, TypeScript · الميكانيكا الفيزيائية، نظرية المترجمات، محاكاة العتاد',
        coreConcepts: ['حلال قيود السرعة القائم على الدفعات', 'مترجم شجرة النحو المجردة (AST) لشبكات المنطق', 'اكتشاف الحلقات المغلقة المغذية (خوارزمية Tarjan)', 'محلل الإجهاد الهيكلي بالعناصر المحدودة'],
        technicalArchitecture: 'يحل قيود المحامل والنوابض والدوافع. يترجم توصيلات الدوائر المنطقية إلى شجرة AST تنفذ بأمان داخل آلة افتراضية.',
        learningExercises: ['حلال قيود السرعة الاندفاعية في C++ أو Rust', 'مترجم دوائر المنطق إلى بايت كود AST', 'حساب متجهات إجهاد القص تحت عزم الدوران']
      },
      {
        id: 'sandbox',
        title: 'المشروع 5: بيئة معزولة ومنصة سحابية متعددة المستأجرين (Roblox)',
        inspiration: 'Roblox',
        focus: 'TypeScript, Go, Dart/Flutter, PHP, Ruby, Bash, PowerShell · أمان السحابة، عزل الحاويات، المحاكاة الافتراضية',
        coreConcepts: ['صندوق رمل معزز بمجموعات التحكم cgroups و seccomp', 'إدارة حاويات سريعة الزوال متعددة المستأجرين', 'تخزين معنون بالمحتوى (CAS SHA-256)', 'سلاسل أدوات فحص الأمان واختبار الثغرات التلقائي'],
        technicalArchitecture: 'يطبق حصصاً صارمة على تعليمات المعالج ويحجب نداءات النظام للشيفرات غير الموثوقة مع التوسع التلقائي للخدمات المصغرة.',
        learningExercises: ['غلاف عزل برمجي في Go يحدد حصص المعالج', 'خدمة مصغرة للتحقق من الأصول ثلاثية الأبعاد في PHP/Ruby', 'سكربت فحص ثغرات تلقائي في Bash أو PowerShell']
      },
      {
        id: 'economy',
        title: 'المشروع 6: الاقتصاد العلائقي وخلفية حالة العالم (Terraria)',
        inspiration: 'Terraria',
        focus: 'SQL, Java, C#, Go, COBOL/Assembly, Scala · الأنظمة العلائقية، التكنولوجيا المالية، آلات الحالة',
        coreConcepts: ['سوق متوافق مع معايير ACID بتثبيت ثنائي المرحلة', 'آلة حالة أحداث تقدم العالم (Scala)', 'أرشفة ثنائية منخفضة المستوى للقطع (COBOL والتجميع)', 'سجل تدقيق غير قابل للتغيير مع استعادة الحالة'],
        technicalArchitecture: 'يقضي على ثغرات تكرار العناصر عبر أقفال الصفوف الحصرية. يسجل دفتر الأحداث جميع التغييرات لضمان استعادة الحالة بدقة.',
        learningExercises: ['إجراء مخزن في PostgreSQL لتبادل ذري آمن', 'تصميم آلة حالة تقدم العالم الموجهة بالأحداث في Scala', 'تعبئة مصفوفات البلاط الثنائية بتنسيق COBOL والتجميع']
      }
    ],
    technologyMatrixTitle: 'دليل مطابقة 21 لغة برمجية',
    technologyMatrixSummary: 'ربط منهجي شامل بين لغات النظم واللغات المدارة والوظيفية وهندسة الحوسبة السحابية.',
    gradingRubricTitle: 'معايير التقييم والدرجات للطلاب',
    gradingRubric: [
      { criteria: 'الدقة المعمارية', weight: '30%', description: 'التنفيذ الصحيح لأنظمة ECS و SVO ومترجمات AST ومعاملات ACID.' },
      { criteria: 'تحسين الذاكرة والمخبأة', weight: '25%', description: 'محلية البيانات في الذاكرة وتقليل حجز الذاكرة وتخفيف عبء جامع المهملات.' },
      { criteria: 'التوازي والموثوقية', weight: '20%', description: 'أمان الخيوط والمحاكاة الحتمية ومنع حالات الجمود المتبادل.' },
      { criteria: 'جودة الشيفرة البرمجية', weight: '15%', description: 'كتابة شيفرات نظيفة وقياسية تتبع أفضل ممارسات اللغات.' },
      { criteria: 'الاختبارات والقياسات', weight: '10%', description: 'اختبارات الوحدة واختبارات الثغرات وفحوصات الأداء الإجهادية.' }
    ],
    glossary: [
      { term: 'Sparse Voxel Octree (SVO)', definition: 'هيكل شجري يقسم الفضاء ثلاثي الأبعاد إلى ثمانيات لضغط شبكات الفوكسل بكفاءة عالية.' },
      { term: 'Greedy Meshing', definition: 'خوارزمية تدمج الأوجه المتجاورة في مضلعات موحدة لتقليص عدد رؤوس الرسوميات.' }
    ]
  },
  // Remaining languages are defined with language-specific authentic metadata and translations
  it: {
    languageName: 'Italiano',
    dir: 'ltr',
    title: 'KayBiT_Games: Laboratorio di Programmazione di Sistemi e Sandbox',
    subtitle: 'Curriculum Completo per Studenti e Riferimento di Architettura',
    introduction: 'KayBiT_Games collega 6 architetture iconiche di giochi sandbox con backend enterprise, compilatori e programmazione a basso livello in 21 linguaggi.',
    quickStart: 'Seleziona un laboratorio di progetto nella barra superiore per esplorare simulazioni in tempo reale, confrontare implementazioni e monitorare la telemetria.',
    projectGuides: [],
    technologyMatrixTitle: 'Matrice di Mappatura delle Tecnologie',
    technologyMatrixSummary: 'Tutti i 21 linguaggi mappati alle discipline fondamentali dell\'informatica.',
    gradingRubricTitle: 'Rubrica di Valutazione Accademica',
    gradingRubric: [
      { criteria: 'Rigore Architetturale', weight: '30%', description: 'Implementazione corretta di ECS, SVO, compilatori AST e transazioni ACID.' },
      { criteria: 'Ottimizzazione Memoria e Cache', weight: '25%', description: 'Località della cache ed eliminazione di allocazioni inutili.' }
    ],
    glossary: []
  },
  pt: {
    languageName: 'Português',
    dir: 'ltr',
    title: 'KayBiT_Games: Laboratório de Programação de Sistemas e Sandbox',
    subtitle: 'Currículo Completo de Engenharia e Referência Arquitetural',
    introduction: 'KayBiT_Games mapeia 6 arquiteturas lendárias de sandbox para sistemas de backend corporativos, compiladores e programação de baixo nível em 21 linguagens.',
    quickStart: 'Selecione qualquer laboratório na barra superior para manipular algoritmos interativos em tempo real e inspecionar implementações.',
    projectGuides: [],
    technologyMatrixTitle: 'Guia de Mapeamento Tecnológico (21 Linguagens)',
    technologyMatrixSummary: 'Mapeamento abrangente de linguagens nativas, gerenciadas e funcionais.',
    gradingRubricTitle: 'Critérios e Rúbrica de Avaliação',
    gradingRubric: [
      { criteria: 'Rigor Arquitetural', weight: '30%', description: 'Aderência a padrões ECS, SVO, AST e ACID.' },
      { criteria: 'Otimização de Cache e Memória', weight: '25%', description: 'Localidade de dados em cache e redução de GC.' }
    ],
    glossary: []
  },
  id: {
    languageName: 'Bahasa Indonesia',
    dir: 'ltr',
    title: 'KayBiT_Games: Lab Pemrograman Sistem & Arsitektur Sandbox',
    subtitle: 'Panduan Kurikulum Mahasiswa & Referensi Rekayasa Komputer',
    introduction: 'KayBiT_Games menghubungkan 6 arsitektur sandbox legendaris dengan backend perusahaan, kompilator, dan pemrograman tingkat rendah dalam 21 bahasa.',
    quickStart: 'Pilih lab proyek dari navigasi atas untuk bereksperimen dengan algoritma real-time dan menganalisis kode sumber multi-bahasa.',
    projectGuides: [],
    technologyMatrixTitle: 'Matriks Pemetaan 21 Bahasa Pemrograman',
    technologyMatrixSummary: 'Peta komparatif mendalam dari bahasa tingkat rendah hingga arsitektur cloud.',
    gradingRubricTitle: 'Rubrik Penilaian Akademik',
    gradingRubric: [
      { criteria: 'Kekokohan Arsitektur', weight: '30%', description: 'Implementasi ECS, SVO, kompilator AST, dan transaksi ACID.' }
    ],
    glossary: []
  },
  sw: {
    languageName: 'Kiswahili',
    dir: 'ltr',
    title: 'KayBiT_Games: Maabara ya Mifumo ya Kompyuta na Sanduku la Mchanga',
    subtitle: 'Mwongozo wa Mtaala wa Wanafunzi na Marejeleo ya Uhandisi',
    introduction: 'KayBiT_Games inaunganisha miundo 6 mashuhuri ya michezo ya kompyuta na mifumo ya juu ya seva, vichanganuzi, na lugha 21 za programu.',
    quickStart: 'Chagua mradi wowote kwenye upau wa juu ili kuanzisha uigaji wa moja kwa moja na kuchunguza msimbo.',
    projectGuides: [],
    technologyMatrixTitle: 'Ramani ya Teknolojia na Lugha 21',
    technologyMatrixSummary: 'Mpangilio kamili wa lugha za mifumo na uhandisi wa programu.',
    gradingRubricTitle: 'Viwango vya Tathmini ya Masomo',
    gradingRubric: [
      { criteria: 'Ukamilifu wa Muundo', weight: '30%', description: 'Utekelezaji sahihi wa miundo ya kompyuta na usalama wa data.' }
    ],
    glossary: []
  },
  tr: {
    languageName: 'Türkçe',
    dir: 'ltr',
    title: 'KayBiT_Games: Sistem Programlama ve Sandbox Mimarisi Laboratuvarı',
    subtitle: 'Kapsamlı Öğrenci Müfredatı ve Sistem Mimarisi Referansı',
    introduction: 'KayBiT_Games, 6 ikonik sandbox oyununun temel mimarisini kurumsal arka uç sistemlerine, derleyici tasarımına ve 21 dilde sistem programlamaya bağlar.',
    quickStart: 'Üst gezinme çubuğundan bir proje seçerek gerçek zamanlı algoritmaları deneyimleyin ve kaynak kodlarını karşılaştırın.',
    projectGuides: [],
    technologyMatrixTitle: '21 Dil Teknoloji Haritalama Matrisi',
    technologyMatrixSummary: 'Sistem dillerinden bulut mimarilerine kapsamlı karşılaştırma.',
    gradingRubricTitle: 'Akademik Değerlendirme Rubriği',
    gradingRubric: [
      { criteria: 'Mimari Titizlik', weight: '30%', description: 'ECS, SVO, AST ve ACID işlemlerinin eksiksiz uygulanması.' }
    ],
    glossary: []
  },
  ur: {
    languageName: 'اردو',
    dir: 'rtl',
    title: 'KayBiT_Games: سسٹمز پروگرامنگ اور سینڈ باکس آرکیٹیکچر لیب',
    subtitle: 'طلباء کے لیے جامع نصاب اور انجینئرنگ ریفرنس گائیڈ',
    introduction: 'KayBiT_Games چھ مشہور سینڈ باکس گیمز کے بنیادی فن تعمیر کو 21 پروگرامنگ زبانوں میں کمپائلرز، فزکس انجنز اور انٹرپرائز بیک اینڈ سسٹمز کے ساتھ جوڑتا ہے۔',
    quickStart: 'اوپری نیویگیشن سے کسی بھی پروجیکٹ لیب کو منتخب کریں تاکہ رئیل ٹائم الگورتھم کو چلا سکیں اور سورس کوڈ کا موازنہ کر سکیں۔',
    projectGuides: [],
    technologyMatrixTitle: '21 پروگرامنگ زبانوں کی آرکیٹیکچرل میپنگ',
    technologyMatrixSummary: 'سسٹمز پروگرامنگ، منیجڈ رن ٹائمز، اور کلاؤڈ کمپیوٹنگ کے اصول۔',
    gradingRubricTitle: 'تعلیمی جانچ اور نمبروں کا معیار',
    gradingRubric: [
      { criteria: 'معماری درستگی', weight: '30%', description: 'ای سی ایس، آکٹ ٹریز، اے ایس ٹی کمپائلرز اور ٹرانزیکشنز کا درست نفاذ۔' }
    ],
    glossary: []
  },
  hi: {
    languageName: 'हिन्दी',
    dir: 'ltr',
    title: 'KayBiT_Games: सिस्टम्स प्रोग्रामिंग और सैंडबॉक्स आर्किटेक्चर लैब',
    subtitle: 'छात्रों के लिए विस्तृत पाठ्यक्रम और कंप्यूटर सिस्टम्स संदर्भ निर्देशिका',
    introduction: 'KayBiT_Games 6 प्रतिष्ठित सैंडबॉक्स गेम्स की आंतरिक वास्तुकला को 21 प्रोग्रामिंग भाषाओं में एंटरप्राइज बैकएंड, कंपाइलर डिजाइन और लो-लेवल सिस्टम्स प्रोग्रामिंग से जोड़ता है।',
    quickStart: 'शीर्ष नेविगेशन बार से किसी भी प्रोजेक्ट लैब को चुनें और रीयल-टाइम एल्गोरिदम को संचालित कर बहु-भाषी कोड की तुलना करें।',
    projectGuides: [],
    technologyMatrixTitle: '21 प्रोग्रामिंग भाषाओं की मैपिंग गाइड',
    technologyMatrixSummary: 'सिस्टम्स, डेटा स्ट्रक्चर्स और वितरित आर्किटेक्चर का पूर्ण तुलनात्मक विश्लेषण।',
    gradingRubricTitle: 'मूल्यांकन और अंकन मानदंड',
    gradingRubric: [
      { criteria: 'आर्किटेक्चरल शुद्धता', weight: '30%', description: 'ECS, SVO, AST और ACID डेटाबेस अखंडता का सटीक कार्यान्वयन।' }
    ],
    glossary: []
  },
  vi: {
    languageName: 'Tiếng Việt',
    dir: 'ltr',
    title: 'KayBiT_Games: Phòng Thí Nghiệm Lập Trình Hệ Thống & Sandbox',
    subtitle: 'Giáo Trình Sinh Viên Toàn Diện & Tài Liệu Tham Khảo Kỹ Thuật',
    introduction: 'KayBiT_Games kết nối cấu trúc của 6 trò chơi sandbox huyền thoại với kỹ nghệ máy chủ doanh nghiệp, trình biên dịch và lập trình cấp thấp trên 21 ngôn ngữ.',
    quickStart: 'Chọn bất kỳ phòng thí nghiệm nào trên thanh công cụ để trải nghiệm các mô phỏng thời gian thực và phân tích mã nguồn.',
    projectGuides: [],
    technologyMatrixTitle: 'Ma Trận Ánh Xạ 21 Ngôn Ngữ Lập Trình',
    technologyMatrixSummary: 'Phân tích hệ thống toàn diện từ mã máy đến dịch vụ đám mây.',
    gradingRubricTitle: 'Tiêu Chuẩn Đánh Giá Học Thuật',
    gradingRubric: [
      { criteria: 'Tính Chặt Chẽ Kiến Trúc', weight: '30%', description: 'Triển khai chuẩn xác ECS, SVO, AST và giao dịch ACID.' }
    ],
    glossary: []
  },
  ko: {
    languageName: '한국어',
    dir: 'ltr',
    title: 'KayBiT_Games: 샌드박스 시스템 프로그래밍 & 아키텍처 실습실',
    subtitle: '고급 컴퓨터 과학 전공 학생을 위한 종합 커리큘럼 및 기술 가이드',
    introduction: 'KayBiT_Games는 6대 대표 샌드박스 게임의 핵심 아키텍처를 21개 프로그래밍 언어를 통해 엔터프라이즈 백엔드, 컴파일러 설계, 로우레벨 시스템 프로그래밍으로 전환하여 학습합니다.',
    quickStart: '상단 네비게이션에서 원하는 프로젝트를 선택하여 실시간 알고리즘을 체험하고 언어별 소스 코드를 비교 분석하세요.',
    projectGuides: [],
    technologyMatrixTitle: '21개 프로그래밍 언어 아키텍처 매핑 가이드',
    technologyMatrixSummary: '네이티브, 관리형, 함수형 및 클라우드 언어의 성능과 아키텍처 비교.',
    gradingRubricTitle: '학업 평가 및 채점 루브릭',
    gradingRubric: [
      { criteria: '아키텍처 엄밀성', weight: '30%', description: 'ECS, SVO, AST 컴파일러 및 ACID 트랜잭션의 정확한 구현.' }
    ],
    glossary: []
  },
  fa: {
    languageName: 'فارسی',
    dir: 'rtl',
    title: 'KayBiT_Games: آزمایشگاه برنامه‌نویسی سیستم و معماری سندباکس',
    subtitle: 'راهنمای جامع برنامه درسی دانشجویان و مرجع مهندسی سیستم‌ها',
    introduction: 'پروژه KayBiT_Games معماری ۶ بازی سندباکس نمادین را در ۲۱ زبان برنامه‌نویسی به سیستم‌های توزیع‌شده سازمانی، طراحی کامپایلر و برنامه‌نویسی سطح پایین متصل می‌کند.',
    quickStart: 'از نوار ناوبری بالا هر آزمایشگاه را انتخاب کنید تا الگوریتم‌های بلادرنگ را آزمایش کرده و کدها را مقایسه نمایید.',
    projectGuides: [],
    technologyMatrixTitle: 'ماتریس نگاشت ۲۱ زبان برنامه‌نویسی',
    technologyMatrixSummary: 'مقایسه جامع بین زبان‌های سطح ماشین، مدیریت‌شده و ابری.',
    gradingRubricTitle: 'معیارهای ارزیابی تحصیلی',
    gradingRubric: [
      { criteria: 'دقت معماری', weight: '30%', description: 'پیاده‌سازی دقیق الگوهای ECS، SVO، کامپایلرهای AST و تراکنش‌های ACID.' }
    ],
    glossary: []
  },
  mr: {
    languageName: 'मराठी',
    dir: 'ltr',
    title: 'KayBiT_Games: सिस्टीम्स प्रोग्रामिंग आणि सँडबॉक्स आर्किटेक्चर लॅब',
    subtitle: 'विद्यार्थ्यांसाठी सर्वसमावेशक अभ्यासक्रम आणि अभियांत्रिकी संदर्भ पुस्तिका',
    introduction: 'KayBiT_Games ६ प्रसिद्ध सँडबॉक्स गेम्सच्या आर्किटेक्चरला २१ प्रोग्रामिंग भाषांमध्ये एंटरप्राइझ बॅकएंड आणि सिस्टीम प्रोग्रामिंगशी जोडते.',
    quickStart: 'रिअल-टाइम अल्गोरिदम एक्सप्लोर करण्यासाठी आणि विविध भाषांमधील कोड तपासण्यासाठी शीर्ष नेव्हिगेशनमधून प्रोजेक्ट निवडा.',
    projectGuides: [],
    technologyMatrixTitle: '२१ प्रोग्रामिंग भाषांचे आर्किटेक्चरल मॅपिंग',
    technologyMatrixSummary: 'सिस्टीम्स इंजिनिअरिंग आणि डेटा स्ट्रक्चर्सचा सखोल अभ्यास.',
    gradingRubricTitle: 'मूल्यांकन निकष आणि मार्गदर्शक',
    gradingRubric: [
      { criteria: 'आर्किटेक्चरल अचूकता', weight: '30%', description: 'ECS, SVO आणि ACID चे अचूक कार्यान्वयन.' }
    ],
    glossary: []
  },
  bn: {
    languageName: 'বাংলা',
    dir: 'ltr',
    title: 'KayBiT_Games: সিস্টেমস প্রোগ্রামিং ও স্যান্ডবক্স আর্কিটেকচার ল্যাব',
    subtitle: 'উন্নত প্রোগ্রামিং শিক্ষার্থীদের জন্য পূর্ণাঙ্গ পাঠ্যক্রম ও রেফারেন্স',
    introduction: 'KayBiT_Games ৬টি আইকনিক স্যান্ডবক্স গেমের আর্কিটেকচারকে ২১টি ভাষায় এন্টারপ্রাইজ ব্যাকএন্ড ও লো-লেভেল সিস্টেমস প্রোগ্রামিংয়ের সাথে সংযুক্ত করে।',
    quickStart: 'রিয়েল-টাইম অ্যালগরিদম পরীক্ষা করতে এবং বিভিন্ন ভাষার সোর্স কোড দেখতে উপরের মেনু থেকে প্রজেক্ট নির্বাচন করুন।',
    projectGuides: [],
    technologyMatrixTitle: '২১টি প্রোগ্রামিং ভাষার প্রযুক্তি ম্যাপিং',
    technologyMatrixSummary: 'কম্পিউটার সায়েন্সের মৌলিক ক্ষেত্রগুলির সাথে ভাষাগুলির নিখুঁত ম্যাপিং।',
    gradingRubricTitle: 'অ্যাকাডেমিক মূল্যায়ন নির্দেশিকা',
    gradingRubric: [
      { criteria: 'আর্কিটেকচারাল নির্ভুলতা', weight: '30%', description: 'ECS, SVO, AST কম্পাইলার ও ACID ট্রানজ্যাকশনের সঠিক বাস্তবায়ন।' }
    ],
    glossary: []
  },
  ta: {
    languageName: 'தமிழ்',
    dir: 'ltr',
    title: 'KayBiT_Games: சிஸ்டம்ஸ் புரோகிராமிங் மற்றும் சாண்ட்பாக்ஸ் ஆய்வகம்',
    subtitle: 'மாணவர்களுக்கான விரிவான பாடத்திட்டம் மற்றும் தொழில்நுட்பக் கையேடு',
    introduction: 'KayBiT_Games 6 புகழ்பெற்ற சாண்ட்பாக்ஸ் விளையாட்டுகளின் கட்டமைப்பை 21 நிரலாக்க மொழிகளில் கணினி அமைப்புகளுடன் இணைக்கிறது.',
    quickStart: 'நிகழ்நேர வழிமுறைகளை இயக்க மற்றும் மூலக் குறியீடுகளை ஆய்வு செய்ய மேல் பட்டியில் உள்ள திட்டத்தைத் தேர்ந்தெடுக்கவும்.',
    projectGuides: [],
    technologyMatrixTitle: '21 நிரலாக்க மொழிகளின் ஒப்பீட்டு அட்டவணை',
    technologyMatrixSummary: 'குறைந்த நிலை நிரலாக்கம் முதல் கிளவுட் சேவைகள் வரை முழுமையான ஒப்பீடு.',
    gradingRubricTitle: 'மதிப்பீட்டு அளவுகோல்கள்',
    gradingRubric: [
      { criteria: 'கட்டமைப்புத் துல்லியம்', weight: '30%', description: 'ECS, SVO, AST தொகுப்பி மற்றும் ACID அமைப்புகளின் சரியான செயல்படுத்தல்.' }
    ],
    glossary: []
  },
  te: {
    languageName: 'తెలుగు',
    dir: 'ltr',
    title: 'KayBiT_Games: సిస్టమ్స్ ప్రోగ్రామింగ్ & శాండ్‌బాక్స్ ఆర్కిటెక్చర్ ల్యాబ్',
    subtitle: 'అధునాతన ప్రోగ్రామింగ్ విద్యార్థుల పాఠ్యాంశాలు & సాంకేతిక గైడ్',
    introduction: 'KayBiT_Games 6 ప్రసిద్ధ శాండ్‌బాక్స్ గేమ్‌ల ఆర్కిటెక్చర్‌ను 21 ప్రోగ్రామింగ్ భాషల్లో ఎంటర్‌ప్రైజ్ బ్యాకెండ్‌లు మరియు సిస్టమ్స్ ప్రోగ్రామింగ్‌తో అనుసంధానిస్తుంది.',
    quickStart: 'రియల్-టైమ్ అల్గారిథమ్‌లను పరిశీలించడానికి మరియు కోడ్‌ను తనిఖీ చేయడానికి ఎగువ నావిగేషన్ నుండి ప్రాజెక్ట్‌ను ఎంచుకోండి.',
    projectGuides: [],
    technologyMatrixTitle: '21 ప్రోగ్రామింగ్ భాషల సాంకేతిక మ్యాపింగ్',
    technologyMatrixSummary: 'సిస్టమ్స్ ప్రోగ్రామింగ్ మరియు కంప్యూటర్ సైన్స్ కాన్సెప్ట్‌ల సంపూర్ణ విశ్లేషణ.',
    gradingRubricTitle: 'అకడమిక్ మూల్యాంకన ప్రమాణాలు',
    gradingRubric: [
      { criteria: 'ఆర్కిటెక్చరల్ ఖచ్చితత్వం', weight: '30%', description: 'ECS, SVO, AST కంపైలర్ మరియు ACID లావాదేవీల ఖచ్చితమైన అమలు.' }
    ],
    glossary: []
  }
};
