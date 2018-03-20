#!/usr/bin/env node

"use strict";
var child_process = require('child_process');

var chalk       = require('chalk');
var clear       = require('clear');
var CLI         = require('clui');
var figlet      = require('figlet');
var inquirer    = require('inquirer');
var Preferences = require('preferences');
var Spinner     = CLI.Spinner;
var GitHubApi   = require('github');
var _           = require('lodash');
var git         = require('simple-git')();
var touch       = require('touch');
var fs          = require('fs');
var path          = require('path');
var files       = require('./helpers/files')
var install       = require('./helpers/install')
var yosay       = require('yosay')

/**
 * tela de boas vindas 
 */
clear();
console.log(
  yosay(
    'Bem vindo ao ' + chalk.yellow('NgLib ') + ' gerador de template para ' +  chalk.red('Angular Libraries \n') 
  ));

console.log(chalk.green('Author: André P. Silva'));
/**
 * Obtem do usuario as informações necessarias para criar a angular library
 * @param {*} callback 
 */
function prompting(callback) {
    
    var questions = [
        {
          name: 'library_name',
          type: 'input',
          message: 'Informe o nome da biblioteca :',
          validate: function( value ) {
            if (value.length) {
              return true;
            } else {
              return 'Por favor, Informe o nome da biblioteca ';
            }
          }
        }
      ];
      //responsavel por executar as perguntas e passa as respostas para o callback desejado
      inquirer.prompt(questions).then(callback);
}
/**
 * Executa a funcao prompting acima, passando a função de callback que ira usar as respostas informadas pelo usuário
 */
prompting(function(credentials) {
    
    // Indicador de execução de tarefas
    var status = new Spinner('Preparando tudo..');

    status.start();
    //Atualiza a mensagem
    status.message('Copiando os arquivos ')   
    // recupera os locais de instalação do NgLib feita pelo NodeJS
    const templates = files.getTemplatesPath();
    // recupera o local onde o prompt de comando foi executado, ou seja, pasta onde a library sera criada
    const destino = files.getDestinationPath();
    // copia os arquivos de template para a pasta da library que esta sendo criada
    files.moveSourceLibraryFiles(templates, destino,function(err){
        if(err){
            console.error(chalk.red('Erro ao copiar os arquivos necessários ',err));
            return false;
        }
        status.message('Arquivos copiados. Configurando a sua nova library');
        files.renameLibraryNameOnFiles(credentials.library_name);
        // se tudo correr bem, a library foi criada com sucesso
        status.message('Angular Library criada com sucesso');      
        status.stop();
    });    
    
  });