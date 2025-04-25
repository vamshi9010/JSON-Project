export const View = {
  form: document.getElementById('goal-form'),
  title: document.getElementById('goal-title'),
  category: document.getElementById('goal-category'),
  duration: document.getElementById('goal-duration'),
  goalList: document.getElementById('goal-list'),

  getFormData() {
    return {
      description: this.title.value.trim(),
      category: this.category.value,
      repetitions: this.duration.value.trim(),
      achieved: false
    };
  },

  clearForm() {
    this.form.reset();
    this.category.selectedIndex = 0;
  },

  renderGoal(goal) {
  	console.log("Rendering goal:", goal);
    const li = document.createElement('li');
    li.className = 'goal-item';
    if (goal.achieved) li.classList.add('achieved');

    li.innerHTML = `
      <span>
        ${goal.description} - <strong>${goal.category}</strong>
        (${goal.repetitions})
      </span>
      <button class="achieve-btn" data-id="${goal.id}">
        ${goal.achieved ? 'Undo' : 'Mark as Achieved'}
      </button>
    `;

    this.goalList.appendChild(li);
  },

  renderGoals(goals) {
    this.goalList.innerHTML = '';
    goals.forEach(this.renderGoal.bind(this));
  },

  bindSubmit(handler) {
    this.form.addEventListener('submit', e => {
      e.preventDefault();
      handler();
    });
  },

  bindAchieve(handler) {
    this.goalList.addEventListener('click', e => {
      if (e.target.classList.contains('achieve-btn')) {
        const id = +e.target.dataset.id;
        handler(id);
      }
    });
  }
};
