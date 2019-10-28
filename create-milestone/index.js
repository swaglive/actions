const github = require('@actions/github');
const core = require('@actions/core');
const moment = require('moment');

function manupate_date(startDate, periodDay) {
    var ms_date = moment();
    const diff = ms_date.dayOfYear() - moment(startDate).dayOfYear();
    return ms_date.subtract(diff%periodDay,'d');
}

async function run() {

    const octokit = new github.GitHub(process.env['GITHUB_TOKEN']);

    const startDate = core.getInput('start-date', { required: true });
    const periodDay = core.getInput('period-day', { required: true });
    const format = core.getInput('format', { required: true });
    const description = core.getInput('description', { required: true });

    var date = manupate_date(startDate, periodDay);

    const msg = await octokit.issues.createMilestone({
        owner: 'swaglive',
        repo: 'action-demo',
        title: date.format(format),
        description: description,
        due_on: date.add(periodDay,'d')
    });

    console.log(msg);
}
run();

// async function demo() {
//     const octokit = new github.GitHub(process.env['GITHUB_TOKEN']);

//     const { data: msl } = await octokit.issues.listMilestonesForRepo({
//         owner: 'swaglive',
//         repo: 'action-demo'
//     });
//     for(var i in msl) {
//         const msg =  octokit.issues.deleteMilestone({
//             owner: 'swaglive',
//             repo: 'action-demo',
//             milestone_number: msl[i]['number']
//         });
//         console.log(msg);

//     }
// }
// demo()