Page({
  data: {
    age: '',
    height: '',
    weight: '',
    goal: '',
    bmi: '',
    recipe: '', // 原始完整文本
    structuredRecipe: null, // 结构化数据
    loading: false,
    error: null
  },

  onLoad(options) {
    const { age, height, weight, goal, bmi } = options;
    this.setData({ age, height, weight, goal, bmi });
    this.generateRecipeByAIAgent();
  },

  /* 用云开发 AI Agent 生成食谱 */
  async generateRecipeByAIAgent() {
    const { age, height, weight, goal, bmi } = this.data;

    this.setData({ loading: true, error: null });
    wx.showLoading({ title: 'AI生成中...' });

    try {
      // 构造对话消息
      const prompt = `年龄 ${age} 岁，身高 ${height} cm，体重 ${weight} kg，BMI ${bmi}，性别女性，患有卵巢多囊综合征，请给出相应的饮食建议。
        【总热量建议】给出每日总热量摄入建议，并解释原因。
        【三大营养素分配】提供碳水化合物、蛋白质和脂肪的合理比例分配。
        【一日食谱示例】
        按早餐、午餐、晚餐、加餐分类，提供具体食谱，包括食材和分量。
        【注意事项】
        列出需要避免的食物和饮食习惯。
        请确保回复内容专业、实用且易于理解。`;

      // 调用官方 AI Agent
      const res = await wx.cloud.extend.AI.bot.sendMessage({
        data: {
          botId: 'bot-85c28eb1', // 替换为您的Agent ID
          msg: prompt
        }
      });

      // 逐字拼接
      let fullText = '';
      for await (const chunk of res.textStream) {
        fullText += chunk;
      }
      const finalText = fullText.trim();
      
      // 保存原始文本
      this.setData({ recipe: finalText });
      
      // 解析结构化内容
      this.parseStructuredResponse(finalText);
      
    } catch (err) {
      console.error(err);
      this.setData({ error: '生成失败，请重试' });
    } finally {
      wx.hideLoading();
      this.setData({ loading: false });
    }
  },
/* 解析结构化回复 */
parseStructuredResponse(fullText) {
  console.log("开始解析AI回复:", fullText); // 添加调试日志
  const result = {
    calorieAdvice: {
      dailyIntake: '1500-1800千卡', // 默认值，防止空显示
      reasons: [
        '基于您的身高、体重和PCOS状况，此热量范围有助于稳定血糖并促进健康减重。',
        '适度热量限制可改善胰岛素敏感性，这对PCOS管理至关重要。'
      ]
    },
    nutrientDistribution: [
      { name: '碳水化合物', ratio: '40-45%', food: '全谷物、豆类、低GI水果' },
      { name: '蛋白质', ratio: '25-30%', food: '瘦肉、鱼、豆制品、鸡蛋' },
      { name: '脂肪', ratio: '25-30%', food: '坚果、橄榄油、牛油果' }
    ],
    mealPlan: [
      { 
        time: "早餐 (400千卡)", 
        items: [
          { name: "燕麦奇亚籽碗", ingredients: "燕麦40g + 奇亚籽5g + 无糖杏仁奶200ml" }
        ],
        highlight: "富含膳食纤维和Omega-3，有助稳定血糖"
      },
      { 
        time: "午餐 (500千卡)", 
        items: [
          { name: "藜麦鸡胸肉沙拉", ingredients: "藜麦80g + 鸡胸肉120g + 混合蔬菜200g" }
        ],
        highlight: "高蛋白、低GI，提供持久能量"
      }
      // ... 其他餐次 ...
    ],
    precautions: [
      { category: "高升糖食物", details: "避免白砂糖、糯米制品（年糕、粽子）、西瓜（GI=72）" },
      { category: "乳制品摄入", details: "部分PCOS患者可能需限制乳制品，观察身体反应" }
      // ... 其他注意事项 ...
    ]
  };

  // 尝试解析AI返回的文本，若解析失败则使用默认值
  try {
    // 解析总热量建议部分（更灵活的正则匹配）
    const calorieSection = fullText.match(/(?:总热量建议|每日热量|热量建议)[\s\S]*?(?=营养素|三大营养素|食谱示例|注意事项|$)/i);
    if (calorieSection) {
      const calorieText = calorieSection[0];
      // 尝试提取摄入量建议
      const intakeMatch = calorieText.match(/(\d+[\s\-–—]+(\d+)?)\s*千卡/);
      if (intakeMatch) {
        result.calorieAdvice.dailyIntake = intakeMatch[0];
      }
    }

    // 这里可以添加其他部分的解析逻辑，但为保证显示，先使用默认值
    console.log("解析结果:", result); // 输出解析结果到控制台
  } catch (err) {
    console.error("解析失败，使用默认数据:", err);
  } finally {
    // 无论解析成功与否，都设置结构化数据
    this.setData({ structuredRecipe: result });
  }
},
  /* 重新生成 */
  regenerateRecipe() {
    this.generateRecipeByAIAgent();
  }
});
  /* 解析结构化回复 
  parseStructuredResponse(fullText) {
    const result = {
      calorieAdvice: {
        dailyIntake: '',
        reasons: []
      },
      nutrientDistribution: [],
      mealPlan: [],
      precautions: []
    };
    
    // 解析总热量建议部分
    const calorieSection = fullText.match(/### 一、总热量建议[\s\S]*?(?=###|$)/);
    if (calorieSection) {
      const calorieText = calorieSection[0];
      
      // 提取每日建议摄入
      const intakeMatch = calorieText.match(/\*\*每日建议摄入：([^*]+)\*\*//*);
      /*if (intakeMatch) {
        result.calorieAdvice.dailyIntake = intakeMatch[1].trim();
      }
      
      // 提取原因列表
      const reasonLines = calorieText.split('\n').filter(line => 
        line.trim().match(/^\d+\./) || line.includes('原因：')
      );
      
      reasonLines.forEach(line => {
        if (line.includes('原因：')) return; // 跳过标题行
        const reason = line.replace(/^\d+\.\s*, '').trim();
        if (reason) result.calorieAdvice.reasons.push(reason);
      });
    }*/
    /*
    // 解析营养素分配部分
    const nutrientSection = fullText.match(/### 二、三大营养素分配[\s\S]*?(?=###|$)/);
    if (nutrientSection) {
      const nutrientText = nutrientSection[0];
      const lines = nutrientText.split('\n');
      
      lines.forEach(line => {
        const trimmedLine = line.trim();
        
        // 解析表格格式
        if (trimmedLine.includes('|')) {
          // 跳过表头分隔行
          if (trimmedLine.match(/^[\|\-\s]+$/)) return;
          
          // 解析表格行
          const cells = trimmedLine.split('|').filter(cell => cell.trim() !== '');
          if (cells.length >= 3) {
            result.nutrientDistribution.push({
              name: cells[0].replace(/\*\*//*g, '').trim(),
              ratio: cells[1].trim(),
              food: cells[2].trim()
            });
          }
        }
        // 解析列表格式
        else if (trimmedLine.startsWith('-')) {
          const parts = trimmedLine.replace(/^-/, '').trim().split(':');
          if (parts.length >= 2) {
            result.nutrientDistribution.push({
              name: parts[0].trim(),
              ratio: parts[1].trim(),
              food: parts.length > 2 ? parts[2].trim() : ''
            });
          }
        }
      });
    }
    
    // 解析食谱示例部分 - 完全匹配图片格式
    const mealSection = fullText.match(/### 三、一日食谱示例[\s\S]*?(?=###|$)/);
    if (mealSection) {
      const mealText = mealSection[0];
      const lines = mealText.split('\n');
      let currentMeal = null;
      
      lines.forEach(line => {
        const trimmedLine = line.trim();
        
        // 匹配餐次标题，如 "#### 早餐（400千卡）"
        if (trimmedLine.startsWith('#### ') && trimmedLine.includes('(') && trimmedLine.includes('千卡)')) {
          // 新餐食开始
          if (currentMeal) result.mealPlan.push(currentMeal);
          
          // 提取餐次名称和热量
          const mealMatch = trimmedLine.match(/#### (.*?)\((\d+)千卡\)/);
          if (mealMatch) {
            currentMeal = {
              time: `${mealMatch[1].trim()} (${mealMatch[2]}千卡)`,
              items: [], // 存储菜品列表
              highlight: '' // 营养亮点
            };
          }
        } 
        // 匹配菜品行，如 "- **燕麦奇亚籽碗**：燕麦40g + 奇亚籽5g + 无糖杏仁奶200ml"
        else if (trimmedLine.startsWith('- **') && trimmedLine.includes('**：') && currentMeal) {
          const dishMatch = trimmedLine.match(/-\s*\*\*(.*?)\*\*[：:]\s*(.*)/);
          if (dishMatch) {
            currentMeal.items.push({
              name: dishMatch[1].trim(),
              ingredients: dishMatch[2].trim()
            });
          }
        }
        // 匹配营养亮点（在加餐部分）
        else if (trimmedLine.includes('营养亮点') && currentMeal) {
          const highlightMatch = trimmedLine.match(/营养亮点[：:]\s*(.*)/);
          if (highlightMatch) {
            currentMeal.highlight = highlightMatch[1].trim();
          }
        }
      });
      
      if (currentMeal) result.mealPlan.push(currentMeal);
    }
    
    // 解析注意事项部分 - 完全匹配图片格式
    const precautionSection = fullText.match(/### 四、注意事项[\s\S]*?(?=###|$)/);
    if (precautionSection) {
      const precautionText = precautionSection[0];
      const lines = precautionText.split('\n');
      
      lines.forEach(line => {
        const trimmedLine = line.trim();
        
        // 匹配数字编号的注意事项，如 "1. **高升糖食物**：白砂糖、糯米制品（年糕、粽子）、西瓜（GI=72）"
        const precautionMatch = trimmedLine.match(/^(\d+)\.\s*\*\*(.*?)\*\*[：:]\s*(.*)/);
        if (precautionMatch) {
          result.precautions.push({
            category: precautionMatch[2].trim(),
            details: precautionMatch[3].trim()
          });
        }
      });
    }
    */
    // 保存结构化结果
    
  


