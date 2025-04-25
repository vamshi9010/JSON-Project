import { Model } from './model.js';
import { View } from './view.js';

const Controller = {
  goals: [],

  async init() {
    View.bindSubmit(this.handleAddGoal.bind(this));
    View.bindAchieve(this.handleAchieve.bind(this));
    this.goals = await Model.getGoals();
    View.renderGoals(this.goals);
  },

  async handleAddGoal() {
    const newGoal = View.getFormData();
    console.log("Data to be added:", newGoal);

    if (!newGoal.description || !newGoal.category || !newGoal.repetitions) {
      alert("Please fill in all fields.");
      return;
    }

    const savedGoal = await Model.addGoal(newGoal);
    console.log("Saved from API:", savedGoal); 
    this.goals.push(savedGoal);
    View.renderGoals(this.goals);
    View.clearForm();
  },

  async handleAchieve(id) {
    const goal = this.goals.find(g => g.id === id);
    const updatedGoal = await Model.toggleAchieved(id, goal.achieved);
    goal.achieved = updatedGoal.achieved;
    View.renderGoals(this.goals);
  }
};

Controller.init();
