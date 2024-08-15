import { Component } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  usuario: string = '';
  senha: string = '';

  constructor(private router: Router) {}

  async login() {
    try {
      const response = await axios.post("https://localhost/login.php", {
        usuario: this.usuario,
        senha: this.senha
      });
      const data = response.data;
      if (data.success) {
        localStorage.setItem('userId', data.idUsuario);  // Armazena corretamente o idUsuario
        localStorage.setItem('projetoId', data.idProjeto);  // Armazena corretamente o id do projeto do usuário
        this.router.navigate(['/home']);
      } else {
        console.log(data.message);
        // mensagem de erro de login
      }
    } catch (error) {
      console.log(error);
      // mensagem de erro
    }
  }
}
