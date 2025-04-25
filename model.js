const API = "http://localhost:3000/goals";

export const Model = {
  async getGoals() {
    const res = await fetch(API);
    return await res.json();
  },

  async addGoal(goal) {
    const res = await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(goal)
    });
    return await res.json();
  },

  async toggleAchieved(id, currentStatus) {
    const res = await fetch(`${API}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ achieved: !currentStatus })
    });
    return await res.json();
  }
};
