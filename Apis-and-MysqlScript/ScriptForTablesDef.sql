CREATE TABLE `usuario` (
   `idUsuario` int(11) NOT NULL AUTO_INCREMENT,
   `usuario` varchar(100) NOT NULL,
   `senha` varchar(300) NOT NULL,
   `idProjeto` int(11) NOT NULL,
   `ativo` int(11) DEFAULT NULL,
   PRIMARY KEY (`idUsuario`)
 );
 
 CREATE TABLE `postagem` (
   `idPostagem` int(11) NOT NULL AUTO_INCREMENT,
   `textoPostagem` varchar(3000) NOT NULL,
   `arquivoPostagem1` varchar(1000) DEFAULT NULL,
   `arquivoPostagem2` varchar(1000) DEFAULT NULL,
   `arquivoPostagem3` varchar(1000) DEFAULT NULL,
   `arquivoPostagem4` varchar(1000) DEFAULT NULL,
   `idPostagemAssociada` int(11) DEFAULT NULL,
   `dataHora` datetime DEFAULT NULL,
   `idUsuario` int(11) DEFAULT NULL,
   `idProjeto` int(11) NOT NULL,
   `ativo` int(11) DEFAULT NULL,
   PRIMARY KEY (`idPostagem`)
 ) 

  CREATE TABLE `projeto` (
   `id` int(11) NOT NULL AUTO_INCREMENT,
   `nomeProjeto` varchar(3000) NOT NULL,
   `ativo` int(11) DEFAULT NULL,
   PRIMARY KEY (`id`)
 ) ;