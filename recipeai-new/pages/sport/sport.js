Page({
  data: {
    sliderValue: 20, // 默认值
    sportResult: null
  },
  
  // 滑动条变化事件
  onSliderChange: function(e) {
    this.setData({
      sliderValue: e.detail.value
    });
  },
  
  // 生成随机运动
  generateSport: function() {
    const duration = this.data.sliderValue;
    const randomSport = this.getRandomSport(duration);
    
    if (randomSport) {
      this.setData({
        sportResult: randomSport
      });
    } else {
      wx.showToast({
        title: '该时长无可用运动',
        icon: 'none'
      });
    }
  },
  
  // 根据时长获取随机运动
  getRandomSport: function(duration) {
    // 使用你提供的运动数据
    const allSports = [
      {
        "id": 1,
        "name": "高强度间歇训练(HIIT)",
        "suitableDurations": [5, 10, 15, 20, 25, 30, 35, 40, 45],
        "description": "包含多组高强度动作，每组动作45秒，休息15秒"
      },
      {
        "id": 2,
        "name": "慢跑",
        "suitableDurations": [10,15, 20, 25, 30, 35, 40, 45],
        "description": "保持匀速慢跑，心率控制在120-150次/分钟"
      },
      {
        "id": 3,
        "name": "瑜伽练习",
        "suitableDurations": [15, 20, 25, 30, 40, 45],
        "description": "包含呼吸练习、体位法和冥想的综合瑜伽课程"
      },
      {
        "id": 4,
        "name": "核心力量训练",
        "suitableDurations": [5, 10, 15, 20, 25, 30],
        "description": "针对腹部、背部和骨盆底肌的强化训练"
      },
      {
        "id": 5,
        "name": "快速步行",
        "suitableDurations": [5,10, 15, 20, 25, 30, 35, 40, 45],
        "description": "以快于平常的速度步行，保持呼吸均匀"
      },
      {
        "id": 6,
        "name": "跳绳",
        "suitableDurations": [5, 10, 15, 20, 25, 30],
        "description": "高效有氧运动，可进行单脚跳、双脚跳等变化"
      },
      {
        "id": 7,
        "name": "骑自行车",
        "suitableDurations": [5, 10, 15, 20, 25, 30, 35, 40, 45],
        "description": "高效的有氧运动方式，能全面锻炼心肺功能，提高心肺耐力。身体稍前倾、两臂伸直，注意调整合适的坐垫高度"
      },
      {
        "id": 8,
        "name": "游泳",
        "suitableDurations": [30, 35, 40, 45],
        "description": "全身性的有氧运动，能有效提高心肺能力，锻炼身体协调性"
      },
      {
        "id": 9,
        "name": "篮球",
        "suitableDurations": [15, 20, 25, 30, 35, 40, 45],
        "description": "能有效提升心肺功能、爆发力、耐力和协调性，注意热身以避免脚踝和膝关节损伤"
      },
      {
        "id": 10,
        "name": "羽毛球",
        "suitableDurations": [20, 25, 30, 35, 40, 45],
        "description": "运动中需注意快速移动与挥拍的协调性，运用各种击球技巧，并注重脚步灵活性训练"
      },
      {
        "id": 11,
        "name": "快速爬楼梯",
        "suitableDurations": [5,10, 15, 20, 25, 30],
        "description": "利用楼梯进行的有氧运动，高效锻炼下肢和心肺"  
      }
    ];
    
    // 筛选支持当前时长的运动
    const availableSports = allSports.filter(sport => 
      sport.suitableDurations.includes(duration)
    );
    
    // 如果没有可用运动，返回null
    if (availableSports.length === 0) {
      return null;
    }
    
    // 随机选择一项运动[1](@ref)
    const randomIndex = Math.floor(Math.random() * availableSports.length);
    const selectedSport = availableSports[randomIndex];
    
    // 生成动态描述（针对HIIT特殊处理）
    let dynamicDescription = selectedSport.description;
    if (selectedSport.id === 1) { // HIIT
      const groups = Math.floor(duration / 5); // 每5分钟一组
      dynamicDescription = `包含${groups}组高强度动作，每组动作45秒，休息15秒`;
    }
    
    return {
      id: selectedSport.id,
      name: selectedSport.name,
      duration: duration,
      description: dynamicDescription
    };
  }
})