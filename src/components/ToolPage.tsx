import { useState } from 'react';
import { Sparkles, Copy, Check, Download, Wand2, FileText } from 'lucide-react';
import { generateContent } from '../lib/generator';
import { useToast } from '../lib/useToast';
import { useChatHistory } from '../lib/useChatHistory';
import { getTool } from '../lib/tools';
import type { ToolId } from '../types';

interface ToolPageProps {
  toolId: ToolId;
}

export function ToolPage({ toolId }: ToolPageProps) {
  const tool = getTool(toolId);
  const { addMessage } = useChatHistory(toolId);
  const [fields, setFields] = useState<Record<string, string>>({});
  const [output, setOutput] = useState('');
  const [generating, setGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  if (!tool) return null;

  function handleGenerate() {
    const required = tool!.fields.filter((f) => !f.optional);
    const missing = required.filter((f) => !fields[f.id]?.trim());
    if (missing.length > 0) {
      toast(`Please fill in: ${missing.map((f) => f.label).join(', ')}`, 'error');
      return;
    }

    setGenerating(true);
    setOutput('');

    setTimeout(async () => {
      const content = generateContent(toolId, fields);
      setOutput(content);
      setGenerating(false);
      await addMessage('user', JSON.stringify(fields));
      await addMessage('assistant', content);
      toast('Content generated successfully!');
    }, 1500);
  }

  function handleCopy() {
    navigator.clipboard.writeText(output);
    setCopied(true);
    toast('Copied to clipboard');
    setTimeout(() => setCopied(false), 2000);
  }

  function handleDownload() {
    const blob = new Blob([output], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${toolId}-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    toast('File downloaded');
  }

  function handleExample(example: string) {
    const firstField = tool!.fields[0];
    if (firstField) {
      setFields((prev) => ({ ...prev, [firstField.id]: example }));
    }
  }

  const inputCls =
    'w-full rounded-xl border border-sage-200 bg-white px-4 py-3 text-sm text-sage-800 placeholder:text-sage-400 focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/20 dark:border-sage-700 dark:bg-sage-700/40 dark:text-beige-100';

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div className="flex items-center gap-4">
        <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-sage-600 to-sage-800 shadow-lg">
          <Sparkles size={26} className="text-gold-400" />
        </div>
        <div>
          <h2 className="font-serif text-xl font-bold text-sage-800 dark:text-beige-50">{tool.name}</h2>
          <p className="mt-0.5 text-sm text-sage-500 dark:text-sage-400">{tool.description}</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Input area */}
        <div className="space-y-4 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-sage-100 dark:bg-sage-800/50 dark:ring-sage-700/40">
          <h3 className="font-serif text-base font-semibold text-sage-800 dark:text-beige-50">Input</h3>

          <div className="space-y-4">
            {tool.fields.map((field) => (
              <div key={field.id}>
                <label className="mb-1.5 block text-sm font-semibold text-sage-700 dark:text-beige-200">
                  {field.label}
                  {field.optional && (
                    <span className="ml-1.5 text-xs font-normal text-sage-400">(optional)</span>
                  )}
                </label>
                {field.type === 'textarea' ? (
                  <textarea
                    value={fields[field.id] ?? ''}
                    onChange={(e) => setFields({ ...fields, [field.id]: e.target.value })}
                    placeholder={field.placeholder}
                    rows={3}
                    className={`${inputCls} resize-y`}
                  />
                ) : (
                  <input
                    value={fields[field.id] ?? ''}
                    onChange={(e) => setFields({ ...fields, [field.id]: e.target.value })}
                    placeholder={field.placeholder}
                    className={inputCls}
                  />
                )}
              </div>
            ))}
          </div>

          <button
            onClick={handleGenerate}
            disabled={generating}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-sage-700 to-sage-800 px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:shadow-lg hover:from-sage-800 hover:to-sage-900 disabled:opacity-50"
          >
            {generating ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                Generating...
              </>
            ) : (
              <>
                <Wand2 size={16} className="text-gold-400" />
                Generate Content
              </>
            )}
          </button>

          <div className="border-t border-sage-100 pt-4 dark:border-sage-700/40">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-sage-400">Example prompts</p>
            <div className="space-y-1.5">
              {tool.examples.map((ex) => (
                <button
                  key={ex}
                  onClick={() => handleExample(ex)}
                  className="group flex w-full items-start gap-2 rounded-lg p-2 text-left text-xs text-sage-600 transition hover:bg-sage-50 dark:text-beige-300 dark:hover:bg-sage-700/50"
                >
                  <FileText size={13} className="mt-0.5 flex-shrink-0 text-gold-500" />
                  <span>{ex}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Output area */}
        <div className="flex flex-col rounded-2xl bg-white p-6 shadow-sm ring-1 ring-sage-100 dark:bg-sage-800/50 dark:ring-sage-700/40">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-base font-semibold text-sage-800 dark:text-beige-50">Output</h3>
            {output && (
              <div className="flex gap-2">
                <button
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-sage-200 px-3 py-1.5 text-xs font-medium text-sage-600 transition hover:bg-sage-50 dark:border-sage-700 dark:text-beige-300 dark:hover:bg-sage-700/50"
                >
                  {copied ? (
                    <>
                      <Check size={13} className="text-emerald-500" /> Copied
                    </>
                  ) : (
                    <>
                      <Copy size={13} /> Copy
                    </>
                  )}
                </button>
                <button
                  onClick={handleDownload}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-sage-200 px-3 py-1.5 text-xs font-medium text-sage-600 transition hover:bg-sage-50 dark:border-sage-700 dark:text-beige-300 dark:hover:bg-sage-700/50"
                >
                  <Download size={13} /> Download
                </button>
              </div>
            )}
          </div>

          <div className="mt-4 flex-1">
            {generating ? (
              <div className="flex h-full min-h-[300px] flex-col items-center justify-center">
                <div className="h-12 w-12 animate-spin rounded-full border-[3px] border-sage-200 border-t-gold-500" />
                <p className="mt-4 text-sm font-medium text-sage-500 dark:text-sage-400">AI is crafting your content...</p>
                <div className="mt-3 flex gap-1">
                  <span className="h-2 w-2 animate-[pulseDot_1.4s_ease-in-out_infinite] rounded-full bg-gold-500" />
                  <span className="h-2 w-2 animate-[pulseDot_1.4s_ease-in-out_0.2s_infinite] rounded-full bg-gold-500" />
                  <span className="h-2 w-2 animate-[pulseDot_1.4s_ease-in-out_0.4s_infinite] rounded-full bg-gold-500" />
                </div>
              </div>
            ) : output ? (
              <div className="animate-[fadeIn_0.4s_ease-out] rounded-xl bg-sage-50/60 p-4 dark:bg-sage-700/30">
                <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-sage-800 dark:text-beige-100">
                  {output}
                </pre>
              </div>
            ) : (
              <div className="flex h-full min-h-[300px] flex-col items-center justify-center text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-sage-50 dark:bg-sage-700/40">
                  <Sparkles size={28} className="text-sage-300 dark:text-sage-500" />
                </div>
                <p className="mt-4 text-sm font-medium text-sage-500 dark:text-sage-400">
                  Your generated content will appear here
                </p>
                <p className="mt-1 text-xs text-sage-400">
                  Fill in the fields and click Generate
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
