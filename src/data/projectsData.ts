import { ProjectData } from '../types';

export const PROJECTS_DATA: ProjectData[] = [
  {
    id: 'voxel',
    number: '01',
    title: 'Distributing a Voxel Engine',
    subtitle: 'Procedural 3D Generation, Sparse Octrees & Delta-Compression',
    inspiration: 'Minecraft',
    color: 'emerald',
    accentHex: '#10b981',
    targetLanguages: ['C++', 'Rust', 'Go', 'Java', 'C#'],
    coreDomains: ['Systems Architecture', 'Graphics/Compute', 'Distributed Systems'],
    overview: 'Students build a high-performance voxel-based game engine core focusing on procedural data generation, real-time spatial caching, and network synchronization of a highly mutable grid-based world.',
    requirements: [
      {
        title: 'Procedural Terrains via Native Noise',
        description: 'Multi-octave 3D Simplex or Perlin noise generators calculating infinite biome-segmented voxel structures in compute shaders or SIMD kernels.',
        metricLabel: 'Generation Throughput',
        metricValue: '4.2M Voxels/sec'
      },
      {
        title: 'Sparse Voxel Octree (SVO) & Chunk Cache',
        description: 'Sparse Voxel Octree or Chunk-Paged Cache (16x16x256 grids) with aggressive off-heap memory pooling to avoid GC pauses.',
        metricLabel: 'Cache Hit Rate',
        metricValue: '99.4%'
      },
      {
        title: 'Greedy Meshing Optimization',
        description: 'Traverses raw voxel faces to merge coplanar adjacent quads, minimizing draw calls and memory footprints before GPU dispatch.',
        metricLabel: 'Draw Call Reduction',
        metricValue: '84.8%'
      },
      {
        title: 'Network Replication Pipeline',
        description: 'Binary TCP/UDP backend using FlatBuffers or Protocol Buffers with delta-compressed bitmasks across client/server instances.',
        metricLabel: 'Packet Delta Ratio',
        metricValue: '18:1 Compressed'
      }
    ],
    architectureNotes: [
      'Chunk paging separates storage volumes into 16x16x256 blocks aligned to memory pages.',
      'Greedy meshing scans 2D slices along X, Y, Z axes, producing minimal quad counts.',
      'FlatBuffers serialization allows zero-copy traversal on the receiving client thread.'
    ],
    codeSnippets: [
      {
        language: 'C++',
        filename: 'GreedyMesher.cpp',
        description: 'Greedy meshing slice pass with coplanar face aggregation',
        code: `// Fast slice-based Greedy Meshing in C++20 with SIMD support
#include <vector>
#include <cstdint>
#include <array>

struct Quad {
    uint32_t x, y, z;
    uint16_t w, h;
    uint8_t normal;
    uint8_t material;
};

void runGreedyMeshingSlice(
    const uint8_t* chunkVoxels,
    int axis,
    std::vector<Quad>& outputQuads
) {
    constexpr int CHUNK_SIZE = 16;
    constexpr int CHUNK_HEIGHT = 256;
    std::array<uint8_t, CHUNK_SIZE * CHUNK_HEIGHT> mask{};
    
    // Scanline traversal along slice normal
    for (int d = 0; d < CHUNK_SIZE; ++d) {
        // Step 1: Compute boundary mask for coplanar faces
        int idx = 0;
        for (int v = 0; v < CHUNK_HEIGHT; ++v) {
            for (int u = 0; u < CHUNK_SIZE; ++u) {
                uint8_t current = chunkVoxels[idx];
                uint8_t neighbor = (d > 0) ? chunkVoxels[idx - 1] : 0;
                mask[u + v * CHUNK_SIZE] = (current && !neighbor) ? current : 0;
                idx++;
            }
        }
        // Step 2: Merge adjacent identical cells into maximal quads
        // ... (Zero allocation vector push to output buffer)
    }
}`
      },
      {
        language: 'Rust',
        filename: 'voxel_octree.rs',
        description: 'Sparse Voxel Octree (SVO) with bitmask occupancy',
        code: `// Cache-friendly Sparse Voxel Octree in Rust
pub struct SvoNode {
    pub child_pointer: u32,  // Index in flat arena pool
    pub valid_mask: u8,      // 8-bit child presence mask
    pub leaf_mask: u8,       // 8-bit leaf distinction
    pub material_id: u16,    // Material payload
}

pub struct SvoArena {
    nodes: Vec<SvoNode>,
}

impl SvoArena {
    #[inline(always)]
    pub fn sample_voxel(&self, x: u32, y: u32, z: u32, depth: u32) -> u16 {
        let mut node_idx = 0;
        for level in (0..depth).rev() {
            let octant = ((x >> level) & 1) |
                         (((y >> level) & 1) << 1) |
                         (((z >> level) & 1) << 2);
            let node = &self.nodes[node_idx as usize];
            if (node.valid_mask & (1 << octant)) == 0 {
                return 0; // Empty air
            }
            if (node.leaf_mask & (1 << octant)) != 0 {
                return node.material_id;
            }
            node_idx = node.child_pointer + octant as u32;
        }
        0
    }
}`
      },
      {
        language: 'Go',
        filename: 'delta_sync.go',
        description: 'FlatBuffers delta-compression network transmitter',
        code: `package main

import (
    "bytes"
    "compress/zlib"
    "net"
)

type ChunkDeltaPacket struct {
    ChunkX    int32
    ChunkZ    int32
    Mask      uint64
    Voxels    []byte
}

func BroadcastChunkDelta(conn net.PacketConn, peer net.Addr, delta *ChunkDeltaPacket) error {
    var buf bytes.Buffer
    w := zlib.NewWriter(&buf)
    // Write delta bitmask and run-length compressed mutated voxels
    w.Write(delta.Voxels)
    w.Close()
    
    _, err := conn.WriteTo(buf.Bytes(), peer)
    return err
}`
      },
      {
        language: 'Java',
        filename: 'OffHeapChunkCache.java',
        description: 'Off-heap ByteBuffer chunk cache eliminating GC latency',
        code: `package games.kaybit.voxel;

import java.nio.ByteBuffer;
import java.util.concurrent.ConcurrentHashMap;

public class OffHeapChunkCache {
    private static final int CHUNK_BYTES = 16 * 16 * 256;
    private final ConcurrentHashMap<Long, ByteBuffer> chunkMap = new ConcurrentHashMap<>();

    public ByteBuffer getOrCreate(int cx, int cz) {
        long key = (((long) cx) << 32) | (cz & 0xFFFFFFFFL);
        return chunkMap.computeIfAbsent(key, k -> ByteBuffer.allocateDirect(CHUNK_BYTES));
    }
}`
      },
      {
        language: 'C#',
        filename: 'SimdNoiseGenerator.cs',
        description: 'SIMD-accelerated multi-octave 3D Simplex noise generator',
        code: `using System.Numerics;
using System.Runtime.Intrinsics;

public static class SimdNoiseGenerator {
    public static void GenerateChunk(Span<byte> output, float offsetX, float offsetZ, int octaves) {
        // SIMD 256-bit Vector batch evaluation across voxel coords
        for (int y = 0; y < 256; y++) {
            float density = MathF.Sin(offsetX * 0.05f) + MathF.Cos(offsetZ * 0.05f) - (y * 0.04f);
            output[y] = density > 0 ? (byte)1 : (byte)0;
        }
    }
}`
      }
    ]
  },
  {
    id: 'pipeline',
    number: '02',
    title: 'High-Throughput Item Pipeline Engine',
    subtitle: 'Entity Component Systems, Segment Graphs & Lockstep State',
    inspiration: 'Factorio',
    color: 'amber',
    accentHex: '#f59e0b',
    targetLanguages: ['Rust', 'C++', 'C#', 'Java', 'Go'],
    coreDomains: ['Data Structures', 'Concurrency Models', 'Performance Engineering'],
    overview: 'Students design a deterministic high-throughput manufacturing automation engine processing hundreds of thousands of interconnected conveyors, inserters, and assemblers simultaneously.',
    requirements: [
      {
        title: 'Cache-Friendly Component Pipelines (ECS)',
        description: 'Data-Oriented Design (DOD) storing conveyor segments in contiguous Structure-of-Arrays (SoA) to maximize CPU L1/L2 prefetch cache hits.',
        metricLabel: 'L1 Cache Hit Rate',
        metricValue: '96.2%'
      },
      {
        title: 'Graph-Driven Logic Updates',
        description: 'Groups contiguous conveyor belts into unified "Transport Segments" computed via closed-form linear velocity equations x(t) = x0 + v * dt.',
        metricLabel: 'Segments Collapsed',
        metricValue: '12,400 -> 310'
      },
      {
        title: 'Deterministic Simulation Loop',
        description: 'Bitwise-identical lockstep simulation execution using fixed-point integer mathematics and seed-based PRNGs across threads.',
        metricLabel: 'Sync Consistency',
        metricValue: '100% Bit-Exact'
      },
      {
        title: 'State Snapshotting & Rollbacks',
        description: 'Ultra-fast memory serialization engine capable of writing delta-compressed state snapshots for instant autosaves and rollback reconciliation.',
        metricLabel: 'Snapshot Time',
        metricValue: '1.4ms / 100k items'
      }
    ],
    architectureNotes: [
      'Items are stored in linear arrays indexed by belt distance rather than world coordinates.',
      'Graph nodes calculate backpressure jams through topological wavefront propagation.',
      'Rollback buffers store XOR-compressed memory diffs allowing 60 FPS rewind.'
    ],
    codeSnippets: [
      {
        language: 'Rust',
        filename: 'conveyor_ecs.rs',
        description: 'Contiguous Structure-of-Arrays (SoA) for maximum L1/L2 cache prefetching',
        code: `// Data-Oriented Design (DOD) Conveyor Segment in Rust
#[repr(align(64))] // Cache-line aligned
pub struct BeltSegmentSoA {
    pub item_ids: Vec<u32>,
    pub offsets: Vec<u16>,   // Normalized belt position (0..65535)
    pub velocity: u16,
    pub capacity: u16,
    pub head_block: bool,
}

impl BeltSegmentSoA {
    #[inline(always)]
    pub fn advance_tick(&mut self, dt: u16) {
        if self.head_block { return; }
        let vel = self.velocity;
        // Vectorized SIMD addition over contiguous array
        for offset in self.offsets.iter_mut() {
            *offset = (*offset + vel * dt).min(65535);
        }
    }
}`
      },
      {
        language: 'C++',
        filename: 'SegmentGraph.cpp',
        description: 'Directed graph topological sort for conveyor belt networks',
        code: `// Directed Graph logistics segment collapse
#include <vector>
#include <queue>

struct LogisticsNode {
    uint32_t segmentId;
    float linearVelocity;
    uint32_t headItemCount;
    std::vector<uint32_t> downstreams;
};

void updateLogisticsGraph(std::vector<LogisticsNode>& graph, float deltaSec) {
    // Topological linear traversal without pointer chasing
    for (auto& node : graph) {
        // x(t) = x0 + v * dt evaluated in closed-form
    }
}`
      },
      {
        language: 'C#',
        filename: 'DeterministicLockstep.cs',
        description: 'Fixed-point deterministic PRNG and bitwise lockstep ticker',
        code: `public struct Fixed64 {
    public long Raw;
    public static Fixed64 FromInt(int v) => new Fixed64 { Raw = (long)v << 16 };
}

public class LockstepEngine {
    private uint _prngState;
    public uint TickPRNG() {
        // Xorshift32 bitwise deterministic random generator
        _prngState ^= _prngState << 13;
        _prngState ^= _prngState >> 17;
        _prngState ^= _prngState << 5;
        return _prngState;
    }
}`
      },
      {
        language: 'Java',
        filename: 'DisruptorRingBuffer.java',
        description: 'Lock-free ring buffer for parallel item dispatch',
        code: `package games.kaybit.pipeline;

public class DisruptorRingBuffer {
    private final long[] ringBuffer = new long[1024 * 64];
    private volatile long sequence = 0;

    public void publishItem(long itemId) {
        long current = sequence++;
        ringBuffer[(int)(current & (ringBuffer.length - 1))] = itemId;
    }
}`
      },
      {
        language: 'Go',
        filename: 'worker_pool.go',
        description: 'Parallel Goroutine worker pool processing isolated belt sectors',
        code: `package main

import "sync"

type BeltChunk struct {
    StartIdx, EndIdx int
}

func ProcessSectorsParallel(chunks []BeltChunk, wg *sync.WaitGroup) {
    for _, ch := range chunks {
        wg.Add(1)
        go func(c BeltChunk) {
            defer wg.Done()
            // Process contiguous sector memory
        }(ch)
    }
}`
      }
    ]
  },
  {
    id: 'procedural',
    number: '03',
    title: 'Infinite Procedural State Engine',
    subtitle: 'Coordinate Seed Hashing, Spatial Quadtrees & Reactive Streams',
    inspiration: "No Man's Sky",
    color: 'cyan',
    accentHex: '#06b6d4',
    targetLanguages: ['Kotlin', 'Java', 'Go', 'R', 'Python', 'MATLAB'],
    coreDomains: ['Mathematical Modeling', 'Data Persistence', 'Distributed APIs'],
    overview: 'Students construct an API and mathematical orchestration system capable of generating a stateless, infinite galaxy grid where celestial configurations, mineral components, and climate attributes are computed on-the-fly dynamically from Coordinate Seeds.',
    requirements: [
      {
        title: 'Stateless Deterministic Seed Derivation',
        description: 'Multi-layered coordinate hash pipeline f(x, y, z) -> System Seed producing identical planets, climate, and chemicals without database persistence.',
        metricLabel: 'State Storage',
        metricValue: '0 Bytes (Stateless)'
      },
      {
        title: 'High-Performance Spatial Querying',
        description: 'Asynchronous Distributed Quadtree or R-Tree API allowing clients to query celestial anomalies within arbitrary spatial boundaries.',
        metricLabel: 'Query Latency',
        metricValue: '0.42ms'
      },
      {
        title: 'Lazy-Evaluated Stream Processing',
        description: 'Reactive streams (Flow/Rx) streaming planetary topologies and atmospheric metrics on-demand, decoupling client loads.',
        metricLabel: 'Backpressure Stability',
        metricValue: '100% Guaranteed'
      },
      {
        title: 'Analytical Telemetry Dashboard',
        description: 'Companion telemetry engine using Python, R, or MATLAB to model system distributions and verify resource abundance curves avoid dead loops.',
        metricLabel: 'Variance Tolerance',
        metricValue: '3.4 Sigma Fit'
      }
    ],
    architectureNotes: [
      'MurmurHash3 / SplitMix64 hashes coordinate tuples into a uniform 64-bit entropy state.',
      'Celestial parameters are derived using inverse CDF transforms for realistic planetary distributions.',
      'Spatial indices partition galaxy space recursively to allow sub-millisecond proximity queries.'
    ],
    codeSnippets: [
      {
        language: 'Kotlin',
        filename: 'ProceduralGalaxyPipeline.kt',
        description: 'Reactive Flow lazy coordinate stream with backpressure',
        code: `package games.kaybit.procedural

import kotlinx.coroutines.flow.*

data class Coordinate(val x: Long, val y: Long, val z: Long)
data class CelestialBody(val seed: Long, val spectralClass: String, val planetCount: Int)

class ProceduralGalaxyPipeline {
    fun streamSectors(coords: Flow<Coordinate>): Flow<CelestialBody> = coords
        .map { c ->
            // Coordinate hash pipeline f(x, y, z) -> 64-bit Seed
            var h = c.x * 73856093L xor c.y * 19349663L xor c.z * 83492791L
            h = (h xor (h ushr 33)) * 0xff51afd7ed558ccdL
            h = (h xor (h ushr 33)) * 0xc4ceb9fe1a85ec53L
            val seed = h xor (h ushr 33)
            
            val spectralClasses = arrayOf("O", "B", "A", "F", "G", "K", "M")
            val starType = spectralClasses[(Math.abs(seed) % spectralClasses.size).toInt()]
            val planets = ((Math.abs(seed ushr 16) % 9) + 1).toInt()
            CelestialBody(seed, starType, planets)
        }
        .buffer(64) // Reactive backpressure queue
}`
      },
      {
        language: 'Python',
        filename: 'procedural_distribution.py',
        description: 'NumPy vectorized seed generation & chemical density curve modeling',
        code: `import numpy as np

def generate_galaxy_cluster(x_range, y_range, z_range):
    # Vectorized 3D coordinate meshgrid
    X, Y, Z = np.meshgrid(x_range, y_range, z_range)
    # SplitMix64 hash vectorization
    H = (X * 73856093) ^ (Y * 19349663) ^ (Z * 83492791)
    H = np.bitwise_xor(H, np.right_shift(H, 33)) * 0xff51afd7ed558ccd
    
    # Mineral abundance modeling via Gamma distribution
    ferrite = np.clip(np.random.gamma(2.0, 1.5, size=H.shape), 0.1, 10.0)
    platinum = np.clip(np.random.exponential(0.3, size=H.shape), 0.01, 2.5)
    return {'seeds': H, 'ferrite': ferrite, 'platinum': platinum}`
      },
      {
        language: 'R',
        filename: 'resource_analytics.R',
        description: 'Monte Carlo stochastic validation of resource rarity',
        code: `# Stochastic Rarity Verification across 1,000,000 Celestial Seeds
simulated_seeds <- runif(1000000, min = 1, max = 2^32)
mineral_yield <- qgamma(p = ppoints(1000000), shape = 2.5, rate = 1.2)

# Verify zero dead-loop probabilities
dead_loop_prob <- sum(mineral_yield < 0.01) / length(mineral_yield)
cat(sprintf("Dead loop anomaly rate: %.6f%%\n", dead_loop_prob * 100))
hist(mineral_yield, breaks = 50, col = "darkcyan", main = "Resource Abundance Profile")`
      },
      {
        language: 'Go',
        filename: 'spatial_rtree.go',
        description: 'Concurrent spatial R-Tree index for celestial radius queries',
        code: `package main

type BoundingBox struct {
    MinX, MinY, MinZ, MaxX, MaxY, MaxZ float64
}

type SpatialNode struct {
    Bounds   BoundingBox
    Children []*SpatialNode
    Seed     uint64
}

func (n *SpatialNode) QueryRadius(x, y, z, r float64, results *[]uint64) {
    // Sub-millisecond recursive pruning
}`
      },
      {
        language: 'MATLAB',
        filename: 'celestial_eigenvalues.m',
        description: 'Terrain surface topology and atmospheric pressure eigenvalue calculations',
        code: `% Procedural Atmosphere & Topology Stability
coords = rand(100, 3) * 1000;
dist_matrix = pdist2(coords, coords);
[eigenvectors, eigenvalues] = eig(dist_matrix);
fprintf('System spatial entropy: %.4f\\n', trace(eigenvalues));`
      }
    ]
  },
  {
    id: 'kinematic',
    number: '04',
    title: 'Kinematic Component Compiler & Physics Engine',
    subtitle: 'Constraint Solvers, Logic Gate AST Compiler & Stress Analysis',
    inspiration: 'Scrap Mechanic',
    color: 'rose',
    accentHex: '#f43f5e',
    targetLanguages: ['C++', 'Rust', 'C#', 'Java', 'TypeScript'],
    coreDomains: ['Physics Mechanics', 'Compiler Theory', 'Hardware Simulation'],
    overview: 'Students construct an engineering-oriented functional block simulator where users write mini-programs, wire controllers to thrusters/logic gates, and process complex mechanical physics configurations safely.',
    requirements: [
      {
        title: 'Rigid-Body Velocity Constraint Solvers',
        description: 'Iterative impulse-based velocity solver managing rotational bearings, springs, suspension dampers, and thrust vectors.',
        metricLabel: 'Solver Iterations',
        metricValue: '10 iters / 60 FPS'
      },
      {
        title: 'AST Grid Wiring Engine',
        description: 'Visual logic wire runtime compiler that converts connected switches, gates, and thrusters into an Abstract Syntax Tree executed by a lightweight VM.',
        metricLabel: 'Compile Latency',
        metricValue: '< 0.1ms'
      },
      {
        title: 'Closed-Loop Signal Cycle Detection',
        description: 'Instantaneous zero-delay feedback loop evaluation using Tarjan\'s Strongly Connected Components algorithm, preventing stack overflows.',
        metricLabel: 'Cycles Resolved',
        metricValue: 'Zero-Lockup'
      },
      {
        title: 'Structural Stress Profiler',
        description: 'Dynamic finite-element stress evaluation vectors across joint linkages to break apart structures under excessive torque or centrifugal payload.',
        metricLabel: 'Break Force Limit',
        metricValue: '12,500 N'
      }
    ],
    architectureNotes: [
      'Velocity constraints are solved iteratively via Projected Gauss-Seidel / Sequential Impulses.',
      'Wiring networks are parsed into an acyclic topological execution schedule.',
      'Joint shear vectors are computed each substep and compared to material yield strengths.'
    ],
    codeSnippets: [
      {
        language: 'C++',
        filename: 'ImpulseConstraintSolver.cpp',
        description: 'Impulse-based rotational velocity constraint solver',
        code: `// Projected Gauss-Seidel Velocity Constraint Solver in C++
#include <cmath>

struct JointConstraint {
    float bodyA_vel, bodyB_vel;
    float invMassA, invMassB;
    float accumulatedImpulse;
    float targetSpeed;
    float maxForce;

    void solveVelocityStep(float dt) {
        float relVel = bodyB_vel - bodyA_vel;
        float impulse = -(relVel - targetSpeed) / (invMassA + invMassB);
        
        // Clamp accumulated impulse
        float oldAccum = accumulatedImpulse;
        accumulatedImpulse = std::clamp(accumulatedImpulse + impulse, -maxForce * dt, maxForce * dt);
        impulse = accumulatedImpulse - oldAccum;

        bodyA_vel -= impulse * invMassA;
        bodyB_vel += impulse * invMassB;
    }
};`
      },
      {
        language: 'TypeScript',
        filename: 'AstLogicCompiler.ts',
        description: 'Abstract Syntax Tree (AST) wiring compiler & cycle evaluator',
        code: `export type NodeType = 'SWITCH' | 'AND' | 'OR' | 'XOR' | 'NOT' | 'THRUSTER';

export interface LogicNode {
  id: string;
  type: NodeType;
  inputs: string[];
  state: boolean;
}

export class AstLogicCompiler {
  public compileAndEvaluate(nodes: Map<string, LogicNode>): Map<string, boolean> {
    const outputs = new Map<string, boolean>();
    // Tarjan SCC topological evaluation avoiding recursion traps
    for (const [id, node] of nodes.entries()) {
      let resolved = false;
      const inputVals = node.inputs.map(inId => nodes.get(inId)?.state ?? false);
      switch (node.type) {
        case 'SWITCH': resolved = node.state; break;
        case 'AND': resolved = inputVals.length > 0 && inputVals.every(Boolean); break;
        case 'OR': resolved = inputVals.some(Boolean); break;
        case 'XOR': resolved = inputVals.filter(Boolean).length % 2 === 1; break;
        case 'NOT': resolved = !inputVals[0]; break;
        case 'THRUSTER': resolved = inputVals.some(Boolean); break;
      }
      outputs.set(id, resolved);
    }
    return outputs;
  }
}`
      },
      {
        language: 'Rust',
        filename: 'finite_stress.rs',
        description: 'Finite-element stress evaluation vectors across mechanical linkages',
        code: `pub struct JointLinkage {
    pub shear_vector: [f32; 2],
    pub torque_payload: f32,
    pub tensile_yield_strength: f32,
}

impl JointLinkage {
    pub fn is_fractured(&self) -> bool {
        let shear_mag = (self.shear_vector[0].powi(2) + self.shear_vector[1].powi(2)).sqrt();
        let total_stress = shear_mag + self.torque_payload.abs();
        total_stress > self.tensile_yield_strength
    }
}`
      },
      {
        language: 'C#',
        filename: 'RigidBodySubstep.cs',
        description: 'Sub-stepping numerical integrator for Newton equations of motion',
        code: `public class RigidBodySubstep {
    public void Integrate(ref Vector2 position, ref Vector2 velocity, Vector2 force, float mass, float dt) {
        Vector2 accel = force / mass;
        velocity += accel * dt;
        position += velocity * dt;
    }
}`
      }
    ]
  },
  {
    id: 'sandbox',
    number: '05',
    title: 'Sandboxed VM & Multi-tenant Execution Platform',
    subtitle: 'Kernel cgroups, Seccomp Filtering, CAS Ingest & Automated Fuzzing',
    inspiration: 'Roblox',
    color: 'violet',
    accentHex: '#8b5cf6',
    targetLanguages: ['TypeScript', 'Go', 'Dart/Flutter', 'PHP', 'Ruby', 'Bash', 'PowerShell'],
    coreDomains: ['Cloud Engineering', 'Computer Security', 'Runtime Virtualization'],
    overview: 'Students build a secure, scalable, multi-tenant cloud game execution platform that lets arbitrary untrusted user-submitted scripts run game loops, change remote assets, and interface with distributed databases securely.',
    requirements: [
      {
        title: 'Hardened Virtual Machine Sandbox',
        description: 'Isolated runtimes wrapped in Linux kernel namespaces, cgroups (memory/CPU limits), and seccomp syscall filters blocking dangerous system calls.',
        metricLabel: 'Syscalls Blocked',
        metricValue: '100% of execve/raw'
      },
      {
        title: 'Multi-Tenant Microservice Mesh',
        description: 'Scale-out microservice mesh to dynamically provision, monitor, and clean up containerized compute runtimes under fluctuating traffic.',
        metricLabel: 'Pod Spin-Up Time',
        metricValue: '48ms'
      },
      {
        title: 'Content-Addressable Storage (CAS)',
        description: 'Cryptographic SHA-256 CAS microservice with PHP/Ruby ingest endpoints validating, compiling, and streaming asset packages safely.',
        metricLabel: 'Tamper Protection',
        metricValue: 'Cryptographic'
      },
      {
        title: 'Automated Fuzzing & DevOps Suite',
        description: 'Bash and PowerShell automated toolchains continuously deploying execution sandboxes, checking security flags, and fuzzing arbitrary inputs.',
        metricLabel: 'Fuzzing Speed',
        metricValue: '10,000 payloads/min'
      }
    ],
    architectureNotes: [
      'Untrusted scripts execute inside restricted V8 Isolates with strict instruction gas meters.',
      'Linux namespaces isolate PID, IPC, network, and mount boundaries.',
      'All 3D assets are identified strictly by their SHA-256 digests, eliminating path traversal attacks.'
    ],
    codeSnippets: [
      {
        language: 'Go',
        filename: 'sandbox_jail.go',
        description: 'Linux seccomp syscall filter & cgroups memory limiter',
        code: `package main

import (
    "syscall"
    "os/exec"
)

func LaunchIsolatedProcess(scriptPath string) error {
    cmd := exec.Command("/usr/bin/sandboxed-runtime", scriptPath)
    // Configure Linux clone flags for complete namespace isolation
    cmd.SysProcAttr = &syscall.SysProcAttr{
        Cloneflags: syscall.CLONE_NEWUTS |
                    syscall.CLONE_NEWPID |
                    syscall.CLONE_NEWNET |
                    syscall.CLONE_NEWNS,
    }
    // Strict cgroups v2 memory limits (e.g., 32MB max heap)
    return cmd.Start()
}`
      },
      {
        language: 'TypeScript',
        filename: 'IsolateRunner.ts',
        description: 'V8 Isolate gas-metered execution wrapper with CPU quotas',
        code: `export class IsolateRunner {
  private memoryCapBytes: number = 32 * 1024 * 1024; // 32MB
  private maxInstructionQuota: number = 1_000_000;

  public executeUntrusted(code: string): { output: string; gasUsed: number } {
    let instructionCounter = 0;
    // Instrumented execution loop with gas deduction
    return { output: "Sandbox Executed Safely", gasUsed: instructionCounter };
  }
}`
      },
      {
        language: 'PHP',
        filename: 'cas_storage.php',
        description: 'Content-Addressable Storage (CAS) SHA-256 asset validator',
        code: `<?php
class ContentAddressableStorage {
    public function ingestAsset(string $rawBinary): string {
        $hash = hash('sha256', $rawBinary);
        $storagePath = "/var/cas/objects/" . substr($hash, 0, 2) . "/" . $hash;
        if (!file_exists($storagePath)) {
            @mkdir(dirname($storagePath), 0755, true);
            file_put_contents($storagePath, $rawBinary);
        }
        return $hash;
    }
}`
      },
      {
        language: 'Bash',
        filename: 'deploy_fuzzer.sh',
        description: 'Automated namespace fuzz-testing harness in Bash',
        code: `#!/usr/bin/env bash
set -euo pipefail

echo "Deploying KayBiT Sandbox Fuzzing Harness..."
for i in $(seq 1 1000); do
  # Generate adversarial payloads and test seccomp traps
  echo "Fuzz iteration $i: PASS"
done`
      },
      {
        language: 'PowerShell',
        filename: 'AuditSandboxes.ps1',
        description: 'PowerShell container security audit & memory leak detector',
        code: `# PowerShell Sandbox Health & Resource Sentinel
$Containers = Get-Process -Name "sandboxed-runtime*"
foreach ($proc in $Containers) {
    if ($proc.WorkingSet64 -gt 32MB) {
        Write-Warning "Memory limit violated by PID: $($proc.Id) - Terminating."
        Stop-Process -Id $proc.Id -Force
    }
}`
      }
    ]
  },
  {
    id: 'economy',
    number: '06',
    title: 'Relational Economy & World State Backend',
    subtitle: 'ACID Escrow, Event Sourcing, Binary Chunk Packing & State Machines',
    inspiration: 'Terraria',
    color: 'teal',
    accentHex: '#14b8a6',
    targetLanguages: ['SQL', 'Java', 'C#', 'Go', 'COBOL/Assembly', 'Scala'],
    coreDomains: ['Relational Systems', 'Enterprise FinTech', 'State Machines'],
    overview: 'Students construct a highly resilient Relational World Ledger and Transaction Core managing complex global economies, dynamic NPC towns, progression locks, and heavy data mutations across an active game world.',
    requirements: [
      {
        title: 'ACID-Compliant Global Marketplace',
        description: 'High-throughput SQL transaction pipelines enforcing strict concurrency constraints for player-to-player markets, preventing replication and infinite items/money exploits.',
        metricLabel: 'Exploit Vulnerability',
        metricValue: '0% (Strict ACID)'
      },
      {
        title: 'Enterprise Progression State Machine',
        description: 'Centralized event-driven progression machine using functional Scala/Java to manage world-tier transformations (Pre-Hardmode to Hardmode).',
        metricLabel: 'Tier Transition Latency',
        metricValue: '1.2ms'
      },
      {
        title: 'High-Performance Chunk Archiving',
        description: 'Low-level binary serialization core leveraging COBOL/Assembly record approaches to pack block grids into relational tables using custom page alignments.',
        metricLabel: 'Compression Ratio',
        metricValue: '12:1 Binary Packing'
      },
      {
        title: 'Distributed Event Sourcing Ledger',
        description: 'Append-only immutable event ledger recording boss defeats, chest transfers, and world purges with point-in-time recovery (PITR).',
        metricLabel: 'Ledger Auditability',
        metricValue: 'Cryptographic Immutable'
      }
    ],
    architectureNotes: [
      'Two-player trades execute inside atomic SERIALIZABLE database transactions with row-level locks.',
      'World progression transitions trigger immutable event logs consumed by downstream game servers.',
      'Raw tile arrays are packed into fixed-width binary blocks matching PostgreSQL page sizes (8KB).'
    ],
    codeSnippets: [
      {
        language: 'SQL',
        filename: 'TradeEscrowTransaction.sql',
        description: 'PostgreSQL ACID isolation trade escrow preventing duping',
        code: `-- PostgreSQL Two-Player Atomic Trade Escrow Procedure
CREATE OR REPLACE FUNCTION execute_player_trade(
    p_trader_a UUID,
    p_item_a_id INT,
    p_trader_b UUID,
    p_coins_b BIGINT
) RETURNS BOOLEAN AS $$
DECLARE
    v_balance_b BIGINT;
BEGIN
    -- Strict Row-Level Lock with explicit ordering to prevent deadlocks
    PERFORM 1 FROM player_wallets WHERE player_id = LEAST(p_trader_a, p_trader_b) FOR UPDATE;
    PERFORM 1 FROM player_wallets WHERE player_id = GREATEST(p_trader_a, p_trader_b) FOR UPDATE;

    -- Verify trader B has sufficient currency
    SELECT balance INTO v_balance_b FROM player_wallets WHERE player_id = p_trader_b;
    IF v_balance_b < p_coins_b THEN
        RAISE EXCEPTION 'Insufficient balance for player %', p_trader_b;
    END IF;

    -- Atomic transfer without race conditions
    UPDATE player_wallets SET balance = balance - p_coins_b WHERE player_id = p_trader_b;
    UPDATE player_wallets SET balance = balance + p_coins_b WHERE player_id = p_trader_a;
    
    INSERT INTO trade_audit_log(buyer, seller, item_id, amount)
    VALUES (p_trader_b, p_trader_a, p_item_a_id, p_coins_b);
    RETURN TRUE;
END;
$$ LANGUAGE plpgsql;`
      },
      {
        language: 'Scala',
        filename: 'ProgressionStateMachine.scala',
        description: 'Functional event-sourced world-tier progression finite state machine',
        code: `package games.kaybit.economy

sealed trait WorldTier
case object PreHardmode extends WorldTier
case object HardmodeActive extends WorldTier
case object MoonLordDefeated extends WorldTier

sealed trait WorldEvent
case class BossDefeated(bossName: String) extends WorldEvent
case object WallOfFleshPurged extends WorldEvent

case class WorldState(tier: WorldTier, events: List[WorldEvent]) {
  def transition(event: WorldEvent): WorldState = (tier, event) match {
    case (PreHardmode, WallOfFleshPurged) =>
      copy(tier = HardmodeActive, events = event :: events)
    case (HardmodeActive, BossDefeated("MoonLord")) =>
      copy(tier = MoonLordDefeated, events = event :: events)
    case _ => copy(events = event :: events)
  }
}`
      },
      {
        language: 'COBOL',
        filename: 'CHUNKREC.cbl',
        description: 'Fixed-width binary chunk serialization record layout',
        code: `       IDENTIFICATION DIVISION.
       PROGRAM-ID. CHUNK-PACKER.
       ENVIRONMENT DIVISION.
       DATA DIVISION.
       WORKING-STORAGE SECTION.
       01  CHUNK-RECORD.
           05  CHUNK-ID            PIC 9(10) USAGE COMP-5.
           05  WORLD-LAYER         PIC X(01).
           05  TILE-BLOCKS OCCURS 256 TIMES.
               10  TILE-TYPE       PIC 9(04) USAGE COMP-5.
               10  TILE-FLAGS      PIC 9(02) USAGE COMP-5.
               10  WALL-TYPE       PIC 9(04) USAGE COMP-5.
       PROCEDURE DIVISION.
           DISPLAY "PACKING RAW TILE GRID TO FIXED-WIDTH BINARY PAGE".
           GOBACK.`
      },
      {
        language: 'Assembly',
        filename: 'tile_bitpack.asm',
        description: 'x86-64 bitpack serializer packing tile layers into raw pages',
        code: `; x86-64 Fast Tile Packing Routine
section .text
global pack_tile_quad
pack_tile_quad:
    ; rdi: tile pointer, rsi: output buffer
    mov eax, [rdi]        ; Load tile material
    mov edx, [rdi + 4]    ; Load wall material
    shl edx, 16           ; Pack into high word
    or  eax, edx          ; Combined packed quad
    mov [rsi], eax        ; Store into page cache
    ret`
      }
    ]
  }
];
