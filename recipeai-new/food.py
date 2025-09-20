## 关键页面信息
'''
### 1. 首页（index）
- **主要元素**：
  - 健康标语（如：“健康饮食，AI为你定制”）
  - 用户输入表单（输入、身高、体重、健康目标，计算出BMI，公式// JavaScript实现
function calculateBMI(height_cm, weight_kg) {
  const height_m = height_cm / 100;
  return (weight_kg / (height_m * height_m)).toFixed(1);
}）
  - “今天吃什么
- **设计风格**：
  - 清新简洁，突出绿色健康主题
  - 输入框圆角，按钮采用主色调绿色
- **背景颜色**：
  - 主背景：#F6FFF6（淡绿色）
  - 按钮：#4CAF50（主绿色），白色文字
  - 输入框：白色，浅灰色边框

---

### 2. 结果页（食谱展示页）
- **主要元素**：
  - 食谱卡片（每张卡片显示谱图片、卡路里总览）
  - 卡片下方有两个按钮一个是：就吃这个“，点击进入食谱，食材以及具体制作方法。一个是”换一个“，再生成一个不同的食谱。这里想接入AI，但是不知道如何接入

  - 卡片式布局，卡片有阴影和圆角
  - 
- **背景颜色**：
  - 主背景：#F6FFF6
  - 卡片：白色，阴影#E0E0E0

---

### 3. 详情页（单日食谱详情）
- **主要元素**：
  - 食谱图片
  - 食材列表及营养成分
  - 用餐建议
- **设计风格**：
  - 信息分块，清晰易读
  - 绿色点缀分隔线
- **背景颜色**：
  - 主背景：#FFFFFF
  - 分隔线/点缀：#4CAF50

---

### 4. 关于页
- **主要元素**：
  - 简要介绍AI技术和小程序用途
  - 团队/作者信息
- **设计风格**：
  - 简洁，配合健康主题插画或icon
- **背景颜色**：
  - 主背景：#F6FFF6

---

### 统一设计建议
- **字体**：使用系统默认无衬线字体，字号适中，标题加粗
- **主色调**：#4CAF50（绿色），辅助色#81C784（浅绿），#F6FFF6（背景淡绿）
- **按钮和交互**：圆角，点击有轻微阴影反馈
- **移动端适配**：所有元素自适应屏幕宽度，留有足够边距

---

## 1. HTML结构

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <title>AI健康小程序首页</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="container">
    <h2 class="banner">健康饮食，AI为你定制</h2>
    <form class="form" id="healthForm" onsubmit="return false;">
      <input class="input" type="number" id="age" placeholder="年龄" min="1" max="120" required>
      <input class="input" type="number" id="height" placeholder="身高 (cm)" min="50" max="250" required>
      <input class="input" type="number" id="weight" placeholder="体重 (kg)" min="10" max="300" required>
      <select class="input" id="goal" required>
        <option value="" disabled selected>请选择健康目标</option>
        <option value="减肥">减肥</option>
        <option value="增肌">增肌</option>
        <option value="保持健康">保持健康</option>
      </select>
      <button class="bmi-btn" type="button" onclick="calculateBMI()">计算BMI</button>
      <div class="bmi-result" id="bmiResult"></div>
    </form>
    <button class="main-btn" onclick="goToRecommend()">今天吃什么</button>
  </div>
  <script src="main.js"></script>
</body>
</html>
```

---

## 2. CSS样式（style.css）

```css
body {
  background: #F6FFF6;
  font-family: 'Segoe UI', 'PingFang SC', 'Microsoft YaHei', Arial, sans-serif;
  color: #222;
  margin: 0;
  padding: 0;
}

.container {
  max-width: 400rpx;
  margin: 40rpx auto;
  padding: 32rpx 24rpx 24rpx 24rpx;
  background: #fff;
  border-radius: 24rpx;
  box-shadow: 0 4rpx 24rpx #E0E0E0;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.banner {
  color: #4CAF50;
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 32rpx;
  text-align: center;
}

.form {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 18rpx;
  margin-bottom: 32rpx;
}

.input {
  border: 1rpx solid #E0E0E0;
  border-radius: 16px;
  padding: 14px 16px;
  font-size: 1rem;
  background: #F6FFF6;
  outline: none;
  transition: border 0.2s;
}

.input:focus {
  border: 1.5px solid #4CAF50;
}

.bmi-btn {
  background: #81C784;
  color: #fff;
  border: none;
  border-radius: 16px;
  padding: 12px 0;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  margin-top: 4px;
  box-shadow: 0 2px 8px #E0E0E0;
  transition: background 0.2s;
}

.bmi-btn:hover {
  background: #4CAF50;
}

.bmi-result {
  color: #4CAF50;
  font-size: 1.1rem;
  text-align: right;
  min-height: 24px;
}

.main-btn {
  width: 100%;
  background: #4CAF50;
  color: #fff;
  border: none;
  border-radius: 24px;
  padding: 18px 0;
  font-size: 1.3rem;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 4px 12px #81C784;
  transition: background 0.2s;
}

.main-btn:hover {
  background: #388E3C;
}
```

---

## 3. JavaScript逻辑（main.js）

```js
function calculateBMI() {
  const height = document.getElementById('height').value;
  const weight = document.getElementById('weight').value;
  const bmiResult = document.getElementById('bmiResult');

  if (height && weight) {
    const h = Number(height) / 100;
    const bmi = (Number(weight) / (h * h)).toFixed(1);
    let level = '';
    if (bmi < 18.5) level = '偏瘦';
    else if (bmi < 24) level = '正常';
    else if (bmi < 28) level = '超重';
    else level = '肥胖';
    bmiResult.textContent = `BMI：${bmi}（${level}）`;
  } else {
    bmiResult.textContent = '';
  }
}

function goToRecommend() {
  // 这里可以跳转到饮食推荐页面，比如 window.location.href = 'recommend.html';
  alert('跳转到饮食推荐页面（请根据实际需求实现）');
}
```

---

## 4. 说明

- 你可以将上述HTML、CSS、JS分别保存为`index.html`、`style.css`、`main.js`，放在同一目录下即可直接打开预览。
- BMI计算按钮可实时计算，也可改为输入时自动计算（监听input事件）。
- “今天吃什么”按钮可根据实际需求跳转到推荐页面。
- 设计风格清新简洁，绿色为主，输入框和按钮均为圆角，整体居中。

如需进一步自适应移动端或有其他细节需求，欢迎随时补充！


'''