import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Upload, FileText, CheckCircle, AlertTriangle, Loader } from 'lucide-react';

export const ShareUpload = () => {
  const { shareId } = useParams();
  const [shareInfo, setShareInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});

  useEffect(() => {
    // 模拟获取分享链接信息
    setTimeout(() => {
      setShareInfo({
        projectName: '建设工程项目A审计',
        maxFileSize: 10, // MB
        allowedTypes: ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'png', 'jpg', 'jpeg'],
        expireDate: '2024-02-15',
        requireApproval: true,
        isValid: true
      });
      setLoading(false);
    }, 1000);
  }, [shareId]);

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileTypeIcon = (fileName) => {
    const extension = fileName.split('.').pop().toLowerCase();
    switch (extension) {
      case 'pdf': return '📄';
      case 'doc':
      case 'docx': return '📝';
      case 'xls':
      case 'xlsx': return '📊';
      case 'png':
      case 'jpg':
      case 'jpeg': return '🖼️';
      default: return '📁';
    }
  };

  const validateFile = (file) => {
    const errors = [];
    
    // 检查文件大小
    const maxSize = shareInfo.maxFileSize * 1024 * 1024; // 转换为字节
    if (file.size > maxSize) {
      errors.push(`文件大小不能超过 ${shareInfo.maxFileSize}MB`);
    }
    
    // 检查文件类型
    const extension = file.name.split('.').pop().toLowerCase();
    if (!shareInfo.allowedTypes.includes(extension)) {
      errors.push(`不支持的文件类型: .${extension}`);
    }
    
    return errors;
  };

  const handleFileUpload = async (event) => {
    const files = Array.from(event.target.files);
    setIsUploading(true);
    
    const validFiles = [];
    const invalidFiles = [];
    
    files.forEach(file => {
      const errors = validateFile(file);
      if (errors.length === 0) {
        validFiles.push(file);
      } else {
        invalidFiles.push({ file, errors });
      }
    });
    
    // 显示无效文件错误
    if (invalidFiles.length > 0) {
      alert('部分文件上传失败:\n' + invalidFiles.map(item => 
        `${item.file.name}: ${item.errors.join(', ')}`
      ).join('\n'));
    }
    
    // 上传有效文件
    for (const file of validFiles) {
      const fileId = Date.now() + Math.random();
      
      // 模拟上传进度
      for (let progress = 0; progress <= 100; progress += 10) {
        setUploadProgress(prev => ({ ...prev, [fileId]: progress }));
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      
      // 添加到已上传文件列表
      setUploadedFiles(prev => [...prev, {
        id: fileId,
        name: file.name,
        size: file.size,
        uploadTime: new Date().toLocaleString('zh-CN'),
        status: shareInfo.requireApproval ? 'pending' : 'uploaded'
      }]);
      
      // 清除进度
      setUploadProgress(prev => {
        const { [fileId]: removed, ...rest } = prev;
        return rest;
      });
    }
    
    setIsUploading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">正在验证分享链接...</p>
        </div>
      </div>
    );
  }

  if (!shareInfo || !shareInfo.isValid) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-lg shadow-sm max-w-md">
          <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">链接无效或已过期</h2>
          <p className="text-gray-600">请联系项目管理员获取新的上传链接</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-8 px-4">
        {/* 页面头部 */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">项目文件上传</h1>
          <p className="text-lg text-gray-600">{shareInfo.projectName}</p>
          <p className="text-sm text-gray-500 mt-2">
            通过此页面可以直接上传文件到项目资料库
          </p>
        </div>

        {/* 上传规则提示 */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h3 className="font-medium text-blue-900 mb-2">上传须知</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• 单个文件大小不能超过 {shareInfo.maxFileSize}MB</li>
            <li>• 支持的文件格式：{shareInfo.allowedTypes.join(', ')}</li>
            <li>• 链接有效期至：{shareInfo.expireDate}</li>
            {shareInfo.requireApproval && (
              <li>• 上传的文件需要项目管理员审核后才会显示在项目中</li>
            )}
          </ul>
        </div>

        {/* 文件上传区域 */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="px-6 py-5 border-b border-gray-200">
            <h3 className="text-lg leading-6 font-medium text-gray-900 flex items-center">
              <Upload className="h-5 w-5 mr-2" />
              选择文件上传
            </h3>
          </div>
          <div className="p-6">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
              <Upload className="mx-auto h-16 w-16 text-gray-400 mb-4" />
              <div className="mb-4">
                <label htmlFor="file-upload" className="cursor-pointer">
                  <span className="text-xl font-medium text-blue-600 hover:text-blue-500">
                    点击选择文件
                  </span>
                  <span className="text-gray-500 block mt-2">或拖拽文件到此处</span>
                  <input
                    id="file-upload"
                    type="file"
                    multiple
                    className="sr-only"
                    onChange={handleFileUpload}
                    accept={shareInfo.allowedTypes.map(type => `.${type}`).join(',')}
                    disabled={isUploading}
                  />
                </label>
              </div>
              <p className="text-sm text-gray-500">
                支持同时选择多个文件上传
              </p>
            </div>

            {/* 上传进度 */}
            {Object.keys(uploadProgress).length > 0 && (
              <div className="mt-6">
                <h4 className="text-sm font-medium text-gray-900 mb-3">上传进度</h4>
                {Object.entries(uploadProgress).map(([fileId, progress]) => (
                  <div key={fileId} className="mb-2">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>上传中...</span>
                      <span>{progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* 已上传文件列表 */}
        {uploadedFiles.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-6 py-5 border-b border-gray-200">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                已上传文件 ({uploadedFiles.length})
              </h3>
            </div>
            <div className="p-6">
              <div className="space-y-3">
                {uploadedFiles.map((file) => (
                  <div key={file.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center flex-1">
                      <div className="text-2xl mr-3">{getFileTypeIcon(file.name)}</div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                        <div className="flex items-center space-x-4 text-xs text-gray-500 mt-1">
                          <span>{formatFileSize(file.size)}</span>
                          <span>{file.uploadTime}</span>
                        </div>
                      </div>
                    </div>
                    <div className="ml-4">
                      {file.status === 'uploaded' ? (
                        <div className="flex items-center text-green-600">
                          <CheckCircle className="h-4 w-4 mr-1" />
                          <span className="text-sm">上传成功</span>
                        </div>
                      ) : (
                        <div className="flex items-center text-amber-600">
                          <AlertTriangle className="h-4 w-4 mr-1" />
                          <span className="text-sm">待审核</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 页面底部说明 */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>如有问题，请联系项目管理员</p>
          <p className="mt-1">
            该页面由 <span className="font-medium text-blue-600">AI智慧工程审计平台</span> 提供技术支持
          </p>
        </div>
      </div>
    </div>
  );
}; 