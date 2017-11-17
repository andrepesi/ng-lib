/**
 * Helper com funcoes para auxiliar na manipulação de arquivos e diretorios
 */
var fs          = require('fs');
var fsx          = require("fs-extra");
var path        = require('path');
var replace     = require('replace-in-file');
module.exports = {
    /**
     * Recupera o nome da pasta em que o prompt de comando esta sendo executado
     */
    getCurrentDiretoryBase : function(){
        return path.basename(process.cwd());
    },
    /**
     * Recupera o caminho da  pasta onde o  prompt de comando esta sendo executado
     */
    getDestinationPath: function(){
        const destinationPath =  
        path.join(path.dirname(fs.realpathSync(process.cwd())),this.getCurrentDiretoryBase())
        return destinationPath;
    },
    /**
     * Recupera o diretorio (pasta onde o ngLib foi instalado pelo NodeJS ) onde estao os templates que servem de base
     * para a biblioteca angular 
     */
    getTemplatesPath : function(){
        const templ = path.join(path.dirname(fs.realpathSync(__filename)), '../templates');
        return templ;     
    },
    /**
     * Verifica se um diretorio existe
     */
    directoryExists : function(filePath){
        try{
            return fs.statSync(filePath).isDirectory();
        }catch(err){
            return false;
        }
    },
    /**
     * Copia os arquivos do local da instalação do ngLib para a pasta desejada
     */
    moveSourceLibraryFiles : function(source,destination,callback){         
        fsx.copy(source,destination,callback);
    },
    /**
     * Renomeia os arquivos de template, inseriando o nome da library informada
     */
    renameLibraryNameOnFiles : function(libraryName){
        var options = {
            files: [
                this.getDestinationPath() + '\\*',
                this.getDestinationPath() + '\\**\\*.ts',
                this.getDestinationPath() + '\\**\\*.js',
                this.getDestinationPath() + '\\**\\*.json'             
            ],
             //Substitui o nome de exemplo para o nome da biblioteca
            from: /(quickstart-lib)/g,
            // nome da biblioteca
            to: libraryName
        };
        replace(options)
        .then(changes => {
        })
        .catch(error => {
        });       
    }     
}