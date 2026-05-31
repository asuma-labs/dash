import { Suspense } from 'react';
import MagicClient from './MagicClient';

export default function MagicPage() {
    return (
        <Suspense fallback={<div className="text-center py-20">Loading...</div>}>
            <MagicClient />
        </Suspense>
    );
}
