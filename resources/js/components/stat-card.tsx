import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function StatCard({
    title,
    value,
}: {
    title: string;
    value: number;
}) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-sm text-muted-foreground">
                    {title}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-3xl font-bold">{value}</div>
            </CardContent>
        </Card>
    );
}
