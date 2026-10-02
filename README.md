# KayBiT_Games: Sandbox Systems Programming & Architecture Lab

An enterprise-grade educational platform and interactive laboratory bridging **6 iconic sandbox game architectures** with **enterprise backend engineering, compiler design, engine architectures, and low-level systems programming** across **21 programming languages**.

Developed specifically for advanced programming students and systems engineering cohorts.

---

## 🚀 Key Highlights & Capabilities

* **6 Groundbreaking Architectural Labs**:
  1. 🟩 **Minecraft** $\to$ *Distributed Voxel Engine*: 3D Simplex Compute Shaders, Sparse Voxel Octrees (SVO), Chunk Paging Cache, Greedy Meshing Polygons, Binary FlatBuffers Delta Sync.
  2. 🟫 **Factorio** $\to$ *High-Throughput Item Pipeline Engine*: Data-Oriented Design (DOD) vs OOP, Contiguous ECS Memory Arrays, Directed Graph Logistics Segments, Deterministic Lockstep Simulation, Delta Rollbacks.
  3. 🟦 **No Man's Sky** $\to$ *Infinite Procedural State Engine*: Coordinate Seed Hash Pipeline $f(x,y,z)$, Distributed Spatial Quadtree/R-Tree API, Reactive Lazy Streams (Kotlin Flow/RxJava), R/Python/MATLAB Distribution Analytics.
  4. 🟨 **Scrap Mechanic** $\to$ *Kinematic Component Compiler & Physics*: Rigid-Body Constraint Solvers (springs, bearings, thrusters), Visual AST Grid Wiring Compiler, Closed-Loop Cycle Detection (Tarjan SCC), Finite-Element Structural Stress Profiler.
  5. 🟥 **Roblox** $\to$ *Sandboxed VM & Multi-tenant Cloud Platform*: Hardened VM Sandbox (cgroups limits, seccomp syscall filters, instruction gas meter), Multi-tenant Microservice Mesh Orchestrator, Content-Addressable Storage (CAS SHA-256), Bash & PowerShell Fuzzing Toolchains.
  6. 🟪 **Terraria** $\to$ *Relational Economy & World State Backend*: ACID 2-Phase Commit (2PC) / Serializable Marketplace, Event-driven Finite State Machine (Scala), Low-Level Binary Chunk Archiving (COBOL & Assembly), Append-Only Distributed Event Sourcing with Point-in-Time Recovery (PITR).

* **21 Target Programming Languages**:
  * Python, JavaScript, TypeScript, Java, C#, Kotlin, Dart/Flutter, Bash/Shell, Rust, Go (Golang), C++, C, PHP, Ruby, PowerShell, SQL, R, Scala, MATLAB, COBOL, x86-64 Assembly.

* **21 Internationalization Languages & Native Text-to-Speech (TTS)**:
  * Fully translated comprehensive User Guide available in English, French, German, Italian, Spanish, Portuguese, Indonesian, Swahili, Turkish, Russian, Chinese (Simplified), Japanese, Arabic (with RTL), Urdu (with RTL), Hindi, Vietnamese, Korean, Farsi/Persian (with RTL), Marathi, Bangla, Tamil, and Telugu.
  * Instant dropdown switching inside the application and modal.
  * **Native Text-to-Speech (TTS) Narration**: Built with the native `window.speechSynthesis` API matching the closest system voice for all 22 language guides with sentence chunking (preventing WebKit speech freeze), background audio permissions, and cross-browser playback controls (Play, Pause, Stop, Rate selector).

* **Cross-Platform Native Installation (INSTALLATION.md)**:
  * Complete, step-by-step installation guides for:
    * **Android**: Standalone APK & Google Play App Bundle (AAB) via Capacitor
    * **iOS / iPadOS**: Apple Home Screen PWA & Native Xcode IPA Bundle
    * **Windows**: Native `.exe` (NSIS) and `.msi` installers via Electron / Tauri
    * **macOS**: Universal `.dmg` and `.app` for Apple Silicon & Intel x64
    * **Universal Web**: Instant PWA with 100% offline service worker caching.
  * Direct in-app installation modal with one-click build script generation.

---

## 🛠️ Technology Mapping Matrix

