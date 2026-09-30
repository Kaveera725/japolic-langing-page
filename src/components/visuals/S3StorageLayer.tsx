import React from 'react';
import { Cloud, Check, RefreshCw } from 'lucide-react';

export interface S3BucketInfo {
  uri: string;
  provider: 'aws-s3' | 'minio' | 'r2' | 'gcs' | 'generic';
  region?: string;
  objectsCount?: string;
  totalSize?: string;
  syncState?: 'synced' | 'writing' | 'idle';
}

export interface S3StorageLayerProps {
  buckets?: S3BucketInfo[];
  theme?: 'light' | 'dark';
  highlightUri?: string;
  compact?: boolean;
  className?: string;
}

const DEFAULT_BUCKETS: S3BucketInfo[] = [
  {
    uri: 's3://production-datasets-us-east',
    provider: 'aws-s3',
    region: 'us-east-1',
    objectsCount: '1.4M OBJS',
    totalSize: '48.2 TB',
    syncState: 'synced',
  },
  {
    uri: 'r2://inference-edge-cache',
    provider: 'r2',
    region: 'global-anycast',
    objectsCount: '820K OBJS',
    totalSize: '12.4 TB',
    syncState: 'synced',
  },
  {
    uri: 'minio://on-premise-hpc-store',
    provider: 'minio',
    region: 'datacenter-dc1',
    objectsCount: '3.1M OBJS',
    totalSize: '120.0 TB',
    syncState: 'idle',
  },
];

export const S3StorageLayer: React.FC<S3StorageLayerProps> = ({
  buckets = DEFAULT_BUCKETS,
  theme = 'light',
  highlightUri,
  compact = false,
  className = '',
}) => {
  const isDark = theme === 'dark';

  return (
    <div
      className={`rounded-xs border overflow-hidden select-none ${
        isDark
          ? 'bg-canvas-dark-card border-hairline-dark'
          : 'bg-canvas-elevated border-hairline-light'
      } ${className}`}
    >
      {/* Header Bar */}
      <div
        className={`flex items-center justify-between px-3.5 py-2 border-b font-mono text-[10px] ${
          isDark
            ? 'bg-canvas-dark-subtle border-hairline-dark text-ink-inverse-mute'
            : 'bg-canvas-subtle border-hairline-light text-ink-tertiary'
        }`}
      >
        <div className="flex items-center gap-2">
          <Cloud size={13} className="text-olive" />
          <span className="font-semibold uppercase tracking-wider text-olive">
            S3-COMPATIBLE PERSISTENCE LAYER
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden sm:inline">ASYNC PERSISTENCE</span>
          <span className="text-olive font-semibold">ZERO EGRESS LOCK-IN</span>
        </div>
      </div>

      {/* Bucket List */}
      <div className={`${compact ? 'p-2 space-y-1.5' : 'p-3 space-y-2'} font-mono text-[11px]`}>
        {buckets.map((bucket) => {
          const isHighlighted = highlightUri === bucket.uri;

          return (
            <div
              key={bucket.uri}
              className={`p-2.5 rounded-xs border transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-2 ${
                isHighlighted
                  ? isDark
                    ? 'bg-olive-dim/40 border-olive text-olive-light'
                    : 'bg-olive-wash border-olive/30 text-olive'
                  : isDark
                  ? 'bg-canvas-dark border-hairline-dark text-ink-inverse-sub hover:border-hairline-dark-subtle'
                  : 'bg-canvas-base border-hairline-light text-ink-secondary hover:border-hairline-strong'
              }`}
            >
              {/* Left: Bucket Identifier & Provider */}
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="h-1.5 w-1.5 rounded-full bg-olive flex-shrink-0" />
                <span
                  className={`truncate font-medium ${
                    isDark ? 'text-ink-inverse' : 'text-ink-primary'
                  }`}
                >
                  {bucket.uri}
                </span>

                <span
                  className={`text-[9px] px-1 py-0.2 rounded-xs uppercase tracking-wider flex-shrink-0 ${
                    isDark
                      ? 'bg-canvas-dark-subtle text-ink-inverse-mute'
                      : 'bg-canvas-subtle text-ink-tertiary'
                  }`}
                >
                  {bucket.provider}
                </span>
              </div>

              {/* Right: Metrics & Sync State */}
              <div className="flex items-center gap-4 text-[10px] text-ink-tertiary flex-shrink-0 pl-4 sm:pl-0">
                {bucket.totalSize && (
                  <span className="font-semibold text-ink-primary dark:text-ink-inverse">
                    {bucket.totalSize}
                  </span>
                )}

                {bucket.objectsCount && (
                  <span className="hidden md:inline text-ink-muted">
                    {bucket.objectsCount}
                  </span>
                )}

                <div className="flex items-center gap-1 text-olive">
                  {bucket.syncState === 'synced' && (
                    <>
                      <Check size={11} />
                      <span className="text-[9px] font-semibold">SYNCED</span>
                    </>
                  )}
                  {bucket.syncState === 'writing' && (
                    <>
                      <RefreshCw size={11} className="animate-spin" />
                      <span className="text-[9px] font-semibold">FLUSHING</span>
                    </>
                  )}
                  {bucket.syncState === 'idle' && (
                    <span className="text-[9px] text-ink-muted">READY</span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
