export interface NavItem {
  label: string;
  href: string;
}

export interface FeatureCard {
  id: string;
  tag: string;
  title: string;
  body: string;
  spec: string;
}

export interface UseCaseItem {
  id: string;
  tag: string;
  title: string;
  body: string;
  impact: string;
  snippet?: string;
  highlight: string;
}

export const NAV_LINKS: NavItem[] = [
  { label: 'Architecture', href: '#problem-solution' },
  { label: 'Capabilities', href: '#capabilities' },
  { label: 'Workloads', href: '#workloads' },
  { label: 'Documentation', href: '#docs' },
];

export const HERO_CONTENT = {
  kicker: 'DISTRIBUTED FILE SYSTEM · STORAGE INFRASTRUCTURE',
  heading: 'Shared storage with the performance of local disk.',
  subheading:
    'Japolic connects distributed compute clusters to unified shared storage over standard file interfaces. Deliver near-local NVMe read and write speeds to every node, retain full S3 compatibility, and automatically tier cold data to low-cost object storage without application changes.',
  primaryCta: 'Request Cluster Access',
  secondaryCta: 'Read Technical Architecture',
  mountCommand: 'japolic mount --target=s3://dataset-production /mnt/shared',
  stats: [
    { label: 'Mount Protocol', value: 'POSIX-compliant VFS' },
    { label: 'Tiered Persistence', value: 'S3 & S3-compatible APIs' },
    { label: 'Cluster Integration', value: 'Zero application rewrite' },
  ],
};

export const PROBLEM_SOLUTION_CONTENT = {
  kicker: 'ARCHITECTURAL IMPASSE',
  heading: 'The false trade-off between local throughput and shared scale.',
  subheading:
    'Modern compute clusters run faster than the storage networks supporting them. Engineers are forced to choose between manually synchronizing local disks or accepting network I/O throttling.',
  comparisons: [
    {
      dimension: 'Node Attachment',
      problemTitle: 'Isolated Disks',
      problemDesc:
        'High-speed NVMe drives are pinned to single instances. Scaling out requires complex data copy scripts, sync jobs, and multi-terabyte staging overhead.',
      solutionTitle: 'Unified Namespace',
      solutionDesc:
        'All compute nodes attach to the same distributed namespace. Datasets are immediately accessible across the cluster without data pre-staging.',
    },
    {
      dimension: 'I/O Latency',
      problemTitle: 'Network File Locks',
      problemDesc:
        'Shared network filesystems (NFS) suffer lock contention, metadata serialization bottlenecks, and degraded random-access I/O under concurrent load.',
      solutionTitle: 'Local-Bus Response',
      solutionDesc:
        'Hot data blocks execute against local caching tiers, bypassing network roundtrips and matching physical NVMe access latency.',
    },
    {
      dimension: 'Storage Economics',
      problemTitle: 'Provisioning Penalty',
      problemDesc:
        'Maintaining petabyte-scale datasets on raw block storage or high-performance appliances creates exponential infrastructure cost.',
      solutionTitle: 'S3-Backed Economics',
      solutionDesc:
        'High-volume cold data resides in commodity object storage (AWS S3, Cloudflare R2, MinIO). Only active working sets occupy high-speed tiers.',
    },
  ],
};

export const FEATURES_CONTENT: FeatureCard[] = [
  {
    id: 'multi-node',
    tag: 'CONCURRENCY & CONSISTENCY',
    title: 'Multi-Node Shared Namespace',
    body: 'Mount shared directories simultaneously across hundreds of compute instances. Read and write concurrently with POSIX-compliant semantics and automated metadata synchronization.',
    spec: 'POSIX compliant / Standard VFS interface',
  },
  {
    id: 'local-speed',
    tag: 'I/O THROUGHPUT',
    title: 'Near-Local Disk Speeds',
    body: 'Bypass conventional network file system bottlenecks. Japolic leverages node-local memory and NVMe caching to service read operations at bus speeds, minimizing kernel wait cycles.',
    spec: 'Low-latency cache hits / Direct I/O path',
  },
  {
    id: 's3-compat',
    tag: 'OBJECT PROTOCOLS',
    title: 'Zero-Migration S3 Compatibility',
    body: 'Mount existing AWS S3 buckets or S3-compatible APIs directly as a filesystem. Read objects as standard files and write files directly as objects without proprietary data conversion.',
    spec: 'Direct bidirectional sync: s3:// namespaces',
  },
  {
    id: 'cost-storage',
    tag: 'COST ARCHITECTURE',
    title: 'High-Capacity Cold Storage',
    body: 'Store petabyte-scale datasets on low-cost object tiers while retaining direct file access. Pay standard object storage rates for bulk data while achieving performance where active compute runs.',
    spec: 'Commodity object backend billing',
  },
  {
    id: 'tiering',
    tag: 'CACHE COHERENCE',
    title: 'Automated Working-Set Tiering',
    body: 'Active working sets are automatically retained in high-speed local memory and NVMe tiers. Dormant blocks are flushed back to durable object storage without manual data migration scripts.',
    spec: 'LRU eviction & continuous synchronization',
  },
  {
    id: 'ai-workloads',
    tag: 'COMPUTE INTEGRATION',
    title: 'Built for AI & Distributed Compute',
    body: 'Eliminate GPU data starvation during large-model training and batch inference. Keep input pipelines saturated by streaming sequential datasets directly into memory buffers.',
    spec: 'Optimized for PyTorch DataLoader & batch I/O',
  },
];

