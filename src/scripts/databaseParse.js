// const firebaseParse = (data) => {
//     const getFirebaseData = require('./databaseLoad');
//     const printTasks = require('./printTasks');
//     let allTasks = []
//     const keys = Object.keys(data);
//     keys.forEach(task => {
//         let individualTask = {
//             key: task,
//             title: data[task].title,
//             details: data[task].details,
//             priority: data[task].priority,
//             lane: data[task].lane,
//         }
//     })
//     return allTasks;
// }

// module.exports = firebaseParse;