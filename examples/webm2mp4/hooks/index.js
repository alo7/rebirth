const { join } = require('path');
const { homedir } = require('os');
const ffmpeg = require('fluent-ffmpeg');
const { loggerHooks } = require('../lib/log');

module.exports = {
  completeRecordAfter: (data) => {
    const baseFile =  join(homedir(), 'Downloads');
    const inputFile = join(baseFile, `${data.fileName}.webm`);
    const outputFile = join(baseFile, `${data.fileName}.mp4`)

    return new Promise((resolve, reject) => {
      ffmpeg(inputFile)
      .on('start', commandLine => {
        loggerHooks.info('ffmpeg start', {
          commandLine
        });
      })
      .on('error', err => {
        loggerHooks.error('ffmpeg error', {
          errMessage: err.message,
          errStack: err.stack
        });
        reject(err);
      })
      .on('end', () => {
        loggerHooks.info('ffmpeg complete', {
          inputFile,
          outputFile
        });
        resolve();
      })
      .outputOptions(['-fflags +genpts', '-max_muxing_queue_size 99999', '-r 30', '-crf 20'])
      .save(outputFile);
    });
  }
};