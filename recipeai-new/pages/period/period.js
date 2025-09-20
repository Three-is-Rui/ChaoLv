Page({
    data: {
      startDate: '',
      endDate: '',
      records: [],
      averageCycle: 0,
      averageDuration: 0,
      nextPeriodDate: ''
    },
  
    onLoad() {
      this.loadRecords();
    },
  
    // 加载存储的记录
    loadRecords() {
      const records = wx.getStorageSync('periodRecords') || [];
      this.calculateStats(records);
      this.setData({ records });
    },
  
    // 计算统计数据
    calculateStats(records) {
      if (records.length === 0) {
        this.setData({
          averageCycle: 0,
          averageDuration: 0,
          nextPeriodDate: ''
        });
        return;
      }
  
      // 计算平均经期时长
      const totalDuration = records.reduce((sum, record) => sum + record.duration, 0);
      const avgDuration = Math.round(totalDuration / records.length);
      
      // 计算平均周期和预测下次日期
      let avgCycle = 0;
      let nextDate = '';
      
      if (records.length > 1) {
        // 计算周期（本次开始日期与上次开始日期的间隔）
        const cycleLengths = [];
        for (let i = 1; i < records.length; i++) {
          const prevDate = new Date(records[i-1].startDate);
          const currDate = new Date(records[i].startDate);
          const diffTime = Math.abs(currDate - prevDate);
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          cycleLengths.push(diffDays);
          records[i].cycleLength = diffDays;
        }
        
        const totalCycle = cycleLengths.reduce((sum, length) => sum + length, 0);
        avgCycle = Math.round(totalCycle / cycleLengths.length);
        
        // 预测下次月经日期
        const lastDate = new Date(records[records.length-1].startDate);
        lastDate.setDate(lastDate.getDate() + avgCycle);
        nextDate = `${lastDate.getFullYear()}-${(lastDate.getMonth()+1).toString().padStart(2, '0')}-${lastDate.getDate().toString().padStart(2, '0')}`;
      }
  
      this.setData({
        records,
        averageCycle: avgCycle,
        averageDuration: avgDuration,
        nextPeriodDate: nextDate
      });
    },
  
    // 选择开始日期
    bindStartDateChange(e) {
      this.setData({
        startDate: e.detail.value
      });
    },
  
    // 选择结束日期
    bindEndDateChange(e) {
      this.setData({
        endDate: e.detail.value
      });
    },
  
    // 保存记录
    saveRecord() {
      const { startDate, endDate, records } = this.data;
      
      if (!startDate || !endDate) {
        wx.showToast({
          title: '请选择开始和结束日期',
          icon: 'none'
        });
        return;
      }
      
      const start = new Date(startDate);
      const end = new Date(endDate);
      
      if (end < start) {
        wx.showToast({
          title: '结束日期不能早于开始日期',
          icon: 'none'
        });
        return;
      }
      
      // 计算经期时长（天数）
      const diffTime = Math.abs(end - start);
      const duration = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
      
      // 创建新记录
      const newRecord = {
        startDate,
        endDate,
        duration
      };
      
      // 更新记录列表
      const updatedRecords = [newRecord, ...records];
      wx.setStorageSync('periodRecords', updatedRecords);
      
      // 更新UI
      this.calculateStats(updatedRecords);
      
      wx.showToast({
        title: '记录保存成功',
        icon: 'success'
      });
      
      // 重置表单
      this.setData({
        startDate: '',
        endDate: ''
      });
    }
  });