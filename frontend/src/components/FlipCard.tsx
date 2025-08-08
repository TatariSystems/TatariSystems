import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { getAssetPath } from '../utils/paths';
import { getIconSrc } from '../utils/iconMapping';

interface TeamMember {
  name: string;
  role: string;
  img: string;
  linkedin: string;
  bio: string;
}

interface FlipCardProps {
  member: TeamMember;
  index: number;
}

const getInitials = (name: string) => {
  return name.split(' ').map(n => n[0]).join('');
};

const FlipCard: React.FC<FlipCardProps> = ({ member, index }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
         <motion.div
       initial={{ opacity: 0, y: 30 }}
       whileInView={{ opacity: 1, y: 0 }}
       transition={{ duration: 0.6, delay: index * 0.08 }}
       className="relative w-full h-96 perspective-1000"
     >
      <div
        className={`relative w-full h-full transition-transform duration-700 transform-style-preserve-3d ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
        style={{ transformStyle: 'preserve-3d' }}
      >
                       {/* Front of card */}
               <div
                 className="absolute w-full h-full backface-hidden bg-black/20 backdrop-blur-sm rounded-2xl p-6 flex flex-col items-center justify-center hover:bg-black/30 transition-all duration-300"
                 style={{ backfaceVisibility: 'hidden' }}
               >
                     <div className="mb-6">
             {member.img ? (
               <img
                 src={getAssetPath(`headshots/${member.img}`)}
                 alt={member.name}
                 className="w-40 h-40 rounded-full object-cover mx-auto border-4 border-primary-500 shadow-lg"
                 onError={e => {
                   const target = e.target as HTMLImageElement;
                   target.onerror = null;
                   target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=5D90DC&color=fff&size=256`;
                 }}
               />
             ) : (
               <div className="w-40 h-40 rounded-full bg-primary-500 flex items-center justify-center text-5xl font-bold text-white mx-auto">
                 {getInitials(member.name)}
               </div>
             )}
           </div>
           
                       <h3 className={`font-bold text-white mb-3 text-center ${
              member.name.length > 15 ? 'text-lg' : 'text-2xl'
            }`}>{member.name}</h3>
                       <p className="text-primary-400 font-medium mb-4 text-center text-base">{member.role}</p>
           
                                                        <div className="flex justify-center space-x-4 absolute bottom-2 left-1/2 transform -translate-x-1/2">
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-gray-700/50 backdrop-blur-sm rounded-lg hover:bg-primary-600 transition-colors duration-200 group"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <svg className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </a>
                    <button
                      className="p-3 bg-gray-700/50 backdrop-blur-sm rounded-lg hover:bg-primary-600 transition-colors duration-200 group"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleFlip();
                      }}
                    >
                      <img src={getIconSrc('User')} alt="Profile" className="h-6 w-6 object-contain" />
                    </button>
                  </div>
        </div>

                       {/* Back of card */}
               <div
                 className="absolute w-full h-full backface-hidden bg-black/30 backdrop-blur-sm rounded-2xl p-6 flex flex-col items-center justify-center hover:bg-black/40 transition-all duration-300 rotate-y-180"
                 style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
               >
                     <div className="text-center">
                           <h4 className={`font-bold text-white mb-4 ${
                member.name.length > 15 ? 'text-lg' : 'text-2xl'
              }`}>{member.name}</h4>
             <p className="text-primary-400 text-base mb-6">{member.role}</p>
             
                           <div className="space-y-4 text-sm text-white/80 mb-6">
                <p><span className="font-semibold text-primary-400">School:</span> [School Name]</p>
                <p><span className="font-semibold text-primary-400">Experience:</span> [Years of Experience]</p>
                <p><span className="font-semibold text-primary-400">Quote:</span> "[Personal Quote]"</p>
              </div>
              
              <div className="flex justify-center space-x-4 absolute bottom-2 left-1/2 transform -translate-x-1/2">
               <a
                 href={member.linkedin}
                 target="_blank"
                 rel="noopener noreferrer"
                 className="p-3 bg-gray-700/50 backdrop-blur-sm rounded-lg hover:bg-primary-600 transition-colors duration-200 group"
                 onClick={(e) => e.stopPropagation()}
               >
                 <svg className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                   <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                 </svg>
               </a>
               <button
                 className="p-3 bg-gray-700/50 backdrop-blur-sm rounded-lg hover:bg-primary-600 transition-colors duration-200 group"
                 onClick={(e) => {
                   e.stopPropagation();
                   handleFlip();
                 }}
               >
                 <img src={getIconSrc('User')} alt="Profile" className="h-6 w-6 object-contain" />
               </button>
             </div>
           </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FlipCard;
