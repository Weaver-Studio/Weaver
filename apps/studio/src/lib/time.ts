import { ThreadMetadata } from '@studio/types/chat';

export function formatRelativeTime(timestamp: bigint): string {
  const now = Date.now();
  const diff = now - Number(timestamp);

  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (diff < 60000) {
    return "Just now";
  } else if (diff < 3600000) {
    return `${minutes} minutes ago`;
  } else if (diff < 86400000) {
    return `${hours} hours ago`;
  } else if (diff < 604800000) {
    return `${days} days ago`;
  } else {
    const date = new Date(Number(timestamp));
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }
}

export function groupThreadsByDate(threads: ThreadMetadata[]): Record<string, ThreadMetadata[]> {
  const now = Date.now();
  const grouped: Record<string, ThreadMetadata[]> = {};

  threads.forEach(thread => {
    const diff = now - Number(thread.updatedAt);

    let groupName: string;

    if (diff < 86400000) {
      groupName = 'Today';
    } else if (diff < 172800000) {
      groupName = 'Yesterday';
    } else if (diff < 604800000) {
      groupName = 'This Week';
    } else if (diff < 2592000000) {
      groupName = 'This Month';
    } else {
      groupName = 'Older';
    }

    if (!grouped[groupName]) {
      grouped[groupName] = [];
    }
    grouped[groupName].push(thread);
  });

  // Sort threads within each group by updatedAt in descending order
  Object.keys(grouped).forEach(groupName => {
    grouped[groupName].sort((a, b) => Number(b.updatedAt) - Number(a.updatedAt));
  });

  return grouped;
}