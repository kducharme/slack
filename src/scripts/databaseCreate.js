/*
NEEDS:
- Multi tiers for channel and messages
*/

const firebaseCreate = (task) => {
    console.log('hi')
    $.ajax({
        url: 'https://slack-kd.firebaseio.com/channel.json',
        type: "POST",
        data: JSON.stringify(task),
        success: function () {
            console.log("success");
        },
        error: function (error) {
            console.log("error: " + error)
        }
    });
}

exports.module = firebaseCreate;


