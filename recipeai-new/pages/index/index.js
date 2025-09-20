// index.js
function calculateBMI(height_cm, weight_kg) {
  const height_m = height_cm / 100;
  if (!height_cm || !weight_kg) return '';
  return (weight_kg / (height_m * height_m)).toFixed(1);
}

Page({
  data: {
    age: '',
    height: '',
    weight: '',
    goal: '',
    goals: ['饮食控制', '运动', '药物治疗'],
    bmi: '',
    recipe: ''
  },
  onAgeInput(e) {
    this.setData({ age: e.detail.value });
  },
  onHeightInput(e) {
    this.setData({ height: e.detail.value }, this.updateBMI);
  },
  onWeightInput(e) {
    this.setData({ weight: e.detail.value }, this.updateBMI);
  },
  onGoalChange(e) {
    this.setData({ goal: this.data.goals[e.detail.value] });
  },
  updateBMI() {
    const { height, weight } = this.data;
    if (height && weight) {
      const h = Number(height) / 100;
      const bmi = (Number(weight) / (h * h)).toFixed(1);
      this.setData({ bmi });
    } else {
      this.setData({ bmi: '' });
    }
  },
  onRecommend() {
    const { age, height, weight, goal, bmi } = this.data;
    if (!age || !height || !weight || !goal) {
      wx.showToast({ title: '请填写完整信息', icon: 'none' });
      return;
    }
    
    // 跳转到result页面，并传递用户信息
    wx.navigateTo({
      url: `/pages/result/index?age=${age}&height=${height}&weight=${weight}&goal=${goal}&bmi=${bmi}`
    });
  },
  // pages/index/index.js
  // 今日运动按钮点击事件
  goToExercise() {
    
    // 跳转到运动建议页面
    wx.navigateTo({
      url: '/pages/sport/sport'
    });
  },
  
  goToAbout() {
    wx.navigateTo({
      url: '/pages/about/index'
    });
  },

  goToPeriod() {
    wx.navigateTo({
      url: '/pages/period/period'
    });
  }
});
