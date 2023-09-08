'use client';

import { ServerWithMembersWithProfiles } from '@/types';
import { ChannelType, Member, MemberRole } from '@prisma/client';
import { ActionTooltip } from '@/components/action-tooltip';
import { Plus, Settings, Users2 } from 'lucide-react';
import { useModal } from '@/hooks/use-modal-store';
import { Badge } from '../ui/badge';

interface ServerSectionProps {
  label: string;
  role?: MemberRole;
  sectionType: 'channels' | 'members';
  channelType?: ChannelType;
  server?: ServerWithMembersWithProfiles;
  members?: Member[];
}

export const ServerSection = ({ label, role, sectionType, channelType, server, members }: ServerSectionProps) => {
  const { onOpen } = useModal();

  return (
    <div className="flex items-center justify-between py-2">
      <div className="inline-flex items-center justify-center">
        <p className="text-xs uppercase font-semibold text-zinc-500 dark:text-zinc-400">{label}</p>
        {members?.length && (
          <Badge className="ml-1 text-xs font-bold text-zinc-100 dark:text-zinc-200 bg-zinc-500/70 dark:bg-zinc-500/50 rounded-md">
            {members.length} <Users2 className="ml-1 h-4 w-4" />{' '}
          </Badge>
        )}
      </div>
      {role !== MemberRole.GUEST && sectionType === 'channels' && (
        <ActionTooltip
          label="Create Channel"
          side="top">
          <button
            onClick={() => onOpen('createChannel', { channelType })}
            className="text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition">
            <Plus className="w-4 h-4" />
          </button>
        </ActionTooltip>
      )}
      {role === MemberRole.ADMIN && sectionType === 'members' && (
        <ActionTooltip
          label="Manage members"
          side="top">
          <button
            onClick={() => onOpen('members', { server })}
            className="text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition">
            <Settings className="w-4 h-4" />
          </button>
        </ActionTooltip>
      )}
    </div>
  );
};
