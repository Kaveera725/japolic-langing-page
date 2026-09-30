import React from 'react';
import { Folder, FileText, HardDrive, Check } from 'lucide-react';

export interface FileTreeItem {
  id: string;
  name: string;
  type: 'dir' | 'file' | 'vfs-mount' | 's3-bucket';
  size?: string;
  cached?: boolean;
  inode?: string;
  permissions?: string;
  children?: FileTreeItem[];
}

export interface FilesystemTreeProps {
  rootPath?: string;
  items?: FileTreeItem[];
  theme?: 'light' | 'dark';
  highlightId?: string;
  showMetadata?: boolean;
  className?: string;
}

const DEFAULT_TREE: FileTreeItem[] = [
  {
    id: 'root',
    name: '/mnt/shared',
    type: 'vfs-mount',
    permissions: 'drwxr-xr-x',
    inode: '00001',
    children: [
      {
        id: 'datasets',
        name: 'datasets',
        type: 'dir',
        permissions: 'drwxr-xr-x',
        children: [
          {
            id: 'imagenet',
            name: 'imagenet-21k.tar',
            type: 'file',
            size: '1.24 TB',
            cached: true,
            inode: '08492',
            permissions: '-rw-r--r--',
          },
          {
            id: 'embeddings',
            name: 'tokens-v3.parquet',
            type: 'file',
            size: '420 GB',
            cached: true,
            inode: '08493',
            permissions: '-rw-r--r--',
          },
        ],
      },
      {
        id: 'models',
        name: 'checkpoints',
        type: 'dir',
        permissions: 'drwxr-xr-x',
        children: [
          {
            id: 'epoch-14',
            name: 'epoch-14-bf16.bin',
            type: 'file',
            size: '148 GB',
            cached: false,
            inode: '14901',
            permissions: '-rw-r--r--',
          },
        ],
      },
    ],
  },
];

export const FilesystemTree: React.FC<FilesystemTreeProps> = ({
  rootPath = '/mnt/shared',
  items = DEFAULT_TREE,
  theme = 'light',
  highlightId,
  showMetadata = true,
  className = '',
}) => {
  const isDark = theme === 'dark';

  const renderNode = (item: FileTreeItem, depth: number = 0, _isLast: boolean = false) => {
    const isHighlighted = highlightId === item.id;

    return (
      <div key={item.id} className="relative font-mono text-[11px]">
        {/* Row element */}
        <div
          className={`flex items-center justify-between py-1 px-2 rounded-xs transition-colors ${
            isHighlighted
              ? isDark
                ? 'bg-olive-dim/50 border border-olive/40 text-olive-light'
                : 'bg-olive-wash border border-olive/30 text-olive'
              : isDark
              ? 'hover:bg-canvas-dark-subtle text-ink-inverse-sub'
              : 'hover:bg-canvas-subtle text-ink-secondary'
          }`}
          style={{ paddingLeft: `${depth * 16 + 8}px` }}
        >
          {/* Left: Icon + Name */}
          <div className="flex items-center gap-2 truncate">
            {item.type === 'vfs-mount' && (
              <HardDrive size={12} className="text-olive flex-shrink-0" />
            )}
            {item.type === 'dir' && (
              <Folder size={12} className="text-amber flex-shrink-0" />
            )}
            {item.type === 'file' && (
              <FileText size={12} className="text-ink-tertiary flex-shrink-0" />
            )}

            <span
              className={`truncate font-medium ${
                item.type === 'vfs-mount'
                  ? 'text-olive font-semibold'
                  : isDark
                  ? 'text-ink-inverse'
                  : 'text-ink-primary'
              }`}
            >
              {item.name}
            </span>

            {item.cached && (
              <span className="hidden sm:inline-flex items-center gap-0.5 px-1 py-0.2 rounded-xs bg-olive/10 border border-olive/30 text-[9px] text-olive font-semibold">
                <Check size={9} />
                <span>NVMe CACHED</span>
              </span>
            )}
          </div>

          {/* Right: Inode, Permissions, Size */}
          {showMetadata && (
            <div className="flex items-center gap-3 text-[10px] text-ink-tertiary flex-shrink-0">
              {item.size && (
                <span className="font-semibold text-ink-secondary dark:text-ink-inverse-sub">
                  {item.size}
                </span>
              )}
              {item.inode && (
                <span className="hidden md:inline text-ink-muted">
                  #{item.inode}
                </span>
              )}
              {item.permissions && (
                <span className="hidden sm:inline text-ink-muted">
                  {item.permissions}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Children items */}
        {item.children && (
          <div className="relative">
            {item.children.map((child, index) =>
              renderNode(child, depth + 1, index === (item.children?.length ?? 1) - 1)
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div
      className={`rounded-xs border overflow-hidden select-none ${
        isDark
          ? 'bg-canvas-dark-card border-hairline-dark'
          : 'bg-canvas-elevated border-hairline-light'
      } ${className}`}
    >
      {/* Terminal Title Bar */}
      <div
        className={`flex items-center justify-between px-3 py-1.5 border-b font-mono text-[10px] ${
          isDark
            ? 'bg-canvas-dark-subtle border-hairline-dark text-ink-inverse-mute'
            : 'bg-canvas-subtle border-hairline-light text-ink-tertiary'
        }`}
      >
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-olive" />
          <span className="font-semibold uppercase tracking-wider text-olive">
            POSIX VFS NAMESPACE
          </span>
        </div>
        <span>TREE VIEW // {rootPath}</span>
      </div>

      {/* Tree Content */}
      <div className="p-2 space-y-0.5">
        {items.map((item, index) => renderNode(item, 0, index === items.length - 1))}
      </div>
    </div>
  );
};
