import 'package:flutter/material.dart';
import '../components/my_theme.dart';

class InitialPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: myTheme.colorScheme.surface,
      body: Center(
        child: Image.asset(
          'lib/assets/Logo_app.png',
          width: MediaQuery.of(context).size.width *
              1.2, // Responsivo - 60% da largura da tela
          height: MediaQuery.of(context).size.width *
              1.2, // Mantém proporção similar à largura
          fit: BoxFit.contain, // Ajusta a imagem sem cortar
        ),
      ),
    );
  }
}
