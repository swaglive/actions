const github = require('@actions/github');
const core = require('@actions/core');
const moment = require('moment');

async function run() {

    try {
        const octokit = new github.GitHub(process.env['GITHUB_TOKEN']);
        const startDate = core.getInput('start-date') ? eval(core.getInput('start-date')) : moment().startOf('w');
        const duration = core.getInput('duration', { required: true });
        const title = core.getInput('title', { required: true });
        const description = core.getInput('description');

        var ms = getCurrentMilestone(startDate, moment(), duration);

        const msg = await octokit.issues.createMilestone({
            owner: process.env['GITHUB_REPOSITORY'].split("/")[0],
            repo: process.env['GITHUB_REPOSITORY'].split("/")[1],
            title: ms.from.format(title),
            due_on: ms.dueOn,
            description: description
        });

        console.log(msg);

    } catch (err) {
        core.setFailed(err);
    }
}

/**
 * 
 * @param {moment} startDate ex. moment().startOf('w')
 * @param {moment} currentDate ex. moment()
 * @param {string} duration (W|2W|M|Q)
 */
function getCurrentMilestone(startDate, currentDate, duration) {
    if (duration === 'W') {
        if (currentDate.weekday() !== startDate.weekday()) {
            const fromDate = moment(currentDate).weekday(startDate.weekday() - 7);
            return {
                from: fromDate,
                dueOn: moment(fromDate).add(1, 'W')
            };
        }
        return {
            from: moment(currentDate),
            dueOn: moment(currentDate).add(1, 'W')
        };
    } else if (duration === '2W') {
        const ms = closestWeekDayBiweekly(startDate, currentDate);
        return {
            from: ms.from,
            dueOn: ms.dueOn
        };

    } else if (duration === 'M') {
        return {
            from: currentDate.startOf('M'),
            dueOn: currentDate.endOf('M')
        };
    } else if (duration === 'Q') {
        return {
            from: currentDate.startOf('Q'),
            dueOn: currentDate.endOf('Q')
        };
    } else {
        throw new Error(`Unknown duration type: ${duration}`)
    }
}


/**
 * 
 * @param {moment} startDate ex. moment().startOf('w')
 * @param {moment} currentDate ex. moment()
 */
function closestWeekDayBiweekly(startDate, currentDate) {

    if (startDate.day() != 0) {
        const diff = currentDate.diff(startDate, 'days');
        currentDate.subtract(diff % 14, 'd');
    } else {
        currentDate.startOf('w');
        if (currentDate.week() % 2 == 1) {
            currentDate.subtract(1, 'w');
        }
    }

    return {
        from: currentDate,
        dueOn: moment(currentDate).add(2, 'w')
    };
}


module.exports = { closestWeekDayBiweekly, getCurrentMilestone }

if (require.main === module) {
    run();
} 