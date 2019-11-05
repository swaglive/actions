const github = require('@actions/github');
const core = require('@actions/core');
const moment = require('moment');

function manipulate_date(startDate, periodDay) {
    var milestone_date = moment();
    const diff = milestone_date.dayOfYear() - moment(startDate).dayOfYear();
    return milestone_date.subtract(diff%periodDay,'d');
}

async function run() {

    const octokit = new github.GitHub(process.env['GITHUB_TOKEN']);

    const startDate = core.getInput('start-date', { required: true });
    const periodDay = core.getInput('period-day', { required: true });
    const format = core.getInput('format', { required: true });
    const description = core.getInput('description', { required: true });

    var date = manipulate_date(startDate, periodDay);

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