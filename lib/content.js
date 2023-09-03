const fetchAboutUs = async () => {
  try {
      const response = await fetch("/api/v1/content/aboutUs", {
        method: "GET",
        cache: 'default',
      });
      const data = await response.json();
      return data
  } catch (error) {
      console.error("Failed to fetch content", error);
  }
};

export default fetchAboutUs;