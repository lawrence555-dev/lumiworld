import WeekClient from './WeekClient';

export function generateStaticParams() {
    return [
        { id: 'w1' },
        { id: 'w2' },
        { id: 'w3' },
        { id: 'w4' },
        { id: 'w5' },
        { id: 'w6' },
        { id: 'w7' },
        { id: 'w8' },
    ];
}

export default function WeekPage({ params }: { params: Promise<{ id: string }> }) {
    return <WeekClient params={params} />;
}
