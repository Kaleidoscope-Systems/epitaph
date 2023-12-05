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

const updatePerson = async (peopleQuery, peopleData) => {
  try {
      const response = await fetch(`/api/v1/people/${peopleQuery}`, {
        method: "PUT",
        body: JSON.stringify(peopleData),
        cache: 'default',
      });
      const data = await response.json();
      return data
  } catch (error) {
      console.error("Failed to update person", error);
  }
}

export { fetchPeople, updatePerson }