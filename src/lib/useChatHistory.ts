import { useState, useEffect, useCallback } from 'react';
import { supabase } from './supabase';
import type { ChatMessage } from '../types';

export function useChatHistory(toolId: string) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('chat_history')
      .select('*')
      .eq('tool_id', toolId)
      .order('created_at', { ascending: true });
    if (!error && data) {
      setMessages(data as ChatMessage[]);
    }
    setLoading(false);
  }, [toolId]);

  useEffect(() => {
    load();
  }, [load]);

  const addMessage = useCallback(
    async (role: 'user' | 'assistant', content: string): Promise<void> => {
      const { error } = await supabase
        .from('chat_history')
        .insert({ tool_id: toolId, role, content });
      if (!error) {
        await load();
      }
    },
    [toolId, load]
  );

  const clear = useCallback(async (): Promise<void> => {
    const { error } = await supabase.from('chat_history').delete().eq('tool_id', toolId);
    if (!error) {
      setMessages([]);
    }
  }, [toolId]);

  return { messages, loading, addMessage, clear, reload: load };
}

export function useAllChatHistory() {
  const [counts, setCounts] = useState<Record<string, number>>({});

  const refresh = useCallback(async () => {
    const { data, error } = await supabase
      .from('chat_history')
      .select('tool_id');
    if (!error && data) {
      const map: Record<string, number> = {};
      for (const row of data) {
        map[row.tool_id] = (map[row.tool_id] ?? 0) + 1;
      }
      setCounts(map);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { counts, refresh };
}
