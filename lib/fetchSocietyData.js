const fetchSocietyData = async () => {
    try {
        const response = await fetch("/api/society", {
        method: "POST",
        cache: 'force-cache'
        });
        const data = await response.json();
        return {
            shortName: data.shortName,
            longName: data.longName,
            address: data.address
        }
    } catch (error) {
        console.error("Failed to fetch society data", error);
    }
};

export default fetchSocietyData;