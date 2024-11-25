import 'package:flutter/material.dart';

// Declare suas cores corretamente como constantes
const Color CorFundo = Color(0xFFFFFFFF);
const Color Vermelho = Color(0xFFE9524D);
const Color CinzaLetras = Color(0xFF80869A);
const Color CinzaCategorias = Color(0xFFD9D9D9);
const Color Amarelo = Color(0xFFEBB94B); // Corrigido o 'ebb94b' para maiúsculas
const Color RosaClaro =
    Color(0xFFEBBA9E); // Corrigido o 'ebba9e' para maiúsculas

// Defina o ThemeData com o ColorScheme
ThemeData myTheme = ThemeData(
  colorScheme: ColorScheme.light(
    surface: CorFundo,
    primary: Vermelho,
    secondary: CinzaLetras,
    tertiary: CinzaCategorias,
    onPrimary: Amarelo,
    onSecondary: RosaClaro,
  ),
);
