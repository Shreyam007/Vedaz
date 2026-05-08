export const formatDate = (dateString) => {
  const options = { weekday: 'short', month: 'short', day: 'numeric' };
  const date = new Date(dateString);
  // Add timezone offset to prevent shifting
  date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
  return date.toLocaleDateString('en-US', options);
};

export const groupSlotsByDate = (slots) => {
  if (!slots) return {};
  
  return slots.reduce((acc, slot) => {
    if (!acc[slot.date]) {
      acc[slot.date] = [];
    }
    acc[slot.date].push(slot);
    return acc;
  }, {});
};
