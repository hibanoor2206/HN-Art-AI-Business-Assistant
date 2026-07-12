import { useState, useRef, useEffect } from 'react';
import { Send, Trash2, Copy, Check, Sparkles, FileText } from 'lucide-react';
import { useChatHistory } from '../lib/useChatHistory';
import { generateContent } from '../lib/generator';
import { useToast } from '../lib/useToast';
import { getTool } from '../lib/tools';
import type { ToolId } from '../types';

interface AIChatProps {
  toolId: ToolId;
}

const WELCOME = `Welcome to HN Art AI 👋

I'm your AI Business Assistant.

Choose any business tool from the sidebar and I'll help you generate professional business content in seconds.`;

export function AIChat({ toolId }: AIChatProps) {
  const tool = getTool(toolId);
  const { messages, addMessage, clear, loading } = useChatHistory(toolId);
  const [input, setInput] = useState('');
  const [generating, setGenerating] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, generating]);

  function buildFieldsFromInput(text: string): Record<string, string> {
    if (!tool) return {};
    const fields: Record<string, string> = {};
    tool.fields.forEach((f, i) => {
      if (i === 0) fields[f.id] = text;
      else fields[f.id] = f.placeholder;
    });
    return fields;
  }

  async function handleGenerate() {
    if (!input.trim() || generating || !tool) return;
    const userContent = input.trim();
    setInput('');
    setGenerating(true);

    await addMessage('user', userContent);

    setTimeout(async () => {
      const fields = buildFieldsFromInput(userContent);
      const content = generateContent(toolId, fields);
      await addMessage('assistant', content);
      setGenerating(false);
    }, 1200);
  }

  function handleCopy(content: string, id: string) {
    navigator.clipboard.writeText(content);
    setCopiedId(id);
    toast('Copied to clipboard');
    setTimeout(() => setCopiedId(null), 2000);
  }

  async function handleClear() {
    await clear();
    toast('Chat cleared');
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleGenerate();
    }
  }

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-sage-300 border-t-gold-500" />
      </div>
    );
  }

  const hasMessages = messages.length > 0;

  return (
    <div className="flex h-full flex-col">
      {tool && (
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-sage-100 px-4 py-3 dark:border-sage-700/40 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-sage-600 to-sage-800">
              <Sparkles size={18} className="text-gold-400" />
            </div>
            <div>
              <h3 className="font-serif text-base font-semibold text-sage-800 dark:text-beige-50">{tool.name}</h3>
              <p className="text-xs text-sage-500 dark:text-sage-400">{tool.description}</p>
            </div>
          </div>
          {hasMessages && (
            <button
              onClick={handleClear}
              className="inline-flex items-center gap-1.5 rounded-lg border border-sage-200 px-3 py-1.5 text-xs font-medium text-sage-600 transition hover:bg-rose-50 hover:text-rose-600 dark:border-sage-700 dark:text-beige-300"
            >
              <Trash2 size={14} />
              Clear Chat
            </button>
          )}
        </div>
      )}

      <div ref={scrollRef} className="flex-1 overflow-y-auto scrollbar-thin px-4 py-6 sm:px-6">
        {!hasMessages ? (
          <div className="flex h-full flex-col items-center justify-center text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-sage-600 to-sage-800 shadow-lg shadow-sage-700/15">
              <Sparkles size={32} className="text-gold-400" />
            </div>
            <p className="mt-5 max-w-sm whitespace-pre-line text-sm leading-relaxed text-sage-600 dark:text-beige-300">
              {WELCOME}
            </p>

            {tool && (
              <div className="mt-8 w-full max-w-lg">
                <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-sage-400">Try these prompts</p>
                <div className="grid gap-2 sm:grid-cols-2">
                  {tool.examples.map((ex) => (
                    <button
                      key={ex}
                      onClick={() => setInput(ex)}
                      className="group flex w-full items-start gap-2 rounded-xl bg-white p-3 text-left text-xs text-sage-600 ring-1 ring-sage-100 transition hover:shadow-md hover:ring-sage-200 dark:bg-sage-700/30 dark:text-beige-300 dark:ring-sage-700/40"
                    >
                      <FileText size={14} className="mt-0.5 flex-shrink-0 text-gold-500" />
                      <span>{ex}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="mx-auto max-w-3xl space-y-5">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-[fadeUp_0.3s_ease-out]`}
              >
                <div className={`max-w-[85%] ${msg.role === 'assistant' ? 'w-full' : ''}`}>
                  {msg.role === 'assistant' && (
                    <div className="mb-1.5 flex items-center gap-2">
                      <div className="flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br from-sage-600 to-sage-800">
                        <Sparkles size={12} className="text-gold-400" />
                      </div>
                      <span className="text-xs font-semibold text-sage-500 dark:text-sage-400">HN Art AI</span>
                    </div>
                  )}
                  <div
                    className={`rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-gradient-to-r from-sage-700 to-sage-800 text-white'
                        : 'bg-white text-sage-800 ring-1 ring-sage-100 dark:bg-sage-700/40 dark:text-beige-100 dark:ring-sage-700/40'
                    }`}
                  >
                    {msg.role === 'assistant' ? (
                      <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">{msg.content}</pre>
                    ) : (
                      msg.content
                    )}
                  </div>
                  {msg.role === 'assistant' && (
                    <button
                      onClick={() => handleCopy(msg.content, msg.id)}
                      className="mt-2 inline-flex items-center gap-1.5 rounded-lg px-2 py-1 text-xs font-medium text-sage-500 transition hover:bg-sage-100 hover:text-sage-700 dark:text-sage-400 dark:hover:bg-sage-700/50"
                    >
                      {copiedId === msg.id ? (
                        <>
                          <Check size={13} className="text-emerald-500" /> Copied
                        </>
                      ) : (
                        <>
                          <Copy size={13} /> Copy
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            ))}

            {generating && (
              <div className="flex justify-start animate-[fadeUp_0.3s_ease-out]">
                <div className="max-w-[85%]">
                  <div className="mb-1.5 flex items-center gap-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br from-sage-600 to-sage-800">
                      <Sparkles size={12} className="text-gold-400" />
                    </div>
                    <span className="text-xs font-semibold text-sage-500 dark:text-sage-400">Generating...</span>
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-2xl bg-white px-4 py-3 ring-1 ring-sage-100 dark:bg-sage-700/40 dark:ring-sage-700/40">
                    <span className="h-2 w-2 animate-[pulseDot_1.4s_ease-in-out_infinite] rounded-full bg-gold-500" />
                    <span className="h-2 w-2 animate-[pulseDot_1.4s_ease-in-out_0.2s_infinite] rounded-full bg-gold-500" />
                    <span className="h-2 w-2 animate-[pulseDot_1.4s_ease-in-out_0.4s_infinite] rounded-full bg-gold-500" />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="border-t border-sage-100 p-4 dark:border-sage-700/40 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <div className="flex items-end gap-2 rounded-2xl border border-sage-200 bg-white p-2 focus-within:border-gold-500 focus-within:ring-2 focus-within:ring-gold-500/20 dark:border-sage-700 dark:bg-sage-700/40">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={tool?.placeholder ?? 'Describe what you need...'}
              rows={1}
              className="flex-1 resize-none bg-transparent px-2 py-2 text-sm text-sage-800 placeholder:text-sage-400 focus:outline-none dark:text-beige-100"
              style={{ maxHeight: '120px' }}
            />
            <button
              onClick={handleClear}
              disabled={!hasMessages}
              className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl text-sage-400 transition hover:bg-sage-100 hover:text-sage-600 disabled:opacity-30 dark:hover:bg-sage-700"
              title="Clear chat"
            >
              <Trash2 size={17} />
            </button>
            <button
              onClick={handleGenerate}
              disabled={!input.trim() || generating}
              className="flex h-9 items-center gap-1.5 rounded-xl bg-gradient-to-r from-sage-700 to-sage-800 px-4 text-sm font-semibold text-white transition hover:from-sage-800 hover:to-sage-900 disabled:opacity-40"
            >
              {generating ? (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              ) : (
                <>
                  <Send size={15} />
                  <span className="hidden sm:inline">Generate</span>
                </>
              )}
            </button>
          </div>
          <p className="mt-2 text-center text-[10px] text-sage-400">
            Press Enter to generate · Shift+Enter for new line
          </p>
        </div>
      </div>
    </div>
  );
}
