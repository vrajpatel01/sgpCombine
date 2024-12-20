export default function (dateString) {
    const date = new Date(dateString)

    const pad = (num) => (num < 10 ? "0" : "") + num;

    const year = date.getFullYear();
    const month = pad(date.getMonth() + 1); // Months are zero-based, so we add 1
    const day = pad(date.getDate());
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate
}