import Navbar from '@/app/components/common/Navbar';
import TestimonialForm from './TestimonialForm';

export default function Page() {
    return (
        <>
            <Navbar />
            <main className="pt-24">
                <TestimonialForm />
            </main>
        </>
    );
}
