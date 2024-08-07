const bcrypt = require('bcryptjs');

const hashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  } catch (error) {
    throw new Error('Error hashing password');
  }
};

const comparePassword = async (candidatePassword, hashedPassword) => {
  try {
    return await bcrypt.compare(candidatePassword, hashedPassword);
  } catch (error) {
    throw new Error('Error comparing passwords');
  }
};

function getDayGroupInfo(DayGroup) {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const startOfToday = new Date(today.setHours(0, 0, 0, 0));
  const endOfToday = new Date(today.setHours(23, 59, 59, 999));

  const startOfWeekend = new Date();
  startOfWeekend.setDate(today.getDate() + (6 - dayOfWeek));
  startOfWeekend.setHours(0, 0, 0, 0);

  const endOfWeekend = new Date();
  endOfWeekend.setDate(today.getDate() + (7 - dayOfWeek));
  endOfWeekend.setHours(23, 59, 59, 999);

  const startOfNextWeek = new Date();
  startOfNextWeek.setDate(today.getDate() + (8 - dayOfWeek));
  startOfNextWeek.setHours(0, 0, 0, 0);

  const endOfNextWeek = new Date();
  endOfNextWeek.setDate(today.getDate() + (14 - dayOfWeek));
  endOfNextWeek.setHours(23, 59, 59, 999);
  if (DayGroup === 'Today') {
      return { $gte: startOfToday, $lte: endOfToday };
  } else if (DayGroup === 'Weekend') {
      return { $gte: startOfWeekend, $lte: endOfWeekend };
  } else if (DayGroup === 'nxtWeek') {
      return { $gte: startOfNextWeek, $lte: endOfNextWeek };
  }

  return null;
}
// #BUG- if multiple dayGroups then nothing is considered.




module.exports = {
  hashPassword,
  comparePassword,
  getDayGroupInfo
};