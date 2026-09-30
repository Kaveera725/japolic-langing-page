import React, { useState } from 'react';
import { Container } from '../components/Container';
import { SectionLabel } from '../components/SectionLabel';
import { ArrowRight, Cpu, Layers, Zap, Server, ChevronRight } from 'lucide-react';

/* ═══════════════════════════════════════════════════════════
   USE CASES DATA & ARCHITECTURE
   ═══════════════════════════════════════════════════════════ */

interface UseCaseData {
  num: string;
  audience: string;
  audienceCategory: string;
  title: string;
  explanation: string;
  keyMetric: { label: string; value: string };
  cueType: 'pipeline' | 'topology' | 'telemetry' | 'matrix';
}

const USE_CASES: UseCaseData[] = [
  {
    num: '01',
    audience: 'AI Teams',
    audienceCategory: 'AI Workloads',
    title: 'AI Workloads',
    explanation: 'Teams train on multi-terabyte datasets directly from cloud object stores without staging delays or storage throughput bottlenecks.',
    keyMetric: { label: 'TRAINING IOPS', value: 'Direct POSIX vfs' },
    cueType: 'pipeline',
  },
  {
    num: '02',
    audience: 'Engineering Teams',
    audienceCategory: 'Data Pipelines',
    title: 'Data Pipelines',
    explanation: 'Shared storage provides a single unified namespace across all distributed workers, eliminating duplicate staging jobs and rsync orchestration.',
    keyMetric: { label: 'NAMESPACE', value: 'Unified Cluster Mount' },
    cueType: 'topology',
  },
  {
    num: '03',
    audience: 'Data-Intensive Applications',
    audienceCategory: 'High-Performance Applications',
    title: 'High-Performance Applications',
    explanation: 'Hot data paths execute against node-local NVMe caches, delivering microsecond local-disk access latencies to shared datasets.',
    keyMetric: { label: 'READ PATH', value: 'Node-Local NVMe' },
    cueType: 'telemetry',
  },
  {
    num: '04',
    audience: 'Infrastructure Teams',
    audienceCategory: 'Storage Architecture',
    title: 'Infrastructure Teams',
    explanation: 'Japolic decouples compute instances from physical disks, allowing teams to scale commodity object storage independently across any cloud or bare-metal host.',
    keyMetric: { label: 'PERSISTENCE', value: 'S3-Decoupled' },
    cueType: 'matrix',
  },
];