export const USE_CASES_CONTENT: UseCaseItem[] = [
  {
    id: 'ai-ml',
    tag: 'DEEP LEARNING & INFERENCE',
    title: 'Keep GPU compute fully saturated.',
    body: 'Large training runs frequently stall waiting for training samples to load over network storage. Japolic caches active epochs locally across the training cluster while sourcing multi-terabyte datasets directly from S3.',
    impact: 'Eliminates pre-training download stages; reduces idle GPU cycles caused by network I/O wait; supports direct file reads from existing training scripts without dataset conversion.',
    highlight: 'Zero idle GPU wait states on data ingestion',
    snippet: `# PyTorch / Distributed Training Config
storage:
  driver: japolic-vfs
  source: s3://ml-datasets-prod/imagenet-21k
  cache_tier: /mnt/nvme/cache
  read_ahead: aggressive`,
  },
  {
    id: 'hpc',
    tag: 'HIGH-CONCURRENCY COMPUTE',
    title: 'Concurrent reads across distributed workers without file lock contention.',
    body: 'When hundreds of analytics or simulation workers query the same reference files, standard NFS clusters degrade under metadata locking. Japolic provides distributed read replicas with cache coherence across every worker node.',
    impact: 'Scalable multi-node read throughput; distributed block caching across instances; eliminates single-point-of-failure storage appliances.',
    highlight: 'Deterministic read latency under high worker concurrency',
  },
  {
    id: 'cloud-native',
    tag: 'PLATFORM ENGINEERING',
    title: 'Unified filesystem access over commodity object storage.',
    body: 'Platform teams run containerized microservices that demand file-based shared persistence, but managing enterprise SAN/NAS hardware in the cloud is cost-prohibitive. Japolic attaches object storage as an ultra-fast local drive.',
    impact: 'Standard POSIX directory structure; eliminates expensive provisioned IOPS charges; decouples storage scaling from compute instance limits.',
    highlight: 'Works across AWS, on-premise Ceph, or bare metal',
  },
];

export const FOOTER_CONTENT = {
  ctaTitle: 'Ready to test Japolic on your infrastructure?',
  ctaDescription:
    'Deploy a preview cluster or integrate with existing S3 buckets. We are working closely with engineering teams running data-intensive compute.',
  ctaButton: 'Request Early Access',
  columns: [
    {
      title: 'Technology',
      links: [
        { label: 'Architecture Overview', href: '#problem-solution' },
        { label: 'Cache Coherence Model', href: '#capabilities' },
        { label: 'S3 Protocol Bridge', href: '#capabilities' },
        { label: 'Release Notes (v0.9)', href: '#' },
      ],
    },
    {
      title: 'Workloads',
      links: [
        { label: 'AI / Deep Learning Pipelines', href: '#workloads' },
        { label: 'Distributed Batch Compute', href: '#workloads' },
        { label: 'Container Storage (Kubernetes)', href: '#workloads' },
        { label: 'Hybrid Cloud & Bare Metal', href: '#workloads' },
      ],
    },
    {
      title: 'Developer',
      links: [
        { label: 'Documentation', href: '#' },
        { label: 'Quickstart Guide', href: '#' },
        { label: 'CLI Reference', href: '#' },
        { label: 'Mount Configuration', href: '#' },
      ],
    },
    {
      title: 'Organization',
      links: [
        { label: 'About Japolic', href: '#' },
        { label: 'Security & Integrity', href: '#' },
        { label: 'Privacy Policy', href: '#' },
        { label: 'Contact Team', href: '#' },
      ],
    },
  ],
  copyright: '© 2026 Japolic Storage Systems, Inc. Engineered for high-throughput distributed computing.',
  status: 'System Operational · POSIX v2.4 Compliant',
};
