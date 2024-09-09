const formatDate = (date) => {
    if (!(date instanceof Date)) {
        throw new Error('Provided value is not a Date object');
    }
    return date.toISOString().split('T')[0]; // YYYY-MM-DD
};

const getCurrentDate = () => {
    return formatDate(new Date());
};

module.exports = {
    formatDate,
    getCurrentDate
};