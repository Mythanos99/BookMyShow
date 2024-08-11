
export const formattedDob = (date: Date): string => {
    const dobDate = date ? new Date(date) : new Date();
    const formattedDob = dobDate.toISOString().split('T')[0];
    return formattedDob;
}