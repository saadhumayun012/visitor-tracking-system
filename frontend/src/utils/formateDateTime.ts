// utils/formatDateTime.ts
export const formatDateTime = (isoString: string | null | undefined): string => {
    if (!isoString) {
        return "--";
    }
    
    const date = new Date(isoString);
    
    const dateStr = date.toLocaleDateString('en-GB'); // DD/MM/YYYY
    const timeStr = date.toLocaleTimeString('en-GB', { 
        hour: '2-digit', 
        minute: '2-digit' 
    });
    
    return `${dateStr} _ ${timeStr}`;
};

export const formatDate = (isoString: string | null | undefined): string => {
    if (!isoString) {
        return "N/A";
    }
    
    const date = new Date(isoString);
    return date.toLocaleDateString('en-GB');
};