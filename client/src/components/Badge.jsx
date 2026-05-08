const Badge = ({ text }) => {
  const getColors = (category) => {
    switch (category) {
      case 'Technology': return 'bg-blue-100 text-blue-700';
      case 'Finance': return 'bg-green-100 text-green-700';
      case 'Health': return 'bg-red-100 text-red-700';
      case 'Legal': return 'bg-purple-100 text-purple-700';
      case 'Marketing': return 'bg-yellow-100 text-yellow-800';
      case 'Design': return 'bg-pink-100 text-pink-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold mt-1 ${getColors(text)}`}>
      {text}
    </span>
  );
};

export default Badge;
