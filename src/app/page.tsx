import dynamic from 'next/dynamic';

const CalendlyWidget = dynamic(() => import('@/components/CalendlyWidget'), {
  loading: () => <div className="animate-pulse h-[700px] bg-muted rounded-lg" />,
  ssr: false
});