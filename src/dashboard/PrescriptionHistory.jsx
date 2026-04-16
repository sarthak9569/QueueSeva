import { useState } from 'react';
import { useQueue } from '../context/QueueContext';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import {
   FileText,
   Download,
   Eye,
   Calendar,
   Search,
   Filter,
   Plus,
   CloudUpload,
   CheckCircle2,
   Activity
} from 'lucide-react';
import { Card, CardContent, CardHeader } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';

const PrescriptionHistory = () => {
   const { user } = useAuth();
   const { prescriptions } = useQueue();

   const [isDragging, setIsDragging] = useState(false);
   const [uploadProgress, setUploadProgress] = useState(null);

   const userPrescriptions = prescriptions.filter(
      (rx) => rx.userId === user?.id
   );

   const handleDragOver = (e) => {
      e.preventDefault();
      setIsDragging(true);
   };

   const handleDragLeave = () => setIsDragging(false);

   const handleDrop = (e) => {
      e.preventDefault();
      setIsDragging(false);
      simulateUpload();
   };

   const simulateUpload = () => {
      setUploadProgress(0);
      const interval = setInterval(() => {
         setUploadProgress((prev) => {
            if (prev >= 100) {
               clearInterval(interval);
               setTimeout(() => setUploadProgress(null), 1000);
               return 100;
            }
            return prev + 10;
         });
      }, 200);
   };

   return (
      <div className="space-y-8 p-6">

         {/* HEADER */}
         <div className="flex justify-between items-center">
            <div>
               <h1 className="text-2xl font-bold text-slate-800">
                  Medical Records
               </h1>
               <p className="text-sm text-slate-500">
                  Manage your prescriptions securely
               </p>
            </div>

            <Button className="gap-2">
               <Plus size={16} /> New
            </Button>
         </div>

         {/* UPLOAD */}
         <Card
            className={`border-2 border-dashed ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-slate-200'
               }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
         >
            <CardContent className="p-10 text-center">
               <CloudUpload size={40} className="mx-auto text-blue-500 mb-3" />
               <p className="font-semibold">Upload Prescription</p>
               <p className="text-sm text-slate-400">
                  Drag & drop files here
               </p>

               <AnimatePresence>
                  {uploadProgress !== null && (
                     <motion.div
                        className="mt-4 text-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                     >
                        Uploading... {uploadProgress}%
                     </motion.div>
                  )}
               </AnimatePresence>
            </CardContent>
         </Card>

         {/* FILTER */}
         <div className="flex justify-between items-center">
            <div className="text-sm text-slate-500">
               {userPrescriptions.length} Records
            </div>

            <div className="flex gap-2 items-center">
               <Filter size={16} />

               <div className="relative">
                  <Search
                     size={14}
                     className="absolute left-2 top-2 text-slate-400"
                  />
                  <input
                     type="text"
                     placeholder="Search..."
                     className="pl-7 pr-3 py-1 border rounded-md text-sm"
                  />
               </div>
            </div>
         </div>

         {/* GRID */}
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {userPrescriptions.length > 0 ? (
               userPrescriptions.map((rx, idx) => (
                  <motion.div
                     key={rx.id}
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ delay: idx * 0.1 }}
                  >
                     <Card className="hover:shadow-lg transition">
                        <CardContent className="p-5 space-y-4">

                           {/* ICON */}
                           <div className="flex justify-between items-center">
                              <div className="p-3 bg-blue-50 rounded-lg">
                                 <FileText size={20} className="text-blue-500" />
                              </div>

                              <Badge variant="neutral">PDF</Badge>
                           </div>

                           {/* TITLE */}
                           <div>
                              <h4 className="font-semibold text-slate-800">
                                 {rx.department}
                              </h4>
                              <p className="text-xs text-slate-400">
                                 Token #{rx.tokenId || 'N/A'}
                              </p>
                           </div>

                           {/* DATE */}
                           <div className="flex items-center gap-2 text-sm text-slate-400">
                              <Calendar size={14} />
                              {rx.date || 'Today'}
                           </div>

                           {/* ACTIONS */}
                           <div className="flex gap-2">
                              <button className="flex-1 p-2 bg-slate-100 rounded hover:bg-slate-200">
                                 <Eye size={16} />
                              </button>
                              <button className="flex-1 p-2 bg-slate-100 rounded hover:bg-slate-200">
                                 <Download size={16} />
                              </button>
                           </div>

                        </CardContent>
                     </Card>
                  </motion.div>
               ))
            ) : (
               <div className="col-span-full text-center py-20">
                  <Activity size={40} className="mx-auto text-slate-300 mb-3" />
                  <p className="text-slate-400">
                     No prescriptions found
                  </p>
               </div>
            )}

         </div>
      </div>
   );
};

export default PrescriptionHistory;