// frontend/app/auth/callback/page.tsx
import { Suspense } from 'react';
import CallbackClient from './CallbackClient';

export default function CallbackPage() {
    return (
        <Suspense fallback={<div className="text-center py-20">Loading...</div>}>
            <CallbackClient />
        </Suspense>
    );
}
