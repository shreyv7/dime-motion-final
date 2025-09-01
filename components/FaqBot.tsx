import React, { useMemo, useRef, useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { faqTree, FaqNode } from '@/lib/faqTree';
import { ChevronLeft, MessageSquare } from 'lucide-react';

const useBreadcrumb = (root: FaqNode) => {
  const [path, setPath] = useState<FaqNode[]>([root]);
  const current = path[path.length - 1];

  const goTo = (node: FaqNode) => setPath(prev => [...prev, node]);
  const back = () => setPath(prev => (prev.length > 1 ? prev.slice(0, -1) : prev));
  const reset = () => setPath([root]);

  return { path, current, goTo, back, reset };
};

const OptionButton = ({ node, onClick }: { node: FaqNode; onClick: () => void }) => (
  <Button
    onClick={onClick}
    variant="outline"
    className="w-full justify-start text-left h-auto py-3"
  >
    {node.title}
  </Button>
);

const Answer = ({ node }: { node: FaqNode }) => (
  <div className="space-y-4">
    {node.answer && <p className="text-foreground leading-relaxed">{node.answer}</p>}
    {node.link && (
      <a
        href={node.link}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90"
      >
        Open PDF
      </a>
    )}
  </div>
);

const FaqBot = () => {
  const { current, goTo, back, reset, path } = useBreadcrumb(faqTree);
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      panelRef.current?.focus();
    }
  }, [isOpen]);

  const options = useMemo(() => current.children ?? [], [current]);
  const isAnswer = !!current.answer;

  return (
    <>
      {/* Launcher */}
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-300 z-50"
        size="icon"
        aria-label="Open FAQ Bot"
      >
        <MessageSquare className="w-6 h-6" />
      </Button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-end p-4">
          <Card
            ref={panelRef}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            className="w-full max-w-md h-[520px] bg-card border border-border shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border">
              <div className="flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-primary" />
                <h3 className="font-semibold text-foreground">FAQ Assistant</h3>
              </div>
              <div className="flex items-center gap-2">
                {path.length > 1 && (
                  <Button variant="ghost" size="sm" onClick={back}>
                    <ChevronLeft className="w-4 h-4 mr-1" /> Back
                  </Button>
                )}
                <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
                  Close
                </Button>
              </div>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {/* Breadcrumbs */}
              <div className="text-xs text-muted-foreground">
                {path.map((p, idx) => (
                  <span key={p.id}>
                    {idx > 0 && ' / '} {p.title}
                  </span>
                ))}
              </div>

              {!isAnswer && options.length > 0 && (
                <div className="grid grid-cols-1 gap-3">
                  {options.map((child) => (
                    <OptionButton key={child.id} node={child} onClick={() => goTo(child)} />
                  ))}
                </div>
              )}

              {isAnswer && <Answer node={current} />}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-border flex items-center justify-between">
              <Button variant="outline" onClick={reset}>Start Over</Button>
              <a href="#contact" className="text-sm underline underline-offset-4">Need more help? Contact us</a>
            </div>
          </Card>
        </div>
      )}
    </>
  );
};

export default FaqBot;



