import React, { useState } from 'react';
import { Container } from '../components/Container';
import { SectionLabel } from '../components/SectionLabel';
import { ScrollReveal } from '../components/ScrollReveal';
import {
  ServerNode,
  StorageNode,
  DataPath,
  FilesystemTree,
  S3StorageLayer,
  TechnicalLabel,
} from '../components/visuals';
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
      className="py-20 md:py-28 bg-canvas-base border-b border-hairline-light relative overflow-hidden"
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
              className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] font-medium tracking-tight text-ink-primary leading-[1.12]"
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
        <ScrollReveal>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-hairline-strong border border-hairline-strong rounded-xs overflow-hidden shadow-subtle hover:shadow-card transition-shadow duration-300">
            {USE_CASES.map((uc, index) => {
              const isHovered = activeTab === index;
              return (
                <article
                  key={uc.num}
                  onMouseEnter={() => setActiveTab(index)}
                  onMouseLeave={() => setActiveTab(null)}
                  className={`relative bg-canvas-elevated p-5 sm:p-8 md:p-10 flex flex-col justify-between transition-colors duration-200 group ${
                    isHovered ? 'bg-[#FAF8F2]' : ''
                  }`}
                >
                  {/* ── Module Top Bar: Number + Audience Badge ── */}
                  <div>
                    <div className="flex items-center justify-between border-b border-hairline-light pb-4 mb-6">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xl sm:text-2xl font-semibold tracking-tight text-olive group-hover:text-olive-light transition-colors">
                          {uc.num}
                        </span>
                        <div className="h-3 w-px bg-hairline-strong" />
                        <span className="font-mono text-xs uppercase tracking-wider text-ink-tertiary font-medium">
                          {uc.audience}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 px-2.5 py-1 bg-canvas-subtle border border-hairline-light rounded-xs font-mono text-[10px] text-ink-secondary group-hover:border-olive/30 transition-colors">
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
                    {/* CUE 1: AI Workloads - FilesystemTree & Streaming DataPath */}
                    {uc.cueType === 'pipeline' && (
                      <div className="space-y-2">
                        <FilesystemTree
                          items={[
                            {
                              id: 'mnt',
                              name: '/mnt/shared',
                              type: 'vfs-mount',
                              children: [
                                {
                                  id: 'train-set',
                                  name: 'imagenet-21k-shuffled.parquet',
                                  type: 'file',
                                  size: '1.42 TB',
                                  cached: true,
                                  inode: '09120',
                                },
                                {
                                  id: 'weights',
                                  name: 'checkpoints/model-step-80k.pt',
                                  type: 'file',
                                  size: '128 GB',
                                  cached: true,
                                  inode: '09121',
                                },
                              ],
                            },
                          ]}
                        />
                        <DataPath
                          label="PyTorch DataLoader"
                          sublabel="Direct DMA"
                          protocol="POSIX VFS"
                          throughput="4.8 GB/s"
                        />
                      </div>
                    )}

                    {/* CUE 2: Data Pipelines - Multi-Worker Server Nodes & Connection */}
                    {uc.cueType === 'topology' && (
                      <div className="space-y-2">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          <ServerNode
                            name="worker-01"
                            type="worker"
                            status="active"
                            hardware="64 vCPU · ETL Worker"
                            mountPoint="/mnt/shared"
                            throughput="1.8 GB/s"
                            compact={true}
                          />
                          <ServerNode
                            name="worker-64"
                            type="worker"
                            status="active"
                            hardware="64 vCPU · Spark Node"
                            mountPoint="/mnt/shared"
                            throughput="1.8 GB/s"
                            compact={true}
                          />
                        </div>
                        <div className="p-2.5 bg-canvas-subtle border border-hairline-light rounded-xs flex items-center justify-between font-mono text-[10px]">
                          <div className="flex items-center gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-olive animate-pulse" />
                            <span className="font-semibold text-olive">ZERO RSYNC ORCHESTRATION</span>
                          </div>
                          <span className="text-ink-secondary">64 NODES ON ONE MOUNT</span>
                        </div>
                      </div>
                    )}

                    {/* CUE 3: High-Performance - Dedicated StorageNode with Latency Gauge */}
                    {uc.cueType === 'telemetry' && (
                      <div className="space-y-2">
                        <StorageNode
                          name="Node-Local NVMe VFS Cache"
                          tier="nvme"
                          latency="140 µs"
                          hitRatio="99.4%"
                          capacity="3.84 TB"
                          usedPercent={48}
                          highlight={true}
                        />
                        <div className="flex items-center justify-between px-3 py-1.5 bg-canvas-subtle border border-hairline-light rounded-xs font-mono text-[10px] text-ink-tertiary">
                          <span>VS CLOUD NFS (8,400 µs)</span>
                          <span className="font-semibold text-olive">60× LATENCY ADVANTAGE</span>
                        </div>
                      </div>
                    )}

                    {/* CUE 4: Infrastructure Teams - S3 Persistence Layer */}
                    {uc.cueType === 'matrix' && (
                      <div className="space-y-2">
                        <S3StorageLayer
                          buckets={[
                            {
                              uri: 's3://production-lake-us-east',
                              provider: 'aws-s3',
                              totalSize: '48.2 TB',
                              syncState: 'synced',
                            },
                            {
                              uri: 'r2://inference-edge-cache',
                              provider: 'r2',
                              totalSize: '12.4 TB',
                              syncState: 'synced',
                            },
                          ]}
                        />
                        <div className="flex items-center justify-between px-3 py-1.5 bg-canvas-subtle border border-hairline-light rounded-xs font-mono text-[10px] text-ink-muted">
                          <TechnicalLabel variant="bracket" size="xs">DECOUPLED_TIER</TechnicalLabel>
                          <span className="text-ink-primary font-medium">ZERO STORAGE VENDOR LOCK-IN</span>
                        </div>
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </ScrollReveal>

        {/* ── Section Terminal CTA ── */}
        <ScrollReveal delayMs={100}>
          <div className="mt-14 md:mt-20 pt-8 sm:pt-10 border-t border-hairline-strong flex flex-col md:flex-row items-center justify-between gap-6 bg-canvas-elevated p-6 sm:p-10 border border-hairline-light rounded-xs shadow-subtle hover:shadow-card transition-shadow duration-300">
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
                className="group w-full sm:w-auto min-h-[46px] inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-xs bg-olive text-white font-sans text-sm font-medium tracking-tight border border-[#2F4233] shadow-subtle hover:bg-olive-light hover:shadow-card active:bg-olive-dim transition-all duration-150 interactive-button focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-olive focus-visible:ring-offset-2"
              >
                <span>Explore how Japolic works</span>
                <ArrowRight size={16} strokeWidth={2} className="transition-transform duration-150 group-hover:translate-x-0.5" />
              </a>
              <a
                href="#docs"
                className="w-full sm:w-auto min-h-[46px] inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xs bg-canvas-subtle border border-hairline-strong text-ink-primary font-sans text-sm font-medium hover:bg-canvas-sunken/40 transition-colors interactive-button focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-olive"
              >
                <span>Read technical specs</span>
                <ChevronRight size={15} />
              </a>
            </div>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
};
