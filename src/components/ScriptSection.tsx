import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Volume2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSpeechSynthesis } from 'react-speech-kit';
import type { Section } from '../types';

interface ScriptSectionProps {
  section: Section;
  isOpen: boolean;
  onToggle: () => void;
}

const ScriptSection: React.FC<ScriptSectionProps> = ({ section, isOpen, onToggle }) => {
  const { speak, cancel } = useSpeechSynthesis();
  const [isPlaying, setIsPlaying] = useState(false);

  const handleSpeak = () => {
    if (isPlaying) {
      cancel();
      setIsPlaying(false);
    } else {
      speak({ text: section.content });
      setIsPlaying(true);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-4"
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow"
      >
        <div className="flex items-center space-x-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {section.title}
          </h3>
          {section.speaker && (
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {section.speaker}
            </span>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleSpeak();
            }}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <Volume2 className={`w-5 h-5 ${isPlaying ? 'text-blue-500' : 'text-gray-500'}`} />
          </button>
          {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="p-4 mt-2 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
                {section.content}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ScriptSection;