| Language | Primary Focus | Modules Addressed | Core Architectural Concepts |
| :--- | :--- | :--- | :--- |
| **C++** | Native Graphics & Physics | Project 1, 2, 4 | Compute Shaders, Greedy Meshing, SIMD Math, Impulse Solvers |
| **Rust** | Memory Safety & ECS | Project 1, 2, 4 | Zero-cost abstractions, Data-Oriented Design, AST Bytecode VM |
| **Go** | Distributed Delta Sync | Project 1, 3, 5 | Low-latency FlatBuffers delta streaming, Microservice mesh, Linux cgroups |
| **Java** | Managed Engine & Escrow | Project 1, 2, 6 | Off-heap memory caching, Disruptor ring buffers, 2PC transaction coordinator |
| **C#** | High-performance DOD | Project 1, 2, 4 | Cache-friendly arrays, Deterministic fixed-point math, Stress profilers |
| **Python** | Procedural Analytics | Project 3, 5 | Vectorized seed hashing, Stochastic distribution testing, Sandbox hooks |
| **TypeScript** | Web Engine & AST Compiler | Project 4, 5 | Visual node wiring graph, Closed-loop cycle detection, Isolate wrappers |
| **Kotlin** | Asynchronous Streaming | Project 3, 5 | Reactive Flow data pipes, Backpressure mitigation, Dynamic event dispatch |
| **Dart / Flutter** | Cross-Platform Telemetry | Project 5 | Reactive cluster dashboards, Real-time state synchronization |
| **Bash / Shell** | DevOps Infrastructure | Project 5 | Namespace isolation scripts, Seccomp audit filters, Automated deployment |
| **PowerShell** | Enterprise DevOps | Project 5 | Automated container deployment, Memory leak sanitizers, Security fuzzers |
| **C** | Minimalist Kernels | Project 1, 4 | Bare-metal pointer manipulation, Custom memory pools, Bitwise operations |
| **PHP** | Content Ingestion | Project 5 | Content-Addressable Storage (CAS) APIs, Asset validation endpoints |
| **Ruby** | Rapid Service Prototyping| Project 5 | RESTful microservice routing, Dynamic asset metadata compilers |
| **SQL** | Relational Invariants | Project 6 | ACID serializable isolation, Row-level lock escrow, Anti-duplication schema |
| **Scala** | Functional Progression | Project 6 | Immutable event-sourcing streams, Progression finite state machines |
| **R** | Statistical Validation | Project 3 | Procedural distribution histograms, Chemical density curves, Monte Carlo tests |
| **MATLAB** | Spatial Mathematics | Project 3 | Continuous eigenvalue terrain analysis, High-dimensional spatial models |
| **COBOL** | Binary Ledger Serialization | Project 6 | Fixed-width raw record layouts (`01 CHUNK-RECORD`), High-throughput chunk parser |
| **Assembly** | Micro-Optimization | Project 6 | Bitmask tile packing, Direct CPU register serialization, SIMD packing |
| **JavaScript** | Interactive Canvas | Project 4, 5 | Dynamic DOM visualization, Lightweight script sandbox execution |

---

## 🏃 Getting Started & Local Development

### Prerequisites
* Node.js $\ge 18$
* npm $\ge 9$

### Installation
```bash
# Clone the repository
git clone https://github.com/kaybit/kaybit-games-systems-lab.git
cd kaybit-games-systems-lab

# Install dependencies
npm install

# Launch development server (default port 3000)
npm run dev

# Build production bundle
npm run build
```

---

## 📖 Educational Curriculum Structure

The laboratory is structured into weekly milestones for computer science instruction:
1. **Week 1–2: Spatial Partitioning & GPU Culling** (Minecraft module / SVO & Greedy Meshing).
2. **Week 3–4: Cache Hierarchies & Deterministic Concurrency** (Factorio module / ECS & Lockstep).
3. **Week 5–6: Hash Derivation & Reactive Data Streams** (No Man's Sky module / Procedural seeds & R-Tree).
4. **Week 7–8: Physics Solvers & Compiler Design** (Scrap Mechanic module / AST Compiler & Solvers).
5. **Week 9–10: Virtualization & Cloud Multi-Tenancy** (Roblox module / cgroups, seccomp & CAS).
6. **Week 11–12: Relational Integrity & Event Sourcing** (Terraria module / 2PC Transactions & Ledger).

---

## 📜 License
Apache-2.0 License. Designed for higher education and systems programming curricula worldwide.
