import React, { useState } from 'react';
import { 
  Calendar, Download, Eye, FileText, TrendingUp, Clock, 
  BarChart3, PieChart, User, Filter, Search, Plus,
  CheckCircle, AlertTriangle, Target, Building
} from 'lucide-react';

export const ProjectTrackReports = () => {
  const [reportType, setReportType] = useState('weekly');
  const [selectedPeriod, setSelectedPeriod] = useState('2024-01-15');
  const [reportTemplate, setReportTemplate] = useState('standard');

  // 模拟报告数据
  const reportData = {
    daily: {
      title: '审计工作日报',
      period: '2024年1月15日',
      summary: {
        completedTasks: 8,
        newClues: 3,
        resolvedIssues: 2,
        workHours: 7.5
      },
      details: [
        {
          time: '09:00-10:30',
          activity: '施工现场检查',
          result: '发现2个质量问题',
          status: 'completed'
        },
        {
          time: '10:30-12:00',
          activity: '材料验收审计',
          result: '完成钢筋验收记录审查',
          status: 'completed'
        },
        {
          time: '14:00-16:00',
          activity: 'AI审计结果分析',
          result: '确认3条审计线索',
          status: 'completed'
        },
        {
          time: '16:00-17:00',
          activity: '审计底稿整理',
          result: '完成预算审计底稿',
          status: 'completed'
        }
      ]
    },
    weekly: {
      title: '审计工作周报',
      period: '2024年1月8日 - 2024年1月14日',
      summary: {
        completedTasks: 35,
        newClues: 12,
        resolvedIssues: 8,
        workHours: 37.5
      },
      progress: {
        budgetAudit: 100,
        constructionSupervision: 75,
        finalAudit: 15
      },
      achievements: [
        '完成预算审计全部工作，发现价格异常问题5项',
        '施工过程监督进展良好，质量控制审计完成75%',
        'AI审计系统运行稳定，本周生成线索12条',
        '审计底稿规范性持续改善，合规率达到95%'
      ],
      issues: [
        '部分施工资料获取困难，影响审计进度',
        '承包商配合度有待提升'
      ],
      nextWeekPlan: [
        '重点推进竣工决算审计准备工作',
        '完成施工过程监督剩余25%工作量',
        '与承包商协调，获取缺失资料'
      ]
    },
    monthly: {
      title: '审计工作月报',
      period: '2024年1月',
      summary: {
        completedTasks: 142,
        newClues: 45,
        resolvedIssues: 32,
        workHours: 158
      },
      monthlyProgress: {
        overall: 65,
        budgetAudit: 100,
        constructionSupervision: 80,
        finalAudit: 15
      },
      keyFindings: [
        '预算编制总体规范，但部分材料单价偏高',
        '施工质量控制体系基本完善，个别环节需改进',
        '合同管理制度执行良好，变更程序规范',
        '资金使用合规，未发现重大违规问题'
      ],
      riskAssessment: {
        high: 3,
        medium: 12,
        low: 8
      },
      nextMonthFocus: [
        '全面启动竣工决算审计',
        '深化质量控制专项审计',
        '完善审计底稿和报告'
      ]
    }
  };

  const currentReport = reportData[reportType];

  const handleGenerateReport = () => {
    alert(`正在生成${currentReport.title}...`);
  };

  const handleExportReport = () => {
    alert(`正在导出${currentReport.title}为PDF文件...`);
  };

  const getProgressColor = (progress) => {
    if (progress >= 80) return 'from-green-600 to-green-700';
    if (progress >= 50) return 'from-blue-600 to-blue-700';
    if (progress >= 20) return 'from-amber-600 to-amber-700';
    return 'from-gray-500 to-gray-600';
  };

  const renderDailyReport = () => (
    <div className="space-y-6">
      {/* 日报汇总 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">工作汇总</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-700">{currentReport.summary.completedTasks}</div>
            <div className="text-sm text-blue-600">完成任务</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-700">{currentReport.summary.newClues}</div>
            <div className="text-sm text-green-600">新增线索</div>
          </div>
          <div className="text-center p-4 bg-amber-50 rounded-lg">
            <div className="text-2xl font-bold text-amber-700">{currentReport.summary.resolvedIssues}</div>
            <div className="text-sm text-amber-600">解决问题</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-700">{currentReport.summary.workHours}</div>
            <div className="text-sm text-purple-600">工作时长(h)</div>
          </div>
        </div>
      </div>

      {/* 工作详情 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">工作详情</h3>
        <div className="space-y-4">
          {currentReport.details.map((detail, index) => (
            <div key={index} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
              <div className="flex-shrink-0">
                <Clock className="h-5 w-5 text-gray-500" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-gray-900">{detail.activity}</h4>
                  <span className="text-sm text-gray-500">{detail.time}</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">{detail.result}</p>
              </div>
              <div className="flex-shrink-0">
                <CheckCircle className="h-5 w-5 text-green-500" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderWeeklyReport = () => (
    <div className="space-y-6">
      {/* 周报汇总 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">本周汇总</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-700">{currentReport.summary.completedTasks}</div>
            <div className="text-sm text-blue-600">完成任务</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-700">{currentReport.summary.newClues}</div>
            <div className="text-sm text-green-600">新增线索</div>
          </div>
          <div className="text-center p-4 bg-amber-50 rounded-lg">
            <div className="text-2xl font-bold text-amber-700">{currentReport.summary.resolvedIssues}</div>
            <div className="text-sm text-amber-600">解决问题</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-700">{currentReport.summary.workHours}</div>
            <div className="text-sm text-purple-600">工作时长(h)</div>
          </div>
        </div>

        {/* 子项目进度 */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3">子项目进度</h4>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>预算审计</span>
                <span>{currentReport.progress.budgetAudit}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`bg-gradient-to-r ${getProgressColor(currentReport.progress.budgetAudit)} h-2 rounded-full`}
                  style={{ width: `${currentReport.progress.budgetAudit}%` }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>施工过程监督</span>
                <span>{currentReport.progress.constructionSupervision}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`bg-gradient-to-r ${getProgressColor(currentReport.progress.constructionSupervision)} h-2 rounded-full`}
                  style={{ width: `${currentReport.progress.constructionSupervision}%` }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>竣工决算审计</span>
                <span>{currentReport.progress.finalAudit}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`bg-gradient-to-r ${getProgressColor(currentReport.progress.finalAudit)} h-2 rounded-full`}
                  style={{ width: `${currentReport.progress.finalAudit}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 主要成果 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">主要成果</h3>
        <ul className="space-y-2">
          {currentReport.achievements.map((achievement, index) => (
            <li key={index} className="flex items-start space-x-2">
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">{achievement}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* 问题与计划 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">存在问题</h3>
          <ul className="space-y-2">
            {currentReport.issues.map((issue, index) => (
              <li key={index} className="flex items-start space-x-2">
                <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">{issue}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">下周计划</h3>
          <ul className="space-y-2">
            {currentReport.nextWeekPlan.map((plan, index) => (
              <li key={index} className="flex items-start space-x-2">
                <Target className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">{plan}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );

  const renderMonthlyReport = () => (
    <div className="space-y-6">
      {/* 月报汇总 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">月度汇总</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-700">{currentReport.summary.completedTasks}</div>
            <div className="text-sm text-blue-600">完成任务</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-700">{currentReport.summary.newClues}</div>
            <div className="text-sm text-green-600">新增线索</div>
          </div>
          <div className="text-center p-4 bg-amber-50 rounded-lg">
            <div className="text-2xl font-bold text-amber-700">{currentReport.summary.resolvedIssues}</div>
            <div className="text-sm text-amber-600">解决问题</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-700">{currentReport.summary.workHours}</div>
            <div className="text-sm text-purple-600">工作时长(h)</div>
          </div>
        </div>

        {/* 总体进度 */}
        <div className="mb-6">
          <h4 className="font-medium text-gray-900 mb-3">总体进度</h4>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div
              className={`bg-gradient-to-r ${getProgressColor(currentReport.monthlyProgress.overall)} h-4 rounded-full flex items-center justify-center`}
              style={{ width: `${currentReport.monthlyProgress.overall}%` }}
            >
              <span className="text-white text-xs font-medium">{currentReport.monthlyProgress.overall}%</span>
            </div>
          </div>
        </div>

        {/* 风险评估 */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3">风险分布</h4>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-3 bg-red-50 rounded-lg border border-red-200">
              <div className="text-xl font-bold text-red-700">{currentReport.riskAssessment.high}</div>
              <div className="text-sm text-red-600">高风险</div>
            </div>
            <div className="text-center p-3 bg-amber-50 rounded-lg border border-amber-200">
              <div className="text-xl font-bold text-amber-700">{currentReport.riskAssessment.medium}</div>
              <div className="text-sm text-amber-600">中风险</div>
            </div>
            <div className="text-center p-3 bg-blue-50 rounded-lg border border-blue-200">
              <div className="text-xl font-bold text-blue-700">{currentReport.riskAssessment.low}</div>
              <div className="text-sm text-blue-600">低风险</div>
            </div>
          </div>
        </div>
      </div>

      {/* 主要发现 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">主要发现</h3>
        <ul className="space-y-3">
          {currentReport.keyFindings.map((finding, index) => (
            <li key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="flex-shrink-0 mt-1">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 text-sm font-medium">{index + 1}</span>
                </div>
              </div>
              <span className="text-gray-700">{finding}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* 下月重点 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">下月工作重点</h3>
        <ul className="space-y-2">
          {currentReport.nextMonthFocus.map((focus, index) => (
            <li key={index} className="flex items-start space-x-2">
              <Target className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">{focus}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  const renderReportContent = () => {
    switch (reportType) {
      case 'daily': return renderDailyReport();
      case 'weekly': return renderWeeklyReport();
      case 'monthly': return renderMonthlyReport();
      default: return renderWeeklyReport();
    }
  };

  return (
    <div className="space-y-6">
      {/* 报告生成控制区域 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">跟踪报告生成</h3>
            <p className="text-gray-600 text-sm mt-1">自动生成审计工作的日报、周报和月报</p>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={handleGenerateReport}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
            >
              <Plus className="h-4 w-4 mr-2" />
              生成报告
            </button>
            <button
              onClick={handleExportReport}
              className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
            >
              <Download className="h-4 w-4 mr-2" />
              导出PDF
            </button>
          </div>
        </div>

        {/* 报告配置 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">报告类型</label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="daily">日报</option>
              <option value="weekly">周报</option>
              <option value="monthly">月报</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">报告周期</label>
            <input
              type="date"
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">报告模板</label>
            <select
              value={reportTemplate}
              onChange={(e) => setReportTemplate(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="standard">标准模板</option>
              <option value="detailed">详细模板</option>
              <option value="summary">简要模板</option>
            </select>
          </div>
        </div>
      </div>

      {/* 报告预览区域 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{currentReport.title}</h3>
              <p className="text-gray-600 text-sm mt-1">{currentReport.period}</p>
            </div>
            <div className="flex items-center space-x-2">
              <button className="inline-flex items-center px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm">
                <Eye className="h-4 w-4 mr-1" />
                预览
              </button>
              <button className="inline-flex items-center px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm">
                <FileText className="h-4 w-4 mr-1" />
                编辑
              </button>
            </div>
          </div>
        </div>

        <div className="p-6">
          {renderReportContent()}
        </div>
      </div>
    </div>
  );
}; 