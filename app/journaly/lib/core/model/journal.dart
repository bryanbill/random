import 'package:journaly/core/model/user.dart';

class Journal {
  final String id;
  final String title;
  final String content;
  final User user;
  final DateTime createdAt;

  Journal({
    required this.id,
    required this.title,
    required this.content,
    required this.user,
    required this.createdAt,
  });

  factory Journal.fromJson(Map<String, dynamic> json) {
    return Journal(
      id: json['id'],
      title: json['title'],
      content: json['content'],
      createdAt: DateTime.parse(json['createdAt']),
      user: User.fromJson(json['user']),
    );
  }

  @override
  String toString() {
    return 'Journal{id: $id, title: $title, content: $content, user: $user}';
  }
}
