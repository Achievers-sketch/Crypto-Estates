import DashboardClient from "@/components/dashboard-client";

export const metadata = {
    title: 'Your Dashboard - Crypto Estates',
    description: 'Manage your properties, transactions, and profile.',
};

export default function DashboardPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-4xl font-bold font-headline">User Dashboard</h1>
                <p className="text-muted-foreground mt-2">
                    Welcome back! Here you can manage your saved properties, view transaction history, and edit your profile.
                </p>
            </div>
            <DashboardClient />
        </div>
    );
}
