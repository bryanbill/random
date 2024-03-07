import 'dart:convert';

import 'package:hive_flutter/hive_flutter.dart';
import 'package:journaly/core/mixins/global.dart';
import 'package:http/http.dart' as http;

class AuthRepository with GlobalMixin {
  Future<bool> isLoggedIn() async {
    try {
      var box = await Hive.openBox('auth');
      token = box.get('token');

      return token != null;
    } catch (err) {
      return false;
    }
  }

  Future<bool> signIn(String email) async {
    try {
      print(email);
      var response = await http.post(
        Uri.parse('$baseUrl/auth/sign-in'),
        headers: {
          'Content-Type': 'application/json',
        },
        body: jsonEncode(
          {
            'email': email,
          },
        ),
      );

      return response.statusCode == 200;
    } catch (err) {
      print(err);
      return false;
    }
  }

  Future<bool> verifyOtp(String email, String otp) async {
    try {
      var response = await http.post(
        Uri.parse('$baseUrl/auth/verify-otp'),
        headers: {
          'Content-Type': 'application/json',
        },
        body: jsonEncode({
          'email': email,
          'otp': otp,
        }),
      );

      if (response.statusCode != 200) return false;

      final res = jsonDecode(response.body);

      var box = await Hive.openBox('auth');
      await box.put('token', res['data']['token']);
      await box.put('email', res['data']['email']);

      return true;
    } catch (err) {
      print(err);
      return false;
    }
  }
}
