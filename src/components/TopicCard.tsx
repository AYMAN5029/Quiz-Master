import React from 'react';
import { 
  FlaskConical, 
  Cpu, 
  Landmark, 
  Globe2, 
  Code2, 
  BookOpen,
  LucideIcon
} from 'lucide-react';
import { Topic } from '../types/quiz';

interface TopicCardProps {
  topic: Topic;
  onSelect: (topicId: string) => void;
}

// Map topic IDs to their corresponding icons
const iconMap: Record<string, LucideIcon> = {
  'science': FlaskConical,
  'technology': Cpu,
  'history': Landmark,
  'geography': Globe2,
  'programming': Code2,
  'english': BookOpen
};

const TopicCard: React.FC<TopicCardProps> = ({ topic, onSelect }) => {
  const Icon = iconMap[topic.id];

  return (
    <button
      onClick={() => onSelect(topic.id)}
      className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col items-center space-y-4 border border-gray-100 hover:border-blue-500"
    >
      {Icon && <Icon className="w-12 h-12 text-blue-500" />}
      <h3 className="text-xl font-semibold text-gray-800">{topic.name}</h3>
      <p className="text-gray-600 text-center text-sm">{topic.description}</p>
    </button>
  );
}

export default TopicCard;