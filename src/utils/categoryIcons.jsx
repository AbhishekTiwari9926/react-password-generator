import React from 'react';
import {
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Github,
  Mail,
  DollarSign,
  CreditCard,
  Briefcase,
  FileText,
  ShoppingCart,
  Heart,
  MoreHorizontal,
  Globe,
} from 'lucide-react';

export const getCategoryIcon = (category) => {
  const iconMap = {
    'Social Media': { icon: Globe, color: 'from-blue-400 to-blue-600' },
    'Facebook': { icon: Facebook, color: 'from-blue-500 to-blue-700' },
    'Instagram': { icon: Instagram, color: 'from-pink-400 to-purple-600' },
    'Twitter': { icon: Twitter, color: 'from-sky-400 to-sky-600' },
    'LinkedIn': { icon: Linkedin, color: 'from-blue-600 to-blue-800' },
    'GitHub': { icon: Github, color: 'from-gray-700 to-gray-900' },
    'Email': { icon: Mail, color: 'from-red-400 to-red-600' },
    'Banking': { icon: DollarSign, color: 'from-green-400 to-green-600' },
    'Finance': { icon: CreditCard, color: 'from-emerald-400 to-teal-600' },
    'Work': { icon: Briefcase, color: 'from-purple-400 to-purple-600' },
    'Office': { icon: FileText, color: 'from-indigo-400 to-indigo-600' },
    'Shopping': { icon: ShoppingCart, color: 'from-orange-400 to-orange-600' },
    'Personal': { icon: Heart, color: 'from-rose-400 to-pink-600' },
    'Other': { icon: MoreHorizontal, color: 'from-gray-400 to-gray-600' },
  };

  // Check if category exists in map, default to Other
  if (category && iconMap[category]) {
    return iconMap[category];
  }

  return iconMap['Other'];
};

export const CategoryIcon = ({ category, size = 'md' }) => {
  const { icon: Icon, color } = getCategoryIcon(category);
  const sizeClass = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
    xl: 'w-8 h-8',
  }[size] || 'w-5 h-5';

  return (
    <div className={`inline-flex items-center justify-center rounded-full bg-gradient-to-br ${color} p-2`}>
      <Icon className={`${sizeClass} text-white`} />
    </div>
  );
};
