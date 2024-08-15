import { Component, inject } from '@angular/core';
import { RefresherCustomEvent } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../services/data.service';
import axios from 'axios';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  postagem: string = '';
  postagens: any = [];
  selectedFiles: any = [];
  userId: string | null = localStorage.getItem('userId'); // usa o userId do localStorage
  projetoId: string | null = localStorage.getItem('projetoId'); // usa o projetoId do localStorage
  isEditing: boolean = false;

  private data = inject(DataService);

  constructor() {
    this.pegaPostagem();
  }

  postagemDados = {
    postagem: "",
    id: null as number | null
  }

  refresh(ev: any) {
    setTimeout(() => {
      (ev as RefresherCustomEvent).detail.complete();
    }, 3000);
  }

  ngOnInit() { }

  onFileSelected(event: any) {
    this.selectedFiles = Array.from(event.target.files).slice(0, 4);
  }

  async createOrUpdate() {
    const formData = new FormData();
    formData.append('postagem', this.postagemDados.postagem);

    if (this.userId) {
      formData.append('idUsuario', this.userId); // Adiciona o idUsuario ao formData
    }
    if (this.projetoId) {
      formData.append('idProjeto', this.projetoId); // Adiciona o idProjeto ao formData
    }

    if (this.postagemDados.id !== null && this.postagemDados.id !== undefined) {
      formData.append('id', this.postagemDados.id.toString());
    }

    this.selectedFiles.forEach((file: string | Blob, index: number) => {
      formData.append(`file${index + 1}`, file);
    });

    try {
      let response;
      if (this.isEditing) {
        // Editar a postagem existente
        console.log("entrou no editar");
        
        response = await axios.post("https://localhost/postagemConn.php", formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
      } else {
        // Criar nova postagem
        console.log("entrou no inserir");
        response = await axios.post("https://localhost/postagemConn.php", formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
      }
      
      console.log(response);
      this.pegaPostagem(); // atualiza lista de postagens
      this.resetForm(); // reseta campo de postagem
    } catch (error) {
      console.log(error);
    }
  }

  async pegaPostagem() {
    try {
      const response = await axios.get("https://localhost/postagemConn.php");
      this.postagens = response.data.filter((postagem: any) => postagem.idProjeto === this.projetoId).map((postagem: any) => {
       
        return {
          ...postagem,
          files: [
            { path: postagem.arquivoPostagem1, name: postagem.arquivoPostagem1 ? postagem.arquivoPostagem1.split('/').pop() : null },
            { path: postagem.arquivoPostagem2, name: postagem.arquivoPostagem2 ? postagem.arquivoPostagem2.split('/').pop() : null },
            { path: postagem.arquivoPostagem3, name: postagem.arquivoPostagem3 ? postagem.arquivoPostagem3.split('/').pop() : null },
            { path: postagem.arquivoPostagem4, name: postagem.arquivoPostagem4 ? postagem.arquivoPostagem4.split('/').pop() : null }
          ]
        };
      });
    } catch (error) {
      console.log(error);
    }
  }

  isImage(filePath: string): boolean {
    return /\.(jpg|jpeg|png|gif)$/i.test(filePath);
  }

  editPostagem(postagem: any) {
    this.isEditing = true;
    this.postagemDados = {
      postagem: postagem.textoPostagem,
      id: postagem.idPostagem
    };
  }

  resetForm() {
    this.isEditing = false;
    this.postagemDados = {
      postagem: "",
      id: null
    };
    this.selectedFiles = [];
  }
}