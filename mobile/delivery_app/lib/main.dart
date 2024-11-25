import 'package:flutter/material.dart';
import 'pages/initial_page.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Pizza no Grau',
      theme: ThemeData(
        primarySwatch: Colors.red,
      ),
      home: InitialPage(),
    );
  }
}
