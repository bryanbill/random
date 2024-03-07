import 'dart:convert';

import 'package:hive_flutter/hive_flutter.dart';
import 'package:journaly/core/mixins/global.dart';
import 'package:journaly/core/model/journal.dart';
import 'package:http/http.dart' as http;

class JournalRepository with GlobalMixin {
  Future<List<Journal>> fetchJournals() async {
    try {
      final token =
          await Hive.openBox('auth').then((value) => value.get('token'));
      var response = await http.get(
        Uri.parse('$baseUrl/journals'),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer $token'
        },
      );
      print(response.statusCode);
      if (response.statusCode != 200) return [];

      final data = jsonDecode(response.body)['data'] as List;
      return data.map((e) => Journal.fromJson(e)).toList();
    } catch (err) {
      print("here $err");
      return [];
    }
  }

  Future<Journal?> fetchJournal(String id) async {
    try {
      final token =
          await Hive.openBox('auth').then((value) => value.get('token'));
      var response = await http.get(
        Uri.parse('$baseUrl/journals/$id'),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer $token'
        },
      );

      if (response.statusCode != 200) return null;

      final json = jsonDecode(response.body);

      return Journal.fromJson(json['data']);
    } catch (err) {
      print(err);
      return null;
    }
  }

  Future<bool> addJournal(String title, String content) async {
    try {
      final token = await Hive.openBox('auth').then(
        (value) => value.get('token'),
      );
      final res = await http.post(
        Uri.parse('$baseUrl/journals'),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer $token'
        },
        body: jsonEncode(
          {
            'title': title,
            'content': content,
          },
        ),
      );

      return res.statusCode == 201;
    } catch (err) {
      return false;
    }
  }

  Future<void> deleteJournal(String id) async {
    try {
      final token = await Hive.openBox('auth').then(
        (value) => value.get('token'),
      );
      await http.delete(
        Uri.parse('$baseUrl/journals/$id'),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer $token'
        },
      );
    } catch (err) {
      return;
    }
  }
}