export const UseCases: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number | null>(null);

  return (
    <section
      id="use-cases"
      className="py-24 md:py-32 bg-canvas-base border-b border-hairline-light relative overflow-hidden"
      aria-labelledby="use-cases-heading"
    >
      {/* Subtle technical background grid */}
      <div 
        className="absolute inset-0 bg-grid-pattern opacity-25 pointer-events-none" 
        aria-hidden="true" 
      />

      <Container className="relative z-10">
        {/* ── Section Header (Editorial Style) ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-hairline-strong pb-8 mb-12">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <SectionLabel label="APPLICATION DOMAINS" variant="olive" dot />
              <span className="font-mono text-[11px] text-ink-muted tracking-wider uppercase">
                Architecture Spec 04
              </span>
            </div>
            <h2
              id="use-cases-heading"
              className="font-display text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-ink-primary leading-[1.12]"
            >
              Engineered for systems where storage is the critical path.
            </h2>
          </div>
          <div className="mt-6 md:mt-0 font-mono text-xs text-ink-tertiary text-right hidden sm:block">
            <div>AUDIENCE / VALUE COUPLING</div>
            <div className="text-olive font-semibold mt-1">4 VERIFIED PROFILES</div>
          </div>
        </div>

        {/* ── Editorial Module Grid (Rhythmic 2-Column Ledger) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-hairline-strong border border-hairline-strong rounded-xs overflow-hidden shadow-subtle">
          {USE_CASES.map((uc, index) => {
            const isHovered = activeTab === index;
            return (
              <article
                key={uc.num}
                onMouseEnter={() => setActiveTab(index)}
                onMouseLeave={() => setActiveTab(null)}
                className={`relative bg-canvas-elevated p-6 sm:p-8 md:p-10 flex flex-col justify-between transition-colors duration-200 group ${
                  isHovered ? 'bg-[#FAF8F2]' : ''
                }`}
              >
                {/* ── Module Top Bar: Number + Audience Badge ── */}
                <div>
                  <div className="flex items-center justify-between border-b border-hairline-light pb-4 mb-6">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xl sm:text-2xl font-semibold tracking-tight text-olive">
                        {uc.num}
                      </span>
                      <div className="h-3 w-px bg-hairline-strong" />
                      <span className="font-mono text-xs uppercase tracking-wider text-ink-tertiary font-medium">
                        {uc.audience}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 px-2.5 py-1 bg-canvas-subtle border border-hairline-light rounded-xs font-mono text-[10px] text-ink-secondary">
                      {index === 0 && <Cpu size={12} className="text-olive" />}
                      {index === 1 && <Layers size={12} className="text-olive" />}
                      {index === 2 && <Zap size={12} className="text-olive" />}
                      {index === 3 && <Server size={12} className="text-olive" />}
                      <span>{uc.audienceCategory}</span>
                    </div>
                  </div>

                  {/* ── Title & Explanation ── */}
                  <h3 className="font-display text-xl sm:text-2xl font-medium text-ink-primary tracking-tight mb-3">
                    {uc.title}
                  </h3>

                  <p className="font-sans text-sm sm:text-base text-ink-secondary leading-relaxed mb-8">
                    {uc.explanation}
                  </p>
                </div>

                {/* ── Technical Visual Cues (Distinct Visual Rhythm for each module) ── */}
                <div className="mt-auto pt-4">
                  {/* CUE 1: AI Workloads - High-Bandwidth Streaming Pipeline */}
                  {uc.cueType === 'pipeline' && (
                    <div className="bg-canvas-subtle border border-hairline-light rounded-xs p-3.5 font-mono text-[11px]">
                      <div className="flex items-center justify-between text-[10px] text-ink-tertiary border-b border-hairline-light pb-2 mb-2.5">
                        <span className="flex items-center gap-1.5 text-olive font-semibold">
                          <span className="h-1.5 w-1.5 rounded-full bg-olive animate-pulse" />
                          DIRECT TRAINING STREAM
                        </span>
                        <span>ASYNC READ-AHEAD</span>
                      </div>
                      <div className="flex items-center justify-between gap-1 text-[11px] text-ink-secondary">
                        <div className="px-2 py-1.5 bg-canvas-elevated border border-hairline-light rounded-xs text-center flex-1">
                          <div className="text-[9px] text-ink-tertiary">PERSISTENT TIER</div>
                          <span className="font-medium text-ink-primary">S3 / Object</span>
                        </div>
                        <div className="text-olive px-1">→</div>
                        <div className="px-2 py-1.5 bg-canvas-elevated border border-olive/30 rounded-xs text-center flex-1">
                          <div className="text-[9px] text-olive font-semibold">JAPOLIC VFS</div>
                          <span className="font-medium text-olive">NVMe Cache</span>
                        </div>
                        <div className="text-olive px-1">→</div>
                        <div className="px-2 py-1.5 bg-canvas-elevated border border-hairline-light rounded-xs text-center flex-1">
                          <div className="text-[9px] text-ink-tertiary">GPU COMPUTE</div>
                          <span className="font-medium text-ink-primary">PyTorch / VRAM</span>
                        </div>
                      </div>
                      <div className="mt-2.5 pt-2 border-t border-hairline-light flex items-center justify-between text-[10px] text-ink-muted">
                        <span>ZERO DOWNLOAD WAIT</span>
                        <span className="text-olive">100% GPU UTILIZATION</span>
                      </div>
                    </div>
                  )}

                  {/* CUE 2: Data Pipelines - Concurrent Cluster Mount Topology */}
                  {uc.cueType === 'topology' && (
                    <div className="bg-canvas-subtle border border-hairline-light rounded-xs p-3.5 font-mono text-[11px]">
                      <div className="flex items-center justify-between text-[10px] text-ink-tertiary border-b border-hairline-light pb-2 mb-2.5">
                        <span className="flex items-center gap-1.5 text-olive font-semibold">
                          <span className="h-1.5 w-1.5 rounded-full bg-olive" />
                          UNIFIED MOUNT TOPOLOGY
                        </span>
                        <span>POSIX /mnt/shared</span>
                      </div>
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between px-2.5 py-1 bg-canvas-elevated border border-hairline-light rounded-xs text-[11px]">
                          <span className="text-ink-secondary">Worker 01..64 (ETL Node)</span>
                          <span className="text-olive font-medium">rw-shared</span>
                        </div>
                        <div className="flex items-center justify-between px-2.5 py-1 bg-canvas-elevated border border-hairline-light rounded-xs text-[11px]">
                          <span className="text-ink-secondary">Analytics Engine (Spark)</span>
                          <span className="text-olive font-medium">shared-namespace</span>
                        </div>
                      </div>
                      <div className="mt-2.5 pt-2 border-t border-hairline-light flex items-center justify-between text-[10px] text-ink-muted">
                        <span>NO RSYNC OVERHEAD</span>
                        <span className="text-ink-primary font-medium">ZERO DATA DULICATION</span>
                      </div>
                    </div>
                  )}

                  {/* CUE 3: High-Performance - Latency Comparison Telemetry */}
                  {uc.cueType === 'telemetry' && (
                    <div className="bg-canvas-subtle border border-hairline-light rounded-xs p-3.5 font-mono text-[11px]">
                      <div className="flex items-center justify-between text-[10px] text-ink-tertiary border-b border-hairline-light pb-2 mb-2.5">
                        <span className="flex items-center gap-1.5 text-olive font-semibold">
                          <span className="h-1.5 w-1.5 rounded-full bg-olive" />
                          READ LATENCY BENCHMARK
                        </span>
                        <span>I/O RESPONSE</span>
                      </div>
                      <div className="space-y-2">
                        <div>
                          <div className="flex justify-between text-[10px] mb-1">
                            <span className="text-olive font-medium">Japolic NVMe Path</span>
                            <span className="text-olive font-semibold">140 µs (Local equivalent)</span>
                          </div>
                          <div className="h-2 w-full bg-canvas-elevated rounded-xs overflow-hidden border border-hairline-light">
                            <div className="h-full bg-olive w-[8%]" />
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-[10px] mb-1">
                            <span className="text-ink-tertiary">Traditional Cloud NFS</span>
                            <span className="text-ink-muted">8,400 µs (Network wall)</span>
                          </div>
                          <div className="h-2 w-full bg-canvas-elevated rounded-xs overflow-hidden border border-hairline-light">
                            <div className="h-full bg-ink-muted/50 w-[85%]" />
                          </div>
                        </div>
                      </div>
                      <div className="mt-2.5 pt-2 border-t border-hairline-light flex items-center justify-between text-[10px] text-ink-muted">
                        <span>NODE-LOCAL EXECUTION</span>
                        <span className="text-olive">60× REDUCTION IN WAIT</span>
                      </div>
                    </div>
                  )}

                  {/* CUE 4: Infrastructure Teams - Architecture Decoupling Matrix */}
                  {uc.cueType === 'matrix' && (
                    <div className="bg-canvas-subtle border border-hairline-light rounded-xs p-3.5 font-mono text-[11px]">
                      <div className="flex items-center justify-between text-[10px] text-ink-tertiary border-b border-hairline-light pb-2 mb-2.5">
                        <span className="flex items-center gap-1.5 text-olive font-semibold">
                          <span className="h-1.5 w-1.5 rounded-full bg-olive" />
                          STORAGE ORCHESTRATION
                        </span>
                        <span>STORAGE-COMPUTE INDEPENDENCE</span>
                      </div>
                      <div className="grid grid-cols-3 gap-1.5 text-center text-[10px]">
                        <div className="p-1.5 bg-canvas-elevated border border-hairline-light rounded-xs">
                          <div className="text-ink-tertiary text-[9px]">COMPUTE</div>
                          <span className="text-ink-primary font-medium">Spot / GPUs</span>
                        </div>
                        <div className="p-1.5 bg-canvas-elevated border border-olive/30 rounded-xs">
                          <div className="text-olive text-[9px] font-semibold">JAPOLIC</div>
                          <span className="text-olive font-medium">VFS Fabric</span>
                        </div>
                        <div className="p-1.5 bg-canvas-elevated border border-hairline-light rounded-xs">
                          <div className="text-ink-tertiary text-[9px]">STORAGE</div>
                          <span className="text-ink-primary font-medium">Any S3 Backend</span>
                        </div>
                      </div>
                      <div className="mt-2.5 pt-2 border-t border-hairline-light flex items-center justify-between text-[10px] text-ink-muted">
                        <span>CLOUD AGNOSTIC</span>
                        <span className="text-ink-primary font-medium">ZERO VENDOR LOCK-IN</span>
                      </div>
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>

        {/* ── Section Terminal CTA ── */}
        <div className="mt-14 md:mt-20 pt-10 border-t border-hairline-strong flex flex-col md:flex-row items-center justify-between gap-6 bg-canvas-elevated p-8 sm:p-10 border border-hairline-light rounded-xs shadow-subtle">
          <div className="max-w-xl text-center md:text-left">
            <span className="font-mono text-xs uppercase tracking-wider text-olive font-semibold">
              EVALUATE JAPOLIC IN YOUR ENVIRONMENT
            </span>
            <h3 className="font-display text-2xl sm:text-3xl font-medium tracking-tight text-ink-primary mt-1 mb-2">
              Ready to test on your own compute clusters?
            </h3>
            <p className="font-sans text-sm text-ink-secondary">
              Deploy Japolic with a single binary or container. Mount your existing object buckets and evaluate throughput in minutes.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            <a
              href="#how-it-works"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xs bg-olive text-white font-sans text-sm font-medium tracking-tight border border-[#2F4233] shadow-subtle hover:bg-olive-light active:bg-olive-dim transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-olive focus-visible:ring-offset-2"
            >
              <span>Explore how Japolic works</span>
              <ArrowRight size={16} strokeWidth={2} />
            </a>
            <a
              href="#docs"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xs bg-canvas-subtle border border-hairline-strong text-ink-primary font-sans text-sm font-medium hover:bg-canvas-sunken/40 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-olive"
            >
              <span>Read technical specs</span>
              <ChevronRight size={15} />
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
};
