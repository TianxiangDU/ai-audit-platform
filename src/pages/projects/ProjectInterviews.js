import React, { useState, useRef, useEffect } from 'react';
import { 
  Mic, MicOff, Upload, Play, Pause, Stop, Download, 
  FileAudio, Users, Clock, Calendar, Eye, Trash2,
  User, Volume2, FileText, Settings, RefreshCw,
  CheckCircle, AlertTriangle, Filter, Search, Plus,
  Edit, MoreHorizontal, Share2, ChevronDown, ChevronUp
} from 'lucide-react';

export const ProjectInterviews = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioBlob, setAudioBlob] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [interviews, setInterviews] = useState([]);
  const [selectedInterview, setSelectedInterview] = useState(null);
  const [transcriptionStatus, setTranscriptionStatus] = useState('idle'); // idle, processing, completed, error
  const [activeTab, setActiveTab] = useState('interviews'); // interviews, new-interview, transcription
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedInterview, setExpandedInterview] = useState(null);

  const mediaRecorderRef = useRef(null);
  const audioRef = useRef(null);
  const intervalRef = useRef(null);
  const chunksRef = useRef([]);

  // 模拟访谈数据
  const sampleInterviews = [
    {
      id: 1,
      title: '项目经理访谈 - 资金使用情况',
      date: '2024-01-15',
      time: '14:30',
      duration: '00:32:15',
      interviewer: '张审计师',
      interviewee: '李项目经理',
      status: 'completed',
      transcriptionStatus: 'completed',
      audioFile: 'interview_1.mp3',
      fileSize: '15.2MB',
      participants: [
        { name: '张审计师', role: '审计师', color: 'blue' },
        { name: '李项目经理', role: '被访谈人', color: 'green' }
      ],
      summary: '讨论了项目资金使用情况，发现了材料采购价格异常问题',
      tags: ['资金管理', '材料采购', '价格异常'],
      transcription: `
[00:00:15] 张审计师: 李经理，您好，今天想了解一下项目的资金使用情况。
[00:00:22] 李项目经理: 好的，我们项目总预算是500万，目前已经使用了320万。
[00:00:35] 张审计师: 能具体说一下资金的主要用途吗？
[00:00:42] 李项目经理: 主要是材料采购占了60%，人工成本30%，其他费用10%。
[00:01:02] 张审计师: 我注意到钢材采购单价比市场价高出15%，这是什么原因？
[00:01:15] 李项目经理: 这个...可能是供应商的报价问题，我需要再核实一下。
      `,
      keyFindings: [
        '钢材采购价格异常，高出市场价15%',
        '供应商选择过程缺乏充分的价格比较',
        '需要进一步核实采购流程的合规性'
      ]
    },
    {
      id: 2,
      title: '财务主管访谈 - 费用报销制度',
      date: '2024-01-14',
      time: '10:00',
      duration: '00:25:08',
      interviewer: '王审计师',
      interviewee: '陈财务主管',
      status: 'completed',
      transcriptionStatus: 'processing',
      audioFile: 'interview_2.mp3',
      fileSize: '12.8MB',
      participants: [
        { name: '王审计师', role: '审计师', color: 'blue' },
        { name: '陈财务主管', role: '被访谈人', color: 'purple' }
      ],
      summary: '了解费用报销制度执行情况，发现审批流程存在漏洞',
      tags: ['费用报销', '内控制度', '审批流程'],
      transcription: '转录中...',
      keyFindings: []
    },
    {
      id: 3,
      title: '施工队长访谈 - 工程质量控制',
      date: '2024-01-13',
      time: '16:45',
      duration: '00:18:30',
      interviewer: '张审计师',
      interviewee: '刘施工队长',
      status: 'draft',
      transcriptionStatus: 'pending',
      audioFile: 'interview_3.mp3',
      fileSize: '9.2MB',
      participants: [
        { name: '张审计师', role: '审计师', color: 'blue' },
        { name: '刘施工队长', role: '被访谈人', color: 'orange' }
      ],
      summary: '工程质量控制措施和问题讨论',
      tags: ['工程质量', '质量控制'],
      transcription: '',
      keyFindings: []
    }
  ];

  useEffect(() => {
    setInterviews(sampleInterviews);
  }, []);

  // 录音相关功能
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/wav' });
        setAudioBlob(blob);
      };

      mediaRecorder.start();
      setIsRecording(true);
      
      // 开始计时
      intervalRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } catch (error) {
      console.error('录音启动失败:', error);
      alert('录音功能需要麦克风权限');
    }
  };

  const pauseRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      if (isPaused) {
        mediaRecorderRef.current.resume();
        intervalRef.current = setInterval(() => {
          setRecordingTime(prev => prev + 1);
        }, 1000);
      } else {
        mediaRecorderRef.current.pause();
        clearInterval(intervalRef.current);
      }
      setIsPaused(!isPaused);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      clearInterval(intervalRef.current);
      setIsRecording(false);
      setIsPaused(false);
    }
  };

  const playAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // 格式化时间
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    if (hours > 0) {
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // 获取状态颜色
  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-50 text-green-700 border-green-200';
      case 'processing': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'draft': return 'bg-amber-50 text-amber-700 border-amber-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getTranscriptionStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-50 text-green-700';
      case 'processing': return 'bg-blue-50 text-blue-700';
      case 'pending': return 'bg-amber-50 text-amber-700';
      case 'error': return 'bg-red-50 text-red-700';
      default: return 'bg-gray-50 text-gray-700';
    }
  };

  // 模拟ASR转录
  const startTranscription = (interviewId) => {
    setTranscriptionStatus('processing');
    // 模拟处理时间
    setTimeout(() => {
      setTranscriptionStatus('completed');
      setInterviews(prev => prev.map(interview => 
        interview.id === interviewId 
          ? { ...interview, transcriptionStatus: 'completed' }
          : interview
      ));
    }, 3000);
  };

  // 过滤访谈数据
  const filteredInterviews = interviews.filter(interview => {
    const matchesStatus = filterStatus === 'all' || interview.status === filterStatus;
    const matchesSearch = interview.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         interview.interviewee.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         interview.interviewer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // 渲染访谈列表
  const renderInterviewsList = () => (
    <div className="space-y-6">
      {/* 搜索和过滤 */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="搜索访谈记录..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Filter className="h-4 w-4 text-gray-400" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">全部状态</option>
            <option value="completed">已完成</option>
            <option value="processing">处理中</option>
            <option value="draft">草稿</option>
          </select>
        </div>
        <button
          onClick={() => setActiveTab('new-interview')}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-4 w-4 mr-2" />
          新建访谈
        </button>
      </div>

      {/* 访谈列表 */}
      <div className="space-y-4">
        {filteredInterviews.map((interview) => (
          <div key={interview.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-sm transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{interview.title}</h3>
                  <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium border ${getStatusColor(interview.status)}`}>
                    {interview.status === 'completed' ? '已完成' : interview.status === 'processing' ? '处理中' : '草稿'}
                  </span>
                  <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${getTranscriptionStatusColor(interview.transcriptionStatus)}`}>
                    {interview.transcriptionStatus === 'completed' ? '转录完成' : 
                     interview.transcriptionStatus === 'processing' ? '转录中' :
                     interview.transcriptionStatus === 'pending' ? '待转录' : '转录失败'}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-3">{interview.summary}</p>
                
                {/* 访谈信息 */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="h-4 w-4 mr-2" />
                    {interview.date} {interview.time}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock className="h-4 w-4 mr-2" />
                    {interview.duration}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <User className="h-4 w-4 mr-2" />
                    {interview.interviewer}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Users className="h-4 w-4 mr-2" />
                    {interview.interviewee}
                  </div>
                </div>

                {/* 标签 */}
                <div className="flex items-center space-x-2 mt-3">
                  <span className="text-xs text-gray-500">标签：</span>
                  {interview.tags.map((tag, index) => (
                    <span key={index} className="inline-flex items-center px-2 py-1 rounded text-xs bg-gray-100 text-gray-700 border border-gray-200">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* 操作按钮 */}
              <div className="flex items-center space-x-2 ml-4">
                <button
                  onClick={() => setExpandedInterview(expandedInterview === interview.id ? null : interview.id)}
                  className="inline-flex items-center px-3 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors text-sm"
                >
                  <Eye className="h-4 w-4 mr-1" />
                  {expandedInterview === interview.id ? '收起' : '查看'}
                </button>
                <button className="inline-flex items-center px-3 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors text-sm">
                  <Download className="h-4 w-4 mr-1" />
                  下载
                </button>
                {interview.transcriptionStatus === 'pending' && (
                  <button
                    onClick={() => startTranscription(interview.id)}
                    className="inline-flex items-center px-3 py-2 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors text-sm"
                  >
                    <RefreshCw className="h-4 w-4 mr-1" />
                    转录
                  </button>
                )}
              </div>
            </div>

            {/* 展开的详细内容 */}
            {expandedInterview === interview.id && (
              <div className="border-t border-gray-200 pt-4 mt-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* 参与者信息 */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">参与者</h4>
                    <div className="space-y-2">
                      {interview.participants.map((participant, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          <div className={`w-3 h-3 rounded-full bg-${participant.color}-500`}></div>
                          <span className="text-sm text-gray-900">{participant.name}</span>
                          <span className="text-xs text-gray-500">({participant.role})</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 关键发现 */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">关键发现</h4>
                    <div className="space-y-2">
                      {interview.keyFindings.length > 0 ? (
                        interview.keyFindings.map((finding, index) => (
                          <div key={index} className="flex items-start space-x-2">
                            <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-gray-700">{finding}</span>
                          </div>
                        ))
                      ) : (
                        <p className="text-sm text-gray-500">暂无关键发现</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* 转录内容 */}
                {interview.transcriptionStatus === 'completed' && interview.transcription && (
                  <div className="mt-6">
                    <h4 className="font-medium text-gray-900 mb-3">转录内容</h4>
                    <div className="bg-gray-50 rounded-lg p-4 max-h-64 overflow-y-auto">
                      <pre className="text-sm text-gray-700 whitespace-pre-wrap font-mono">
                        {interview.transcription}
                      </pre>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  // 渲染新建访谈界面
  const renderNewInterview = () => (
    <div className="space-y-6">
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">新建审计访谈</h3>
        
        {/* 录音控制区 */}
        <div className="space-y-6">
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-4 mb-6">
                {!isRecording && !audioBlob && (
                  <button
                    onClick={startRecording}
                    className="inline-flex items-center px-6 py-3 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors text-lg font-medium"
                  >
                    <Mic className="h-6 w-6 mr-2" />
                    开始录音
                  </button>
                )}
                
                {isRecording && (
                  <>
                    <button
                      onClick={pauseRecording}
                      className={`inline-flex items-center px-4 py-2 rounded-lg transition-colors ${
                        isPaused ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-amber-600 text-white hover:bg-amber-700'
                      }`}
                    >
                      {isPaused ? <Play className="h-5 w-5 mr-2" /> : <Pause className="h-5 w-5 mr-2" />}
                      {isPaused ? '继续' : '暂停'}
                    </button>
                    <button
                      onClick={stopRecording}
                      className="inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                    >
                      <Stop className="h-5 w-5 mr-2" />
                      停止
                    </button>
                  </>
                )}
                
                {audioBlob && (
                  <button
                    onClick={playAudio}
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    {isPlaying ? <Pause className="h-5 w-5 mr-2" /> : <Play className="h-5 w-5 mr-2" />}
                    {isPlaying ? '暂停播放' : '播放录音'}
                  </button>
                )}
              </div>
              
              {/* 录音状态显示 */}
              <div className="text-center">
                {isRecording && (
                  <div className="flex items-center justify-center space-x-2 mb-4">
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                    <span className="text-red-600 font-medium">录音中</span>
                    {isPaused && <span className="text-amber-600">（已暂停）</span>}
                  </div>
                )}
                
                <div className="text-2xl font-mono text-gray-900 mb-4">
                  {formatTime(recordingTime)}
                </div>
                
                {audioBlob && (
                  <audio
                    ref={audioRef}
                    src={URL.createObjectURL(audioBlob)}
                    onEnded={() => setIsPlaying(false)}
                    className="w-full max-w-md mx-auto"
                    controls
                  />
                )}
              </div>
            </div>
          </div>

          {/* 文件上传区 */}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
            <div className="text-center">
              <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h4 className="text-lg font-medium text-gray-900 mb-2">上传音频文件</h4>
              <p className="text-gray-600 mb-4">支持 MP3、WAV、M4A 格式，最大 100MB</p>
              <input
                type="file"
                accept="audio/*"
                className="hidden"
                id="audio-upload"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    setAudioBlob(file);
                  }
                }}
              />
              <label
                htmlFor="audio-upload"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer transition-colors"
              >
                <FileAudio className="h-4 w-4 mr-2" />
                选择文件
              </label>
            </div>
          </div>

          {/* 访谈信息表单 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">访谈标题</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="输入访谈标题"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">被访谈人</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="输入被访谈人姓名"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">访谈日期</label>
              <input
                type="date"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">访谈时间</label>
              <input
                type="time"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">访谈摘要</label>
            <textarea
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="简要描述访谈内容和目的"
            />
          </div>

          {/* ASR转录设置 */}
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium text-blue-900">ASR自动转录</h4>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <label className="block text-blue-700 mb-1">语言模型</label>
                <select className="w-full px-3 py-2 border border-blue-300 rounded bg-white text-blue-900">
                  <option>中文（简体）</option>
                  <option>中文（繁体）</option>
                  <option>英文</option>
                </select>
              </div>
              <div>
                <label className="block text-blue-700 mb-1">角色识别</label>
                <select className="w-full px-3 py-2 border border-blue-300 rounded bg-white text-blue-900">
                  <option>自动识别</option>
                  <option>手动标注</option>
                  <option>关闭</option>
                </select>
              </div>
            </div>
          </div>

          {/* 保存按钮 */}
          <div className="flex justify-end space-x-3">
            <button
              onClick={() => setActiveTab('interviews')}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              取消
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              保存访谈
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* 标签页导航 */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab('interviews')}
            className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
              activeTab === 'interviews'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center">
              <FileAudio className={`h-4 w-4 mr-2 ${activeTab === 'interviews' ? 'text-blue-600' : 'text-gray-400'}`} />
              访谈记录
            </div>
          </button>
          <button
            onClick={() => setActiveTab('new-interview')}
            className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
              activeTab === 'new-interview'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center">
              <Plus className={`h-4 w-4 mr-2 ${activeTab === 'new-interview' ? 'text-blue-600' : 'text-gray-400'}`} />
              新建访谈
            </div>
          </button>
        </nav>
      </div>

      {/* 内容区域 */}
      {activeTab === 'interviews' && renderInterviewsList()}
      {activeTab === 'new-interview' && renderNewInterview()}
    </div>
  );
}; 