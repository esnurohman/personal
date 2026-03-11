export default function Info({ label, value }: { label: string; value: any }) {
    return (
        <div>
            <p className="text-sm text-muted-foreground">{label}</p>
            <div className="mt-1 font-medium">{value}</div>
        </div>
    );
}
