const fs = require('fs');

const playwrightReportPath =
  './reports/playwright-report.json';

const mochaReportPath =
  './reports/mocha-detailed-report.json';

/**
 * Delete ONLY old mocha report
 */
if (fs.existsSync(mochaReportPath)) {

  fs.unlinkSync(mochaReportPath);

  console.log(
    `🗑️ Deleted old report: ${mochaReportPath}`
  );
}

/**
 * Read fresh playwright report
 */
const playwrightReport = JSON.parse(
  fs.readFileSync(
    playwrightReportPath,
    'utf8'
  )
);

const tests = [];

/**
 * Convert duration to human readable
 */
function formatDuration(ms) {

  const sec = (ms / 1000).toFixed(2);

  if (sec < 60) {
    return `${sec}s`;
  }

  const min = Math.floor(sec / 60);
  const remain = (sec % 60).toFixed(0);

  return `${min}m ${remain}s`;
}

/**
 * Extract nested suites recursively
 */
function extractTests(
  suites = [],
  parentSuite = ''
) {

  for (const suite of suites) {

    const suiteName =
      parentSuite
        ? `${parentSuite} > ${suite.title || ''}`
        : suite.title || '';

    // recursive nested suite
    extractTests(
      suite.suites || [],
      suiteName
    );

    for (const spec of suite.specs || []) {

      for (const test of spec.tests || []) {

        const result =
          test.results?.[0] || {};

        tests.push({

          title: spec.title,

          suite: suiteName,

          status: test.status,

          duration:
            result.duration || 0,

          durationHuman:
            formatDuration(
              result.duration || 0
            ),

          executedAt:
            new Date().toISOString(),

          retry:
            result.retry || 0,

          browser:
            result.browserName ||
            'chromium',

          environment:
            process.env.NODE_ENV ||
            'local',

          error:
            result.error?.message ||
            result.errors?.[0]?.message ||
            null,

          location:
            spec.location || {},

          attachments:
            (result.attachments || [])
              .map(a => ({
                name: a.name,
                contentType:
                  a.contentType,
                path:
                  a.path || null
              }))
        });
      }
    }
  }
}

extractTests(playwrightReport.suites);

/**
 * Summary
 */
const totalDuration =
  tests.reduce(
    (acc, t) => acc + t.duration,
    0
  );

const summary = {

  total: tests.length,

  passed:
    tests.filter(
      t => t.status === 'expected'
    ).length,

  failed:
    tests.filter(
      t => t.status === 'unexpected'
    ).length,

  skipped:
    tests.filter(
      t => t.status === 'skipped'
    ).length,

  flaky:
    tests.filter(
      t => t.status === 'flaky'
    ).length,

  duration: totalDuration,

  durationHuman:
    formatDuration(totalDuration)
};

/**
 * Final detailed report
 */
const finalReport = {

  reportName:
    'Mocha Detailed Report',

  generatedAt:
    new Date().toISOString(),

  framework:
    'Playwright',

  environment:
    process.env.NODE_ENV ||
    'local',

  summary,

  tests
};

/**
 * Generate fresh report
 */
fs.writeFileSync(
  mochaReportPath,
  JSON.stringify(
    finalReport,
    null,
    2
  )
);

console.log(
  ' mocha-detailed-report.json generated'
);