export default () => {
  const getDate = () => {
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      };

    return new Date().toLocaleString('en-US', options);
  };
  const getTime = () => {
    return new Date().toLocaleTimeString();
  }
  return {
    getTime,
    getDate
  }
};
