export interface Table{
    id: number;
    queue_id?: number;
    status: "available" | "unavailable";
}