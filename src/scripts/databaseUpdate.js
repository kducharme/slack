/*
NEEDS:
- Multi tiers for channel and messages
*/

const firebaseUpdate = (table, key) => {
    $.ajax({
        url: `https://slack-kd.firebaseio.com/${table}/${key}.json`,
        type: "PATCH",
        data: JSON.stringify(taskUpdate),
        success: function () {
        },
        error: function (error) {
            console.table('error: ' + error)
        }
    });
}

module.exports = firebaseUpdate;