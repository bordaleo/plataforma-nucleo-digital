export async function withDb<T>(query: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await query();
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("[database] usando fallback do catálogo. Configure DATABASE_URL para persistir dados.");
    } else {
      console.error("[database]", error);
    }
    return fallback;
  }
}
