const path = require('path');
const glob = require('glob');
const chalk = require('chalk');
const fs = require("fs");
const basePath = fs.realpathSync(process.cwd());
const savePath = path.resolve(basePath, path.join('.', ));


/**
 *
 * @param dest 物理路经
 * @param index
 * @param isParentLast 父节点是否是当前对象最后一个节点
 */
const a = function (dest, index = 4, isParentLast = false, level = 2) {
  if(Array.isArray(dest)) {
    console.log(chalk.cyan(`    ${path.basename(dest[0])}`));
    dest = dest[0];
  }
  const baseName = path.basename(dest); // 得到文件(夹)名
  const stat = fs.lstatSync(dest);
  if(level <= 0 || !stat.isDirectory() || baseName.toLowerCase() === 'node_modules' || baseName.toLowerCase() === 'bower_components') {
    return;
  }
  const list = glob.sync(dest + '/*');
  const len = list.length;
  list.map((file, idx) => {
    const fileName = path.basename(file);
    const count = index / 4;
    const left = '     ';
    let tmpSpace = '│  '.repeat(count - 1 < 0 ? 0 : count - 1);
    const space = isParentLast ? tmpSpace.substring(0, tmpSpace.length - 3) + '   ' : tmpSpace;
    const notLastRight = '├──';
    const lastRight = '└──';
    if(idx === len - 1) {
      console.log(chalk.cyan(`${left}${space}${lastRight}${fileName}`));
      a(file, index + 4, true, level - 1);
    } else {
      console.log(chalk.cyan(`${left}${space}${notLastRight}${fileName}`));
      a(file, index + 4, false, level - 1);
    }
  });
};
a(['/Users/tiwenleo/liu/repository/ironsub/ost-cli/build/app-5def1266fb/'], 4, false, 2);
