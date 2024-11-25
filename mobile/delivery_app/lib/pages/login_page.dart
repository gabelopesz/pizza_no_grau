import 'package:delivery_app/components/my_theme.dart';
import 'package:flutter/material.dart';

class LoginPage extends StatelessWidget {
  const LoginPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: myTheme.colorScheme.surface,
      body: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          // Ícone do aplicativo
          Icon(
            Icons.local_pizza_outlined,
            size: 70,
            color: myTheme.colorScheme.onPrimary,
          ),
          const SizedBox(
              height: 20), // Espaçamento entre o ícone e o próximo elemento

          // Texto do restaurante
          const Text(
            'Restaurante Delivery',
            style: TextStyle(
              fontSize: 24,
              fontWeight: FontWeight.bold,
            ),
          ),
          const SizedBox(height: 20),

          // Campo de email
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 20),
            child: TextField(
              decoration: InputDecoration(
                labelText: 'Email',
                border: OutlineInputBorder(),
              ),
            ),
          ),
          const SizedBox(height: 20),

          // Campo de senha
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 20),
            child: TextField(
              obscureText: true,
              decoration: InputDecoration(
                labelText: 'Senha',
                border: OutlineInputBorder(),
              ),
            ),
          ),
          const SizedBox(height: 20),

          // Botão de entrar
          ElevatedButton(
            onPressed: () {
              // Adicione a lógica para o botão "Entrar" aqui
            },
            style: ElevatedButton.styleFrom(
              backgroundColor:
                  myTheme.colorScheme.primary, // Usando a cor primária do tema
            ),
            child: const Text('Entrar'),
          ),

          const SizedBox(height: 20),

          // Texto "não tenho uma conta?" e botão "criar conta"
          TextButton(
            onPressed: () {
              // Adicione a lógica para o botão "Criar conta" aqui
            },
            child: const Text('Não tem uma conta? Criar conta'),
          ),
        ],
      ),
    );
  }
}
