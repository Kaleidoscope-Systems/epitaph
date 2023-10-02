const fetchPeople = async (peopleQuery) => {
  try {
      const response = await fetch(`/api/v1/people/${peopleQuery}`, {
        method: "GET",
        cache: 'default',
      });
      const data = await response.json();
      return data
  } catch (error) {
      console.error("Failed to fetch people", error);
  }
};
export default fetchPeople