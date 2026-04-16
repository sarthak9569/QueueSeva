import { useState, useEffect, useRef } from 'react';
import { 
  CloudUpload, 
  FileText, 
  Download, 
  Eye, 
  Grid, 
  List, 
  Plus, 
  File,
  CheckCircle2,
  AlertCircle,
  Trash2,
  Search,
  Filter,
  MoreVertical
} from 'lucide-react';
import axiosInstance from '../api/axiosInstance';
import { motion, AnimatePresence } from 'framer-motion';

const Prescriptions = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isGridView, setIsGridView] = useState(true);
  const [uploadLoading, setUploadLoading] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const response = await axiosInstance.get('/reports');
      setReports(response.data);
    } catch (err) {
      console.error('Failed to fetch reports', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      alert('File size must be less than 10MB');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('department', 'General');

    setUploadLoading(true);
    try {
      await axiosInstance.post('/reports/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      fetchReports();
    } catch (err) {
      console.error('Upload failed', err);
    } finally {
      setUploadLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this document?')) return;
    try {
      await axiosInstance.delete(`/reports/${id}`);
      fetchReports();
    } catch (err) {
      console.error('Delete failed', err);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8 pb-12"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-2">Medical Records</h2>
          <p className="text-slate-500 font-medium tracking-tight">Access and manage your digital health sanctuary documents.</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex bg-white p-1 rounded-xl shadow-sm border border-slate-100">
            <button 
              className={`p-2 rounded-lg transition-all ${isGridView ? 'bg-primary text-white shadow-md' : 'text-slate-400 hover:text-slate-600'}`}
              onClick={() => setIsGridView(true)}
            >
              <Grid size={18} />
            </button>
            <button 
              className={`p-2 rounded-lg transition-all {!isGridView ? 'bg-primary text-white shadow-md' : 'text-slate-400 hover:text-slate-600'}`}
              onClick={() => setIsGridView(false)}
            >
              <List size={18} />
            </button>
          </div>
          <button 
             onClick={() => fileInputRef.current.click()}
             className="btn-primary"
          >
             <Plus size={18} />
             Add New Record
          </button>
        </div>
      </div>

      {/* Upload Zone */}
      <motion.div 
        whileHover={{ scale: 1.005 }}
        onClick={() => !uploadLoading && fileInputRef.current.click()}
        className={`
          premium-card border-dashed border-2 cursor-pointer transition-all duration-300
          ${uploadLoading ? 'bg-primary/5 border-primary/20' : 'bg-primary/[0.02] border-primary/10 hover:border-primary/30'}
          flex flex-col items-center justify-center py-16 text-center group
        `}
      >
        <div className={`h-16 w-16 rounded-[1.5rem] bg-white shadow-xl flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform duration-500`}>
          {uploadLoading ? (
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <CloudUpload size={32} />
          )}
        </div>
        <h3 className="text-xl font-black text-slate-800 mb-2">
          {uploadLoading ? 'Uploading Vault Item...' : 'Click or drag medical clinical records'}
        </h3>
        <p className="text-sm font-medium text-slate-400 max-w-xs leading-relaxed">
          Secure health storage. Supported formats: JPG, PNG, PDF (Maximum file size 10MB)
        </p>
        <input 
          type="file" 
          className="hidden" 
          ref={fileInputRef}
          onChange={handleFileUpload}
          accept=".jpg,.jpeg,.png,.pdf"
        />
      </motion.div>

      {/* Grid / List Display */}
      <AnimatePresence mode="wait">
        {isGridView ? (
          <motion.div 
            key="grid"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {reports.map((report) => (
              <div key={report._id} className="premium-card relative group hover:shadow-xl transition-all">
                <button 
                  onClick={(e) => { e.stopPropagation(); handleDelete(report._id); }}
                  className="absolute top-4 right-4 h-8 w-8 bg-white/80 backdrop-blur rounded-lg flex items-center justify-center text-slate-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100 z-10"
                >
                  <Trash2 size={14} />
                </button>
                
                <div className="flex flex-col items-center text-center p-2">
                  <div className="h-16 w-16 rounded-2xl bg-primary/5 flex items-center justify-center text-primary mb-5 group-hover:scale-110 transition-transform">
                    {report.fileType.includes('pdf') ? <File size={32} /> : <FileText size={32} />}
                  </div>
                  <h4 className="text-sm font-black text-slate-800 line-clamp-1 mb-1">{report.fileName}</h4>
                  <div className="flex items-center gap-1.5 mb-4">
                     <span className="text-[10px] font-black text-primary uppercase tracking-widest">{report.department}</span>
                     <div className="w-1 h-1 rounded-full bg-slate-300"></div>
                     <span className="text-[10px] font-bold text-slate-400">
                        {new Date(report.uploadDate).toLocaleDateString()}
                     </span>
                  </div>

                  <div className="w-full flex gap-2 pt-2 border-t border-slate-50">
                    <a 
                      href={report.fileUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="flex-1 py-2 bg-slate-50 text-slate-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-100 transition-colors flex items-center justify-center gap-2"
                    >
                      <Eye size={12} />
                      View
                    </a>
                    <a 
                      href={report.fileUrl} 
                      download 
                      className="flex-1 py-2 bg-primary/5 text-primary rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-primary/10 transition-colors flex items-center justify-center gap-2"
                    >
                      <Download size={12} />
                      Save
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        ) : (
          <motion.div 
            key="list"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="premium-card p-0 overflow-hidden"
          >
             <table className="w-full text-left border-collapse">
                <thead>
                   <tr className="bg-slate-50 border-b border-slate-100">
                      <th className="px-8 py-5 text-label">Document Name</th>
                      <th className="px-8 py-5 text-label">Category</th>
                      <th className="px-8 py-5 text-label">Status</th>
                      <th className="px-8 py-5 text-label">Uploaded</th>
                      <th className="px-8 py-5 text-label text-right">Action</th>
                   </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                   {reports.map((report) => (
                      <tr key={report._id} className="hover:bg-slate-50 transition-colors group">
                        <td className="px-8 py-5">
                           <div className="flex items-center gap-3">
                              <div className="h-10 w-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                                 <FileText size={20} />
                              </div>
                              <span className="text-sm font-bold text-slate-800">{report.fileName}</span>
                           </div>
                        </td>
                        <td className="px-8 py-5">
                           <span className="text-xs font-black text-primary uppercase tracking-widest bg-primary/5 px-2.5 py-1 rounded-lg">
                              {report.department}
                           </span>
                        </td>
                        <td className="px-8 py-5">
                            <div className="flex items-center gap-2 text-emerald-600 text-[10px] font-black uppercase tracking-widest bg-emerald-50 w-fit px-3 py-1 rounded-full border border-emerald-100">
                               <CheckCircle2 size={12} />
                               Verified
                            </div>
                        </td>
                        <td className="px-8 py-5">
                           <span className="text-xs font-bold text-slate-500">
                              {new Date(report.uploadDate).toLocaleDateString()}
                           </span>
                        </td>
                        <td className="px-8 py-5 text-right">
                           <div className="flex justify-end gap-2">
                              <a href={report.fileUrl} target="_blank" className="h-8 w-8 bg-white border border-slate-100 rounded-lg flex items-center justify-center text-slate-400 hover:text-primary transition-all"><Eye size={16} /></a>
                              <a href={report.fileUrl} download className="h-8 w-8 bg-white border border-slate-100 rounded-lg flex items-center justify-center text-slate-400 hover:text-primary transition-all"><Download size={16} /></a>
                              <button onClick={() => handleDelete(report._id)} className="h-8 w-8 bg-white border border-slate-100 rounded-lg flex items-center justify-center text-slate-400 hover:text-red-500 transition-all"><Trash2 size={16} /></button>
                           </div>
                        </td>
                      </tr>
                   ))}
                </tbody>
             </table>
          </motion.div>
        )}
      </AnimatePresence>

      {!loading && reports.length === 0 && !uploadLoading && (
        <div className="py-24 text-center">
          <div className="h-20 w-20 rounded-full bg-slate-50 flex items-center justify-center mx-auto mb-6 text-slate-200">
             <AlertCircle size={40} />
          </div>
          <p className="text-slate-400 font-bold">The clinical vault is currently empty.</p>
          <p className="text-xs text-slate-300 mt-1 uppercase font-black tracking-widest">Awaiting digital records</p>
        </div>
      )}
    </motion.div>
  );
};

export default Prescriptions;
