export const handleError = (error: unknown, context: string) => {
    console.error(`${context}:`, error);
    return { success: false, message: 'An error occurred' };
}; 