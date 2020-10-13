#!/usr/bin/env node
const program = require('commander');
const process = require('child_process');
const path = require('path');
const fs = require('fs');
const chalk = require('chalk');

// 获取当前目录
const curPath = path.resolve('./');
const curVersion = require('./package.json').version;
program.version(curVersion, '-v, --version')

console.log(chalk.yellow('crh-vue-cli current version is :', curVersion))

program.command('init <name>')
	.action(name => {
		// console.log(curPath)
		console.log(chalk.green('begin clone template.'));
		process.exec('git clone https://github.com/wsDever/vue-project-template.git', (error, stdout,stderr) => {
			if(error != null){
				console.log(chalk.red('clone template error :' + error));
				return ;
			}
			console.log(stdout);
			console.log(chalk.green('clone template success.'));
			fs.rename(`${curPath}\\vue-project-template`, `${curPath}\\${name}`, err => {
				if(err){
					console.log(chalk.red('rename project name error'));
					return ;
				}
			})
			process.exec(`rd/s/q ${curPath}\\${name}\\.git`,(error, stdout,stderr) => {
				if(error != null){
					console.log(chalk.red('delete .git file error :' + error));
					return;
				}
				console.log(stdout);
				console.log(chalk.green('create project success.'))
			})
		})
	})

program.command('help')
	.action(() => {
		console.log(chalk.white('please use \"init <project-name>\"'))
	})
program.parse(process.argv);	